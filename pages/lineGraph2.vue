<template>
    <div id="chart"></div>
</template>

<script setup>
// Import Chart.js
import Chart from "chart.js";


const config = useRuntimeConfig();

//fetching the data from the API
const { data: data, error } = await useFetch(
  `${config.public.baseUrl}/api/line-graph`
);

//This iterates over the array using the map() function
//And for each object in the array, a new object is created
//with the date and value properties that are from the index and
//Normalised_Resistance_heater_heat
const resistanceHeaterHeatData = data.value.map((item) => {
  return {
    date: new Date(item.index),
    value: item.Normalised_Resistance_heater_heat,
  };
});

//Similar to the code before just different data, same date property
const ashpHeatData = data.value.map((item) => {
  return {
    date: new Date(item.index),
    value: item.Normalised_ASHP_heat,
  };
});

const gshpHeatData = data.value.map((item) => {
  return {
    date: new Date(item.index),
    value: item.Normalised_GSHP_heat,
  };
});

const gasBoilerHeatData = data.value.map((item) => {
  return {
    date: new Date(item.index),
    value: item.Normalised_Gas_boiler_heat,
  };
});

// Create the chart
const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: resistanceHeaterHeatData.map(item => item.date),
      datasets: [
        {
          label: 'Resistance Heater Heat',
          data: resistanceHeaterHeatData.map(item => item.value),
          borderColor: 'orange',
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'ASHP Heat',
          data: ashpHeatData.map(item => item.value),
          borderColor: 'yellow',
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'GSHP Heat',
          data: gshpHeatData.map(item => item.value),
          borderColor: 'green',
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
        {
          label: 'Gas Boiler Heat',
          data: gasBoilerHeatData.map(item => item.value),
          borderColor: 'red',
          borderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: 'Heat Output Comparison',
        fontSize: 18,
        fontColor: 'black',
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'day',
            displayFormats: {
              day: 'MMM DD',
            },
          },
          gridLines: {
            display: true,
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
            stepSize: 1,
          },
          gridLines: {
            display: true,
          },
        }],
      },
      legend: {
        position: 'top',
      },
    },
  });
</script>
<style lang="scss" scoped>

</style>