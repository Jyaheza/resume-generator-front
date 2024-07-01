<template>
    <div class="steps-groups">
      <div class="fill-resume-info">
        <p class="p">Step 1: Fill Resume Info</p>
      </div>
      <div class="choose-template">
        <div class="text-wrapper-5">Step 2: Choose Template</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "StepsGroups",
  };
  </script>
  
  <style>
  .steps-groups {
    height: 77px;
    left: 350px;
    position: absolute;
    top: 155px;
    width: 740px;
  }
  
  .steps-groups .fill-resume-info {
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
  
  .steps-groups .p {
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
  
  .steps-groups .choose-template {
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
  
  .steps-groups .text-wrapper-5 {
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
  </style>
  