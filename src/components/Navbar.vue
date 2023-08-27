<script lang="ts">
import { ref } from "vue";
import { useRouter } from 'vue-router'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Navbar',
    setup() {
        const router = useRouter()
        const isCollapsed = ref(false);

        function logout() {
            localStorage.clear()
            router.push('auth')
        }

        return { isCollapsed, logout }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand d-none d-sm-block">Fund Management System</a>
            <button class="navbar-toggler" type="button" @click="isCollapsed = !isCollapsed">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div :class="`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link active" to="/">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/portfolio">Porfolio</router-link>
                    </li>
                </ul>
                <div class="d-flex">
                    <button class="btn btn-danger ms-auto" type="button" @click="logout"><i class="bi bi-box-arrow-right"></i></button>
                </div>
            </div>
        </div>
    </nav>
</template>