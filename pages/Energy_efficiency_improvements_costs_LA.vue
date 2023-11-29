<script setup>
const config = useRuntimeConfig();

// Populate tile and data variables.
const json = await useFetch(`${config.public.baseUrl}/api/Energy_efficiency_improvements_costs_LA`);
const title = "Breakdown of energy effciency improvment costs by dwelling type (£)";

</script>
<template>
  <div>
    <PieChart
      :title=title
      :data=json
    />
  </div>
</template>