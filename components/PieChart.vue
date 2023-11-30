<template>
    <div>
      <Pie
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </template>
<script setup>
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend, Colors } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Pie } from 'vue-chartjs';

const props = defineProps({
    title: String,
    data: Object,
    asPercentage: Boolean 
});

// Take title and JSON data passed into the component.
const title = props.title;
const json = props.data;
const jsonData = json.data.value;

const data = [];
const labels = [];

if(props.asPercentage) {
  var sum = 0;

  jsonData.forEach((item) => {
    sum += item[1];
  });

  for (const item of jsonData) {
    let percentage = (item[1] / sum) * 100;
    percentage = Math.round((percentage + Number.EPSILON) * 100) / 100;
    data.push(percentage);
    // Capitalise first letter of label.
    let label = item[0].charAt(0).toUpperCase() + item[0].slice(1);
    labels.push(label);
  }
} else {
  for (const item of jsonData) {
    data.push(item[1]);
    // Capitalise first letter of label.
    let label = item[0].charAt(0).toUpperCase() + item[0].slice(1);
    labels.push(label);
  }
}

// Register
ChartJS.register(ArcElement, Title, Tooltip, Legend, Colors, ChartDataLabels);

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
    datalabels: {
      formatter: function(value, context) {
        return value + '%';
      }
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem, data) {
          let label = tooltipItem.yLabel + "%";
          return label;
        }
      }
    },
    title: {
      display: true,
      text: title
    }
  }
})
</script>