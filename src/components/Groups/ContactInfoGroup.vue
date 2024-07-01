<template>
    <div class="contact-info-group">
      <div class="overlap">
        <div class="contact-input"></div>
        <div class="contact-title">
           <div class="contact-info-text">Contact Info</div>
        </div>
        <div class="full-name">
          <div class="rectangle-2">
          <v-text-field label="Full Name"></v-text-field>
          </div>
        </div>
        <div class="phone-number">
          <div class="rectangle-4"></div>
          <v-text-field label="Phone Number"></v-text-field>
        </div>
        <div class="city">
          <div class="rectangle-6"></div>
          <v-text-field label="City"></v-text-field>
        </div>
        <div class="state">
          <div class="rectangle-8"></div>
          <v-text-field label="State"></v-text-field>
        </div>
        <div class="website">
          <div class="rectangle-10"></div>
          <v-text-field label="Website"></v-text-field>
        </div>
        <div class="email">
          <div class="overlap-group">
            <div class="rectangle-12"></div>
            <v-text-field label="Email"></v-text-field>
          </div>
        </div>
        <div class="contact-description">
          <div class="rectangle-14"></div>
          <v-text-field class="v-text-height-summary" label="Description" style="word-break: break-word;"></v-text-field>
        </div>
        <div class="save-contact">
          <div class="save-contact-info">
            <div class="save-contact-text-wrapper">
              <div class="save-contact-text">Save Contact Info</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ContactInfoGroup",
  };
  </script>
  
  <style>
  .contact-info-group {
    height: 553px;
    left: 160px;
    position: absolute;
    top: 232px;
    width: 1120px;
  }
  
  .contact-info-group .overlap {
    height: 474px;
    position: relative;
    top: 79px;
  }
  
  .contact-info-group .contact-input {
    border-color: #aad9d9;
    border-top-style: solid;
    border-top-width: 1px;
    height: 407px;
    left: 0;
    position: absolute;
    top: 67px;
    width: 1120px;
  }
  
  .contact-info-group .contact-title {
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
  
  .contact-info-group .text-wrapper-2 {
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

  .contact-info-group .contact-info-text {
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
  
  .contact-info-group .full-name {
    height: 42px;
    left: 100px;
    position: absolute;
    top: 113px;
    width: 450px;
  }
  
  .contact-info-group .rectangle {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 450px;
  }
  
  .contact-info-group .rectangle-2 {
    background-color: #d9d9d9;
    height: 55px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 450px;
  }
  
  .contact-info-group .phone-number {
    height: 50px;
    left: 100px;
    position: absolute;
    top: 168px;
    width: 450px;
  }
  
  .contact-info-group .rectangle-3 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 450px;
  }
  
  .contact-info-group .rectangle-4 {
    background-color: #d9d9d9;
    height: 45px;
    left: 0;
    position: absolute;
    top: 10px;
    width: 450px;
  }
  
  .contact-info-group .city {
    height: 42px;
    left: 100px;
    position: absolute;
    top: 230px;
    width: 222px;
  }
  
  .contact-info-group .rectangle-5 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 222px;
  }
  
  .contact-info-group .rectangle-6 {
    background-color: #d9d9d9;
    height: 42px;
    left: 0;
    position: absolute;
    top: 10px;
    width: 222px;
  }
  
  .contact-info-group .state {
    height: 42px;
    left: 339px;
    position: absolute;
    top: 230px;
    width: 211px;
  }
  
  .contact-info-group .rectangle-7 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 211px;
  }
  
  .contact-info-group .rectangle-8 {
    background-color: #d9d9d9;
    height: 42px;
    left: 0;
    position: absolute;
    top: 10px;
    width: 211px;
  }
  
  .contact-info-group .website {
    height: 42px;
    left: 595px;
    position: absolute;
    top: 166px;
    width: 430px;
  }
  
  .contact-info-group .rectangle-9 {
    background-color: #9995db;
    height: 2px;
    left: 0;
    position: absolute;
    top: 0;
    width: 430px;
  }
  
  .contact-info-group .rectangle-10 {
    background-color: #d9d9d9;
    height: 41px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 430px;
  }
  
  .contact-info-group .email {
    height: 42px;
    left: 595px;
    position: absolute;
    top: 113px;
    width: 430px;
  }
  
  .contact-info-group .overlap-group {
    height: 42px;
    position: relative;
  }
  
  .contact-info-group .rectangle-11 {
    background-color: #9995db;
    height: 3px;
    left: 0;
    position: absolute;
    top: 0;
    width: 430px;
  }
  
  .contact-info-group .rectangle-12 {
    background-color: #d9d9d9;
    height: 40px;
    left: 0;
    position: absolute;
    top: 2px;
    width: 430px;
  }
  
  .contact-info-group .save-contact {
    height: 64px;
    left: 100px;
    position: absolute;
    top: 307px;
    width: 277px;
  }
  
  .contact-info-group .save-contact-info {
    height: 64px;
    width: 279px;
  }
  
  .contact-info-group .save-contact-text-wrapper {
    background-image: url(https://c.animaapp.com/qPlFWTJl/img/rectangle-20-4.svg);
    background-size: 100% 100%;
    height: 64px;
    position: relative;
    width: 277px;
  }
  
  .contact-info-group .save-contact-text {
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
  
  .contact-info-group .contact-description {
    height: 209px;
    left: 595px;
    position: absolute;
    top: 221px;
    width: 360px;
  }
  
  .contact-info-group .rectangle-13 {
    background-color: #9995db;
    height: 8px;
    left: 0;
    position: absolute;
    top: 0;
    width: 360px;
  }
  
  .contact-info-group .rectangle-14 {
    background-color: #d9d9d9;
    height: 201px;
    left: 0;
    position: absolute;
    top: 8px;
    width: 360px;
  }

  .contact-info-group .v-text-height-summary{
    min-height: 385px !important;
    top: 100px; 
    /* display: flex !important; */
    /* align-items: center !important; */
  }
  </style>
  