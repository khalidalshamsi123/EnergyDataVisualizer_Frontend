<template>
    <div>
        <Bar :data="chartData" :opions="chartOptions" />
    </div>
</template>

<script setup>
import { Chart as ChartJS, Title, Tooltip, Legend, Colors } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'vue-chartjs';

const props = defineProps({
    title: String,
    data: Object,
    max: Number
});

// Register.
ChartJS.register(Title, Tooltip, Legend, Colors, ChartDataLabels);

const datasets = props.data.datasets;

const labels = [];
if (datasets.length == 0) {
    throw new Error("No data found for bar chart to render.");
}

const chart_datasets = [];

if (datasets.length > 1) {
    // Multiple datasets, construct datasets object for chart. Creates a clustered bar chart.
    console.log("Multiple datasets")
    for (const dataset of datasets) {
        console.log(dataset);
        const numeric_values_from_individual_dataset = [];
        // Loop over each item in dataset getting the label and numeric value. Using the indexes as opposed to the keys as the keys are not consistent.
        // Object.keys(dataset).forEach((key, i) => {
        //     console.log(key + " " + i);
        //     // const item = dataset[key];
        //     // console.log(item);
        //     // labels.push(item[0]);
        //     // numeric_values_from_individual_dataset.push(item[1]);
        // });
        datasets.push(numeric_values_from_individual_dataset);
    }
} else {
    // Single dataset, construct datasets object for chart. Creates a standard bar chart.
    const numeric_values_from_individual_dataset = [];
    for (const value of props.datasets[0][1]) {
        labels.push(value[0]);
        numeric_values_from_individual_dataset.push(value[1]);
    }
    datasets.push(numeric_values_from_individual_dataset);
}

const chartData = ref({
    labels,
    datasets: datasets
})

var chartOptions = ref({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        colors: {
            enabled: true
        },
        legend: {
            enabled: true,
            position: 'bottom',
        },
        title: {
            display: true,
            text: title
        },
        datalabels: {
            align: 'center',
            font: {
                weight: 'bold',
                size: 14
            }
        }
    }
})

</script>