<template>
    <span>
        <div class="current-category">
            <Breadcrumb :breadcrumbList="breadcrumbList" />
            <div class="content">
                <div class="category-details-container">
                    <CategoryDetail :category="category" :type="2" />
                </div>
                <div class="article-list-container">
                    <ArticleList />
                </div>
            </div>
        </div>
        <div class="other-category">
            <h2>Other categories</h2>
            <Menu :type="2" />
        </div>
    </span>
</template>

<script lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router/composables'
import { getCategoryList } from '@/composables'
import { getLastUpdated } from '@/utils'
import Breadcrumb from '@/components/Breadcrumb.vue'
import CategoryDetail from '@/components/CategoryDetail.vue'
import ArticleList from '@/components/ArticleList.vue'
import Menu from '@/components/Menu.vue'

export default ({
    name: 'Category',
    components: { Breadcrumb, CategoryDetail, ArticleList, Menu },
    setup() {
        const route = useRoute()
        let { categoryList, error, load } = getCategoryList()
        let breadcrumbList = ref([
            {
                id: 0,
                title: 'All categories',
                route: '/',
                isActive: false
            }
        ])

        onMounted(() => {
            load()
        })

        const category = computed(() => {
            return categoryList.value
                .find((obj) => obj.id === route.params.id)
        })

        const newBreadcrumbList = computed(() => {
            return [
                ...breadcrumbList.value,
                {
                    id: 1,
                    title: category.value?.title,
                    route: `category/${category.value?.id}`,
                    isActive: true
                }
            ]
        })

        return { breadcrumbList: newBreadcrumbList, category, getLastUpdated, error }
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
        display: flex;
        display: -ms-flexbox;
        flex-direction: row;
        -ms-flex-direction: row;

        @media (max-width: 991px) {
            flex-wrap: wrap;
            -ms-flex-wrap: wrap;
        }

        .category-details-container {
            width: 100%;
            max-width: 400px;
            flex: 0 0 auto;
            margin-right: 50px;

            @media (max-width: 991px) {
                max-width: none;
            }
        }

        .article-list-container {
            width: 100%;
            max-width: 800px;


            @media (max-width: 1399px) {
                width: 54%;
            }


            @media (max-width: 991px) {
                max-width: none;
                width: 100%;
            }
        }
    }
}

.other-category {
    padding: $padding;

    h2 {
        text-align: center;
        font-weight: bold;
        color: $text-gray;
    }
}
</style>