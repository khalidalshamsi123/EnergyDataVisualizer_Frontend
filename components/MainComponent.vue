<template>
	<div class="page-container bg-gray-100 min-h-screen flex flex-col items-center justify-center">
		<div class="graph-container rounded bg-white shadow-md mb-8">
			<div v-for="config in chartConfigurations">
				<PieChart :title=config.title :data=config.data :asPercentage=config.asPercentage />
			</div>
		</div>

		<div class="flex items-start">
			<div class="filter-box bg-white rounded flex items-center w-[650px]">
				<div class="relative">
					<div class=" length-checkit-options flex">
						<p class="text-xl font-bold ml-2 mt-2">Chart Types</p>
						<button class="text-xl ml-auto m-4 cursor-pointer mt-2" @click="toggleDropdown">
							{{ isDropdownOpen ? '▲' : '▼' }}
						</button>
					</div>

					<div class="flex p-1 pt-0 mr-auto" v-if="isDropdownOpen">
						<div class="before-after-options bg-white rounded p-3 h-32">
							<div class="option-container">
								<input type="radio" id="before" v-model="selectedBeforeAfter" value="Before" class="mr-2" />
								<label for="before" class="cursor-pointer top-full">Before</label>
							</div>
							<div class="option-container">
								<input type="radio" id="after" v-model="selectedBeforeAfter" value="After" class="mr-2" />
								<label for="after" class="cursor-pointer mt-2">After</label>
							</div>
						</div>

						<div class="heat-cold-options bg-white rounded p-4 ml-2 h-32">
							<div class="heat-container">
								<input type="radio" id="heat" v-model="selectedHeatDwelling" value="heat" class="mr-2" />
								<label for="heat" class="cursor-pointer">Heating Type</label>
							</div>
							<div class="heat-container">
								<input type="radio" id="dwelling" v-model="selectedHeatDwelling" value="dwelling"
									class="mr-2" />
								<label for="dwelling" class="cursor	-pointer mt-2">Dwelling Type</label>
							</div>
						</div>

						<div class="top-full w-96 bg-white rounded shadow p-4 h-32 ml-2">
							<div class="grid grid-cols-3 gap-4 justify-end">
								<div v-for="   option    in    ['Pie Chart', 'Bar Chart', 'Line Graph']   " :key="option"
									class="option-container">
									<input type="checkbox" v-model="selectedOptions" :value="option" class="mr-2" />
									<p @click="selectOption(option)" class="cursor-pointer">{{ option }}</p>
								</div>
								<div v-for="   option    in    ['Table', 'Geographical Map']   " :key="option"
									class="option-container">
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
							{{ isDownloadDropbarOpen ? '▲' : '▼' }}

						</button>
					</div>

					<div class="p-1 pt-0 mr-auto" v-if="isDownloadDropbarOpen">
						<div class="download-snippet-options bg-white rounded p-3 h-32">
							<div class="option-container">
								<input type="radio" id="snippet" v-model="SelectDownloadSnippet" value="Snippet"
									class="mr-2" />
								<label for="snippet" class="cursor-pointer top-full label-container">
									<span class="text">Screenshot</span>
									<span class="icon-container">
										<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 512 512"
											class="icon">
											<!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
											<path
												d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z" />
										</svg>
									</span>
								</label>
							</div>
							<div class="option-container">
								<input type="radio" id="download" v-model="SelectDownloadSnippet" value="Download"
									class="mr-2" />
								<label for="download" class="cursor-pointer top-full another-container">
									<span class="text">Download</span>
									<span class="icon-container">
										<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"
											viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
											<path
												d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
										</svg>
									</span>
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

// Specific data we want to fetch from the API.
// The API selects the 'after' or 'before' data based on the 'rows' field.
// The 'filter' field is used to understand what column data we want to use in the calculations.
const data_required = [
	{ "filter": "heating_type", "rows": "before" },
];

// Populate tile and data variables.
var jsonData = await useFetch(`${config.public.baseUrl}/api/Annual_heat_demand_LSOA`, {
	method: 'post',
	body: JSON.stringify(data_required),
	transform: (response) => {
		for (const key in response) {
			for (const item of response[key]['sum']) {
				// In this instance we know the sum is in kilowatt hours.
				// Convert each sum to gigawatt hours from kilowatt hours.
				item[1] = item[1] / 1000000;
			}
		}
		// Array of objects containing the data for each chart.
		return response;
	}
});

// Array of configuration objects for each chart. Each object contains the chart title, and whether the data should be displayed as a percentage.
// The data each chart should use is added to each object in the loop below.
const chartConfigurations = [
	// Before.
	{ type: 'heating_type', title: 'Breakdown of average heat demand per heating technology before energy efficiency improvements (%)', asPercentage: true, datasetType: 'before' },
];

jsonData = jsonData.data.value;
// Loop over chartConfiguration and add data as a field to each object based on matching type and datasetType.
// Whether the sum or average is used depends on the asPercentage field.
for (const config of chartConfigurations) {
	// Check if the jsonData object has the required data for the current chart.
	if (jsonData.hasOwnProperty(`${config.type}:${config.datasetType}`)) {
		var chart_data = jsonData[`${config.type}:${config.datasetType}`];
		config.data = chart_data[config.asPercentage ? 'average' : 'sum'];
	}
}
const title = "Breakdown of heat demand by heating technology (%)";
</script>

<script>

export default {

	data() {
		return {
			isDropdownOpen: false,
			isDownloadDropbarOpen: false,
			isNewDropdownOpen: false,
			selectedOptions: [],
			selectedBeforeAfter: null,
			SelectDownloadSnippet: null,
			selectedHeatDwelling: null,
		};
	},
	methods: {

		toggleDownloadDropdown() {
			this.isDownloadDropbarOpen = !this.isDownloadDropbarOpen;
		},
		toggleDownloadDropdown() {
			this.isDownloadDropbarOpen = !this.isDownloadDropbarOpen;
		},

		toggleDropdown() {
			this.isDropdownOpen = !this.isDropdownOpen;
		},
		toggleNewDropdown() {
			this.isNewDropdownOpen = !this.isNewDropdownOpen;
		},
		selectOption(option) {
			console.log(`Option '${option}' selected`);
			this.isDropdownOpen = false;
		},
		selectNewOption(option) {
			console.log(`New Option '${option}' selected`);
			this.isNewDropdownOpen = false;
			this.selectedNewOption = option;

		},

	},
};
</script>
  
<style scoped>
.combined-container {
	display: flex;
	text-align: center;
	align-items: center;
}

.label-container {
	margin-top: -10px;
	display: flex;
	align-items: center;
	height: 55px;
}

.another-container {
	position: relative;
	margin-top: 5px;
	height: 55px;
	align-items: center;
}



-->.option-container {
	display: flex;
	align-items: center;
}

.text {
	margin-right: -20px;
	align-items: left;
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

.icon-container {
	position: relative;
	align-items: center;
	top: -23px;
}

.another-cotainer {
	position: relative;
	top: 1200px;
}

.cursor-pointer {
	cursor: pointer;
	text-align: center;
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
	display: inline-block;
}

.download-snippet-options input[type="radio"]:checked+label,
.before-after-options input[type="radio"]:checked+label,
.heat-cold-options input[type="radio"]:checked+label {
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