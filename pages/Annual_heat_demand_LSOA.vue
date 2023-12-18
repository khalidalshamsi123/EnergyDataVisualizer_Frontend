<template>
    <div class="page-container bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        <div class="graph-container rounded bg-white shadow-md mb-8">
            <div v-for="option in selectedOptions">
                <template v-if="option === 'Pie Chart'">
                    <PieChart
                        v-if="pieChartData"
                        :key="pieChartData.title"
                        :title="pieChartData.title"
                        :data="pieChartData.data"
                        :as-percentage="pieChartData.asPercentage"
                    />
                </template>
                <template v-else-if="option === 'Bar Chart'">
                    <BarChart
                        v-if="barChartData"
                        :key="barChartData.title"
                        :title="barChartData.title"
                        :data="barChartData.data"
                        :max="barChartData.max"
                        :legend="barChartData.legend"
                    />
                </template>
                <template v-else-if="option === 'Geographical Map'">
                    <h2 class="text-2xl">{{ geoTitle }}</h2>
                    <GeoMap
                        v-if="geoSql && geoTitle"
                        :key="geoTitle"
                        map-name="Annual_heat_demand_LSOA"
                        lsoa-field="LSOA11CD"
                        :center="[53, -1.3]"
                        :zoom="6.5"
                        :sql="geoSql"
                    />
                </template>
                <template v-else-if="option === 'Table'">
                    <div class="w-screen max-h-screen p-4 overflow-scroll" v-if="tableFields.length > 0">
                        <DataTable table-name="Annual_heat_demand_LSOA" :fields="tableFields" />
                    </div>
                </template>
            </div>
        </div>

        <div class="flex items-start">
            <div class="filter-box bg-white rounded flex items-center w-[650px]">
                <div class="relative">
                    <div class="length-checkit-options flex">
                        <p class="text-xl font-bold ml-2 mt-2">Chart Types</p>
                        <button class="text-xl ml-auto m-4 cursor-pointer mt-2" @click="toggleDropdown">
                            {{ chartTypesDowndownOpen ? "▲" : "▼" }}
                        </button>
                    </div>

                    <div class="flex p-1 pt-0 mr-auto" v-if="chartTypesDowndownOpen">
                        <div class="before-after-options bg-white rounded p-3 h-[8.5rem]">
                            <div class="option-container">
                                <input
                                    type="radio"
                                    id="before"
                                    v-model="selectedBeforeAfter"
                                    value="before"
                                    class="mr-2"
                                />
                                <label for="before" class="cursor-pointer top-full">Before</label>
                            </div>
                            <div class="option-container">
                                <input
                                    type="radio"
                                    id="after"
                                    v-model="selectedBeforeAfter"
                                    value="after"
                                    class="mr-2"
                                />
                                <label for="after" class="cursor-pointer mt-2">After</label>
                            </div>
                        </div>

                        <div class="heat-cold-options bg-white rounded p-4 ml-2 h-[8.5rem]">
                            <div class="heat-container">
                                <input
                                    type="radio"
                                    id="heat"
                                    v-model="selectedHeatDwelling"
                                    value="heating_type"
                                    class="mr-2"
                                />
                                <label for="heat" class="cursor-pointer">Heating Type</label>
                            </div>
                            <div class="heat-container">
                                <input
                                    type="radio"
                                    id="dwelling"
                                    v-model="selectedHeatDwelling"
                                    value="dwelling_type"
                                    class="mr-2"
                                />
                                <label for="dwelling" class="cursor -pointer mt-2">Dwelling Type</label>
                            </div>
                        </div>

                        <div class="before-after-options bg-white rounded p-3 h-[8.5rem]">
                            <div class="option-container">
                                <input
                                    type="radio"
                                    id="average"
                                    v-model="selectedAverageSum"
                                    value="average"
                                    class="mr-2"
                                />
                                <label for="average" class="cursor-pointer top-full">Average</label>
                            </div>
                            <div class="option-container">
                                <input type="radio" id="sum" v-model="selectedAverageSum" value="sum" class="mr-2" />
                                <label for="sum" class="cursor-pointer mt-2">Sum</label>
                            </div>
                        </div>

                        <div class="top-full w-96 bg-white rounded shadow p-4 h-[8.5rem] ml-2">
                            <div class="grid grid-cols-3 gap-4 justify-end">
                                <div
                                    v-for="option in ['Pie Chart', 'Bar Chart', 'Line Graph']"
                                    :key="option"
                                    class="option-container"
                                >
                                    <input type="checkbox" v-model="selectedOptions" :value="option" class="mr-2" />
                                    <p @click="selectOption(option)" class="cursor-pointer">{{ option }}</p>
                                </div>
                                <div
                                    v-for="option in ['Table', 'Geographical Map']"
                                    :key="option"
                                    class="option-container"
                                >
                                    <input type="checkbox" v-model="selectedOptions" :value="option" class="mr-2" />
                                    <p @click="selectOption(option)" class="cursor-pointer">{{ option }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="filter-box bg-white rounded flex items-center ml-4 w-[210px]">
                <div class="relative">
                    <div class="length-download-options flex">
                        <p class="text-xl font-bold ml-2 mt-2">Download</p>
                        <button class="text-xl mr-2 ml-auto m-4 cursor-pointer mt-2" @click="toggleDownloadDropdown">
                            {{ downloadDropbarOpen ? "▲" : "▼" }}
                        </button>
                    </div>

                    <div class="p-1 pt-0 mr-auto" v-if="downloadDropbarOpen">
                        <div class="download-snippet-options bg-white rounded p-3 h-[8.5rem]">
                            <div class="option-container">
                                <input
                                    type="radio"
                                    id="snippet"
                                    v-model="SelectDownloadSnippet"
                                    value="Snippet"
                                    class="mr-2"
                                />
                                <label for="snippet" class="cursor-pointer top-full flex justify-center items-center">
                                    <span class="text-2xl">
                                        <font-awesome-icon icon="fa-solid fa-camera" />
                                    </span>
                                    <span class="text-center pl-2">Screenshot</span>
                                </label>
                            </div>
                            <div class="option-container">
                                <input
                                    type="radio"
                                    id="download"
                                    v-model="SelectDownloadSnippet"
                                    value="Download"
                                    class="mr-2"
                                />
                                <label for="download" class="cursor-pointer top-full flex justify-center items-center">
                                    <span class="text-2xl pr-2">
                                        <font-awesome-icon icon="fa-solid fa-download" />
                                    </span>
                                    <span class="text-center">Download</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();

    const chartTypesDowndownOpen = ref(true);
    const downloadDropbarOpen = ref(true);

    const selectedOptions = ref([]);

    const selectedBeforeAfter = ref(null);
    const selectedHeatDwelling = ref(null);
    const selectedAverageSum = ref(null);

    const SelectDownloadSnippet = ref(null);

    const pieChartData = ref(null);
    const barChartData = ref(null);

    const geoSql = ref(null);
    const geoTitle = ref(null);

    const availableTableFields = [
        "LSOA11CD",
        "Area (km2)",
        // "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)",
        // "Average heat demand after energy efficiency measures for detached gas boiler (kWh)",
        // "Average heat demand after energy efficiency measures for detached oil boiler (kWh)",
        // "Average heat demand after energy efficiency measures for detached resistance heating (kWh)",
        // "Average heat demand after energy efficiency measures for flat biomass boiler (kWh)",
        // "Average heat demand after energy efficiency measures for flat gas boiler (kWh)",
        // "Average heat demand after energy efficiency measures for flat oil boiler (kWh)",
        // "Average heat demand after energy efficiency measures for flat resistance heating (kWh)",
        // "Average heat demand after energy efficiency measures for semi-detached biomass boiler (kWh)",
        // "Average heat demand after energy efficiency measures for semi-detached gas boiler (kWh)",
        // "Average heat demand after energy efficiency measures for semi-detached oil boiler (kWh)",
        // "Average heat demand after energy efficiency measures for semi-detached resistance heating (kWh)",
        // "Average heat demand after energy efficiency measures for terraced biomass boiler (kWh)",
        // "Average heat demand after energy efficiency measures for terraced gas boiler (kWh)",
        // "Average heat demand after energy efficiency measures for terraced oil boiler (kWh)",
        // "Average heat demand after energy efficiency measures for terraced resistance heating (kWh)",
        // "Average heat demand before energy efficiency measures for detached biomass boiler (kWh)",
        // "Average heat demand before energy efficiency measures for detached gas boiler (kWh)",
        // "Average heat demand before energy efficiency measures for detached oil boiler (kWh)",
        // "Average heat demand before energy efficiency measures for detached resistance heating (kWh)",
        // "Average heat demand before energy efficiency measures for flat biomass boiler (kWh)",
        // "Average heat demand before energy efficiency measures for flat gas boiler (kWh)",
        // "Average heat demand before energy efficiency measures for flat oil boiler (kWh)",
        // "Average heat demand before energy efficiency measures for flat resistance heating (kWh)",
        // "Average heat demand before energy efficiency measures for semi-detached biomass boiler (kWh)",
        // "Average heat demand before energy efficiency measures for semi-detached gas boiler (kWh)",
        // "Average heat demand before energy efficiency measures for semi-detached oil boiler (kWh)",
        // "Average heat demand before energy efficiency measures for semi-detached resistance heating (kWh)",
        // "Average heat demand before energy efficiency measures for terraced biomass boiler (kWh)",
        // "Average heat demand before energy efficiency measures for terraced gas boiler (kWh)",
        // "Average heat demand before energy efficiency measures for terraced oil boiler (kWh)",
        // "Average heat demand before energy efficiency measures for terraced resistance heating (kWh)",
        "Local Authority (2019)",
        "Road length (m)",
        "Rurality",
        "Total heat demand after energy efficiency measures 2018 (kWh)",
        "Total heat demand before energy efficiency measures 2018 (kWh)",
    ];
    const tableFields = ref([]);

    function toggleDropdown() {
        chartTypesDowndownOpen.value = !chartTypesDowndownOpen.value;
    }

    function toggleDownloadDropdown() {
        toggleDownloadDropbarOpen.value = !toggleDownloadDropbarOpen.value;
    }

    function selectOption(option) {
        console.log(`Option '${option}' selected`);
    }

    watch([selectedBeforeAfter, selectedHeatDwelling, selectedOptions, selectedAverageSum], async () => {
        // If any of the needed options are left null, return.
        if (
            !selectedBeforeAfter.value ||
            !selectedHeatDwelling.value ||
            !selectedOptions.value ||
            !selectedAverageSum.value
        ) {
            return;
        }

        // Specific data we want to fetch from the API.
        // The API selects the 'after' or 'before' data based on the 'rows' field.
        // The 'filter' field is used to understand what column data we want to use in the calculations.
        const data_required = [{ filter: selectedHeatDwelling.value, rows: selectedBeforeAfter.value }];

        // Populate title and data variables.
        const { data: jsonData } = await useFetch(`${config.public.baseUrl}/api/Annual_heat_demand_LSOA`, {
            method: "post",
            body: data_required,
            transform: response => {
                for (const key in response) {
                    for (const item of response[key]["sum"]) {
                        // In this instance we know the sum is in kilowatt hours.
                        // Convert each sum to gigawatt hours from kilowatt hours.
                        item[1] = item[1] / 1000000;
                    }
                }
                // Array of objects containing the data for each chart.
                return response;
            },
        });

        // Check if no data returned by API.
        if (!jsonData || !jsonData.value) {
            return;
        }

        var chartData = [];
        var title = "";
        // TODO should probably be toggleable in UI.
        const asPercentage = false;

        // Titles for graphs need to reflect which metric is being displayed.
        if (selectedAverageSum.value === "average") {
            chartData = jsonData.value[`${selectedHeatDwelling.value}:${selectedBeforeAfter.value}`]["average"];
            title = `Breakdown of average heat demand per ${
                selectedHeatDwelling.value === "heating_type" ? "heating technology" : "dwelling type"
            } ${selectedBeforeAfter.value} energy efficiency improvements ${asPercentage ? "(%)" : "(GWh)"}`;
        } else if (selectedAverageSum.value === "sum") {
            chartData = jsonData.value[`${selectedHeatDwelling.value}:${selectedBeforeAfter.value}`]["sum"];
            title = `Breakdown of overall heat demand per ${
                selectedHeatDwelling.value === "heating_type" ? "heating technology" : "dwelling type"
            } ${selectedBeforeAfter.value} energy efficiency improvements ${asPercentage ? "(%)" : "(GWh)"}`;
        }

        for (const option of selectedOptions.value) {
            switch (option) {
                case "Pie Chart":
                    // TODO: skip updates if selectedOptions was changed, but contains Pie Chart previously.
                    pieChartData.value = {
                        title: title,
                        data: chartData,
                        asPercentage,
                    };
                    break;
                case "Bar Chart":
                    // Wasn't sure what to put for the legend.
                    barChartData.value = {
                        title: title,
                        data: { datasets: [chartData] },
                        max: Infinity,
                        legend: [
                            selectedHeatDwelling.value === "heating_type" ? "Heating Technology" : "Dwelling Type",
                        ],
                    };
                    break;
                case "Line Graph":
                    break;
                case "Table":
                    const containsCheck = selectedBeforeAfter.value === "before" ? "after" : "before";
                    tableFields.value = availableTableFields.filter(field => !field.includes(containsCheck));
                    break;
                case "Geographical Map":
                    switch (selectedBeforeAfter.value) {
                        case "before":
                            geoSql.value =
                                'SELECT geometry, (("Average heat demand before energy efficiency measures for detached biomass boiler (kWh)" + "Average heat demand before energy efficiency measures for detached gas boiler (kWh)" + "Average heat demand before energy efficiency measures for detached oil boiler (kWh)" + "Average heat demand before energy efficiency measures for detached resistance heating (kWh)" + "Average heat demand before energy efficiency measures for flat biomass boiler (kWh)" + "Average heat demand before energy efficiency measures for flat gas boiler (kWh)" + "Average heat demand before energy efficiency measures for flat oil boiler (kWh)" + "Average heat demand before energy efficiency measures for flat resistance heating (kWh)" + "Average heat demand before energy efficiency measures for semi-detached biomass boiler (kWh)" + "Average heat demand before energy efficiency measures for semi-detached gas boiler (kWh)" + "Average heat demand before energy efficiency measures for semi-detached oil boiler (kWh)" + "Average heat demand before energy efficiency measures for semi-detached resistance heating (kWh)" + "Average heat demand before energy efficiency measures for terraced biomass boiler (kWh)" + "Average heat demand before energy efficiency measures for terraced gas boiler (kWh)" + "Average heat demand before energy efficiency measures for terraced oil boiler (kWh)" + "Average heat demand before energy efficiency measures for terraced resistance heating (kWh)") / 1000) AS "Total heat demand before energy efficiency measures (MWh)", "Local Authority (2019)" as "Local Authority" FROM frame';
                            break;
                        case "after":
                            geoSql.value =
                                'SELECT geometry, (("Average heat demand after energy efficiency measures for detached biomass boiler (kWh)" + "Average heat demand after energy efficiency measures for detached gas boiler (kWh)" + "Average heat demand after energy efficiency measures for detached oil boiler (kWh)" + "Average heat demand after energy efficiency measures for detached resistance heating (kWh)" + "Average heat demand after energy efficiency measures for flat biomass boiler (kWh)" + "Average heat demand after energy efficiency measures for flat gas boiler (kWh)" + "Average heat demand after energy efficiency measures for flat oil boiler (kWh)" + "Average heat demand after energy efficiency measures for flat resistance heating (kWh)" + "Average heat demand after energy efficiency measures for semi-detached biomass boiler (kWh)" + "Average heat demand after energy efficiency measures for semi-detached gas boiler (kWh)" + "Average heat demand after energy efficiency measures for semi-detached oil boiler (kWh)" + "Average heat demand after energy efficiency measures for semi-detached resistance heating (kWh)" + "Average heat demand after energy efficiency measures for terraced biomass boiler (kWh)" + "Average heat demand after energy efficiency measures for terraced gas boiler (kWh)" + "Average heat demand after energy efficiency measures for terraced oil boiler (kWh)" + "Average heat demand after energy efficiency measures for terraced resistance heating (kWh)") / 1000) AS "Total heat demand after energy efficiency measures (MWh)", "Local Authority (2019)" as "Local Authority" FROM frame';
                            break;
                    }

                    geoTitle.value = `Total heat demand ${selectedBeforeAfter.value} energy efficiency measures (MWh)`;
                    break;
            }
        }
    });
</script>

<style scoped>
    .combined-container {
        display: flex;
        text-align: center;
        align-items: center;
    }

    .option-container {
        display: flex;
        align-items: center;
        @apply pb-1;
    }

    .thistext {
        margin-right: -65px;
        align-items: left;
    }

    .heat-container {
        display: flex;
        align-items: center;
    }

    .icon {
        margin-left: 10px;
        margin-top: px;
    }

    .anothericon {
        margin-left: 1px;
        margin-top: px;
    }

    .another-cotainer {
        position: relative;
        top: 1200px;
    }

    .download-snippet-options,
    .before-after-options,
    .heat-cold-options {
        top: 100%;
        left: 0;
        padding: 0.75rem;
        border-radius: 0.375rem;
        background-color: white;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .before-after-options input[type="radio"],
    .download-snippet-options input[type="radio"],
    .heat-cold-options input[type="radio"] {
        display: none;
    }

    .download-snippet-options label,
    .before-after-options label,
    .heat-cold-options label {
        cursor: pointer;
        padding: 0.75rem;
        width: 100%;
        border: 1px solid #e2e8f0;
        border-radius: 0.25rem;
    }

    .download-snippet-options input[type="radio"]:checked + label,
    .before-after-options input[type="radio"]:checked + label,
    .heat-cold-options input[type="radio"]:checked + label {
        background-color: #ced4d8;
        color: white;
    }

    .length-checkit-options {
        width: 660px;
    }

    .length-download-options {
        height: 52px;
        width: 210px;
    }
</style>
