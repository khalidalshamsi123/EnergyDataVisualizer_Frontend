<script setup>
const config = useRuntimeConfig();

// Fetch both average and sum of data for the usage of each heating type before energy efficiency improvements.
var heating_type_json = await useFetch(`${config.public.baseUrl}/api/Annual_heat_demand_LSOA/heating_type/before`, {
  transform: (response) => {
    if(response.sum) {
      // Convert each sum to gigawatt hours from kilowatt hours.
      for (const item of response.sum) {
        item[1] = item[1] / 1000000;
      }
    }
    return response;
  }
});

heating_type_json = heating_type_json.data.value;

// Percentage title.
const average_heat_demand_per_heating_type_title = "Breakdown of average heat demand per heating technology (%)";
// Figure title.
const sum_heat_demand_per_heating_type_title = "Breakdown of overall heat demand per heating technology (GWh)";

// Fetch both average and sum of data for energy usage across different dwelling types before energy efficiency improvements.
var dwelling_type_json = await useFetch(`${config.public.baseUrl}/api/Annual_heat_demand_LSOA/dwelling_type/before`, {
  transform: (response) => {
    if(response.sum) {
      // Convert each sum to gigawatt hours from kilowatt hours.
      for (const item of response.sum) {
        item[1] = item[1] / 1000000;
      }
    }
    return response;
  }
});

dwelling_type_json = dwelling_type_json.data.value;

// Percentage title.
const average_heat_demand_per_dwelling_type_title = "Breakdown of average heat demand by dwelling type (%)";
// Figure title.
const sum_heat_demand_per_dwelling_type_title = "Breakdown of overall heat demand per dwelling type (GWh)";

</script>
<template>
  <div>
    <PieChart
      :title=average_heat_demand_per_heating_type_title
      :data=heating_type_json.average
      :asPercentage=true
    />
  </div>
  <div>
    <PieChart
      :title=sum_heat_demand_per_heating_type_title
      :data=heating_type_json.sum
      :asPercentage=false
    /> 
  </div>
  <div>
    <PieChart
      :title=average_heat_demand_per_dwelling_type_title
      :data=dwelling_type_json.average
      :asPercentage=true
    /> 
  </div>
  <div>
    <PieChart
      :title=sum_heat_demand_per_dwelling_type_title
      :data=dwelling_type_json.sum
      :asPercentage=false
    /> 
  </div>
</template>