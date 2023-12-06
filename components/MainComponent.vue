<template>
	<div class="page-container bg-gray-100 min-h-screen flex flex-col items-center justify-center">
		<div class="graph-container rounded bg-white shadow-md mb-8">
			<div class="slot-content">
				<p>The Graph or Chart</p>
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
								<label for="snippet" class="cursor-pointer top-full">Snippet</label>
							</div>
							<div class="option-container">
								<input type="radio" id="download" v-model="SelectDownloadSnippet" value="Download"
									class="mr-2" />
								<label for="download" class="cursor-pointer mt-2">Download</label>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>

	</div>
</template>
  
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
			this.SelectDownloadSnippet;
		},

	},
};
</script>
  
<style scoped>
.option-container {
	display: flex;
	align-items: center;
}

.heat-container {
	display: flex;
	align-items: center;
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