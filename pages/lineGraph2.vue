<template>
  <div>
    <h1>Hello</h1>
    <canvas id="myChart" style="width: 100%; max-width: 700px"></canvas>
  </div>
</template>

<script setup>
import Chart from "chart.js/auto";
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

const xValues = resistanceHeaterHeatData.map((item) => item.date);
const xMonthValues = xValues.map((date) =>
  date.toLocaleString("en-US", { month: "short" })
);

const yValues = resistanceHeaterHeatData.map((item) => item.value);

new Chart("myChart", {
  type: "line",
  data: {
    labels: xMonthValues,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        pointRadius: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.1)",
        data: yValues,
        label: "Resistance Heater heat"
      },
      {
        fill: false,
        lineTension: 0,
        pointRadius: 0,
        backgroundColor: "rgba(255,0,0,1.0)",
        borderColor: "rgba(255,0,0,0.1)",
        data: ashpHeatData.map((item) => item.value),
        label: "ASHP Heat"
      },
      {
        fill: false,
        lineTension: 0,
        pointRadius: 0,
        backgroundColor: "rgba(0,128,0,1.0)",
        borderColor: "rgba(0,128,0,0.1)",
        data: gshpHeatData.map((item) => item.value),
        label: "GSHP Heat"
      },
      {
        fill: false,
        lineTension: 0,
        pointRadius: 0,
        backgroundColor: "rgba(128,0,128,1.0)",
        borderColor: "rgba(128,0,128,0.1)",
        data: gasBoilerHeatData.map((item) => item.value),
        label: "Gas Boiler Heat"
      }
      
    ],
  },
  options: {
    legend: { display: true },
    scales: {
      xAxes: [{ type: "category" }],
      yAxes: [{ ticks: { min: Math.min(...yValues), max: 16 } }],
    },
    plugins: {
    tooltips: {
      mode: "custom",
      intersect: false,
      position: "nearest",
      callbacks: {
        label: function (tooltipItem) {
          const originalValue = tooltipItem.yLabel;
          const formattedValue = originalValue.toFixed(8);
          return `Original: ${originalValue}, Formatted: ${formattedValue}`;
        },
      },
    },
  },
    animation: true,
    spanGaps: true,
    showLine: true,
  },
});
</script>

<style lang="scss" scoped></style>
