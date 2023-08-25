<template>
    <div :class="`${type === 1 ? 'menu' : 'carousell'}-container`">
        <div :class="`${type === 1 ? 'menu' : 'carousell'}-row`">
            <button :style="getButtonStyle(1)" @click="onPrev" :disabled="offset === 0" v-show="type === 2">
                <i class="fa fa-chevron-left fa-2x"></i>
            </button>
            <div class="column" :style="getItemStyle(index)" v-for="(category, index) in categoryList" :key="category.id">
                <router-link :to="{ name: 'category', params: { id: category.id } }"
                    style="text-decoration: none; color: inherit;">
                    <CategoryDetail :category="category" :type="1" />
                </router-link>
            </div>
            <button :style="getButtonStyle(5)" @click="onNext" :disabled="offset + 3 === filteredCategoryList.length"
                v-show="type === 2">
                <i class="fa fa-chevron-right fa-2x"></i>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router/composables'
import { getCategoryList } from '@/composables'
import { getLastUpdated } from '@/utils'
import CategoryDetail from './CategoryDetail.vue'

export default ({
    name: 'Menu',
    components: { CategoryDetail },
    props: ['type'],
    setup(props) {
        const route = useRoute()
        const windowSize = ref({
            width: window.innerWidth
        })
        let { categoryList, error, load } = getCategoryList()
        let offset = ref(0)
        const limit = 3

        onMounted(() => {
            window.addEventListener('resize', () => { windowSize.value.width = window.innerWidth })
            load()
        })
        onUnmounted(() => {
            window.removeEventListener('resize', () => { windowSize.value.width = window.innerWidth })
        })

        const filteredCategoryList = computed(() => {
            return categoryList.value
                .filter((obj) => obj.enabled && obj.id !== route.params.id)
                .sort((a, b) => a.order - b.order)
        })

        const slicedCategoryList = computed(() => {
            return filteredCategoryList.value
                .slice(offset.value, offset.value + limit)
        })

        const onPrev = () => {
            offset.value--
        }

        const onNext = () => {
            offset.value++
        }

        const getItemStyle = (index) => {
            let maxCol = 3
            let rowOffset = 1
            let colOffset = 1

            if (props.type === 2) {
                maxCol = 5
                colOffset = 2
            }

            if (props.type === 1 && windowSize.value.width <= 1399)
                maxCol = 2

            if (windowSize.value.width <= 991) {
                maxCol = 1
                if (props.type === 2) {
                    colOffset = 1
                    rowOffset = 2
                }
            }

            const row = Math.floor(index / maxCol) + rowOffset;
            const col = (index % maxCol) + colOffset;

            return `ms-grid-row: ${row}; ms-grid-column: ${col}`;
        }

        const getButtonStyle = (index) => {
            let row = 1
            let col = index

            if (windowSize.value.width <= 991) {
                row = index;
                col = 1
            }

            return `ms-grid-row: ${row}; ms-grid-column: ${col}`;
        }

        return { categoryList: props.type === 1 ? filteredCategoryList : slicedCategoryList, filteredCategoryList, getLastUpdated, offset, onPrev, onNext, getItemStyle, getButtonStyle, error }
    }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.menu-container {
    font-style: normal;
    color: $text-black;
    max-width: 1200px;
    margin: auto;
}

.carousell-container {
    @extend .menu-container;
    max-width: 1300px;
}

.menu-row {
    display: grid;
    display: -ms-grid;
    grid-template-columns: repeat(3, 1fr);
    -ms-grid-columns: 1fr 1fr 1fr;

    @media (max-width: 1399px) {
        grid-template-columns: repeat(2, 1fr);
        -ms-grid-columns: 1fr 1fr;
    }

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
        -ms-grid-columns: 1fr;
    }
}

.carousell-row {
    @extend .menu-row;
    grid-template-columns: auto 1fr 1fr 1fr auto;
    -ms-grid-columns: auto 1fr 1fr 1fr auto;

    @media (max-width: 991px) {
        grid-template-columns: 1fr;
        -ms-grid-columns: 1fr;
    }

    button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        width: auto;
        margin: auto;

        i {
            color: $text-gray;
        }
    }
}

.column {
    margin: 12.5px 12.5px;

    &:hover {
        box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
    }
}
</style>
