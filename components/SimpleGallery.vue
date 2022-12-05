<template>
  <div :class="divClass">
      <vue-picture-swipe :items="images" :options="{shareEl: false}"></vue-picture-swipe>
  </div>
</template>

<style lang="scss">
  .my-gallery {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
  }

  .my-gallery img {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    border-radius: 4px;
  }

  .pswp__bg {
    opacity: 0.9 !important;
  }
</style>
  
<script>
  export default {
    name: 'SimpleGallery',
    props: {
      images: Array,
      divClass: String,
    },
    setup(props) {
      return {
        imagesData: props.images,
      };
    }
  };
</script>
  