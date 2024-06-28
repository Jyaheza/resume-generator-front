<template>
    <div :class="['object-other', className]">
      <img class="img" alt="Object other" src="https://c.animaapp.com/PbM1eCWB/img/object-other-12-1.png" />
    </div>
  </template>
  
  <script>
  export default {
    name: "HomePageLogo",
    props: {
      className: {
        type: String,
        default: "",
      },
    },
  };
  </script>
  
  <style>
  .object-other {
    height: 395px;
    position: relative;
    width: 511px;
  }
  
  .object-other .img {
    height: 395px;
    left: 12px;
    object-fit: cover;
    position: absolute;
    top: -118px;
    width: 511px;
  }
  </style>
  