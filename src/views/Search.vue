<template>
    <div class="current-category">
        <Breadcrumb :breadcrumbList="breadcrumbList" />
        <div class="content">
            <div class="article-list-container">
                <ArticleList :searchMode="true" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router/composables'
import Breadcrumb from '@/components/Breadcrumb.vue'
import ArticleList from '@/components/ArticleList.vue'

export default ({
    name: 'Search',
    components: { Breadcrumb, ArticleList },
    setup() {
        const route = useRoute()
        let results = ref(route.query.q);
        let breadcrumbList = ref([
            {
                id: 0,
                title: 'All categories',
                route: '/',
                isActive: false
            }
        ])

        watch(() => route.query.q, (query) => {
            results.value = query;
        })

        const newBreadcrumbList = computed(() => {
            return [
                ...breadcrumbList.value,
                {
                    id: 1,
                    title: 'Search results',
                    route: `search?q=${results.value}`,
                    isActive: true
                }
            ]
        })

        return { breadcrumbList: newBreadcrumbList }
    }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

$padding: 50px;

.current-category {
    padding: $padding/2 $padding;
    border-bottom: 2px solid $gray95;
    max-width: 1200px;
    margin: auto;

    .content {
        .article-list-container {
            width: 100%;
        }
    }
}
</style>