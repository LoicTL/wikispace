<template>
    <div class="app">
        <div class="tabs">
            <a
                class="tab"
                :class="{ 'selected': currentTab.name === tab.name }"
                v-for="tab in tabs" :key="tab.name"
                @click="goto(tab)">
                {{ tab.name }}
            </a>
        </div>
        <grid class="content" :baseUrl="currentTab.url" :imgProp="currentTab.imgProp" :category="currentTab.category"></grid>
    </div>
</template>

<script>
import Grid from '../components/Grid.vue'

export default {
    data() {
        return {
            currentTab: null,
            tabs: [
                { name: 'Astronautes', url: 'https://spacelaunchnow.me/api/3.3.0/astronaut/', category: 'astronaut'},
                { name: 'Vaisseaux', url: 'https://spacelaunchnow.me/api/3.3.0/spacecraft/', category: 'spacecraft'},
                { name: 'Evènements', url: 'https://spacelaunchnow.me/api/3.3.0/event/', category: 'event'},
            ],
        }
    },

    components: {
        Grid
    },

    beforeMount() {
        this.currentTab = this.tabs[0]
    },

    methods: {
        goto(tab) {
            this.currentTab = tab
        }
    },
}
</script>

<style scoped>
    .app {
        display: flex;
        flex-direction: column;
    }

    .tabs {
        display: flex;
        background-color: #2e2d2d;
        justify-content: center;
        padding: 10px 0;
    }

    .tab {
        cursor: pointer;
        margin: 10px;
        color: white;
    }

    .selected {
        font-weight: bold;
        color: #00e7b0;
    }

    .content {
        flex: 1;
    }
</style>