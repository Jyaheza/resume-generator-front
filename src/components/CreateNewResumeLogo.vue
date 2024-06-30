<template>
    <div :class="['create-resume-logo', className]"></div>
  </template>
  
  <script>
  export default {
    name: "CreateNewResumeLogo",
    props: {
      className: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style>
  .create-resume-logo {
    background-image: url(https://c.animaapp.com/xe30pEHc/img/object-other-12.png);
    background-position: 50% 50%;
    background-size: cover;
    height: 44px;
    width: 44px;
  }
  </style>