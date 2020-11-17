<template>
    <loading v-if="!item"></loading>
    <div class="container" v-else>
        <div class="image">
            <img v-if="item.feature_image" :src="item.feature_image">
            <div v-else class="placeholder"></div>
            <span class="name">{{item.name}}</span>
        </div>
        <div class="descr">
            <span>Date : {{ new Date(item.date).toString() }}</span>
            <span>Type : {{ item.type.name }}</span>
            <span>Lieu : {{ item.location }}</span>
            <div>
                Description :
                <div class="descr-block">
                    {{ item.description }}
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
        let { data } = await axios.get(`https://spacelaunchnow.me/api/3.3.0/event/${this.$route.params.id}`)
        this.item = data
    }
}
</script>

<style scoped>
    @import url('./detail.css');
</style>