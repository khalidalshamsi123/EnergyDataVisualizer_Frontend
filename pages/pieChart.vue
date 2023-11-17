<template>
    <svg id="pie-chart-container" width = "400" height = "500"></svg>
   </template>
 <script setup lang="ts">
 import * as d3 from "d3";
 
 const json = await useFetch("http://127.0.0.1:8000/api/piechart/");
 const data = json.data.value;
 
 const column_names = ["gas boiler", "oil boiler", "resistance heating", "biomass boiler"]
 
 // Mounted
 onMounted(() => {
    // If there is no data, do nothing.
    if(!data) {
        return;
    }
 //    Update the pie chart
 var angleGen = d3.pie()
     .value((d) => d[1]);
 
 var graphData = angleGen(data);
 
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
     .attr("fill", (d) => colorScale(d))
     .attr("stroke", "gray")
     .attr("stroke-width", 1);
 });
 </script>
   
 
 
 
 
 
 
 
 
 