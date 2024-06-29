<template>
    <div :class="['object-other', className]">
      <img :class="['img', objectOtherClassName]" alt="Object other" :src="objectOther" />
    </div>
  </template>
  
  <script>
  export default {
    name: "ObjectOther",
    props: {
      className: {
        type: String,
        default: "",
      },
      objectOtherClassName: {
        type: String,
        default: "",
      },
      objectOther: {
        type: String,
        default: "https://c.animaapp.com/QWheEV06/img/object-other-12.png",
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
  