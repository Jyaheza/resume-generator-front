<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import ResumeDataService from "../services/ResumeDataServices";
import ExperiencesServices from "../services/ExperiencesServices";
import EducationServices from "../services/EducationServices";
import CertificatesServices from "../services/CertificatesServices";
import ProjectsServices from "../services/ProjectsServices";
import SkillsServices from "../services/SkillsServices";
import ResumeServices from "../services/ResumeServices";

const resumeData = ref(null);
const jobExperienceData = ref([]);
const educationData = ref([]);
const certificatesData = ref([]);
const projectsData = ref([]);
const skillsData = ref([]);
const resumeTitle = ref(null);
const selectedTemplateId = ref(1);
const loading = ref(false);
const dialog = ref(false);

let showJobExperience = ref(false);
let showEducation = ref(false);
let showProjects = ref(false);
let showCertificates = ref(false);
let showSkills = ref(false);
let showTemplates = ref(false);
const snackbar = ref({
    value: false,
    color: "",
    text: "",
});

const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));

const templates = ref([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 }
]);


watch(resumeData, (newValue) => {
    if (newValue) {
        // Update resumeHeader fields
        newResume.value.resume.resumeHeader.fullName = newValue.full_name || "";
        newResume.value.resume.resumeHeader.location = newValue.location || "";
        newResume.value.resume.resumeHeader.summary = newValue.summary || "";
        newResume.value.resume.resumeHeader.email = newValue.user_email || "";
        newResume.value.resume.resumeHeader.phone = newValue.user_phone_number || "";
        newResume.value.resume.resumeHeader.url = newValue.website_url || "";
    }
}, { deep: true });


watch(jobExperienceData, (newValue) => {
    if (Array.isArray(newValue)) {
        newResume.value.resume.experiences = newValue.map(experience => ({
            employer: experience.employer || "",
            state: experience.state || "",
            jobTitle: experience.job_title || "",
            startYear: experience.start_year || "",
            endYear: experience.end_year || "",
            summary: experience.summary || ""
        }));
    } else {
        newResume.value.resume.experiences = [];
    }
}, { deep: true });

watch(educationData, (newValue) => {
    if (Array.isArray(newValue)) {
        newResume.value.resume.education = newValue.map(education => ({
            name: education.education_name || "",
            location: education.location || "",
            startYear: education.start_year || "",
            endYear: education.end_year || "",
            degreeName: education.degree_name || "",
            awards: education.awards || "",
            coursework: education.coursework || ""
        }));
    } else {
        newResume.value.resume.education = [];
    }
}, { deep: true });

watch(certificatesData, (newValue) => {
    if (Array.isArray(newValue)) {
        newResume.value.resume.certificates = newValue.map(certificate => ({
            title: certificate.certificate_title || "",
            issuer: certificate.issuer || "",
            issueDate: certificate.issue_date || "",
            expires: certificate.expire_date || "",
            summary: certificate.summary || ""
        }));
    } else {
        newResume.value.resume.certificates = [];
    }
}, { deep: true });

watch(projectsData, (newValue) => {
    if (Array.isArray(newValue)) {
        newResume.value.resume.projects = newValue.map(project => ({
            title: project.project_title || "",
            startDate: project.start_year || "",
            endDate: project.end_year || "",
            location: project.location || "",
            summary: project.summary || ""
        }));
    } else {
        newResume.value.resume.projects = [];
    }
}, { deep: true });

watch(skillsData, (newValue) => {
    if (Array.isArray(newValue)) {
        newResume.value.resume.skills = newValue.map(skill => ({
            name: skill.name || ""
        }));
    } else {
        newResume.value.resume.skills = [];
    }
}, { deep: true });

watch(resumeTitle, (newValue) => {
    newResume.value.title = newValue || "";
});

watch(() => selectedTemplateId.value, (newValue) => {
    newResume.value.templateId = newValue;
});

const newResume = ref({
    resume: {
        resumeHeader: {
            fullName: "",
            location: "",
            summary: "",
            email: "",
            phone: "",
            url: ""
        },
        experiences: [],
        education: [],
        skills: [],
        certificates: [],
        projects: []
    },
    templateId: "",
    userId: "",
    title: ""
});

onMounted(async () => {
    if (user.value) {
        loading.value = true;
        try {
            const resumeDataresponse = await ResumeDataService.getResumeDatasByUserId(user.value.id);
            const resumeResponseData = resumeDataresponse.data;
            resumeData.value = resumeResponseData.length > 0 ? resumeResponseData[0] : resumeData.value;

            const jobExperienceResponse = await ExperiencesServices.getExperiencesByUserId(user.value.id);
            const jobExperienceResponseData = jobExperienceResponse.data;
            jobExperienceData.value = jobExperienceResponseData.length > 0 ? jobExperienceResponseData : [];

            const educationeResponse = await EducationServices.getEducationsByUserId(user.value.id);
            const educationeResponseData = educationeResponse.data;
            educationData.value = educationeResponseData.length > 0 ? educationeResponseData : [];

            const certificatesResponse = await CertificatesServices.getCertificatesByUserId(user.value.id);
            const certificatesResponseData = certificatesResponse.data;
            certificatesData.value = certificatesResponseData.length > 0 ? certificatesResponseData : [];

            const projectsResponse = await ProjectsServices.getProjectsByUserId(user.value.id);
            const projectsResponseData = projectsResponse.data;
            projectsData.value = projectsResponseData.length > 0 ? projectsResponseData : [];

            const skillsResponse = await SkillsServices.getSkillsByUserId(user.value.id);
            const skillsResponseData = skillsResponse.data;
            skillsData.value = skillsResponseData.length > 0 ? skillsResponseData : [];

            resumeTitle.value = "";

            mapNewResumeData(resumeData, jobExperienceData, educationData, certificatesData, projectsData, skillsData, user.value.id);
            loading.value = false;
        } catch (error) {
            console.error("Error fetching data:", error);
            resumeData.value = {};
            jobExperienceData.value = {};
            educationData.value = {};
            certificatesData.value = {};
            projectsData.value = {};
            skillsData.value = {};
            loading.value = false;
        }
    }
});

const router = useRouter();

function mapNewResumeData(resumeData, jobExperienceData, educationData, certificatesData, projectsData, skillsData, userId) {
    // Mapping resumeHeader data
    newResume.value.resume.resumeHeader.fullName = resumeData.value ? resumeData.value.full_name || "" : "";
    newResume.value.resume.resumeHeader.location = resumeData.value ? resumeData.value.location || "" : "";
    newResume.value.resume.resumeHeader.summary = resumeData.value ? resumeData.value.summary || "" : "";
    newResume.value.resume.resumeHeader.email = resumeData.value ? resumeData.value.user_email || "" : "";
    newResume.value.resume.resumeHeader.phone = resumeData.value ? resumeData.value.user_phone_number || "" : "";
    newResume.value.resume.resumeHeader.url = resumeData.value ? resumeData.value.website_url || "" : "";

    // Mapping experiences data
    newResume.value.resume.experiences = jobExperienceData.value.map(experience => ({
        employer: experience.employer || "",
        state: experience.state || "",
        jobTitle: experience.job_title || "",
        startYear: experience.start_year || "",
        endYear: experience.end_year || "",
        summary: experience.summary || ""
    }));

    // Mapping education data
    newResume.value.resume.education = educationData.value.map(education => ({
        name: education.education_name || "",
        location: education.location || "",
        startYear: education.start_year || "",
        endYear: education.end_year || "",
        degreeName: education.degree_name || "",
        awards: education.awards || "",
        coursework: education.coursework || ""
    }));

    // Mapping skills data
    newResume.value.resume.skills = skillsData.value.map(skill => ({
        name: skill.name || ""
    }));

    // Mapping certificates data
    newResume.value.resume.certificates = certificatesData.value.map(certificate => ({
        title: certificate.certificate_title || "",
        issuer: certificate.issuer || "",
        issueDate: certificate.issue_date || "",
        expires: certificate.expire_date || "",
        summary: certificate.summary || ""
    }));

    // Mapping projects data
    newResume.value.resume.projects = projectsData.value.map(project => ({
        title: project.project_title || "",
        startDate: project.start_year || "",
        endDate: project.end_year || "",
        location: project.location || "",
        summary: project.summary || ""
    }));

    // Set remaining fields
    newResume.value.templateId = 1;
    newResume.value.userId = userId;
    newResume.value.title = "";
}

function toggleSection(section) {
    switch (section) {
        case 'jobExperience':
            showJobExperience.value = !showJobExperience.value;
            break;
        case 'education':
            showEducation.value = !showEducation.value;
            break;
        case 'projects':
            showProjects.value = !showProjects.value;
            break;
        case 'certificates':
            showCertificates.value = !showCertificates.value;
            break;
        case 'skills':
            showSkills.value = !showSkills.value;
            break;
        case 'templates':
            showTemplates.value = !showTemplates.value;
            break;
        default:
            break;
    }
}

function handleTemplateChange(newValue) {
    selectedTemplateId.value = newValue;
}

function handleThumbnailClick(templateId) {
    handleTemplateChange(templateId);
    dialog.value = true;
}

async function generateResume() {
    try {
        loading.value = true;
        await ResumeServices.addResume(newResume.value);
        snackbar.value.value = true;
        snackbar.value.color = "green";
        snackbar.value.text = "Resume generated successfully!";
        setTimeout(() => {
            router.push({ name: "resumes" });
        }, 1500);
    } catch (error) {
        console.error(error);
        snackbar.value.value = true;
        snackbar.value.color = "error";
        snackbar.value.text = `There was an error generating the resume: ${error.response.data.message}`;
        loading.value = false;
    }
}

function closeSnackBar() {
    snackbar.value.value = false;
}

function divToggle() {
    alert('Not yet implemented');
}

</script>

<style scoped>
.hover-row:hover {
    background-color: #f8f9ff;
}

v-card-title:hover {
    cursor: pointer;
}

.fixed-footer {
    background-color: rgba(197, 202, 233, 0.9);
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    /* Center horizontally */
    align-items: center;
    /* Center vertically */

}

.thumbnail-image {
    transition: box-shadow 0.3s ease;
}

.thumbnail-image:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

:deep(.v-btn__content) {
    white-space: pre-wrap;
}

@media (min-width: 600px) {

    /* Vuetify's sm breakpoint starts at 600px */
    .mt-10-sm-and-up {
        margin-top: 40px;
        /* mt-10 in Vuetify typically means 40px */
    }
}
</style>

<template>
    <v-overlay :model-value="loading" contained persistent class="align-center justify-center">
        <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <v-container v-if="!loading && resumeData">
        <div id="body">
            <v-dialog v-model="dialog" max-width="600px">
                <v-card>
                    <v-img v-if="selectedTemplateId"
                        :src="`./template-thumbnails/template${selectedTemplateId}-thumbnail.png`"
                        alt="Template Thumbnail" style="max-width: 100%;" contain></v-img>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-row class="mb-4">
                <v-col cols="12 d-flex justify-center justify-sm-start">
                    <span class="pl-0 text-h4 font-weight-bold">Create a resume</span>
                </v-col>
            </v-row>

            <!-- Templates -->
            <v-row>
                <v-col cols="12" class="cursor-pointer d-flex justify-center justify-sm-start align-center">
                    <v-icon v-if="!showTemplates" @click="toggleSection('templates')">
                        mdi-plus-circle-outline</v-icon>
                    <v-icon v-if="showTemplates" @click="toggleSection('templates')">
                        mdi-minus-circle-outline</v-icon>
                    <span class="pl-0 text-h6 font-weight-bold">Choose a template</span>
                </v-col>
                <template v-if="showTemplates">
                    <v-col v-for="(template, index) in templates" :key="index" cols="6" lg="4" xl="3">
                        <v-row class="d-flex justify-center justify-sm-start" style="cursor: pointer;">
                            <v-col class="mr-6" cols="12" sm="4" md="3" lg="3"
                                @click="handleThumbnailClick(template.id)">
                                <!-- Thumbnail Image -->
                                <img :src="`./template-thumbnails/template${index + 1}-thumbnail.png`"
                                    alt="Template Thumbnail" style="max-width: 150px; max-height: 150px;"
                                    class="thumbnail-image" />
                            </v-col>
                            <v-col cols="12" sm="6">
                                <!-- Radio Button for Template Selection -->
                                <v-radio class="mt-10-sm-and-up" v-model="selectedTemplateId"
                                    :label="`Template ${index + 1}`" :value="template.id"
                                    :name="'template-selection-' + index"
                                    @click.stop="handleTemplateChange(template.id)"></v-radio>
                            </v-col>
                        </v-row>
                    </v-col>
                </template>
                <v-divider class="mt-8 mb-13"></v-divider>
            </v-row>

            <!-- Title -->
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-sm-start">
                    <span class="pl-0 text-h6 font-weight-bold">Resume Title</span>
                </v-col>
                <v-col class="p-0" cols="14" sm="6" md="4">
                    <v-text-field v-model="resumeTitle" label="Reume Title"
                        placeholder="Enter a resume title"></v-text-field>
                </v-col>
                <v-divider class="mt-8 mb-13"></v-divider>
            </v-row>

            <!-- Personal Information Section -->
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-sm-start">
                    <span class="pl-0 text-h6 font-weight-bold">Personal Information</span>
                </v-col>
                <v-col cols="12" sm="8" lg="4">
                    <template v-if="resumeData">
                        <v-text-field v-model="resumeData.full_name" label="Full Name"
                            placeholder="Enter your full name"></v-text-field>
                        <v-text-field v-model="resumeData.user_email" label="Email Address"
                            placeholder="Enter your email address"></v-text-field>
                        <v-text-field v-model="resumeData.user_phone_number" label="Phone Number"
                            placeholder="Enter your phone number"></v-text-field>
                        <v-text-field v-model="resumeData.website_url" label="Website URL"
                            placeholder="Enter your website URL"></v-text-field>
                        <v-text-field v-model="resumeData.location" label="Location"
                            placeholder="Enter your location"></v-text-field>
                        <v-textarea v-model="resumeData.summary" label="Summary"
                            placeholder="Enter a summary"></v-textarea>
                    </template>
                </v-col>
            </v-row>

            <!-- Job Experience Section -->
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-sm-start align-center">
                    <v-icon v-if="!showJobExperience" @click="toggleSection('jobExperience')">
                        mdi-plus-circle-outline</v-icon>
                    <v-icon v-if="showJobExperience" @click="toggleSection('jobExperience')">
                        mdi-minus-circle-outline</v-icon>
                    <span class="pl-0 text-h6 font-weight-bold">Job Experience</span>
                </v-col>
                <v-col>
                    <template v-if="jobExperienceData && jobExperienceData.length > 0">
                        <template v-if="showJobExperience">
                            <template v-for="experience in jobExperienceData" :key="experience.id">
                                <v-form>
                                    <v-row class="hover-row" @mouseover="hover = true" @mouseleave="hover = false">
                                        <v-col cols="12">
                                            <v-btn @click="divToggle()" color="#FF0000">Remove
                                                from this resume</v-btn>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="experience.employer" label="Employer"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="experience.job_title"
                                                label="Job Title"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="experience.city" label="City"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="3" md="2">
                                            <v-text-field v-model="experience.state" label="State"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="experience.start_year"
                                                label="Start Year (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="experience.end_year"
                                                label="End Year (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="experience.summary" label="Summary"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                <v-divider class="mt-8 mb-13"></v-divider>
                            </template>
                        </template>
                    </template>
                    <v-row>
                        <v-col class="d-flex justify-center justify-sm-start">
                            <v-btn @click="divToggle('add_job', 'submit_job', 'job_table', 'fill_job')" id="add_job"
                                color="#000235">Add
                                new job</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Education Section -->
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-sm-start align-center">
                    <v-icon v-if="!showEducation" @click="toggleSection('education')">
                        mdi-plus-circle-outline</v-icon>
                    <v-icon v-if="showEducation" @click="toggleSection('education')">
                        mdi-minus-circle-outline</v-icon>
                    <span class="pl-0 text-h6 font-weight-bold">Education</span>
                </v-col>
                <v-col>
                    <template v-if="educationData && educationData.length > 0">
                        <template v-if="showEducation">
                            <template v-for="education in educationData" :key="education.id">
                                <v-form>
                                    <v-row class="hover-row" @mouseover="hover = true" @mouseleave="hover = false">
                                        <v-col cols="12">
                                            <v-btn @click="divToggle()" color="#FF0000">Remove
                                                from
                                                this resume</v-btn>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="education.education_name"
                                                label="Education Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="education.location" label="Location"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="education.start_year"
                                                label="Start Year (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="education.end_year"
                                                label="End Year (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="education.degree_name"
                                                label="Degree Name"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="education.gpa" label="GPA"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="education.awards" label="Awards"></v-textarea>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="education.coursework" label="Coursework"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                <v-divider class="mt-8 mb-13"></v-divider>
                            </template>
                        </template>
                    </template>
                    <v-row>
                        <v-col class="d-flex justify-center justify-sm-start">
                            <v-btn
                                @click="divToggle('add_education', 'submit_education', 'education_table', 'fill_education')"
                                id="add_education" color="#000235">Add new education</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Projects Section -->
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-sm-start align-center">
                    <v-icon v-if="!showProjects" @click="toggleSection('projects')">
                        mdi-plus-circle-outline</v-icon>
                    <v-icon v-if="showProjects" @click="toggleSection('projects')">
                        mdi-minus-circle-outline</v-icon>
                    <span class="pl-0 text-h6 font-weight-bold">Projects</span>
                </v-col>
                <v-col>
                    <template v-if="projectsData && projectsData.length > 0">
                        <template v-if="showProjects">
                            <template v-for="project in projectsData" :key="project.id">
                                <v-form>
                                    <v-row class="hover-row" @mouseover="hover = true" @mouseleave="hover = false">
                                        <v-col cols="12">
                                            <v-btn @click="divToggle()" color="#FF0000">Remove from
                                                this
                                                resume</v-btn>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="project.project_title"
                                                label="Project Title"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="project.location" label="Location"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="project.start_year"
                                                label="Start Year (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="project.end_year"
                                                label="End Year (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="project.summary" label="Summary"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                <v-divider class="mt-8 mb-13"></v-divider>
                            </template>
                        </template>
                    </template>
                    <v-row>
                        <v-col class="d-flex justify-center justify-sm-start">
                            <v-btn @click="divToggle('add_project', 'submit_project', 'project_table', 'fill_project')"
                                id="add_project" color="#000235">Add new project</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Certificates Section -->
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-sm-start align-center">
                    <v-icon v-if="!showCertificates" @click="toggleSection('certificates')">
                        mdi-plus-circle-outline</v-icon>
                    <v-icon v-if="showCertificates" @click="toggleSection('certificates')">
                        mdi-minus-circle-outline</v-icon>
                    <span class="pl-0 text-h6 font-weight-bold">Certificates</span>
                </v-col>
                <v-col>
                    <template v-if="certificatesData && certificatesData.length > 0">
                        <template v-if="showCertificates">
                            <template v-for="certificate in certificatesData" :key="certificate.id">
                                <v-form>
                                    <v-row class="hover-row" @mouseover="hover = true" @mouseleave="hover = false">
                                        <v-col cols="12">
                                            <v-btn @click="divToggle()" color="#FF0000">Remove
                                                from this resume</v-btn>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="certificate.certificate_title"
                                                label="Certificate Title"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="certificate.issuer" label="Issuer"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="certificate.issue_date"
                                                label="Issue Date (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="4" md="4">
                                            <v-text-field v-model="certificate.expire_date"
                                                label="Expiration Date (MM/YYYY)"></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea v-model="certificate.summary" label="Summary"></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-form>
                                <v-divider class="mt-8 mb-13"></v-divider>
                            </template>
                        </template>
                    </template>
                    <v-row>
                        <v-col class="d-flex justify-center justify-sm-start">
                            <v-btn
                                @click="divToggle('add_certificate', 'submit_certificate', 'certificates_table', 'fill_certificate')"
                                id="add_certificate" color="#000235">Add new certificate</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>

            <!-- Skills Section -->
            <v-row class="mb-15">
                <v-col cols="12" class="d-flex justify-center justify-sm-start align-center">
                    <v-icon v-if="!showSkills" @click="toggleSection('skills')">
                        mdi-plus-circle-outline</v-icon>
                    <v-icon v-if="showSkills" @click="toggleSection('skills')">
                        mdi-minus-circle-outline</v-icon>
                    <span class="pl-0 text-h6 font-weight-bold">Skills</span>
                </v-col>
                <v-col>
                    <template v-if="showSkills">
                        <v-row>
                            <template v-for="(skill, index) in skillsData" :key="index">
                                <v-col cols="12" sm="6" md="4" lg="3">
                                    <v-text-field v-model="skill.name" label="Skill"></v-text-field>
                                </v-col>
                            </template>
                        </v-row>
                    </template>
                    <v-row>
                        <v-col class="d-flex justify-center justify-sm-start">
                            <v-btn @click="divToggle()" color="#000235">Add Skill</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-container>
    <v-footer v-if="!loading && resumeData" class="fixed-footer pt-3 pb-3" elevation="24">
        <v-row>
            <v-col col="12" class="d-flex justify-center justify-sm-end align-center">
                <v-btn rounded="xl" size="large" color="primary" @click="generateResume();">Generate
                    Resume</v-btn>
            </v-col>
            <v-col col="12" class="d-flex align-center">
                <v-btn rounded="xl" size="small" color="error" @click="router.push('resumes')">Cancel</v-btn>
            </v-col>
        </v-row>
    </v-footer>
    <v-container v-else-if="!loading && !resumeData">
        <v-col col="12">
            <p class="pl-0 text-h6 font-weight-bold d-flex text-center text-sm-start">You are missing professional
                resume
                information. You need to add some details about yourself before you can generate a resume</p>
        </v-col>
        <v-col col="12" class="d-flex justify-center justify-sm-start align-center">
            <v-btn rounded="xl" size="large" color="primary" @click="router.push('userCrud')">Manage Profile</v-btn>
        </v-col>
    </v-container>
    <v-snackbar v-model="snackbar.value" rounded="pill" location="center">
        {{ snackbar.text }}
        <template v-slot:actions>
            <v-btn :color="snackbar.color" text @click="closeSnackBar">
                Close
            </v-btn>
        </template>
    </v-snackbar>
</template>