<template>
    <div class="card">
        <div class="image" >
            <img v-if="item.feature_image" :src="item.feature_image">
            <div v-else class="placeholder"></div>
        </div>
        <div class="descr">
            <span class="name">{{ item.name }}</span>
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