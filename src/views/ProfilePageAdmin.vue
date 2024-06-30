<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

async function logout()
{
    alert("No function yet");
}

async function accountsPlaceholder()
{
    alert("Clickable accounts go here maybe?");
}

</script>

<template>
    <div class="profile-page-admin">
      <div class="div">
        <div class="nav-bar">
          <div @click="resumeBuilderButton" class="resume-builder" style="cursor: pointer;">
            Resume
            <br />
            Builder
          </div>
          <div @click="router.push({ name: 'adminprofile' })" class="text-wrapper" style="cursor: pointer;">First name <br /> Last name</div>
          <div class="text-wrapper-2">Admin</div>
        </div>
        <div class="overlap">
          <div class="sidedash-container" />
          <div @click="router.push({ name: 'adminprofile'})" class="my-dashboard" style="cursor: pointer;">
            <div class="overlap-group-wrapper">
              <div class="overlap-group">
                <div class="text-wrapper-3">My Dashboard</div>
              </div>
            </div>
          </div>
          <div class="account-list-group">
            <div class="account-list-container">
              <div @click="accountsPlaceholder()" class="account-placeholder" style="cursor: pointer;" />
              <div class="account-placeholder-text">Accounts go here</div>
            </div>
          </div>
          <div @click="logout()" class="logout-container" style="cursor: pointer;">
            <LogoutLogo class="logout-instsance" />
            <div class="logout-text">Logout</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LogoutLogo from "../components/LogoutLogo.vue";
  
  export default {
    name: "ProfilePageStudent",
    components: {
      LogoutLogo
    },
  };
  </script>
  
  <style>
  .profile-page-admin {
    background-color: #000235;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .profile-page-admin .div {
    background-color: #000235;
    height: 955px;
    overflow: hidden;
    position: relative;
    width: 1440px;
  }
  
  .profile-page-admin .nav-bar {
    box-shadow: 0px 4px 4px #00000040;
    height: 60px;
    left: 188px;
    position: absolute;
    top: 38px;
    width: 1057px;
  }
  
  .profile-page-admin .resume-builder {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 700;
    left: 0;
    letter-spacing: 0;
    line-height: 27.5px;
    position: absolute;
    top: 0;
    width: 125px;
  }
  
  .profile-page-admin .text-wrapper {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 400;
    left: 720px;
    letter-spacing: 0;
    line-height: 27.5px;
    position: absolute;
    top: 0px;
    white-space: nowrap;
    width: 151px;
  }
  
  .profile-page-admin .text-wrapper-2 {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 400;
    left: 900px;
    letter-spacing: 0;
    line-height: 27.5px;
    position: absolute;
    top: 15px;
    white-space: nowrap;
    width: 151px;
  }
  
  .profile-page-admin .overlap {
    height: 824px;
    left: -2px;
    position: absolute;
    top: 140px;
    width: 1444px;
  }
  
  .profile-page-admin .sidedash-container {
    box-shadow: inset 0px 4px 4px #00000040;
    height: 100%;
    left: 3px;
    position: absolute;
    top: 0;
    width: 330px;
  }
  
  .profile-page-admin .my-dashboard {
    height: 68px;
    left: 0;
    position: absolute;
    top: 0;
    width: 332px;
  }
  
  .profile-page-admin .overlap-group-wrapper {
    height: 68px;
    width: 334px;
  }
  
  .profile-page-admin .overlap-group {
    background-image: url(https://c.animaapp.com/UcVazUAh/img/mydashboardrectangle.svg);
    background-size: 100% 100%;
    height: 68px;
    left: 2px;
    position: relative;
    width: 330px;
  }
  
  .profile-page-admin .text-wrapper-3 {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 79px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 19px;
    white-space: nowrap;
    width: 197px;
  }
  
  .profile-page-admin .logout-container {
    height: 64px;
    left: 3px;
    position: absolute;
    top: 83px;
    width: 329px;
  }

  .profile-page-admin .logout-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 100px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 9px;
    white-space: nowrap;
    width: 100px;
  }

  .profile-page-admin .logout-instance {
    left: 10px !important;
    position: absolute !important;
    top: 3px !important;
  }
  
  
  .profile-page-admin .account-list-group {
    height: 815px;
    left: 332px;
    position: absolute;
    top: 0;
    width: 1112px;
  }
  
  .profile-page-admin .account-list-container {
    height: 815px;
    position: relative;
    width: 1110px;
    overflow: auto;
  }
  
  .profile-page-admin .account-placeholder {
    border: 1px dashed;
    border-color: #86c6cd;
    border-radius: 10px;
    height: 204px;
    left: 19px;
    position: absolute;
    top: 18px;
    width: 170px;
  }
  
  .profile-page-admin .account-placeholder-text {
    color: #86c6cd;
    font-family: "Outfit", Helvetica;
    font-size: 13px;
    font-weight: 100;
    left: 40px;
    letter-spacing: 1.04px;
    line-height: 27.5px;
    position: absolute;
    top: 105px;
    white-space: nowrap;
    width: 127px;
  }
  </style>