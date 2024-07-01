<template>
    <div class="education-group">
      <div class="overlap-3">
        <div class="education-input" />
        <div class="education-title">
          <div class="text-wrapper-4">Education</div>
        </div>
        <div class="major">
          <div class="rectangle-24">
            <v-text-field label="Major" />
          </div>
        </div>
        <div class="start-date-2">
          <div class="rectangle-26">
            <v-text-field label="Start date: MM/DD/YYYY" />
          </div>
        </div>
        <div class="end-date-2">
          <div class="rectangle-26">
            <v-text-field label="End date: MM/DD/YYYY" />
          </div>
        </div>
        <div class="awards">
          <div class="rectangle-28">
            <v-textarea class="v-text-awards-height-summary" label="Awards" />
          </div>
        </div>
        <div class="coursework">
          <div class="rectangle-30">
            <v-textarea class="v-text-coursework-height-summary" label="Coursework" />
          </div>
        </div>
        <div class="university">
          <div class="rectangle-32">
            <v-text-field label="University" />
          </div>
        </div>
        <div @click="" class="save-education-list-wrapper" style="cursor: pointer;">
          <div class="overlap-group-wrapper">
            <div class="save-job-text-wrapper">
              <div class="save-job-text">Save To Education List</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "EducationGroup",
  };
  </script>
  
  <style>
  .education-group {
    height: 711px;
    left: 160px;
    position: absolute;
    top: 1285px;
    width: 1120px;
  }
  
  .education-group .overlap-3 {
    height: 691px;
    position: relative;
    top: 20px;
  }
  
  .education-group .education-input {
    border-color: #aad9d9;
    border-top-style: solid;
    border-top-width: 1px;
    height: 598px;
    left: 0;
    position: absolute;
    top: 93px;
    width: 1120px;
  }
  
  .education-group .education-title {
    align-items: center;
    display: flex;
    gap: 10px;
    height: 94px;
    justify-content: center;
    left: 0;
    padding: 10px;
    position: absolute;
    top: 0;
    width: 190px;
  }
  
  .education-group .text-wrapper-4 {
    color: #ffffff;
    font-family: "Roboto", Helvetica;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: 0;
    line-height: 27.5px;
    position: relative;
    white-space: nowrap;
    width: fit-content;
  }
  
  .education-group .major {
    height: 57px;
    left: 100px;
    position: absolute;
    top: 122px;
    width: 925px;
  }
  
  .education-group .rectangle-23 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .education-group .rectangle-24 {
    background-color: #d9d9d9;
    height: 54px;
    left: 0;
    position: absolute;
    top: 3px;
    width: 925px;
  }
  
  .education-group .start-date-2 {
    height: 54px;
    left: 100px;
    position: absolute;
    top: 271px;
    width: 260px;
  }
  
  .education-group .rectangle-25 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 260px;
  }
  
  .education-group .rectangle-26 {
    background-color: #d9d9d9;
    height: 52px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 260px;
  }
  
  .education-group .end-date-2 {
    height: 54px;
    left: 380px;
    position: absolute;
    top: 273px;
    width: 260px;
  }
  
  .education-group .awards {
    height: 278px;
    left: 665px;
    position: absolute;
    top: 275px;
    width: 360px;
  }
  
  .education-group .rectangle-27 {
    background-color: #9995db;
    height: 10px;
    left: 0;
    position: absolute;
    top: 0;
    width: 360px;
  }
  
  .education-group .rectangle-28 {
    background-color: #d9d9d9;
    height: 268px;
    left: 0;
    position: absolute;
    top: 10px;
    width: 360px;
  }
  
  .education-group .coursework {
    height: 209px;
    left: 100px;
    position: absolute;
    top: 344px;
    width: 540px;
  }
  
  .education-group .rectangle-29 {
    background-color: #9995db;
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 540px;
  }
  
  .education-group .rectangle-30 {
    background-color: #d9d9d9;
    height: 201px;
    left: 0;
    position: absolute;
    top: 8px;
    width: 540px;
  }
  
  .education-group .university {
    height: 57px;
    left: 100px;
    position: absolute;
    top: 196px;
    width: 925px;
  }
  
  .education-group .rectangle-31 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .education-group .rectangle-32 {
    background-color: #d9d9d9;
    height: 55px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 925px;
  }
  
  .education-group .save-education-list-wrapper {
    height: 64px;
    left: 100px;
    position: absolute;
    top: 583px;
    width: 277px;
  }
  
  .education-group .overlap-group-wrapper {
    height: 64px;
    width: 279px;
  }
  
  .education-group .save-job-text-wrapper {
    background-image: url(https://c.animaapp.com/qPlFWTJl/img/rectangle-20-4.svg);
    background-size: 100% 100%;
    height: 64px;
    position: relative;
    width: 277px;
  }
  
  .education-group .save-job-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 14px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 18px;
    white-space: nowrap;
    width: 250px;
  }

  .education-group .v-text-awards-height-summary{
    min-height: 420px !important;
    top: 100px; 
  }

  .education-group .v-text-coursework-height-summary{
    min-height: 285px !important;
    top: 100px; 
  }
  </style>
  