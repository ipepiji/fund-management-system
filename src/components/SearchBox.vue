<template>
    <form @submit.prevent="onSubmit">
        <input v-model.trim="answer" type="text" placeholder="Search fo answers">
        <button type="submit"><i class="fa fa-search fa-lg"></i></button>
    </form>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router/composables'

export default ({
    name: 'SearchBox',
    setup() {
        const router = useRouter();
        const answer = ref('')

        const onSubmit = () => {
            updateFilters(answer.value)
        };

        const updateFilters = (query) => {
            router.push({
                name: 'search',
                query: {
                    'q': query,
                }
            }).catch(error => {
                if (
                    error.name !== 'NavigationDuplicated' &&
                    !error.message.includes('Avoided redundant navigation to current location')
                ) {
                    console.log(error)
                }
            })
        }

        return { answer, onSubmit }
    }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

$radius: 5px;
$padding: 20px;

form {
    display: flex;
    justify-content: center;

    input[type=text] {
        font-size: 16px;
        width: 100%;
        max-width: 600px;
        padding: $padding;
        border: 2px solid $gray95;
        border-right: none;
        border-top-left-radius: $radius;
        border-bottom-left-radius: $radius;
        background: white;

        &::placeholder {
            color: $text-gray;
        }

        &:focus {
            outline: none;
            box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
        }
    }

    button {
        width: 100%;
        max-width: 75px;
        padding: $padding;
        border: none;
        border-top-right-radius: $radius;
        border-bottom-right-radius: $radius;
        background: $green;
        cursor: pointer;

        i {
            color: white;
        }
    }
}
</style>