<template>
    <div id="container" class="flex justify-center items-center h-screen">
        <h1 class="text-4xl font-bold text-center">Hello, world!</h1>
        <!-- <svg id="bar-chart"></svg> -->
    </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';

try {
    // Uses Nuxt 3s in-built useFetch method to fetch data from the API. This is done before page load, SSR.
    const json = await useFetch('http://127.0.0.1:8000/api/bar-chart');
    // Extract the data from the response.
    let data = json.data.value;
    
    // Mounted
    onMounted(() => {
        // Extract unique heating technology types. This will be used for the x-axis.
        // This work will probably be pushed to the backend in the future.
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        const heatingTypes = [...new Set([...data.thermal_characteristics_after_ee, ...data.thermal_characteristics_before_ee].map(d => d["Heating systems"]))];

        const averagesBeforeEE = heatingTypes.map(heatingType => {
            const values = data.thermal_characteristics_before_ee
                // We filter out all the data not relating to the current heating type.
                .filter(d => d["Heating systems"] === heatingType)
                // We then return an array of the heat demand values for the current heating type
                .map(d => d["Average annual heat demand kWh"]);
            // These values are then passed to the d3.mean function, which returns the average.
            // This average is then returned as an object with the heating type and average.
            // The object is stored in the map created by the heatingTypes.map function.
            return {
                heatingType,
                average: d3.mean(values),
            };
        });

        // Same premise as above.
        const averagesAfterEE = heatingTypes.map(heatingType => {
            const values = data.thermal_characteristics_after_ee
                .filter(d => d["Heating systems"] === heatingType)
                .map(d => d["Average annual heat demand kWh"]);

            return {
                heatingType,
                average: d3.mean(values),
            };
        });

        // Set up SVG container.
        const svgWidth = 800;
        const svgHeight = 400;
        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const width = svgWidth - margin.left - margin.right;
        const height = svgHeight - margin.top - margin.bottom;

        // Get the maximum annual heat demand figures from both datasets.
        const beforeMax = d3.max(data.thermal_characteristics_before_ee, d => d["Average annual heat demand kWh"]);
        const afterMax = d3.max(data.thermal_characteristics_after_ee, d => d["Average annual heat demand kWh"]);

        // Create SVG container.
        const svg = d3.select("#container")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight)
            .append("g")
            // Move the SVG container to the top-left margin.
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Define scales. 
        // A band scale is used for the x-axis, since we are dealing with categorical data. 
        const xScale = d3.scaleBand()
            .domain(heatingTypes)
            .range([0, width])
            .padding(0.1);

        // Set the domain of the y-axis scale based on the maximum average value out of the two datasets.
        // i.e., before and after.
        // A linear scale is used because we are dealing with continuous data.
        const yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max([beforeMax, afterMax])]);

        // Draw x-axis using the band scale.
        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale));

        // Draw y-axis using the linear scale.
        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Draw bars for thermal_characteristics_before_ee csv.
        // Select all elements with class bar-before, and bind the data to it.
        svg.selectAll(".bar-before")
            .data(averagesBeforeEE)
            // For each new data point, create a rect (rectangle) element.
            .enter().append("rect")
            .attr("class", "bar-before")
            // Set the x-position of the bars based on the heating system type.
            .attr("x", d => xScale(d.heatingType))
            // Set the y-position of the bars based on the average annual heat demand for the heating technology.
            .attr("y", d => yScale(d.average))
            // Set the width of the bars to half of the bandwidth for clustering. Makes it easier to read.
            .attr("width", xScale.bandwidth() / 2)
            // Set the height of the bar using the average annual heat demand.
            .attr("height", d => height - yScale(d.average))
            // Style bars with red colour for 'before' energy efficiency improvements.
            .style("fill", "red");

        // Draw bars for thermal_characteristics_after_ee csv.
        svg.selectAll(".bar-after")
            .data(averagesAfterEE)
            .enter().append("rect")
            .attr("class", "bar-after")
            .attr("x", d => xScale(d.heatingType) + xScale.bandwidth() / 2)
            .attr("y", d => yScale(d.average))
            .attr("width", xScale.bandwidth() / 2)
            .attr("height", d => height - yScale(d.average))
            // Style green for 'after' energy efficiency improvements.
            .style("fill", "green"); 

        // TODO. Add legend.
    });
} catch (error) {
    console.log(error);
}
</script>

<style>
/* Import Tailwind CSS */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
