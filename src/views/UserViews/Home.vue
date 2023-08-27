<script lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted, ref, computed } from "vue";

import ViewPerformanceHistoryRenderer from '@/components/ViewPerformanceHistoryRenderer.vue'
import InvestRenderer from '@/components/InvestRenderer.vue'
import { getFundList } from '@/composables'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Home',
    components: {
        AgGridVue,
        // eslint-disable-next-line vue/no-unused-components
        ViewPerformanceHistoryRenderer,
        // eslint-disable-next-line vue/no-unused-components
        InvestRenderer
    },
    setup() {
        const gridApi: any = ref(null);

        const onGridReady = (params: any) => {
            gridApi.value = params.api;
            params.api.sizeColumnsToFit();
        };

        const columnDefs = reactive({
            value: [
                { field: "index", headerName: '#', maxWidth: 100, filter: false, sortable: false },
                { field: "name", headerName: 'Fund Name' },
                { field: "investment_type", headerName: 'Investment Type' },
                { field: "net_asset_value", headerName: 'Net Asset Value (RM)', type: 'numericColumn' },
                {
                    maxWidth: 120, filter: false, sortable: false, cellStyle: { textAlign: 'center' },
                    cellRenderer: ViewPerformanceHistoryRenderer
                },
                {
                    maxWidth: 120, filter: false, sortable: false, cellStyle: { textAlign: 'center' },
                    cellRenderer: InvestRenderer
                }
            ]
        })

        const defaultColDef = {
            sortable: true,
            filter: true,
            flex: 1
        };

        let { fundList, load } = getFundList()

        onMounted(() => {
            load()
        })

        const updatedFundList = computed(() => {
            return fundList.value
                .map((obj: any, i: number) => ({ ...obj, index: ++i }))
        })

        return {
            onGridReady,
            columnDefs,
            fundList: updatedFundList,
            defaultColDef,
        };
    },
};
</script>


<template>
    <h2 class="text-center mb-5">Fund List</h2>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px;" :columnDefs="columnDefs.value" :rowData="fundList"
        :defaultColDef="defaultColDef" animateRows="true" @grid-ready="onGridReady" :pagination="true"
        :paginationPageSize="10">
    </ag-grid-vue>
</template>