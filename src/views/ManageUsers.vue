<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from '../services/UserServices';

const users = ref(null);
const isEditName = ref(false);
const user = ref(null);
const loading = ref(false);
user.value = JSON.parse(localStorage.getItem("user"));

const newInfo = ref({
    id: undefined,
    role: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined
});

const roles = ref({
    student: 'student',
    career_serv: 'career services',
    admin: 'admin'
})

const snackbar = ref({
    value: false,
    color: "",
    text: "",
});


const router = useRouter();

onMounted(async () => {
    loading.value = true;
    if (user.value) {
        try {
            await getUsers();
            loading.value = false;
        } catch (error) {
            console.error("Error fetching data:", error);
            resumesData.value = [];
            loading.value = false;
        }
    }
});

async function getUsers() {
    await UserServices.getUser()
        .then(response => {
            users.value = response.data;
        })
        .catch(error => {
            console.log(error);
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        })
}

async function deleteUser(item) {
    if (confirm('Are you sure you want to delete ' + item.firstName + ' ' + item.lastName
        + ' with ID: ' + item.id)) {
        await UserServices.deleteUser(item.id);
    }
    await getUsers();
}

async function editRole(selected, item) {
    // Set the selected user and their new role and update the database
    newInfo.value.firstName = item.firstName;
    newInfo.value.lastName = item.lastName;
    newInfo.value.email = item.email;
    newInfo.value.id = item.id;
    newInfo.value.role = selected;
    await UserServices.updateUsers(newInfo.value)
        .then(() => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = `${newInfo.firstName} updated successfully!`;
        })
        .catch((error) => {
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        });
    // Refresh the table automatically
    await getUsers();
}

function editUser(item) {
    newInfo.value.firstName = item.firstName;
    newInfo.value.lastName = item.lastName;
    newInfo.value.email = item.email;
    newInfo.value.id = item.id;
    newInfo.value.role = item.role;
    isEditName.value = true;
}

async function saveUser() {
    await UserServices.updateUsers(newInfo.value)
        .then(() => {
            snackbar.value.value = true;
            snackbar.value.color = "green";
            snackbar.value.text = `${newInfo.firstName} updated successfully!`;
        })
        .catch((error) => {
            snackbar.value.value = true;
            snackbar.value.color = "error";
            snackbar.value.text = error.response.data.message;
        });
    // Refresh the table automatically
    await getUsers();
    isEditName.value = false;
}

function closeEdit() {
    isEditName.value = false;
}
</script>

<template>
    <v-container>
        <div id="body">
            <v-overlay :model-value="loading" contained persistent class="align-center justify-center">
                <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
            </v-overlay>
            <v-card variant="elevated" class="pa-4">
                <v-row>
                    <v-card-title class="text-h4 font-weight-bold">Users</v-card-title>
                </v-row>
                <!-- Header for large screens -->
                <v-row class="d-none d-sm-flex">
                    <v-col cols="4" class="bg-indigo-lighten-2"><strong>Name</strong></v-col>
                    <v-col cols="2" class="bg-indigo-lighten-2"><strong>Role</strong></v-col>
                    <v-col cols="4" class="bg-indigo-lighten-2"><strong>Email</strong></v-col>
                    <v-col cols="2" class="bg-indigo-lighten-2"><strong>Actions</strong></v-col>
                </v-row>

                <!-- User rows -->
                <v-row v-for="item in users" :key="item.id">
                    <!-- Header for small screens -->
                    <v-col cols="4" class="bg-indigo-lighten-2 d-sm-none text-right border-b-sm"><strong>Name </strong></v-col>
                    <v-col cols="8" sm="4">{{ item.firstName }} {{ item.lastName }}</v-col>

                    <!-- Header for small screens -->
                    <v-col cols="4" class="bg-indigo-lighten-2 d-sm-none text-right border-b-sm"><strong>Role </strong></v-col>
                    <v-col cols="8" sm="2">
                        {{ item.role }}
                        <v-menu transition="scale-transition">
                            <template v-slot:activator="{ props }">
                                <v-btn variant="flat" size="small" icon="mdi-dots-vertical" v-bind="props" />
                            </template>
                            <v-list>
                                <v-list-item v-for="(role, i) in roles" :key="i" @click="editRole(i, item)">
                                    <v-list-item-title>{{ role }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-col>

                    <!-- Header for small screens -->
                    <v-col cols="4" class="bg-indigo-lighten-2 d-sm-none text-right border-b-sm"><strong>Email</strong></v-col>
                    <v-col cols="8" sm="4">{{ item.email }}</v-col>
                    <!-- Header for small screens -->
                    <v-col cols="4" class="bg-indigo-lighten-2 d-sm-none text-right border-b-sm"><strong>Actions</strong></v-col>
                    <v-col cols="8" sm="2">
                        <v-icon icon="mdi-pencil" size="small" variant="flat" class="mr-4" @click="editUser(item)"></v-icon>
                        <v-icon icon="mdi-delete" size="small" variant="flat" @click="deleteUser(item)" />
                    </v-col>
                    <v-divider class="d-block"></v-divider>
                </v-row>

                <!-- Edit User Dialog -->
                <v-dialog :model-value="isEditName" width="800">
                    <v-card class="rounded-lg elevation-5">
                        <v-card-item>
                            <v-card-title class="headline mb-2">{{ isEditName ? "Edit User" : "" }}</v-card-title>
                        </v-card-item>
                        <v-card-text>
                            <v-text-field v-model="newInfo.firstName" label="First name" required></v-text-field>
                            <v-text-field v-model="newInfo.lastName" label="Last name" required></v-text-field>
                            <v-text-field v-model="newInfo.email" label="Email" required></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="flat" color="secondary" @click="closeEdit">Close</v-btn>
                            <v-btn variant="flat" color="primary" @click="saveUser">
                                {{ isEditName ? "Update User Profile" : "" }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-card>
        </div>
    </v-container>
</template>