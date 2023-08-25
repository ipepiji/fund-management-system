<template>
    <div>
        <h2 class="checker" v-if="articleList.length > 0 && query">Showing results for
            "<span class="result">{{ query }}</span>"
        </h2>
        <div v-for="article in articleList" :key="article.id">
            <router-link to="#" style="text-decoration: none; color: inherit">
                <div class="panel">
                    <i :class="`fa fa-file-alt fa-2x ${searchMode ? 'search-mode' : ''}`"></i>
                    <div id="text-content" class="text-content">
                        <h2 :class="`title ${searchMode ? 'search-mode' : ''}`">{{ article.title }}</h2>
                        <p class="details" v-if="searchMode">{{ article.content }}</p>
                        <small class="last-update" v-if="!searchMode">
                            Updated {{
                                convertToDateString(article.updatedOn) }}
                        </small>
                    </div>
                    <i class="fa fa-chevron-right fa-2x"></i>
                </div>
            </router-link>
        </div>
        <div class="not-found" v-if="articleList.length === 0">
            <i class="fa fa-search fa-10x"></i>
            <h2>No search results</h2>
            <p>Please, try again or <a href="mailto:support@tawk.to">Submit a ticket</a></p>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router/composables'
import { getArticleList } from '@/composables'
import { getLastUpdated, convertToDateString } from '@/utils'
import CategoryDetail from './CategoryDetail.vue'

export default ({
    name: 'Menu',
    components: { CategoryDetail },
    props: ['searchMode'],
    setup(props) {
        const route = useRoute()
        let id = ref(Number(route.params.id))
        let query: any = ref(route.query.q)
        let { articleList, error, load } = getArticleList({ id: id.value, query: query.value })

        onMounted(() => {
            load()
        })

        watch(() => route.query.q, (currQuery) => {
            query.value = currQuery
            load()
        })

        const filteredArticleList = computed(() => {
            return articleList.value
                .filter((obj) => !props.searchMode ? obj.status === "published" : obj.title.match(new RegExp(query.value, 'gi')))
        })

        return { query, articleList: filteredArticleList, getLastUpdated, convertToDateString, error }
    }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.checker {
    margin: 50px 0 40px;
    text-align: center;

    .result {
        color: $green;
    }
}

.panel {
    min-height: 75px;
    display: flex;
    display: -ms-flexbox;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
    padding: 5px 25px;
    border: 2px solid $gray95;
    background: white;

    &:hover {
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }

    i {
        color: $green;

        &.search-mode {
            color: $text-gray;
        }
    }

    .text-content {
        padding: 25px;
        flex-grow: 1;
        width: 65%;

        .title {
            font-weight: bold;
            margin: 10px auto;

            &.search-mode {
                color: $green;
            }
        }

        .details {
            text-align: justify;
        }

        .last-update {
            color: $text-gray;
        }
    }
}

.not-found {
    text-align: center;
    padding: 100px 0 50px;

    i {
        color: $text-gray;
    }

    p {
        a {
            font-weight: bold;
            color: $green;
        }
    }
}
</style>