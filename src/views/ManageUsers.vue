<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import UserServices from '../services/UserServices';

const users = ref(null);
const isEditName = ref(false);

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

async function deleteUser(item)
{
  if(confirm('Are you sure you want to delete ' + item.firstName + ' ' + item.lastName
   + ' with ID: ' + item.id)) {
    UserServices.deleteUser(item.id);
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
            <v-card variant="elevated">
                <v-row>
                    <v-card-title class="text-h4 font-weight-bold">Users</v-card-title>
                </v-row>
                <v-data-table density="compact">
                    <thead>
                        <tr>
                            <th>Name
                            </th>
                            <th>Role</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Table for the users and their information -->
                        <tr v-for="(item) in users" :key="item">
                            <td>
                                <v-card-text class="d-inline">{{ item.firstName }} {{ item.lastName }}</v-card-text>
                            </td>
                            <td>{{ item.role }}
                                <!-- Menu to pop up to select which user role to change to  -->
                                <v-menu transition="scale-transition">
                                    <template template v-slot:activator="{ props }">
                                        <v-btn variant="flat" size="small" icon="mdi-dots-vertical" v-bind="props" />
                                    </template>
                                    <v-list>
                                        <v-list-item v-for="(items, i) in roles" :key="i" :value="i">
                                            <v-list-item-title @click="editRole(i, item)">{{ items
                                                }}</v-list-item-title>
                                        </v-list-item>
                                    </v-list>
                                </v-menu>
                            </td>
                            <td>{{ item.email }}</td>
                            <td>
                                <v-icon icon="mdi-pencil" size="small" variant="flat" @click="editUser(item)"></v-icon>
                                <v-icon icon="mdi-delete" size="small" variant="flat" @click="deleteUser(item)" />
                            </td>
                        </tr>
                    </tbody>
                </v-data-table>
                <v-dialog :model-value="isEditName" width="800">
                    <v-card class="rounded-lg elevation-5">
                        <v-card-item>
                            <v-card-title class="headline mb-2">
                                {{ isEditName ? "Edit User" : "" }}
                            </v-card-title>
                        </v-card-item>
                        <v-card-text>
                            <v-text-field v-model="newInfo.firstName" label="First name" required></v-text-field>
                            <v-text-field v-model="newInfo.lastName" label="Last name" required></v-text-field>
                            <v-text-field v-model="newInfo.email" label="Email" required></v-text-field>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn variant="flat" color="secondary"
                                @click="isEditName ? closeEdit() : false">Close</v-btn>
                            <v-btn variant="flat" color="primary" 
                            @click="saveUser()">{{ isEditName ? "Update User Profile" : "" }}</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
                <v-row>
                    <v-col cols="auto">
                        <v-btn @click="getUsers()" color="#000235" variant="flat">
                            show users
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </div>
    </v-container>
</template> 