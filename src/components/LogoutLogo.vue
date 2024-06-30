<template>
    <div :class="['logout-logo', className]"></div>
  </template>
  
  <script>
  export default {
    name: "LogoutLogo",
    props: {
      className: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style>
  .logout-logo {
    background-image: url(https://c.animaapp.com/wDZOtxcX/img/object-other-17.png);
    background-position: 50% 50%;
    background-size: cover;
    height: 44px;
    width: 44px;
  }
  </style>
  