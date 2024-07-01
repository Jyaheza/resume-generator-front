<template>
    <div class="skills-group">
      <div class="overlap-5">
        <div class="skills-input"></div>
        <div class="skills-title">
          <div class="skills-text">Skills</div>
        </div>
        <div class="skills-input-2">
          <div class="rectangle-42">
            <v-textarea class="v-text-project-location-height-summary" label="Skills" />
          </div>
        </div>
        <div @click="" class="save-to-skills" style="cursor: pointer;">
          <div class="save-skills-list">
            <div class="save-skills-text-wrapper">
              <div class="save-skills-text">Save To Skills List</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "SkillsGroup",
  };
  </script>
  
  <style>
  .skills-group {
    height: 520px;
    left: 166px;
    position: absolute;
    top: 2707px;
    width: 1120px;
  }
  
  .skills-group .overlap-5 {
    height: 500px;
    position: relative;
    top: 20px;
  }
  
  .skills-group .skills-input {
    border-color: #aad9d9;
    border-top-style: solid;
    border-top-width: 1px;
    height: 407px;
    left: 0;
    position: absolute;
    top: 93px;
    width: 1120px;
  }
  
  .skills-group .skills-title {
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
  
  .skills-group .skills-text {
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
  
  .skills-group .skills-input-2 {
    height: 190px;
    left: 100px;
    position: absolute;
    top: 122px;
    width: 925px;
  }
  
  .skills-group .rectangle-41 {
    background-color: #9995db;
    height: 11px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .skills-group .rectangle-42 {
    background-color: #d9d9d9;
    height: 145px;
    left: 0;
    position: absolute;
    top: 11px;
    width: 925px;
  }
  
  .skills-group .save-to-skills {
    height: 64px;
    left: 97px;
    position: absolute;
    top: 360px;
    width: 277px;
  }
  
  .skills-group .save-skills-list {
    height: 64px;
    width: 279px;
  }
  
  .skills-group .save-skills-text-wrapper {
    background-image: url(https://c.animaapp.com/qPlFWTJl/img/rectangle-20-4.svg);
    background-size: 100% 100%;
    height: 64px;
    position: relative;
    width: 277px;
  }
  
  .skills-group .save-skills-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 45px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 18px;
    white-space: nowrap;
    width: 188px;
  }

  .skills-group .v-text-skills-height-summary {
    min-height: 450px !important;
    top: 100px; 
  }

  </style>
  