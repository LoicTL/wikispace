<template>
    <div class="card">
        <div class="image" >
            <img v-if="item.configuration.image_url" :src="item.configuration.image_url">
            <div v-else class="placeholder"></div>
        </div>
        <div class="descr">
            <span class="name">{{ item.name }}</span>
            <span class="agency" v-if="item.agencyName">{{ item.agencyName }}</span>
        </div>
        <span>&gt;</span>
    </div>
</template>

<script>
export default {
    props: {
        item: Object
    }
}
</script>

<style scoped>
    @import url('./card.css');
</style>