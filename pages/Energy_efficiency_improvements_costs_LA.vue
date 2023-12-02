<script setup>
const config = useRuntimeConfig();

// Fetch both average and sum of cost for energy efficiency improvements per dwelling type.
var dwelling_type_json = await useFetch(`${config.public.baseUrl}/api/Energy_efficiency_improvements_costs_LA/dwelling_type`, {
  transform: (response) => {
    if(response.sum) {
      // Convert each sum to be displayed in millions.
      for (const item of response.sum) {
        item[1] = item[1] / 1000000;
      }
    }
    return response;
  }
});

dwelling_type_json = dwelling_type_json.data.value;

// Percentage title.
const average_cost_of_ee_per_dwelling_type_title = "Breakdown of average energy efficiency improvement costs per dwelling type (%)";
// Figure title.
const sum_cost_of_ee_per_dwelling_type_title = "Breakdown of overall energy efficiency improvement costs per dwelling type (£Million)";

// Fetch both average and sum of cost for energy efficiency improvements per heating type.
var heating_type_json = await useFetch(`${config.public.baseUrl}/api/Energy_efficiency_improvements_costs_LA/heating_type`, {
  transform: (response) => {
    if(response.sum) {
      // Convert each sum to be displayed in millions.
      for (const item of response.sum) {
        item[1] = item[1] / 1000000;
      }
    }
    return response;
  }
});

heating_type_json = heating_type_json.data.value;

// Percentage title.
const average_cost_of_ee_per_heating_type_title = "Breakdown of average energy efficiency improvement costs per heating type (%)";
// Figure title.
const sum_cost_of_ee_per_heating_type_title = "Breakdown of overall energy efficiency improvement costs per heating type (£Million)";

</script>
<template>
  <div>
    <PieChart
      :title=average_cost_of_ee_per_dwelling_type_title
      :data=dwelling_type_json.average
      :asPercentage=true
    />
  </div>
  <div>
    <PieChart
      :title=sum_cost_of_ee_per_dwelling_type_title
      :data=dwelling_type_json.sum
      :asPercentage=false
    />
  </div>
  <div>
    <PieChart
      :title=average_cost_of_ee_per_heating_type_title
      :data=heating_type_json.average
      :asPercentage=true
    />
  </div>
  <div>
    <PieChart
      :title=sum_cost_of_ee_per_heating_type_title
      :data=heating_type_json.sum
      :asPercentage=false
    />
  </div>
</template>