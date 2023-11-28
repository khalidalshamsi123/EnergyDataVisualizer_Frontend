<script setup>
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, Colors } from 'chart.js'
import { Pie } from 'vue-chartjs'

//Fetch the data from the api
const json = await useFetch("http://127.0.0.1:8000/api/piechartjs/");
const jsonData = json.data.value;

const data = [];
const labels = [];

for (const item of jsonData) {
  data.push(item[1]);
  let label = item[0].charAt(0).toUpperCase() + item[0].slice(1);
  labels.push(label);
}

// Register
ChartJS.register(ArcElement, Title, Tooltip, Legend, Colors);

const chartData = ref({
  labels,
  datasets: [
    {
      data
    },
  ],
})
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {

    colors: {
      enabled : true
    },

    legend: {
      enabled : true,
      position: 'bottom',
    },
    title: {
      display: true,
      text: 'Breakdown of energy effciency improvment costs by dwelling type (£)'
    }
  }
})

</script>
<template>
  <div>
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
<style scoped lang="css"></style>