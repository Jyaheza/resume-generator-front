<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";



const router = useRouter();
</script>

<template>
    <v-container>
        <div id="body">
            <v-row justify="center">
                <v-col cols="auto">
                    <v-card-title class="pl-0 text-h4 font-weight-bold">Templates</v-card-title>
                </v-col>
            </v-row>
            <v-row justify="space-around">
                <v-card align="left" variant="elevated" class="mb-4">
                    <v-card-title>Resume Template 1</v-card-title>
                    <v-card-text class="justify-end" cols="10">Resume in here</v-card-text>
                </v-card>
                <v-card variant="elevated" class="mb-4">
                    <v-card-title>Resume Template 2</v-card-title>
                    <v-card-text class="justify-end" cols="10">Resume in here</v-card-text>
                </v-card>
            </v-row>
            <v-row align="end" justify="space-around">
                <v-card align="left" variant="elevated" class="mb-4">
                    <v-card-title>Resume Template 3</v-card-title>
                    <v-card-text class="justify-end" cols="10">Resume in here</v-card-text>
                </v-card>
                <v-card variant="elevated" class="mb-4">
                    <v-card-title>Resume Template 4</v-card-title>
                    <v-card-text class="justify-end" cols="10">Resume in here</v-card-text>
                </v-card>
            </v-row>
            <v-row justify="center">
                <v-col cols="auto">
                    <v-btn @click="router.push({ name: 'resumes' })" variant="elevated" size="x-large" rounded="lg"
                        color="#000235">
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>