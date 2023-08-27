<script lang="ts">
import { AgGridVue } from "ag-grid-vue3";
import { reactive, onMounted, ref, computed } from "vue";

import { getPortfolioDetails } from '@/composables'

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Portfolio',
    components: {
        AgGridVue,
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
                { field: "fund.name", headerName: 'Fund Name' },
                { field: "fund.net_asset_value", headerName: 'Net Asset Value (RM)', type: 'numericColumn' },
                { field: "purchased_unit", headerName: 'Units', type: 'numericColumn' },
                { field: "total_amount", headerName: 'Total Amount (RM)', type: 'numericColumn' },
                { field: "transaction_date", headerName: 'Date' },
            ]
        })

        const defaultColDef = {
            sortable: true,
            filter: true,
            flex: 1
        };

        let { portfolioDetails, load } = getPortfolioDetails()

        onMounted(() => {
            load()
        })

        const updatedportfolioDetails: any = computed(() => {
            return {
                ...portfolioDetails.value,
                investment: portfolioDetails.value.investment
                    .map((obj: any, i: number) => ({ ...obj, index: ++i, transaction_date: new Date(obj.transaction_date).toDateString() }))
            }
        })

        return {
            onGridReady,
            columnDefs,
            portfolioDetails: updatedportfolioDetails,
            defaultColDef,
        };
    },
};
</script>


<template>
    <h2 class="text-center mb-5">My Portfolio</h2>
    <div class="d-flex">
        <h5 class="ms-auto fw-bold">Grand Total: RM {{ portfolioDetails.grand_total }}</h5>
    </div>
    <ag-grid-vue class="ag-theme-alpine" style="height: 500px;" :columnDefs="columnDefs.value"
        :rowData="portfolioDetails.investment" :defaultColDef="defaultColDef" rowSelection="multiple" animateRows="true"
        @grid-ready="onGridReady" :pagination="true" :paginationPageSize="10">
    </ag-grid-vue>
</template>