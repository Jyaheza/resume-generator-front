<template>
    <div class="create-resume">
      <div class="div-2">
        <div class="nav-bar">
            <div class="resume-builder">
                Resume
                <br />
                Builder
            </div>
            <div class="text-wrapper">First Name <br/> Last Name</div>
            <div class="text-wrapper-2">Student</div>
        </div>
        <ContactInfoGroup />
        <ExperienceGroup />
        <EducationGroup />
        <ProjectsGroup />
        <SkillsGroup />
        <div @click="" class="next" style="cursor: pointer;">
          <div class="next-text-wrapper">
            <div class="next-text">NEXT STEP</div>
          </div>
        </div>
        <StepsGroups />
      </div>
    </div>
  </template>
  
  <script>
  import ContactInfoGroup from "../components/Groups/ContactInfoGroup.vue";
  import ExperienceGroup from "../components/Groups/ExperienceGroup.vue";
  import EducationGroup from "../components/Groups/EducationGroup.vue";
  import ProjectsGroup from "../components/Groups/ProjectsGroup.vue";
  import SkillsGroup from "../components/Groups/SkillsGroup.vue";
  import StepsGroups from "../components/Groups/StepsGroup.vue";
  
  export default {
    name: "CreateResume",
    components: {
      ContactInfoGroup,
      ExperienceGroup,
      EducationGroup,
      ProjectsGroup,
      SkillsGroup,
      StepsGroups,
    },
  };
  </script>
  
  <style>
  .create-resume {
    background-color: #000235;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  
  .create-resume .div-2 {
    background-color: #000235;
    height: 3686px;
    position: relative;
    width: 1440px;
  }
  
  .create-resume .next {
    height: 102px;
    left: 930px;
    position: absolute;
    top: 3250px;
    width: 257px;
  }
  
  .create-resume .next-text-wrapper {
    border: 1px solid;
    border-color: #86c6cd;
    border-radius: 85px;
    height: 102px;
    position: relative;
    width: 255px;
  }
  
  .create-resume .next-text {
    color: #ffffff;
    font-family: "Outfit", Helvetica;
    font-size: 20px;
    font-weight: 600;
    left: 60px;
    letter-spacing: 1.6px;
    line-height: 27.5px;
    position: absolute;
    top: 36px;
    white-space: nowrap;
    width: 133px;
  }

  .create-resume .nav-bar {
    box-shadow: 0px 4px 4px #00000040;
    height: 60px;
    left: 188px;
    position: absolute;
    top: 38px;
    width: 1057px;
  }

  .create-resume .resume-builder {
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

  .create-resume .text-wrapper {
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

  .create-resume .text-wrapper-2 {
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
  
  </style>