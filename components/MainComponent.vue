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
						<div class="before-after-options bg-white rounded p-3 h-[8.5rem]">
							<div class="option-container">
								<input type="radio" id="before" v-model="selectedBeforeAfter" value="Before" class="mr-2" />
								<label for="before" class="cursor-pointer top-full">Before</label>
							</div>
							<div class="option-container">
								<input type="radio" id="after" v-model="selectedBeforeAfter" value="After" class="mr-2" />
								<label for="after" class="cursor-pointer mt-2">After</label>
							</div>
						</div>

						<div class="heat-cold-options bg-white rounded p-4 ml-2 h-[8.5rem]">
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

						<div class="top-full w-96 bg-white rounded shadow p-4 h-[8.5rem] ml-2">
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
						<div class="download-snippet-options bg-white rounded p-3 h-[8.5rem]">
							<div class="option-container">
								<input type="radio" id="snippet" v-model="SelectDownloadSnippet" value="Snippet"
									class="mr-2" />
								<label for="snippet" class="cursor-pointer top-full flex justify-center items-center">
									<span class="text-2xl">
										<font-awesome-icon icon="fa-solid fa-camera" />
									</span>
									<span class="text-center pl-2">Screenshot</span>
								</label>
							</div>
							<div class="option-container">
								<input type="radio" id="download" v-model="SelectDownloadSnippet" value="Download"
									class="mr-2" />
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