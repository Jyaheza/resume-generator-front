<template>
    <div :class="['match-resume-logo', className]"></div>
  </template>
  
  <script>
  export default {
    name: "MatchResumeLogo",
    props: {
      className: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style>
  .match-resume-logo {
    background-image: url(https://c.animaapp.com/UcVazUAh/img/object-other-18-1@2x.png);
    background-position: 50% 50%;
    background-size: cover;
    height: 44px;
    width: 44px;
  }
  </style>
  