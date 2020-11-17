<template>
    <div class="container">
        <loading v-if="loading"></loading>
        <div v-else class="grid">
            <router-link class="item" v-for="item in liste" :key="item.id" :to="`/${category}/${item.id}`">
                <astronaut-card v-if="category === 'astronaut'" :item="item"></astronaut-card>
                <event-card v-else-if="category === 'event'" :item="item"></event-card>
                <spacecraft-card v-else-if="category === 'spacecraft'" :item="item"></spacecraft-card>
            </router-link>
        </div>
        <div class="buttons">
            <a class="button" :class="{ 'disabled': !previousLink }" @click="previous()">&lt; Précédent</a>
            <input :disabled="loading" v-model="currentPage">
            <span> / {{totalPages}}</span>
            <a class="button" :class="{ 'disabled': !nextLink }" @click="next()">Suivant &gt;</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { debounce } from 'throttle-debounce'

import Loading from './Loading.vue'
import AstronautCard from './AstronautCard.vue'
import EventCard from './EventCard.vue'
import SpacecraftCard from './SpacecraftCard.vue'

export default {

    props: {
        baseUrl: String,
        imgProp: String,
        category: String
    },

    components: {
        Loading,
        AstronautCard,
        EventCard,
        SpacecraftCard,
    },

    data() {
        return {
            liste: [],
            previousLink: null,
            nextLink: null,
            currentIndex: 0,
            totalPages: 0,
            limit: 30,
            debounceRetrieve: null,
            loading: false,
        }
    },

    mounted() {
        this.debounceRetrieve = debounce(300, false, this.retrieve)
        this.retrieve(`${this.baseUrl}?limit=${this.limit}`)
    },

    computed: {
        currentPage: {
            get() {
                return this.currentIndex + 1
            },
            set(value) {
                let url = this.makeUrl(value)
                this.debounceRetrieve(url)
            }
        }
    },

    methods: {
        async previous() {
            if (this.previousLink) {
                await this.retrieve(this.previousLink)
            }
        },
        async next() {
            if (this.nextLink) {
                await this.retrieve(this.nextLink)
            }
        },
        async retrieve(link) {
            if (this.loading) return

            this.loading = true

            // Data
            let { data } = await axios.get(link)
            this.liste = data.results
            this.previousLink = this.getHttps(data.previous)
            this.nextLink = this.getHttps(data.next)

            this.totalPages = Math.ceil(data.count / this.limit)
            if (data.next) {
                let offset = Number.parseInt(data.next.match(/offset=([0-9]*)/)[1], 10)
                this.currentIndex = (offset - this.limit) / this.limit
            } else if (data.previous) {
                let offset = Number.parseInt(data.previous.match(/offset=([0-9]*)/)[1], 10)
                this.currentIndex = (offset + this.limit) / this.limit
            }

            // Agency abbrev
            if (this.category === 'spacecraft') {
                let idAgencies = this.liste.map(x => x.configuration.agency.id).filter((value, index, self) => self.indexOf(value) === index)
                let agencies = await Promise.all(idAgencies.map(async x => {
                    let {data} = await axios.get(`https://spacelaunchnow.me/api/3.3.0/agencies/${x}/`)
                    return data
                }))
                this.liste.forEach(x => x.agencyName = agencies.find(y => y.id === x.configuration.agency.id).abbrev)
            }

            this.loading = false
        },
        getHttps(url) {
            if (url && url.startsWith('http://')) {
                return 'https' + url.substr('http'.length)
            }
            return url
        },
        makeUrl(page) {
            let idx = page - 1
            let offset = idx * this.limit
            return `${this.baseUrl}?limit=${this.limit}&offset=${offset}`
        },
    },

    watch: {
        baseUrl(newVal) {
            this.liste = []
            this.previousLink = null
            this.nextLink = null
            this.currentIndex = 0
            this.totalPages = 0
            this.retrieve(`${newVal}?limit=${this.limit}`)
        }
    }
}
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
    }
    .grid {
        flex: 1;
        align-content: start;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
    .item {
        margin: 5px;
        color: inherit;
        text-decoration: none;
    }
    .buttons {
        align-self: center;
        display: flex;
        margin: 10px;
    }
    .button {
        cursor: pointer;
        color: #00e7b0;
        margin: 0 10px;
    }

    .disabled {
        color: #4f4f4f;
        cursor: not-allowed;
    }
</style>