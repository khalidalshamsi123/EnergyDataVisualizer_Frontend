<template>
  <div>
    <!--{{ data }}-->
    <div id="container"></div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig();

//fetching the data from the API
const { data: data, error } = await useFetch(
  `${config.public.baseUrl}/api/line-graph`
);

//testing, to fetch the values of 'normalised_resistance'
//After Fetching the API data this code, iterates over the data array
//and fetch the value of "Normalised_Resistance_heater_heat" and find the 'index'
const resistanceHeaterHeatData = data.value.map((item) => {
  return {
    date: new Date(item.index),
    value: item.Normalised_Resistance_heater_heat
  };
});

//console logging the data
console.log(resistanceHeaterHeatData);
console.log(error.value);

//creating the graph
import * as d3 from "d3";

onMounted(() => {
  console.log("mounted");

  // Declare the chart dimensions and margins.
  const width = 840;
  const height = 400;
  const marginTop = 20;
  const marginRight = 20;
  const marginBottom = 30;
  const marginLeft = 50;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleUtc()
    .domain(d3.extent(resistanceHeaterHeatData, (d) => d.date))
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain(d3.extent(resistanceHeaterHeatData, (d) => d.value))
    .range([height - marginBottom, marginTop]);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("id", "d3-target")
    .attr("width", width)
    .attr("height", height);

  // Add the x-axis.
  svg
    .append("g")
    .attr("transform", `translate(0,${height - marginBottom})`)
    .call(d3.axisBottom(x));

  // Add the y-axis.
  svg
    .append("g")
    .attr("transform", `translate(${marginLeft},0)`)
    .call(d3.axisLeft(y));

  // Update the data domain
  x.domain(d3.extent(resistanceHeaterHeatData, (d) => d.date));
  y.domain(d3.extent(resistanceHeaterHeatData, (d) => d.value));

  // Create the line generator
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  // const line2 = d3
  //   .line()
  //   .x((d) => x(d.date))
  //   .y((d) => y(d.value));

  // Create the line path
  const linePath = line(resistanceHeaterHeatData);
  // const linePath2 = line2(data2);

  //making the area under the graph transparent
  svg.style("fill", "transparent");

  // Add the line path to the SVG element
  svg.append("path").datum(resistanceHeaterHeatData).attr("d", linePath).attr("stroke", "red");
  // svg.append("path").datum(data2).attr("d", linePath2).attr("stroke", "blue");

  // Update the axes
  svg.select(".x-axis").call(d3.axisBottom(x));
  svg.select(".y-axis").call(d3.axisLeft(y));

  // Add the SVG element to the DOM.
  const container = d3.select("#container");
  container.node().append(svg.node());
});
</script>

<style scoped></style>
