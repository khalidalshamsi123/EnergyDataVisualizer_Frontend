<template>
    <BarChart :title="title" :data="data" :max="max" :legend="legend_data"/>
</template>

<script setup>
// Uses Nuxt 3s in-built useFetch method to fetch data from the API. This is done before page load, SSR.
const json = await useFetch('http://127.0.0.1:8000/api/Thermal_characteristics');
// Extract the data from the response.
let data = json.data.value;

const title = "Annual heat demand before and after energy efficiency improvements (kWh)";
const max = data.max;
const legend_data = ['Before', 'After']
</script>
