<template>
  <div>
    <!--{{ data }}-->
    <div id="container"></div>
  </div>
</template>

<script setup>
//creating the graph
import * as d3 from "d3";

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

// let min = Infinity;
// let max = -Infinity;
let array = [];

for (var item of data.value) {
  array.push(item.Normalised_ASHP_heat);
  array.push(item.Normalised_Resistance_heater_heat);
}

var minAndMax = d3.extent(array);

onMounted(() => {
  // Declare the chart dimensions and margins.
  const width = 840;
  const height = 550;
  const svgHeight = 1000;
  const svgWidth = 900;
  const marginTop = 30;
  const marginRight = 20;
  const marginBottom = 170;
  const marginLeft = 50;

  // Declare the x (horizontal position) scale.
  const x = d3
    .scaleUtc()
    .domain(d3.extent(resistanceHeaterHeatData, (d) => d.date))
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain(minAndMax)
    .range([height - marginBottom, marginTop]);

  //y.ticks(10);

  // Create the SVG container.
  const svg = d3
    .create("svg")
    .attr("id", "d3-target")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

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
  y.domain(minAndMax);

  // Create the line generator
  const line = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  const line2 = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  // Create the line path
  const linePath = line(resistanceHeaterHeatData);
  const linePath2 = line2(ashpHeatData);

  //making the area under the graph transparent
  svg.style("fill", "transparent");

  // Add the line path to the SVG element
  svg
    .append("path")
    .datum(resistanceHeaterHeatData)
    .attr("d", linePath)
    .attr("stroke", "red");
  svg
    .append("path")
    .datum(ashpHeatData)
    .attr("d", linePath2)
    .attr("stroke", "blue");

  //adding a legend
  const legendGroup = svg
    .append("g")
    .attr("class", "legend")
    .attr("transform", `translate(${width / 2 - 5}, ${height - marginBottom + 40})`);

  const legendEntries = [
    {
      data: resistanceHeaterHeatData,
      color: "red",
      label: "Resistance Heater Heat",
    },
    {
      data: ashpHeatData,
      color: "blue",
      label: "ASHP Heat",
    },
  ];

  let yOffset = 0;
  for (const entry of legendEntries) {
    const legendEntry = legendGroup
      .append("g")
      .attr("transform", `translate(0, ${yOffset})`);

    const colorSwatch = legendEntry
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", entry.color);

    const labelText = legendEntry
      .append("text")
      .attr("x", 25)
      .attr("y", 10)
      .attr("text-anchor", "start") // Position the text to the right of the color swatch
      .attr('fill', 'black') // the colour of the text
      .style("font-size", "10px") //the size of the text
      .text(entry.label);

    yOffset += 25;
  }
  // Update the axes
  svg.select(".x-axis").call(d3.axisBottom(x));
  svg.select(".y-axis").call(d3.axisLeft(y));

  // Add the SVG element to the DOM.
  const container = d3.select("#container");
  container.node().append(svg.node());
});
</script>

<style scoped></style>
