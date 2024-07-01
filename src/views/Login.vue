<script setup>
// Future work
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
    <div class="login">
      <div class="div">
        <div class="nav-bar">
          <div @click="router.push({ name: 'homepage'})" class="resume-builder" style="cursor: pointer;">
            Resume
            <br />
            Builder
          </div>
          <div @click="router.push({ name: 'login'})" class="text-wrapper" style="cursor:pointer;">Login</div>
        <div @click="router.push({ name: 'signup'})" class="text-wrapper-2" style="cursor: pointer;">Sign Up</div>
        </div>
        <LoginLogo
          class="object-other-12"
          :loginLogo="loginLogo"
          objectOtherClassName="object-other-instance"
        />
        <div @click="router.push({ name: 'studentprofile'})" class="overlap-group-wrapper" style="cursor:pointer;">
          <div class="overlap-group">
            <div class="text-wrapper-3">LOGIN</div>
          </div>
        </div>
        <div class="email">
          <div class="textFieldBorder" />
          <div class="textField" />
          <v-text-field label="Email"></v-text-field>
        </div>
        <div class="password">
          <div class="overlap">
            <div class="textFieldBorder" />
            <div class="textField" />
            <v-text-field label="Password"></v-text-field>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import LoginLogo from "../components/LoginLogo.vue";
  
  export default {
    name: "Login",
    components: {
      LoginLogo,
    },
    data() {
      return {
        loginLogo: "https://c.animaapp.com/QWheEV06/img/object-other-12-1@2x.png",
      };
    },
  };
  </script>
  
  <style>
  .login {
    background-color: #000235;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .login .div {
    background-color: #000235;
    height: 964px;
    position: relative;
    width: 1440px;
  }
  
  .login .nav-bar {
    height: 60px;
    left: 188px;
    position: absolute;
    top: 38px;
    width: 1057px;
  }
  
  .login .resume-builder {
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
  
  .login .text-wrapper {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 400;
    left: 720px;
    letter-spacing: 0;
    line-height: 27.5px;
    position: absolute;
    top: 15px;
    white-space: nowrap;
    width: 151px;
  }
  
  .login .text-wrapper-2 {
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
  
  .login .object-other-12 {
    height: 146px !important;
    left: 621px !important;
    position: absolute !important;
    top: 184px !important;
    width: 197px !important;
  }
  
  .login .object-other-instance {
    height: 146px !important;
    left: 5px !important;
    top: -44px !important;
    width: 197px !important;
  }
  
  .login .overlap-group-wrapper {
    height: 102px;
    left: 596px;
    position: absolute;
    top: 621px;
    width: 257px;
  }
  
  .login .overlap-group {
    background-image: url(https://c.animaapp.com/QWheEV06/img/rectangle-20.svg);
    background-size: 100% 100%;
    height: 102px;
    position: relative;
    width: 255px;
  }
  
  .login .text-wrapper-3 {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 88px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 40px;
    white-space: nowrap;
    width: 92px;
  }
  
  .login .password {
    height: 79px;
    left: 457px;
    position: absolute;
    top: 467px;
    width: 525px;
  }
  
  .login .overlap {
    height: 79px;
    position: relative;
  }
  
  .login .textFieldBorder {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 525px;
  }
  
  .login .email {
    height: 80px;
    left: 458px;
    position: absolute;
    top: 366px;
    width: 525px;
  }
  
  .login .textField {
    background-color: #d9d9d9;
    height: 53px;
    left: 0;
    position: absolute;
    top: 3px;
    width: 525px;
  }
  </style>