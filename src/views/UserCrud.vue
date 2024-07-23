<style>
.container {
  height: 200px;
  position: relative;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>

<template>
  <v-container>
    <div class=".justify-content-xxl-center .align-center ">
      <!-- Ignore the mess for now, fixing spacing later - CJ 5/21/2024 -->
      <v-row justify="center">
        <v-col cols="auto">
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="auto">
        </v-col>
      </v-row>

      <v-row justify="center">

        <v-col cols="auto">
          <v-btn size="x-large" class="mx-2" :to="{ name: 'certificate' }">User Certificates</v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn size="x-large" class="mx-2" :to="{ name: 'education' }">User Education</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">

        <v-col cols="auto">
          <v-btn size="x-large" class="mx-2" :to="{ name: 'experience' }">User Experiences</v-btn>
        </v-col>

        <v-col cols="auto">
          <v-btn size="x-large" class="mx-2" :to="{ name: 'project' }">User Projects</v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">

        <v-col cols="auto">
          <v-btn size="x-large" class="mx-2" :to="{ name: 'skill' }">User Skills</v-btn>
        </v-col>

        <!-- <v-col cols="auto">
          <v-btn size="x-large" class="mx-2" :to="{ name: 'settings' }">Story Settings</v-btn>
        </v-col> -->
      </v-row>
    </div>
  </v-container>
</template>