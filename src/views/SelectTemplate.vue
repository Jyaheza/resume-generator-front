<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
    <div class="select-template">
      <div class="div">
        <div class="nav-bar">
          <div class="resume-builder">
            Resume
            <br />
            Builder
          </div>
          <div class="text-wrapper">First Name<br/> Last Name</div>
          <div class="text-wrapper-2">Student</div>
        </div>
        <div class="overlap">
          <div class="resume-list-group">
            <div class="overlap-group">
              <div class="div-wrapper">
                <div class="text-wrapper-3">Resume Template</div>
              </div>
              <div class="overlap-2">
                <div class="text-wrapper-4">Resume Template</div>
              </div>
              <div class="overlap-3">
                <div class="text-wrapper-5">Resume Template</div>
              </div>
              <div class="overlap-4">
                <div class="text-wrapper-6">Reume Template</div>
              </div>
            </div>
          </div>
          <div @click="router.push({ name: 'studentprofile'})" class="generate" style="cursor: pointer;">
            <div class="generate-text-wrapper">
              <div class="generate-text">GENERATE</div>
            </div>
          </div>
        </div>
        <div class="steps-groups">
          <div @click="router.push({ name: 'createresume'})" class="fill-resume-info" style="cursor: pointer;">
            <p class="p">Step 1: Fill Resume Info</p>
          </div>
          <div class="choose-template">
            <div class="text-wrapper-7">Step 2: Choose Template</div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SelectTemplate",
  };
  </script>
  
<style>
  .select-template {
    background-color: #000235;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .select-template .div {
    background-color: #000235;
    height: 955px;
    position: relative;
    width: 1440px;
  }
  
  .select-template .nav-bar {
    box-shadow: 0px 4px 4px #00000040;
    height: 60px;
    left: 188px;
    position: absolute;
    top: 38px;
    width: 1057px;
  }
  
  .select-template .resume-builder {
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
  
  .select-template .text-wrapper {
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
  
  .select-template .text-wrapper-2 {
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
  
  .select-template .overlap {
    height: 778px;
    left: 160px;
    position: absolute;
    top: 177px;
    width: 1128px;
  }
  
  .select-template .resume-list-group {
    height: 778px;
    left: 0;
    position: absolute;
    top: 0;
    width: 1128px;
  }
  
  .select-template .overlap-group {
    border: 1px solid;
    border-color: #86c6cd;
    height: 778px;
    position: relative;
    width: 1120px;
  }
  
  .select-template .div-wrapper {
    border: 1px dashed;
    border-color: #86c6cd;
    border-radius: 10px;
    height: 329px;
    left: 135px;
    position: absolute;
    top: 33px;
    width: 275px;
  }
  
  .select-template .text-wrapper-3 {
    color: #86c6cd;
    font-family: "Outfit", Helvetica;
    font-size: 13px;
    font-weight: 100;
    left: 73px;
    letter-spacing: 1.04px;
    line-height: 27.5px;
    position: absolute;
    top: 146px;
    white-space: nowrap;
    width: 127px;
  }
  
  .select-template .overlap-2 {
    border: 1px dashed;
    border-color: #86c6cd;
    border-radius: 10px;
    height: 329px;
    left: 689px;
    position: absolute;
    top: 33px;
    width: 275px;
  }
  
  .select-template .text-wrapper-4 {
    color: #86c6cd;
    font-family: "Outfit", Helvetica;
    font-size: 13px;
    font-weight: 100;
    left: 74px;
    letter-spacing: 1.04px;
    line-height: 27.5px;
    position: absolute;
    top: 147px;
    white-space: nowrap;
    width: 125px;
  }
  
  .select-template .overlap-3 {
    border: 1px dashed;
    border-color: #86c6cd;
    border-radius: 10px;
    height: 329px;
    left: 689px;
    position: absolute;
    top: 410px;
    width: 275px;
  }
  
  .select-template .text-wrapper-5 {
    color: #86c6cd;
    font-family: "Outfit", Helvetica;
    font-size: 13px;
    font-weight: 100;
    left: 76px;
    letter-spacing: 1.04px;
    line-height: 27.5px;
    position: absolute;
    top: 142px;
    white-space: nowrap;
    width: 122px;
  }
  
  .select-template .overlap-4 {
    border: 1px dashed;
    border-color: #86c6cd;
    border-radius: 10px;
    height: 329px;
    left: 135px;
    position: absolute;
    top: 410px;
    width: 275px;
  }
  
  .select-template .text-wrapper-6 {
    color: #86c6cd;
    font-family: "Outfit", Helvetica;
    font-size: 13px;
    font-weight: 100;
    left: 75px;
    letter-spacing: 1.04px;
    line-height: 27.5px;
    position: absolute;
    top: 142px;
    white-space: nowrap;
    width: 123px;
  }
  
  .select-template .generate {
    height: 93px;
    left: 432px;
    position: absolute;
    top: 646px;
    width: 235px;
  }
  
  .select-template .generate-text-wrapper {
    border: 1px solid;
    border-color: #86c6cd;
    border-radius: 85px;
    height: 93px;
    position: relative;
    width: 233px;
  }
  
  .select-template .generate-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 56px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 33px;
    white-space: nowrap;
    width: 120px;
  }
  
  .select-template .steps-groups {
    height: 77px;
    left: 298px;
    position: absolute;
    top: 100px;
    width: 740px;
  }
  
  .select-template .fill-resume-info {
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: center;
    left: 95px;
    padding: 10px;
    position: absolute;
    top: 15px;
    width: 265px;
  }
  
  .select-template .p {
    color: #7a73e2;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 27.5px;
    margin-top: -1px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
  
  .select-template .choose-template {
    align-items: center;
    display: flex;
    gap: 10px;
    justify-content: center;
    left: 380px;
    padding: 10px;
    position: absolute;
    top: 15px;
    width: 265px;
  }
  
  .select-template .text-wrapper-7 {
    color: #f8b8fa;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 27.5px;
    margin-top: -1px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
</style>
  