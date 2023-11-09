<template>
    <div>
        {{ data }}
    </div>
</template>

<script setup>
    const config = useRuntimeConfig();

    const {data: data, error} = await useFetch(`${config.public.baseUrl}/api/line-graph`);
    
    console.log(data.value);
    console.log(error.value);
</script>

<style scoped>

</style>