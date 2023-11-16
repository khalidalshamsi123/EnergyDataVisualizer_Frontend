<template>
	<UTable :rows="tableData" />
</template>

<script setup>
	const config = useRuntimeConfig();

	const props = defineProps({
		tableName: String,
		fields: Array,
	});

	const { data: tableData } = await useFetch(`${config.public.baseURL}/tables/${props.tableName}`, {
		query: {
			fields: props.fields.join(","),
		},
	});
</script>
