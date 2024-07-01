<template>
    <div class="projects-group">
      <div class="overlap-4">
        <div class="project-input" />
        <div class="project-title">
          <div class="project-text">Projects</div>
        </div>
        <div class="project-title-input">
          <div class="rectangle-34">
            <v-text-field label="Project Title"/>
          </div>
        </div>
        <div class="start-date-3">
          <div class="rectangle-36">
            <v-text-field label="Start date: MM/DD/YYYY"/>
          </div>
        </div>
        <div class="end-date-3">
          <div class="rectangle-36">
            <v-text-field label="End date: MM/DD/YYYY"/>
          </div>
        </div>
        <div class="summary">
          <div class="rectangle-38">
            <v-textarea class="v-text-project-location-height-summary" label="Project description"/>
          </div>
        </div>
        <div class="project-location">
          <div class="rectangle-40">
            <v-text-field label="Project location" />
          </div>
        </div>
        <div @click="" class="save-to-project" style="cursor: pointer;">
          <div class="save-project-list">
            <div class="save-project-text-wrapper">
              <div class="save-project-text">Save To Project List</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ProjectsGroup",
  };
  </script>
  
  <style>
  .projects-group {
    height: 711px;
    left: 163px;
    position: absolute;
    top: 1996px;
    width: 1120px;
  }
  
  .projects-group .overlap-4 {
    height: 691px;
    position: relative;
    top: 20px;
  }
  
  .projects-group .project-input {
    border-color: #aad9d9;
    border-top-style: solid;
    border-top-width: 1px;
    height: 598px;
    left: 0;
    position: absolute;
    top: 93px;
    width: 1120px;
  }
  
  .projects-group .project-title {
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
  
  .projects-group .project-text {
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
  
  .projects-group .project-title-input {
    height: 57px;
    left: 100px;
    position: absolute;
    top: 122px;
    width: 925px;
  }
  
  .projects-group .rectangle-33 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .projects-group .rectangle-34 {
    background-color: #d9d9d9;
    height: 54px;
    left: 0;
    position: absolute;
    top: 3px;
    width: 925px;
  }
  
  .projects-group .start-date-3 {
    height: 54px;
    left: 100px;
    position: absolute;
    top: 271px;
    width: 260px;
  }
  
  .projects-group .rectangle-35 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 260px;
  }
  
  .projects-group .rectangle-36 {
    background-color: #d9d9d9;
    height: 52px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 260px;
  }
  
  .projects-group .end-date-3 {
    height: 54px;
    left: 380px;
    position: absolute;
    top: 273px;
    width: 260px;
  }
  
  .projects-group .summary {
    height: 278px;
    left: 665px;
    position: absolute;
    top: 273px;
    width: 360px;
  }
  
  .projects-group .rectangle-37 {
    background-color: #9995db;
    height: 10px;
    left: 0;
    position: absolute;
    top: 0;
    width: 360px;
  }
  
  .projects-group .rectangle-38 {
    background-color: #d9d9d9;
    height: 268px;
    left: 0;
    position: absolute;
    top: 10px;
    width: 360px;
  }
  
  .projects-group .project-location {
    height: 57px;
    left: 100px;
    position: absolute;
    top: 196px;
    width: 925px;
  }
  
  .projects-group .rectangle-39 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .projects-group .rectangle-40 {
    background-color: #d9d9d9;
    height: 55px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 925px;
  }
  
  .projects-group .save-to-project {
    height: 64px;
    left: 97px;
    position: absolute;
    top: 360px;
    width: 277px;
  }
  
  .projects-group .save-project-list {
    height: 64px;
    width: 279px;
  }
  
  .projects-group .save-project-text-wrapper {
    background-image: url(https://c.animaapp.com/qPlFWTJl/img/rectangle-20-4.svg);
    background-size: 100% 100%;
    height: 64px;
    position: relative;
    width: 277px;
  }
  
  .projects-group .save-project-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 30px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 18px;
    white-space: nowrap;
    width: 217px;
  }

  .projects-group .v-text-project-location-height-summary {
    min-height: 410px !important;
    top: 100px; 
  }
  </style>
  