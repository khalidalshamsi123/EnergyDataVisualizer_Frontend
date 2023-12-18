<template>
    
<form @submit.prevent="submit(form)">
    <div class="input-wrapper">
        <label for="email">E-mail:</label>
        <input required v-model="form.email" type="email" 
        name="email"/>
    </div>
    <div class="input-wrapper">
        <label for="name">Name:</label>
        <input required v-model="form.name" type="text" 
        name="name"/>
    </div>
    <div class="input-wrapper">
        <label for="subject">Subject:</label>
        <input required v-model="form.subject" type="text" 
        name="subject"/>
    </div>
    <div class="input-wrapper">
        <label for="message">Message:</label>
        <textarea 
        required 
        v-model="form.message" 
        type="text" 
        name="message"></textarea>
    </div>

<button type="submit">
    <template v-if="waiting">wait</template>
    <template v-if="!waiting">Dispatched</template>
</button>
<p v-if="errors">Something Went Wrong</p>
<p v-if="succsess">Form Is sent</p>
</form>


</template>

<script setup>

const form = ref({
    name: '',
    email: '',
    subject: '',
    message: '',
});

const errors = ref(false);
const succsess = ref(false);
const waiting = ref(false);

async function submit(form){
    this.waiting = true;
    await $fetch('http://localhost:3000/api/contact', {
        method: 'POST',
        body: form,
    }).then(() => {
        this.errors = false;
        this.succsess = true;
        this.waiting = false;
        this.form = {
            name: '',
            email: '',
            subject: '',
            message: '',
        };
    });

}
    
</script>

<style lang="scss" scoped>
</style>