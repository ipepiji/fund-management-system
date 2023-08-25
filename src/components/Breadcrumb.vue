<template>
    <p class="breadcrumb">
        <span v-for="(breadcrumb, i) in breadcrumbList" :key="breadcrumb.id">
            <router-link :to="breadcrumb.route" v-show="!breadcrumb.isActive"> {{ breadcrumb.title }}</router-link>
            <span v-show="breadcrumb.isActive"> {{ breadcrumb.title }}</span>
            <i class="fa fa-chevron-right fa-sm splitter" v-if="i !== breadcrumbList.length - 1"></i>
        </span>
    </p>
</template>

<script lang="ts">

export default ({
    name: 'Breadcrumb',
    props: ['breadcrumbList'],
})

</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.breadcrumb {
    font-weight: bold;
    color: $text-gray;

    a {
        color: $green;
        text-decoration: none;
    }

    .splitter {
        margin: auto 12px;
    }
}
</style>