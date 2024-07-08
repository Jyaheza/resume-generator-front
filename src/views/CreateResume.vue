<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";



const router = useRouter();

function divToggle(addFieldBtn, submitFieldBtn, tableDiv, fieldDiv)
{
    const toggleToFields = document.getElementById(addFieldBtn);
    const toggleToTable = document.getElementById(submitFieldBtn);


    const table = document.getElementById(tableDiv);
    const fields = document.getElementById(fieldDiv);

    const hide = el => el.style.setProperty("display", "none");
    const show = el => el.style.setProperty("display", "block");

    hide(fields);
    hide(toggleToTable);

    toggleToFields.addEventListener("click", () => {
    hide(toggleToFields);
    hide(table);
    show(toggleToTable);
    show(fields);
    });

    toggleToTable.addEventListener("click", () => {
    hide(fields);
    hide(toggleToTable);
    show(table);
    show(toggleToFields);
    });
}

</script>

<template>
    <v-container>
        <div id="body">
            <v-row align="center" class="mb-4">
                <v-col cols="10">
                    <v-card-title class="pl-0 text-h4 font-weight-bold">Create a resume</v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <v-card justify="center" variant="flat">
                        <v-card-title class="pl-0 text-h4 font-weight-bold">Personal Information</v-card-title>
                        <v-text-field placeholder="Name"></v-text-field>
                        <v-text-field placeholder="email@address.com"></v-text-field>
                        <v-text-field placeholder="Phone number"></v-text-field>
                        <v-textarea placeholder="Description"></v-textarea>
                        <v-btn color="#000235" variant="flat">Add info</v-btn>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <v-card justify="center" variant="flat">
                        <v-card-title class="pl-0 text-h4 font-weight-bold">Job Experience</v-card-title>
                        <div id="job_table">
                            <v-table class="rounded-lg elevation-5">
                                <thead>
                                    <tr>
                                        <th class="text-left">Job</th>
                                        <th class="text-left">Description</th>
                                    </tr>
                                </thead>
                                <v-btn @click="divToggle('add_job', 'submit_job', 'job_table', 'fill_job')" 
                                id="add_job" color="#000235" variant="flat">Add new job</v-btn>
                            </v-table>
                        </div>
                        <div id="fill_job" style="display: none;">
                            <v-text-field placeholder="Job Title"></v-text-field>
                            <v-text-field placeholder="Organization"></v-text-field>
                            <v-text-field placeholder="City"></v-text-field>
                            <v-text-field placeholder="State"></v-text-field>
                            <div class="d-flex flex-row mb-6">
                                <v-text-field variant="outlined" max-width="344" placeholder="Start MM/YYYY"></v-text-field>
                                <v-text-field  variant="outlined" justify="end" max-width="344" placeholder="End MM/YYYY"></v-text-field>
                            </div>
                            <v-textarea placeholder="Job Description"></v-textarea>
                            <v-btn id="submit_job" color="#000235">Add job</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <v-card justify="center" variant="flat">
                        <v-card-title class="pl-0 text-h4 font-weight-bold">Education</v-card-title>
                        <div id="ed_table">
                            <v-table class="rounded-lg elevation-5">
                                <thead>
                                    <tr>
                                        <th class="text-left">Degrees and certifications</th>
                                    </tr>
                                </thead>
                                <v-btn @click="divToggle('add_ed', 'submit_ed', 'ed_table', 'fill_ed')" 
                                id="add_ed" color="#000235" variant="flat">Add new education</v-btn>
                            </v-table>
                        </div>
                        <div id="fill_ed" style="display: none;">
                            <v-text-field placeholder="Name of Institution"></v-text-field>
                            <v-text-field placeholder="Major"></v-text-field>
                            <v-text-field placeholder="City"></v-text-field>
                            <v-text-field placeholder="State"></v-text-field>
                            <div class="d-flex flex-row mb-6">
                                <v-text-field variant="outlined" max-width="344" placeholder="Start MM/YYYY"></v-text-field>
                                <v-text-field  variant="outlined" justify="end" max-width="344" placeholder="End MM/YYYY"></v-text-field>
                            </div>
                            <v-textarea placeholder="Awards"></v-textarea>
                            <v-textarea placeholder="Course work"></v-textarea>
                            <v-btn id="submit_ed" color="#000235">Add Education</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <v-card justify="center" variant="flat" >
                        <v-card-title class="pl-0 text-h4 font-weight-bold">Projects</v-card-title>
                        <div id="projects_table">
                            <v-table class="rounded-lg elevation-5">
                                <thead>
                                    <tr>
                                        <th class="text-left">Projects</th>
                                    </tr>
                                </thead>
                                <v-btn @click="divToggle('add_proj', 'submit_proj', 'projects_table', 'fill_project')" 
                                id="add_proj" color="#000235" variant="flat">Add new project</v-btn>
                            </v-table>
                        </div>
                        <div id="fill_project" style="display: none;">
                            <v-text-field placeholder="Name of project"></v-text-field>
                            <v-text-field placeholder="Location"></v-text-field>
                            <div class="d-flex flex-row mb-6">
                                <v-text-field variant="outlined" max-width="344" placeholder="Start MM/YYYY"></v-text-field>
                                <v-text-field  variant="outlined" justify="end" max-width="344" placeholder="End MM/YYYY"></v-text-field>
                            </div>
                            <v-textarea placeholder="Description"></v-textarea>
                            <v-btn id="submit_proj" color="#000235">Add Project</v-btn>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="10">
                    <v-card justify="center" variant="flat" >
                        <v-card-title class="pl-0 text-h4 font-weight-bold">Skills</v-card-title>
                        <v-checkbox
                                    label="Java"
                                    ></v-checkbox>
                                    <v-checkbox
                                    label="C++"></v-checkbox>
                        <v-text-field max-width="300" placeholder="New Skill"></v-text-field>
                        <v-btn color="#000235" variant="flat">Add Skill</v-btn>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col class="d-flex justify-end" cols="10">
                    <v-btn @click="router.push({ name: 'resumetemplate'})" rounded="xl" variant="outlined">Choose Template</v-btn>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>