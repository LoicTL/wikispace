<template>
    <loading v-if="!item"></loading>
    <div class="container" v-else>
        <div class="image">
            <img v-if="item.spacecraft_config.image_url" :src="item.spacecraft_config.image_url">
            <div v-else class="placeholder"></div>
            <span class="name">{{item.name}}</span>
        </div>
        <div class="descr">
            <span v-if="item.spacecraft_config.agency">Agence : {{ item.spacecraft_config.agency.name }}</span>
            <div>
                Dimensions :<br>
                <span class="descr-block">Hauteur : {{ item.spacecraft_config.height }}</span><br>
                <span class="descr-block">Diamètre : {{ item.spacecraft_config.diameter }}</span><br>
            </div>
            <span>Utilisation : {{ item.spacecraft_config.capability }}</span>
            <span>Statut : {{ item.status.name }}</span>
            <span>Vols : {{ item.flights.length }}</span>
            <div>
                Description :
                <div class="descr-block">
                    {{ item.description }}
                </div>
            </div>
            <div>
                Historique :
                <div class="descr-block">
                    {{ item.spacecraft_config.history }}
                </div>
            </div>
            <div>
                Détail :
                <div class="descr-block">
                    {{ item.spacecraft_config.details }}
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
        let { data } = await axios.get(`https://spacelaunchnow.me/api/3.3.0/spacecraft/${this.$route.params.id}`)
        this.item = data
    }
}
</script>

<style scoped>
    @import url('./detail.css');
</style>