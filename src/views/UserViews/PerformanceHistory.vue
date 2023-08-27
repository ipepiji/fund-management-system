<script lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted, ref, computed } from "vue";
import { useRoute } from 'vue-router'

import { getPerformanceHistoryList } from '@/composables'

export default {
    name: 'PerformanceHistory',
    components: {
        AgGridVue,
    },
    setup() {
        const route = useRoute()
        const gridApi: any = ref(null);

        const onGridReady = (params: any) => {
            gridApi.value = params.api;
            params.api.sizeColumnsToFit();
        };

        const columnDefs = reactive({
            value: [
                { field: "index", headerName: '#', maxWidth: 100, filter: false, sortable: false },
                { field: "value", headerName: 'Net Asset Value (RM)', type: 'numericColumn' },
                { field: "percent", headerName: 'Increment/Decrement (%)', type: 'numericColumn' },
                { field: "history_date", headerName: 'Date' },
            ]
        })

        const defaultColDef = {
            sortable: true,
            filter: true,
            flex: 1
        };

        let { performanceHistoryList, load } = getPerformanceHistoryList(Number(route.params.fund_id))

        onMounted(() => {
            load()
        })

        const updatedPerformanceHistoryList = computed(() => {
            return performanceHistoryList.value
                .map((obj: any, i: number) => ({ ...obj, index: ++i, history_date: new Date(obj.history_date).toDateString() }))
        })

        return {
            onGridReady,
            columnDefs,
            performanceHistoryList: updatedPerformanceHistoryList,
            defaultColDef,
        };
    },
};
</script>


<template>
    <h2 class="text-center mb-5"><router-link to="/"><i class="bi bi-arrow-left-circle-fill"></i></router-link><span
            class="ms-3">Performance History List</span></h2>
    <div class="mb-3">
        <p>Fund Name: <span class="fw-bold">{{ performanceHistoryList[0]?.fund.name || 'N/A' }}</span></p>
        <p>Fund Type: <span class="fw-bold">{{ performanceHistoryList[0]?.fund.investment_type || 'N/A' }}</span></p>
        <p>Fund Description: <span class="fw-bold">{{ performanceHistoryList[0]?.fund.description || 'N/A' }}</span></p>
    </div>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px;" :columnDefs="columnDefs.value"
        :rowData="performanceHistoryList" :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true"
        @grid-ready="onGridReady" :pagination="true" :paginationPageSize="10">
    </ag-grid-vue>
</template>