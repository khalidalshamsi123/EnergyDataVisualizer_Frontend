<template>
   <svg id="pie-chart-container" width = "400" height = "500"></svg>
  </template>
<script setup lang="ts">
import * as d3 from "d3";

const json = await useFetch("http://127.0.0.1:8000/api/");
const data = json.data.value;

const getValue = (d, column_name) => {
    // d is json object
    // Loop over keys of object.
    let object_keys = Object.keys(d);
    for (let key of object_keys) {
        if(key.includes(column_name)) {
            return d[key];
        }
    }
    // If no key matches.
    return null;
}

const column_names = ["gas boiler", "oil boiler", "resistance heating", "biomass boiler"]
// Mounted
onMounted(() => {
    const averageCosts = column_names.map(column_name => {
            const values = data
                // We then return an array of the heat demand values for the current heating type
                .map((d) => {
                    return getValue(d, column_name)
                });
            // These values are then passed to the d3.mean function, which returns the average.
            // This average is then returned as an object with the heating type and average.
            // The object is stored in the map created by the heatingTypes.map function.
            return {
                column_name,
                average: d3.mean(values),
            };
    });

//    Update the pie chart
var angleGen = d3.pie()
    .value((d) => d.average);

var graphData = angleGen(averageCosts);

var arcGen = d3.arc()
    .innerRadius(0)
    .outerRadius(90);



var colorScale = d3.scaleOrdinal(["red","green","blue","purple"]);

d3.select("#pie-chart-container")
    .append("g")
    .attr("transform", "translate(100,100)");

d3.select("#pie-chart-container g")
    .selectAll("path")
    .data(graphData)
    .enter()
    .append("path")
    .attr("d", arcGen)
    .attr("fill", (d) => colorScale(d.value))
    .attr("stroke", "gray")
    .attr("stroke-width", 1);
});
</script>
  








