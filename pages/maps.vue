<template>
	<GeoMap
		:map-name="`ukerc_scotland_data`"
		:center="[56.9, -4.4]"
		:zoom="6.5"
		:fields="[
			'Average heat demand before energy efficiency measures for detached gas boiler (kWh)',
			'Average heat demand before energy efficiency measures for detached oil boiler (kWh)',
			'Average heat demand before energy efficiency measures for detached resistance (kWh)',
			'Average heat demand before energy efficiency measures for detached solid fuel boiler (kWh)',
		]"
	/>
</template>
