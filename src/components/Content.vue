<template>
    <div class="container">
        <router-view />
    </div>
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.container {
    font-family: $font-family;
    color: $text-black;
    max-width: 1600px;
    margin: 50px auto;
    background: $gray98;
}
</style>