<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

</script>

<template>
  <div class="home-page">
    <div class="div">
      <div class="nav-bar">
        <div @click="router.push({ name: 'homepage'})" class="resume-builder" style="cursor: pointer;">
          Resume
          <br />
          Builder
        </div>
        <div @click="router.push({ name: 'login'})" class="text-wrapper" style="cursor:pointer;">Login</div>
        <div @click="router.push({ name: 'signup'})" class="text-wrapper-2" style="cursor: pointer;">Sign Up</div>
      </div>
      <HomepageLogo class="object-other-12" />
      <div class="create-and-generate">Create And Generate Resumes</div>
      <p class="p">Create and generate resumes for your future careers!</p>
      <div @click="router.push({ name: 'login'})" class="login" style="cursor:pointer;">
        <div class="overlap-group">
          <div class="text-wrapper-3">LOGIN</div>
        </div>
      </div>
      <div @click="router.push({ name: 'signup'})" class="sign-up"  style="cursor:pointer;">
        <div class="overlap-2">
          <div class="text-wrapper-4">SIGN UP</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HomepageLogo from "../components/HomepageLogo.vue";

export default {
  name: "HomePage",
  components: {
    HomepageLogo,
  },
};
</script>

<style>
.home-page {
  background-color: #000235;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
}

.home-page .div {
  background-color: #000235;
  height: 964px;
  position: relative;
  width: 1440px;
}

.home-page .nav-bar {
  height: 60px;
  left: 188px;
  position: absolute;
  top: 38px;
  width: 1057px;
}

.home-page .resume-builder {
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

.home-page .text-wrapper {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 720px;
  letter-spacing: 0;
  line-height: 27.5px;
  position: absolute;
  top: 15px;
  white-space: nowrap;
  width: 60px;
}

.home-page .text-wrapper-2 {
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
  width: 80px;
}

.home-page .object-other-12 {
  left: 728px !important;
  position: absolute !important;
  top: 336px !important;
}

.home-page .create-and-generate {
  color: #ffffff;
  font-family: var(--h1-main-heading-font-family);
  font-size: var(--h1-main-heading-font-size);
  font-style: var(--h1-main-heading-font-style);
  font-weight: var(--h1-main-heading-font-weight);
  left: 196px;
  letter-spacing: var(--h1-main-heading-letter-spacing);
  line-height: var(--h1-main-heading-line-height);
  position: absolute;
  top: 147px;
  width: 373px;
}

.home-page .p {
  color: #ffffff;
  font-family: var(--body-text-font-family);
  font-size: var(--body-text-font-size);
  font-style: var(--body-text-font-style);
  font-weight: var(--body-text-font-weight);
  left: 196px;
  letter-spacing: var(--body-text-letter-spacing);
  line-height: var(--body-text-line-height);
  position: absolute;
  top: 377px;
  width: 373px;
}

.home-page .login {
  height: 102px;
  left: 188px;
  position: absolute;
  top: 543px;
  width: 257px;
}

.home-page .overlap-group {
  background-image: url(https://c.animaapp.com/PbM1eCWB/img/rectangle-20.svg);
  background-size: 100% 100%;
  height: 102px;
  position: relative;
  width: 255px;
}

.home-page .text-wrapper-3 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 600;
  left: 88px;
  letter-spacing: 1.6px;
  line-height: 27.5px;
  position: absolute;
  top: 40px;
  white-space: nowrap;
  width: 92px;
}

.home-page .sign-up {
  height: 102px;
  left: 465px;
  position: absolute;
  top: 543px;
  width: 257px;
}

.home-page .overlap-2 {
  border: 1px solid;
  border-color: #86c6cd;
  border-radius: 85px;
  height: 102px;
  position: absolute;
  width: 255px;
}

.home-page .text-wrapper-4 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 600;
  left: 82px;
  letter-spacing: 1.6px;
  line-height: 27.5px;
  position: absolute;
  top: 38px;
  white-space: nowrap;
  width: 92px;
}
</style>