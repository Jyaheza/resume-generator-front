<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

async function addNewResume()
{
    alert('No function yet');
}

async function commentResu()
{
    alert("No function yet");
}

async function logout()
{
    alert("No function yet");
}

async function resumeBuilderButton()
{
    alert("Should go to homepage or dashboard depending if user is logged in");
}

async function resumePlaceholder()
{
    alert("Clickable resumes go here maybe?");
}

</script>

<template>
    <div class="profile-page-career">
      <div class="div">
        <div class="nav-bar">
          <div @click="resumeBuilderButton" class="resume-builder" style="cursor: pointer;">
            Resume
            <br />
            Builder
          </div>
          <div @click="router.push({ name: 'careerservprofile' })" class="text-wrapper" style="cursor: pointer;">First name <br /> Last name</div>
          <div class="text-wrapper-2">Services</div>
        </div>
        <div class="overlap">
          <div class="sidedash-container" />
          <div @click="router.push({ name: 'careerservprofile'})" class="my-dashboard" style="cursor: pointer;">
            <div class="overlap-group-wrapper">
              <div class="overlap-group">
                <div class="text-wrapper-3">My Dashboard</div>
              </div>
            </div>
          </div>
          <div @click="addNewResume()" class="add-resume-container" style="cursor: pointer;">
            <CreateNewResumeLogo class="create-resume-logo-instance"/>
            <div class="add-resume-text">Add New Student Resume</div>
          </div>
          <div @click="commentResume()" class="match-resume-job" style="cursor: pointer;">
            <MatchResumeLogo class="match-resume-logo-instance" />
            <div class="match-resume-text">Comment on Resume</div>
          </div>
          <div class="resume-list-group">
            <div class="resume-list-container">
              <div @click="resumePlaceholder()" class="resume-placeholder" style="cursor: pointer;" />
              <div class="resume-placeholder-text">Resume goes here</div>
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
  import MatchResumeLogo from "../components/MatchResumeLogo.vue";
  import CreateNewResumeLogo from "../components/CreateNewResumeLogo.vue";
  import LogoutLogo from "../components/LogoutLogo.vue";
  
  export default {
    name: "ProfilePageStudent",
    components: {
      MatchResumeLogo,
      CreateNewResumeLogo,
      LogoutLogo
    },
  };
  </script>
  
  <style>
  .profile-page-career {
    background-color: #000235;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .profile-page-career .div {
    background-color: #000235;
    height: 955px;
    overflow: hidden;
    position: relative;
    width: 1440px;
  }
  
  .profile-page-career .nav-bar {
    box-shadow: 0px 4px 4px #00000040;
    height: 60px;
    left: 188px;
    position: absolute;
    top: 38px;
    width: 1057px;
  }
  
  .profile-page-career .resume-builder {
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
  
  .profile-page-career .text-wrapper {
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
  
  .profile-page-career .text-wrapper-2 {
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
  
  .profile-page-career .overlap {
    height: 824px;
    left: -2px;
    position: absolute;
    top: 140px;
    width: 1444px;
  }
  
  .profile-page-career .sidedash-container {
    box-shadow: inset 0px 4px 4px #00000040;
    height: 100%;
    left: 3px;
    position: absolute;
    top: 0;
    width: 330px;
  }
  
  .profile-page-career .my-dashboard {
    height: 68px;
    left: 0;
    position: absolute;
    top: 0;
    width: 332px;
  }
  
  .profile-page-career .overlap-group-wrapper {
    height: 68px;
    width: 334px;
  }
  
  .profile-page-career .overlap-group {
    background-image: url(https://c.animaapp.com/UcVazUAh/img/mydashboardrectangle.svg);
    background-size: 100% 100%;
    height: 68px;
    left: 2px;
    position: relative;
    width: 330px;
  }
  
  .profile-page-career .text-wrapper-3 {
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
  
  .profile-page-career .add-resume-container {
    height: 64px;
    left: 3px;
    position: absolute;
    top: 83px;
    width: 329px;
  }

  .profile-page-career .logout-container {
    height: 64px;
    left: 3px;
    position: absolute;
    top: 241px;
    width: 329px;
  }

  .profile-page-career .logout-text {
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
  
  .profile-page-career .match-resume-job {
    height: 47px;
    left: 3px;
    position: absolute;
    top: 162px;
    width: 331px;
  }
  
  .profile-page-career .match-resume-logo-instance {
    left: 10px !important;
    position: absolute !important;
    top: 3px !important;
  }

  .profile-page-career .create-resume-logo-instance {
    left: 10px !important;
    position: absolute !important;
    top: 3px !important;
  }

  .profile-page-career .logout-instance {
    left: 10px !important;
    position: absolute !important;
    top: 3px !important;
  }
  
  .profile-page-career .match-resume-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 63px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 9px;
    white-space: nowrap;
    width: 247px;
  }

  .profile-page-career .add-resume-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 60px;
    letter-spacing: 1.6px;
    line-height: 37px;
    position: absolute;
    top: 9px;
    white-space: nowrap;
    width: 230px;
  }
  
  .profile-page-career .resume-list-group {
    height: 815px;
    left: 332px;
    position: absolute;
    top: 0;
    width: 1112px;
  }
  
  .profile-page-career .resume-list-container {
    height: 815px;
    position: relative;
    width: 1110px;
    overflow: auto;
  }
  
  .profile-page-career .resume-placeholder {
    border: 1px dashed;
    border-color: #86c6cd;
    border-radius: 10px;
    height: 204px;
    left: 19px;
    position: absolute;
    top: 18px;
    width: 170px;
  }
  
  .profile-page-career .resume-placeholder-text {
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