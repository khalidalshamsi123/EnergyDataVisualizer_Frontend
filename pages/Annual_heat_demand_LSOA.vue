<script setup>
const config = useRuntimeConfig();

// Populate tile and data variables.
const json = await useFetch(`${config.public.baseUrl}/api/Annual_heat_demand_LSOA/average/heating_type`);
const title = "Breakdown of heat demand by heating technology (%)";

</script>
<template>
  <div>
    <PieChart
      :title=title
      :data=json
      :asPercentage=true
    />
  </div>
</template>