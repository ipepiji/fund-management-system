<template>
    <span>
        <div class="card" v-if="category">
            <div v-show="type === 2" class="top-card">
                <span class="item-right">
                    <i class="fa fa-file-alt fa-lg"></i>
                    {{ category.totalArticle }}
                </span>
            </div>
            <i :class="`fa fa-${category.icon} fa-3x`"></i>
            <h2 :class="{ zeroMarginBottom: type === 2 }">{{ category.title }}</h2>
            <p :class="{ zeroMarginTop: type === 2 }">
                <small class="total-article" v-show="type === 1">{{ category.totalArticle }} articles</small><br>
                <small class="last-update">
                    <span v-show="type === 1">Last update </span>
                    <span v-show="type === 2">Updated </span>
                    {{ getLastUpdated(category.updatedOn) }}
                </small>
            </p>
        </div>
        <div class="card description" v-show="type === 2">
            <i class="fa fa-exclamation-circle fa-2x"></i>
            <p>
                {{ category && category.description }}
            </p>
        </div>
    </span>
</template>

<script lang="ts">
import { getLastUpdated } from '@/utils'

export default ({
    name: 'CategoryDetail',
    props: ['category', 'type'],
    setup() {
        return { getLastUpdated }
    }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.card {
    text-align: center;
    height: 200px;
    display: flex;
    display: -ms-flexbox;
    flex-direction: column;
    -ms-flex-direction: column;
    padding: 35px 15px;
    border: 2px solid $gray95;
    background: white;

    &.description {
        height: auto;
        color: $text-gray;
        border-top: none;
    }

    .top-card {
        top: 0;
        width: 100%;

        .item-right {
            float: right;
            color: $text-gray
        }
    }

    i {
        color: $green;
        min-height: 48px;
    }

    h2 {
        font-weight: bold;
        line-height: 24px;

        &.zeroMarginBottom {
            margin-bottom: 0;
        }
    }

    p {
        &.zeroMarginTop {
            margin-top: 0;
        }

        .total-article {
            font-weight: bold;
            color: $green;
        }

        .last-update {
            color: $text-gray;
        }
    }
}
</style>