<template>
  <div>
    <h1>Hello</h1>
    <canvas id="myChart" style="width:100%;max-width:700px"></canvas>
  </div>
</template>

<script setup>
import Chart from 'chart.js/auto'
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


const xValues = resistanceHeaterHeatData.map((item) => item.date);
const xMonthValues = xValues.map((date) => date.toLocaleString("en-US", { month: "short" }));


const yValues = resistanceHeaterHeatData.map((item) => item.value);

new Chart("myChart", {
  type: "line",
  data: {
    labels: xMonthValues,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    scales: {
      xAxes: [{ type: "category" }],
      yAxes: [{ticks: {min: 1, max:16}}],
    }
  }
});
</script>

<style lang="scss" scoped>

</style>