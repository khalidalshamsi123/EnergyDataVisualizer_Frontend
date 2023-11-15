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
data.value.forEach((item) => {
  console.log(item["Normalised_Resistance_heater_heat"]);
});

//console logging the data
console.log(data.value);
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
    .domain([new Date("2023-01-01"), new Date("2024-01-01")])
    .range([marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3
    .scaleLinear()
    .domain([0, 100])
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

  // Prepare the data
  const data = [
    { date: new Date("2023-01-01"), value: 10 },
    { date: new Date("2023-02-01"), value: 20 },
    { date: new Date("2023-03-01"), value: 30 },
    { date: new Date("2023-04-01"), value: 40 },
    { date: new Date("2023-05-01"), value: 50 },
  ];

  const data2 = [
    { date: new Date("2023-01-01"), value: 10 },
    { date: new Date("2023-02-01"), value: 30 },
    { date: new Date("2023-03-01"), value: 30 },
    { date: new Date("2023-04-01"), value: 45 },
    { date: new Date("2023-05-01"), value: 50 },
    { date: new Date("2023-06-01"), value: 60 },
    { date: new Date("2023-07-01"), value: 70 },
    { date: new Date("2023-08-01"), value: 80 },
    { date: new Date("2023-09-01"), value: 90 },
  ];

  // Update the data domain
  x.domain(d3.extent(data, (d) => d.date));
  y.domain(d3.extent(data, (d) => d.value));

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
  const linePath = line(data);
  const linePath2 = line2(data2);

  //making the area under the graph transparent
  svg.style("fill", "transparent");

  // Add the line path to the SVG element
  svg.append("path").datum(data).attr("d", linePath).attr("stroke", "red");
  svg.append("path").datum(data2).attr("d", linePath2).attr("stroke", "blue");

  // Update the axes
  svg.select(".x-axis").call(d3.axisBottom(x));
  svg.select(".y-axis").call(d3.axisLeft(y));

  // Add the SVG element to the DOM.
  const container = d3.select("#container");
  container.node().append(svg.node());
});
</script>

<style scoped></style>
