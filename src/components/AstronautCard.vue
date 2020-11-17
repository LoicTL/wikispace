<template>
    <div class="card">
        <div class="image" >
            <img v-if="item.profile_image_thumbnail" :src="item.profile_image_thumbnail">
            <div v-else class="placeholder"></div>
        </div>
        <div class="descr">
            <span class="name">{{ item.name }}</span>
            <span class="agency" v-if="item.agency">{{ item.agency.abbrev }}</span>
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