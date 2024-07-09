<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";



const router = useRouter();


</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">Resumes</v-card-title>
        </v-col>
        <v-btn size="x-large" variant="flat">
          My Dashboard
        </v-btn>
      </v-row>
      <v-row align="center" clas="mb-4">
        <v-btn variant="outlined" @click="router.push({ name: 'createresume'})">
          Create a resume
        </v-btn>
      </v-row>
      <v-row align="center" clas="mb-4">
        <v-btn variant="outlined">
          Match Resume With Job
        </v-btn>
      </v-row>

      <v-dialog persistent width="800">
        <v-card class="rounded-lg elevation-5">
          <v-card-title class="headline mb-2">Add Story</v-card-title>
          <v-card-text>
            <v-progress-linear v-if="loading" indeterminate color="blue" class="mb-2"></v-progress-linear>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="flat" color="secondary" @click="closeAdd">Close</v-btn>
            <v-btn :disabled="loading" variant="flat" color="primary" @click="">Add Story</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     </div>
  </v-container>
</template>
