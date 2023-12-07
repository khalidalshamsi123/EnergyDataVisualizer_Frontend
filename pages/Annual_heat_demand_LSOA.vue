<script setup>
const config = useRuntimeConfig();

// Specific data we want to fetch from the API.
// The API selects the 'after' or 'before' data based on the 'rows' field.
// The 'filter' field is used to understand what column data we want to use in the calculations.
const data_required = [
  { "filter": "heating_type", "rows": "before" },
  { "filter": "heating_type", "rows": "after" },
  { "filter": "dwelling_type", "rows": "before" },
  { "filter": "dwelling_type", "rows": "after" }
];

// Fetch the data from the API.
var jsonData = await useFetch(`${config.public.baseUrl}/api/Annual_heat_demand_LSOA`, {
  method: 'post',
  body: JSON.stringify(data_required),
  transform: (response) => {
    for (const key in response) {
      for (const item of response[key]['sum']) {
        // In this instance we know the sum is in kilowatt hours.
        // Convert each sum to gigawatt hours from kilowatt hours.
        item[1] = item[1] / 1000000;
      }
    }
    // Array of objects containing the data for each chart.
    return response;
  }
});

// Array of configuration objects for each chart. Each object contains the chart title, and whether the data should be displayed as a percentage.
// The data each chart should use is added to each object in the loop below.
const chartConfigurations = [
  // Before.
  { type: 'heating_type', title: 'Breakdown of average heat demand per heating technology before energy efficiency improvements (%)', asPercentage: true, datasetType: 'before' },
  { type: 'heating_type', title: 'Breakdown of overall heat demand per heating technology before energy efficiency improvements (GWh)', asPercentage: false, datasetType: 'before' },
  { type: 'dwelling_type', title: 'Breakdown of average heat demand by dwelling type before energy efficiency improvements (%)', asPercentage: true, datasetType: 'before' },
  { type: 'dwelling_type', title: 'Breakdown of overall heat demand per dwelling type before energy efficiency improvements (GWh)', asPercentage: false, datasetType: 'before' },
  // After.
  { type: 'heating_type', title: 'Breakdown of average heat demand per heating technology after energy efficiency improvements (%)', asPercentage: true, datasetType: 'after' },
  { type: 'heating_type', title: 'Breakdown of overall heat demand per heating technology after energy efficiency improvements (GWh)', asPercentage: false, datasetType: 'after' },
  { type: 'dwelling_type', title: 'Breakdown of average heat demand by dwelling type after energy efficiency improvements (%)', asPercentage: true, datasetType: 'after' },
  { type: 'dwelling_type', title: 'Breakdown of overall heat demand per dwelling type after energy efficiency improvements (GWh)', asPercentage: false, datasetType: 'after' },
];

jsonData = jsonData.data.value;
// Loop over chartConfiguration and add data as a field to each object based on matching type and datasetType.
// Whether the sum or average is used depends on the asPercentage field.
for (const config of chartConfigurations) {
  // Check if the jsonData object has the required data for the current chart.
  if(jsonData.hasOwnProperty(`${config.type}:${config.datasetType}`)) {
    var chart_data = jsonData[`${config.type}:${config.datasetType}`];
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