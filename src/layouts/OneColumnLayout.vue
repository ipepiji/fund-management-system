<script lang="ts">
import Navbar from '@/components/Navbar.vue'

export default {
    name: 'OneColumnLayout',
    components: { Navbar },
}
</script>

<template>
    <header>
        <Navbar />
    </header>
    <main>
        <div class="container-sm mt-5">
            <router-view />
        </div>
    </main>
</template>

<style lang="scss" scoped>
.container-sm {
    max-width: 1200px;
}
</style>