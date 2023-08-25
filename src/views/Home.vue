<template>
    <div class="home">
        <Menu :type="1" />
    </div>
</template>

<script lang="ts">
import Menu from '@/components/Menu.vue'

export default ({
    name: 'Home',
    components: { Menu }
})
</script>

<style lang="scss" scoped>
.home {
    padding: 200px 50px;
}
</style>