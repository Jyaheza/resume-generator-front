<style scoped>
:deep(.v-btn__content) {
    white-space: pre-wrap;
}
</style>
<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="text-center mt-10">
        <span class="pl-0 text-h4 text-wrap font-weight-bold">
          Manage Professional Profile
        </span>
      </v-col>
    </v-row>
    <v-row style="margin-top: 6vh;">
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
        <v-btn size="x-large" class="mx-2 text-center" :to="{ name: 'resumeHeader' }">Personal Information</v-btn>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
        <v-btn size="x-large" class="mx-2 text-center" :to="{ name: 'education' }">Education</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
        <v-btn size="x-large" class="mx-2 text-center" :to="{ name: 'experience' }">Professional Experience</v-btn>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
        <v-btn size="x-large" class="mx-2 text-center" :to="{ name: 'certificate' }">Professional Certificates</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-end">
        <v-btn size="x-large" class="mx-2 text-center" :to="{ name: 'project' }">Projects</v-btn>
      </v-col>
      <v-col cols="12" md="6" class="d-flex justify-center justify-md-start">
        <v-btn size="x-large" class="mx-2 text-center" :to="{ name: 'skill' }">Skills</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
