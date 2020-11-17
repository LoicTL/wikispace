<template>
    <loading v-if="!item"></loading>
    <div class="container" v-else>
        <div class="image">
            <img v-if="item.profile_image_thumbnail" :src="item.profile_image_thumbnail">
            <div v-else class="placeholder"></div>
            <span class="name">{{item.name}}</span>
        </div>
        <div class="descr">
            <span>Nationalité : {{ item.nationality }}</span>
            <span v-if="item.agency">Agence : {{ item.agency.name }}</span>
            <span>Naissance : {{ item.date_of_birth }}</span>
            <span v-if="item.date_of_death">Décès : {{ item.date_of_death }}</span>
            <span>Statut : {{ item.status.name }}</span>
            <span>Vols : {{ item.flights.length }}</span>
            <div>
                Biographie :
                <div class="descr-block">
                    {{ item.bio }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Loading from '../components/Loading.vue'

export default {
    components: {
        Loading,
    },

    data() {
        return {
            item: null
        }
    },

    async mounted() {
        let { data } = await axios.get(`https://spacelaunchnow.me/api/3.3.0/astronaut/${this.$route.params.id}`)
        this.item = data
    }
}
</script>

<style scoped>
    @import url('./detail.css');
</style>