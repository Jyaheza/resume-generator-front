<script setup>

function idk() {
    var foo = document.getElementById('foo');
    var bar = document.getElementById('bar');
    var big = document.getElementById('big');
    var nuts = document.getElementById('nuts');
    console.log(foo);
    console.log(bar);
    console.log(big);
    console.log(nuts);

    foo.addEventListener('click', ()=>{
      nuts.style.display = 'none';
      big.style.display = 'block';
    })
}

function idk2() {
    var foo = document.getElementById('foo');
    var bar = document.getElementById('bar');
    var big = document.getElementById('big');
    var nuts = document.getElementById('nuts');
    console.log(foo);
    console.log(bar);
    console.log(big);
    console.log(nuts);

    bar.addEventListener('click', ()=>{
      big.style.display = 'none';
      nuts.style.display = 'block';
    })
}
</script>

<template>
    <div class="experience-group">
      <div class="experience-title">
          <div class="text-wrapper-3">Experience</div>
      </div>
      <div class="experience-input" />
      <div class="overlap-2" id="big" style="display: none;">
        <div class="job-role">
            <div class="rectangle-16">
              Happy Monday!!!!
            </div>
          </div>
        <button @click="idk2()" id="bar" class="save-to-experience" style="cursor: pointer;">
          <div class="save-experience-list"> 
            <div class="save-exp-text-wrapper">
              <div class="save-exp-text">Add a new job</div>
            </div>
          </div>
        </button>
        Hello
      </div>
      <div class="overlap-2" id="nuts">
        <div class="job-role">
          <div class="rectangle-16">
            <v-text-field label="Job Role" />
          </div>
        </div>
        <div class="start-date">
          <div class="rectangle-18">
            <v-text-field label="Start date: MM/DD/YYYY" />
          </div>
        </div>
        <div class="city-2">
          <div class="rectangle-18">
            <v-text-field label="City" />
          </div>
        </div>
        <div class="state-2">
          <div class="rectangle-18">
            <v-text-field label="State" />
          </div>
        </div>
        <div class="end-date">
          <div class="rectangle-18">
            <v-text-field label="End date: MM/DD/YYYY" />
          </div>
        </div>
        <div class="job-description">
          <div class="rectangle-20">
            <v-textarea class="v-text-jobdescription-height-summary" label="Job Description" />
          </div>
        </div>
        <div class="company">
          <div class="rectangle-22">
            <v-text-field label="Company" />
          </div>
        </div>
        <button @click="idk()" id="foo" class="save-to-experience" style="cursor: pointer;">
          <div class="save-experience-list"> 
            <div class="save-exp-text-wrapper">
              <div class="save-exp-text">Save To Job List</div>
            </div>
          </div>
        </button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ExperienceGroup",
  };

  </script>
  
  <style>
  .experience-group {
    height: 500px;
    left: 160px;
    position: absolute;
    top: 785px;
    width: 1120px;
  }
  
  .experience-group .overlap-2 {
    height: 480px;
    position: relative;
    top: 20px;
  }
  
  .experience-group .experience-input {
    border-color: #aad9d9;
    border-top-style: solid;
    border-top-width: 1px;
    height: 387px;
    left: 0;
    position: absolute;
    top: 93px;
    width: 1120px;
  }
  
  .experience-group .experience-title {
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
  
  .experience-group .text-wrapper-3 {
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
  
  .experience-group .job-role {
    height: 57px;
    left: 100px;
    position: absolute;
    top: 122px;
    width: 925px;
  }
  
  .experience-group .rectangle-15 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .experience-group .rectangle-16 {
    background-color: #d9d9d9;
    height: 54px;
    left: 0;
    position: absolute;
    top: 3px;
    width: 925px;
  }
  
  .experience-group .start-date {
    height: 54px;
    left: 100px;
    position: absolute;
    top: 342px;
    width: 260px;
  }
  
  .experience-group .rectangle-17 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 260px;
  }
  
  .experience-group .rectangle-18 {
    background-color: #d9d9d9;
    height: 52px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 260px;
  }
  
  .experience-group .city-2 {
    height: 54px;
    left: 100px;
    position: absolute;
    top: 271px;
    width: 260px;
  }
  
  .experience-group .state-2 {
    height: 54px;
    left: 383px;
    position: absolute;
    top: 273px;
    width: 260px;
  }
  
  .experience-group .end-date {
    height: 54px;
    left: 383px;
    position: absolute;
    top: 342px;
    width: 260px;
  }
  
  .experience-group .job-description {
    height: 209px;
    left: 665px;
    position: absolute;
    top: 271px;
    width: 360px;
  }
  
  .experience-group .rectangle-19 {
    background-color: #9995db;
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 360px;
  }
  
  .experience-group .rectangle-20 {
    background-color: #d9d9d9;
    height: 201px;
    left: 0;
    position: absolute;
    top: 8px;
    width: 360px;
  }
  
  .experience-group .company {
    height: 57px;
    left: 100px;
    position: absolute;
    top: 196px;
    width: 925px;
  }
  
  .experience-group .rectangle-21 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 925px;
  }
  
  .experience-group .rectangle-22 {
    background-color: #d9d9d9;
    height: 55px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 925px;
  }
  
  .experience-group .save-to-experience {
    height: 64px;
    left: 100px;
    position: absolute;
    top: 416px;
    width: 277px;
  }
  
  .experience-group .save-experience-list {
    height: 64px;
    width: 279px;
  }
  
  .experience-group .save-exp-text-wrapper {
    background-image: url(https://c.animaapp.com/qPlFWTJl/img/rectangle-20-4.svg);
    background-size: 100% 100%;
    height: 64px;
    position: relative;
    width: 277px;
  }
  
  .experience-group .save-exp-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 39px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 21px;
    white-space: nowrap;
    width: 200px;
  }

  .experience-group .v-text-jobdescription-height-summary {
    min-height: 285px !important;
    top: 100px; 
  }

  .experience-group .switch-enter-from,
  .switch-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }

  .experience-group .switch-enter-to,
  .switch-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .experience-group .switch-active-enter {
    transition: all 0.5s ease;
  }

  .experience-group .switch-active-leave {
    transition: all 0.5s ease;
  }
  </style>
  