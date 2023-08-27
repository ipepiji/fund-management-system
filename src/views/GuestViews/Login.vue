<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { UserService } from '@/services'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Login',
    setup() {
        const router = useRouter()
        const loginForm = ref({
            username: '',
            password: '',
            isSubmitted: false
        })

        function onSubmit() {
            loginForm.value.isSubmitted = true
            const { isSubmitted, ...form } = loginForm.value
            UserService.login(form)
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    router.push('/')
                })
                .catch((err) => {
                    alert(err.response?.data.message || (err.message === "Network Error" ? "Please ensure the backend is running!" : err.message))
                })
                .finally(() => {
                    loginForm.value.isSubmitted = false
                })
        };

        return { loginForm, onSubmit }
    }
}
</script>

<template>
    <div class="d-flex justify-content-center align-items-sm-center vh-100">
        <div class="container-sm px-0 card-container">
            <div class="card h-100">
                <div class="card-header text-center">
                    Login
                </div>
                <div class="card-body d-flex justify-content-center align-items-center">
                    <form @submit.prevent="onSubmit">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input type="text" class="form-control form-control" v-model.trim="loginForm.username" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control form-control" v-model.trim="loginForm.password"
                                required>
                        </div>
                        <div class="d-grid gap-2">
                            <button class="btn btn-primary" type="submit" :disabled="loginForm.isSubmitted">
                                <span role="status">Login</span>
                                <span class="spinner-border spinner-border-sm ms-2" aria-hidden="true"
                                    :hidden="!loginForm.isSubmitted"></span>
                            </button>
                            <button class="btn btn-info" type="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.card-container {
    max-width: 576px;

    .card-body {
        min-height: 400px;

        form {
            width: 75%;
        }
    }
}
</style>