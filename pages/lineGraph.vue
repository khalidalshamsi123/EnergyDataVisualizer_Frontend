<template>
  <div>
    <!--{{ data }}-->
    <div id="container"></div>
    <div id="overlay"></div>
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

let array = [];
//containing all the data in the array
for (var item of data.value) {
  array.push(item.Normalised_ASHP_heat);
  array.push(item.Normalised_Resistance_heater_heat);
  array.push(item.Normalised_GSHP_heat);
  array.push(item.Normalised_Gas_boiler_heat);
}

//using D3 to find the minimum and maximum values of the array.
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

  const line3 = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  const line4 = d3
    .line()
    .x((d) => x(d.date))
    .y((d) => y(d.value));

  // Create the line path
  const linePath = line(resistanceHeaterHeatData);
  const linePath2 = line2(ashpHeatData);
  const linePath3 = line3(gshpHeatData);
  const linePath4 = line4(gasBoilerHeatData);

  //making the area under the graph transparent
  svg.style("fill", "transparent");

  // Add the line path to the SVG element
  svg
    .append("path")
    .datum(gasBoilerHeatData)
    .attr("d", linePath4)
    .attr("stroke", "red");

  svg
    .append("path")
    .datum(resistanceHeaterHeatData)
    .attr("d", linePath)
    .attr("stroke", "orange");

  svg
    .append("path")
    .datum(ashpHeatData)
    .attr("d", linePath2)
    .attr("stroke", "yellow");

  svg
    .append("path")
    .datum(gshpHeatData)
    .attr("d", linePath3)
    .attr("stroke", "green");

  //adding a legend
  const legendGroup = svg
    .append("g")
    .attr("class", "legend")
    .attr(
      "transform",
      `translate(${width / 2 + 80}, ${height - marginBottom + 30})`
    );

  const legendEntries = [
    {
      data: gasBoilerHeatData,
      color: "Red",
      label: "Gas Boiler Heat",
    },
    {
      data: resistanceHeaterHeatData,
      color: "Orange",
      label: "Resistance Heater Heat",
    },
    {
      data: ashpHeatData,
      color: "yellow",
      label: "ASHP Heat",
    },
    {
      data: gshpHeatData,
      color: "green",
      label: "GSHP Heat",
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
      .attr("fill", "black") // the colour of the text
      .style("font-size", "10px") //the size of the text
      .text(entry.label);

    yOffset += 25;
  }
  // Update the axes
  svg.select(".x-axis").call(d3.axisBottom(x));
  svg.select(".y-axis").call(d3.axisLeft(y));

  //adding a title
  const title = svg
    .append("text")
    //.attr("x", width / 2 - 110)
    .attr("y", marginTop / 2)
    .attr("fill", "black")
    .style("font-size", "18px")
    .style("font-weight", "bold")
    .text("Heat Output Comparison");

  // Add x-axis title
  const xAxisTitle = svg
    .append("text")
    .attr("x", width / 2)
    .attr("y", height - 120) // Position below the x-axis
    .attr("fill", "black")
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("text-anchor", "middle") // Center the text
    .text("(Date)");

  // Add y-axis title
  const yAxisTitle = svg
    .append("text")
    .attr("x", marginLeft - 30) // Position to the left of the y-axis
    .attr("y", height / 2) // Center vertically
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("text-anchor", "middle") // Center the text
    .text("Heat Output (Normalized)");

  //The creation of the ToolTip
  const overlay = d3
    .select("#overlay")
    .style("position", "absolute")
    .style("width", svgWidth + "px")
    .style("height", svgHeight + "px")
    .style("background-color", "transparent")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .on("mousemove", handleMouseMove);

  function handleMouseOver() {
    // Show the tooltip on mouseover
    tooltip.style("display", "block");
  }

  function handleMouseOut() {
    // Hide the tooltip on mouseout
    tooltip.style("display", "none");
  }

  function handleMouseMove(event) {
    // Update tooltip position based on mouse coordinates
    const [x, y] = d3.pointer(event);
    tooltip.style("transform", `translate(${x}px, ${y}px)`);
  }

  // Create a tooltip
  const tooltip = d3
    .select("#container")
    .append("div")
    .style("position", "absolute")
    .style("padding", "10px")
    .style("background-color", "white")
    .style("border", "1px solid #ddd")
    .style("border-radius", "5px")
    .style("display", "none")
    .style("font-size", "12px")
    .style("left", "14%") // Center horizontally
    .style("top", "47%") // Center vertically
    .style("transform", "translate(-50%, -50%)");

  // (ToolTip) Add data points to the line paths
  svg
    .selectAll(".data-point")
    .data(data.value)
    .enter()
    .append("circle")
    .attr("class", "data-point")
    .attr("cx", (d) => x(new Date(d.index)))
    .attr("cy", (d) =>
      y(
        d.Normalised_Resistance_heater_heat,
        d.Normalised_Gas_boiler_heat,
        d.Normalised_ASHP_heat,
        d.Normalised_GSHP_heat
      )
    )
    .attr("r", 5)
    .style("fill", "transparent")
    .on("mouseover", showDataPointTooltip)
    .on("mouseout", hideDataPointTooltip);

  function showDataPointTooltip(event, d) {
    // Show tooltip with data point information
    const tooltipContent = `Date: ${new Date(d.index).toLocaleDateString()}
    <br/>Gas Boiler Heat: ${d.Normalised_Gas_boiler_heat.toFixed(7)}
    <br/>Resistance Heater Heat: ${d.Normalised_Resistance_heater_heat.toFixed(
      7
    )}
    <br/>ASHP Heat: ${d.Normalised_ASHP_heat.toFixed(7)} 
    <br/>GSHP Heat: ${d.Normalised_GSHP_heat.toFixed(7)}`;
    tooltip.html(tooltipContent);
    tooltip.style("display", "block");
  }

  function hideDataPointTooltip() {
    // Hide tooltip on mouseout
    tooltip.style("display", "none");
  }

  // Add the SVG element to the DOM.
  const container = d3.select("#container");
  container.node().append(svg.node());
});
</script>

<style scoped>
/* Add styles for the tooltip */
#container {
  position: relative;
}

#overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: transparent;
}

.data-point {
  stroke: steelblue;
  stroke-width: 2px;
  fill: transparent;
}
</style>
