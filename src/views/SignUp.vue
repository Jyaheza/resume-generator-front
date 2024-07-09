<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
    <div class="sign-up">
      <div class="div">
        <div class="nav-bar">
          <div @click="router.push({ name: 'homepage'})" class="resume-builder" style="cursor: pointer;">
            Resume
            <br />
            Builder
          </div>
          <div @click="router.push({ name: 'login'})" class="text-wrapper" style="cursor: pointer;">Login</div>
          <div @click="router.push({ name: 'signup'})" class="text-wrapper-2" style="cursor: pointer;">Sign Up</div>
        </div>
        <SignUpLogo
          class="object-other-12"
          :signUpLogo="signUpLogo"
          objectOtherClassName="object-other-instance"
        />
        <div @click="" class="group" style="cursor: pointer;">
          <div class="overlap-group-wrapper">
            <div class="overlap-group">
              <div class="text-wrapper-3">SIGN UP</div>
            </div>
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
        <div class="first-name">
          <div class="overlap">
            <div class="textFieldBorder" />
            <div class="textField" />
            <v-text-field label="First name"></v-text-field>
          </div>
        </div>
        <div class="last-name">
          <div class="overlap">
            <div class="textFieldBorder" />
            <div class="textField" />
            <v-text-field label="Last name"></v-text-field>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import SignUpLogo from "../components/SignUpLogo.vue";

export default {
name: "SignUp",
components: {
    SignUpLogo,
},
data() {
    return {
    signUpLogo: "https://c.animaapp.com/xHwTat1l/img/object-other-12-1@2x.png",
    };
  },
};
</script>
  
<style>
  .sign-up {
    background-color: #000235;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .sign-up .div {
    background-color: #000235;
    height: 1095px;
    position: relative;
    width: 1440px;
  }
  
  .sign-up .nav-bar {
    height: 60px;
    left: 188px;
    position: absolute;
    top: 38px;
    width: 1057px;
  }
  
  .sign-up .resume-builder {
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
  
  .sign-up .text-wrapper {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 400;
    left: 720px;
    letter-spacing: 0;
    line-height: 27.5px;
    position: absolute;
    top: 17px;
    width: 151px;
  }
  
  .sign-up .text-wrapper-2 {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 400;
    left: 900px;
    letter-spacing: 0;
    line-height: 27.5px;
    position: absolute;
    top: 17px;
    width: 151px;
  }
  
  .sign-up .object-other-12 {
    height: 146px !important;
    left: 621px !important;
    position: absolute !important;
    top: 184px !important;
    width: 197px !important;
  }
  
  .sign-up .object-other-instance {
    height: 146px !important;
    left: 5px !important;
    top: -44px !important;
    width: 197px !important;
  }
  
  .sign-up .group {
    height: 102px;
    left: 593px;
    position: absolute;
    top: 854px;
    width: 255px;
  }
  
  .sign-up .overlap-group-wrapper {
    height: 102px;
    width: 257px;
  }
  
  .sign-up .overlap-group {
    background-image: url(https://c.animaapp.com/xHwTat1l/img/rectangle-20.svg);
    background-size: 100% 100%;
    height: 102px;
    position: relative;
    width: 255px;
  }
  
  .sign-up .text-wrapper-3 {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 83px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 38px;
    white-space: nowrap;
    width: 92px;
  }
  
  .sign-up .overlap {
    height: 53px;
    position: relative;
  }

  .sign-up .email {
    height: 53px;
    left: 458px;
    position: absolute;
    top: 363px;
    width: 525px;
  }

  .sign-up .password {
    height: 53px;
    left: 457px;
    position: absolute;
    top: 464px;
    width: 525px;
  }
  
  .sign-up .first-name {
    height: 53px;
    left: 457px;
    position: absolute;
    top: 565px;
    width: 525px;
  }
  
  .sign-up .last-name {
    height: 53px;
    left: 458px;
    position: absolute;
    top: 666px;
    width: 525px;
  }

  .sign-up .textFieldBorder {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 525px;
  }
  
  .sign-up .textField {
    background-color: #d9d9d9;
    height: 51px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 525px;
  }

  .sign-up .p {
  color: #ffffff;
  font-family: var(--h1-main-heading-font-family);
  font-size: var(--body-text-font-size);
  font-style: var(--h1-main-heading-font-style);
  font-weight: var(--h1-main-heading-font-weight);
  left: 0px;
  letter-spacing: var(--body-text-letter-spacing);
  line-height: var(--body-text-line-height);
  position: absolute;
  top: 77px;
  width: 373px;
 }

</style>