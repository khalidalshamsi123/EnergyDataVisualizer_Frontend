<template>
	<UTable :rows="users" />
</template>

<script setup>
	const users = [
		{ id: 1, Location: "Cardiff", Temperature: "30", Date: "11/05/2022" },
		{ id: 2, Location: "London", Temperature: "17", Date: "11/05/2022" },
		{ id: 3, Location: "Manchester", Temperature: "21", Date: "11/05/2022" },
		{ id: 4, Location: "Croydon", Temperature: "13", Date: "11/05/2022" },
		{ id: 5, Location: "Llaneli", Temperature: "27", Date: "11/05/2022" },
		{ id: 6, Location: "Llaneli", Temperature: "10", Date: "11/05/2022" },
	];
</script>
