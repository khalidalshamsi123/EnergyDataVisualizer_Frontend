<script setup>
const config = useRuntimeConfig();

// Specific data we want to fetch from the API.
// The 'filter' field is used to understand what column data we want to use in the calculations.
const data_required = [
  { "filter": "heating_type" },
  { "filter": "dwelling_type" }
];

// Fetch the data from the API.
var jsonData = await useFetch(`${config.public.baseUrl}/api/Energy_efficiency_improvements_costs_LA`, {
  method: 'post',
  body: JSON.stringify(data_required),
  transform: (response) => {
    for (const key in response) {
      for (const item of response[key]['sum']) {
        // In this instance we know the sum is typically greater than £1 million.
        // So we convert each sum to be in millions.
        item[1] = item[1] / 1000000;
      }
    }
    // Array of objects containing the data for each chart.
    return response;
  }
});

jsonData = jsonData.data.value;

// Array of configuration objects for each chart. Each object contains the chart title, and whether the data should be displayed as a percentage.
// The data each chart should use is added to each object in the loop below.
const chartConfigurations = [
  // Before.
  { type: 'heating_type', title: 'Breakdown of average heat demand per heating technology before energy efficiency improvements (%)', asPercentage: true },
  { type: 'heating_type', title: 'Breakdown of overall energy efficiency improvement costs per dwelling type (£Million)', asPercentage: false },
  { type: 'dwelling_type', title: 'Breakdown of average energy efficiency improvement costs per heating type (%)', asPercentage: true },
  { type: 'dwelling_type', title: 'Breakdown of overall energy efficiency improvement costs per heating type (£Million)', asPercentage: false },
];

// Loop over chartConfiguration and add data as a field to each object based on matching type.
// Whether the sum or average is used for data depends on the asPercentage field.
for (const config of chartConfigurations) {
  // Check if the jsonData object has the required data for the current chart.
  if(jsonData.hasOwnProperty(`${config.type}`)) {
    var chart_data = jsonData[`${config.type}`];
    config.data = chart_data[config.asPercentage ? 'average' : 'sum'];
  }
}

</script>
<template>
  <div v-for="config in chartConfigurations">
    <PieChart
      :title=config.title
      :data=config.data
      :asPercentage=config.asPercentage
    />
  </div>
</template>