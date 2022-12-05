import VuePictureSwipe from 'vue3-picture-swipe/dist/vue3-picture-swipe.umd.js';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('vue-picture-swipe', VuePictureSwipe, {})
})