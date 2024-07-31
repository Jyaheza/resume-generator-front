<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import CertificatesServices from "../services/CertificatesServices.js";

const certificates = ref([]);
const isAdd = ref(false);
const isEdit = ref(false);
const user = ref(null);
user.value = JSON.parse(localStorage.getItem("user"));
const snackbar = ref({
    value: false,
    color: "",
    text: "",
});

const newCertificate = ref({
    certificate_title: "",
    issuer: "",
    cert_url: "",
    summary: "",
    issue_date: "",
    expire_date: "",
    user_id: ""
});

onMounted(async () => {
    await getCertificates();
    user.value = JSON.parse(localStorage.getItem("user"));
});

async function getCertificates() {
    await CertificatesServices.getCertificatesByUserId(user.value.id)
        .then((response) => {
            certificates.value = response.data;
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        });
}

async function addCertificate() {
    isAdd.value = false;
    newCertificate.value.user_id = user.value.id;
    // delete newCertificate.id;
    await CertificatesServices.addCertificate(newCertificate.value)
        .then(() => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = `${newCertificate.value.name} added successfully!`;
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        });
    await getCertificates();
}

async function updateCertificate() {
    isEdit.value = false;
    await CertificatesServices.updateCertificate(newCertificate.value.id, newCertificate.value)
        .then(() => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = `${newCertificate.name} updated successfully!`;
        })
        .catch((error) => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        });
    await getCertificates();
}

async function deleteCertificate(item) {
    if (confirm('Are you sure you want to delete ' + item.certificate_title)) {
        CertificatesServices.deleteCertificate(item.id);
    }
    await getCertificates();
}

function openAdd() {
    newCertificate.value.certificate_title = "";
    newCertificate.value.issuer = "";
    newCertificate.value.cert_url = "";
    newCertificate.value.summary = "";
    newCertificate.value.issue_date = "";
    newCertificate.value.expire_date = "";
    newCertificate.value.user_id = "";
    isAdd.value = true;
}

function closeAdd() {
    isAdd.value = false;
}

function openEdit(item) {
    newCertificate.value.id = item.id;
    newCertificate.value.certificate_title = item.certificate_title;
    newCertificate.value.issuer = item.issuer;
    newCertificate.value.cert_url = item.cert_url;
    newCertificate.value.summary = item.summary;
    newCertificate.value.issue_date = item.issue_date;
    newCertificate.value.expire_date = item.expire_date;
    newCertificate.value.user_id = item.user_id;
    isEdit.value = true;
}

function closeEdit() {
    isEdit.value = false;
}

function closeSnackBar() {
    snackbar.value.value = false;
}
</script>

<template>
    <v-container>
        <div id="body">
            <v-row align="center">
                <v-col cols="12" md="2" class="d-flex justify-center justify-md-start">
                    <v-btn color="primary" icon to="/userCrud">
                        <v-icon>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="12" md="6" class="text-center text-md-start">
                    <v-card-title class="pl-0 text-h4 text-wrap font-weight-bold">
                        Professional Certificates
                    </v-card-title>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="d-flex justify-center justify-md-end">
                    <v-btn v-if="user !== null" color="primary" @click="openAdd()">Add</v-btn>
                </v-col>
            </v-row>
            <v-row class="d-none d-md-flex">
                <v-col cols="4" class="bg-indigo-lighten-2"><strong>Certificate Title</strong></v-col>
                <v-col cols="2" class="bg-indigo-lighten-2"><strong>Issuer</strong></v-col>
                <v-col cols="2" class="bg-indigo-lighten-2"><strong>Issued On</strong></v-col>
                <v-col cols="2" class="bg-indigo-lighten-2"><strong>Expires On</strong></v-col>
                <v-col cols="2" class="bg-indigo-lighten-2"><strong>Actions</strong></v-col>
            </v-row>
            <v-row v-for="item in certificates" :key="item.id">
                <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Certificate Title</strong></v-col>
                <v-col cols="8" md="4">{{ item.certificate_title }}</v-col>

                <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Issuer</strong></v-col>
                <v-col cols="8" md="2">{{ item.issuer }}</v-col>

                <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Issued On</strong></v-col>
                <v-col cols="8" md="2">{{ item.issue_date }}</v-col>

                <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Expires On</strong></v-col>
                <v-col cols="8" md="2">{{ item.expire_date }}</v-col>

                <v-col cols="4" class="bg-indigo-lighten-2 d-md-none text-right"><strong>Actions</strong></v-col>
                <v-col cols="8" md="2">
                    <v-icon size="small" icon="mdi-pencil" @click="openEdit(item)"></v-icon>
                    <v-icon size="large" icon="mdi-delete" @click="deleteCertificate(item)"></v-icon>
                </v-col>
                <v-divider class="d-block"></v-divider>
            </v-row>

            <v-dialog persistent :model-value="isAdd || isEdit" width="800">
                <v-card class="rounded-lg elevation-5">
                    <v-card-item>
                        <v-card-title class="headline mb-2">{{ isAdd ? "Add Certificate" : isEdit ? "Edit Certificate" :
                            "" }}
                        </v-card-title>
                    </v-card-item>
                    <v-card-text>
                        <v-text-field v-model="newCertificate.certificate_title" label="Certificate Title"
                            required></v-text-field>
                        <v-text-field v-model="newCertificate.issuer" label="Issuer" required></v-text-field>
                        <v-text-field v-model="newCertificate.cert_url" label="Url" required></v-text-field>
                        <v-textarea v-model="newCertificate.summary" label="Summary" maxlength="120" counter single-line
                            required></v-textarea>
                        <v-row align="center" class="mb-4">
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="newCertificate.issue_date" label="Issue Date"
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                                <v-text-field v-model="newCertificate.expire_date" label="Expire Date"
                                    required></v-text-field>
                            </v-col>
                        </v-row>

                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn variant="flat" color="secondary"
                            @click="isAdd ? closeAdd() : isEdit ? closeEdit() : false">Close</v-btn>
                        <v-btn variant="flat" color="primary" @click="
                            isAdd ? addCertificate() : isEdit ? updateCertificate() : false
                            ">{{
                                isAdd ? "Add Certificate" : isEdit ? "Update Certificate" : ""
                            }}</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-snackbar v-model="snackbar.value" rounded="pill">
                {{ snackbar.text }}

                <template v-slot:actions>
                    <v-btn :color="snackbar.color" variant="text" @click="closeSnackBar()">
                        Close
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
    </v-container>
</template>
