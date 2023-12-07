<template>
    <div>
      <Pie
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </template>
<script setup>
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, Colors } from 'chart.js'
import { Pie } from 'vue-chartjs'

const props = defineProps({
    title: String,
    data: Object
});

// Take title and JSON data passed into the component.
const title = props.title;
const json = props.data;
const jsonData = json.data.value;

const data = [];
const labels = [];

for (const item of jsonData) {
  data.push(item[1]);
  // Capitalise first letter of label.
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
      text: title
    }
  }
})
</script>