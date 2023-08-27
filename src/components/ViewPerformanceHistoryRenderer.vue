<script lang="ts">

export default {
    name: 'ViewPerformanceHistoryRenderer'
}
</script>

<template>
    <router-link :to="`performance-history/${params.data.id}`"><button class="btn btn-lg"
            title="View performance history"><i class="bi bi-eye"></i></button></router-link>
</template>