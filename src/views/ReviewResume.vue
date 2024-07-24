<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from '../services/UserServices';
import MenuBar from "../components/MenuBar.vue";

const snackbar = ref({
  value: false,
  color: "",
  text: "",
});


const router = useRouter();
</script>

<template>
  <v-container>
    <div id="body">
      <v-row align="center" class="mb-4" justify="center">
        <v-col cols="10">
          <v-card-title class="pl-0 text-h4 font-weight-bold">Admin</v-card-title>
        </v-col>
        <v-btn size="x-large" variant="flat">
          My Dashboard
        </v-btn>
      </v-row>
      <v-row justify="space-around">
        <v-col cols="8">
          <div id="resumes">
            <v-card variant="elevated" flex="no-wrap">
              <v-row>
                <v-card-title class="text-h4 font-weight-bold">Resumes</v-card-title>
              </v-row>
              <!-- Just dummy text to show where the resumes would be -->

              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin lobortis ante diam, et aliquam est
              venenatis eu. Aenean eget sem pretium odio pharetra pulvinar ac a dolor. Aliquam vulputate neque a
              pellentesque semper. Sed gravida tempus ligula ut varius. Maecenas mollis urna sit amet elit suscipit
              euismod. Aenean cursus felis lobortis ipsum elementum, ac ultrices risus pellentesque. Vivamus vel
              fermentum dolor. Maecenas vitae lacus erat. Vestibulum malesuada augue ante, sed scelerisque sapien
              accumsan ut. Praesent ut lorem efficitur, convallis neque sit amet, gravida lacus. Sed maximus felis sed
              enim rhoncus vehicula.

              Ut tristique arcu lacus, id rutrum lectus egestas eget. Morbi quam tellus, efficitur id dui eget, pulvinar
              pharetra turpis. Pellentesque sed risus sit amet augue volutpat imperdiet quis ac lacus. Phasellus
              faucibus lacus at tincidunt dignissim. Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Curabitur vel magna eu neque ultrices fermentum facilisis sit amet ex. In accumsan ipsum at nunc blandit
              placerat. Nulla facilisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Integer mattis accumsan urna, at volutpat nunc.
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>