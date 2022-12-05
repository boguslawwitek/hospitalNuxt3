<script setup>
  import { getImageUrl } from '../utils';
  import edjsHTML from 'editorjs-html';

  useHead({
    title: 'hospitalnuxt3'
  });

  const config = useRuntimeConfig();
  const { data } = await useAsyncData('homepageArticle', () => $fetch('https://sp.tmktest.pl/api/content/48', {baseURL: ''}));
  
  const article = data.value;
  const photos = article.photos;
  const contentFromEditor = JSON.parse(article.body);
  const htmlFromEditor = edjsHTML().parse(contentFromEditor);

  let firstImg = null;
  let firstHeading = htmlFromEditor.shift();

  if(photos.length > 0) {
    firstImg = photos[0];
  }
</script>
    
<template>
    <div class="container">
        <main class="main">
            <section class="section1">
              <div v-html="firstHeading"></div>
              <div class="img-container" v-if="firstImg">
                  <img class="main-image" :src="getImageUrl(config.apiUrl, firstImg.path)" :alt="firstImg.title" />
              </div>
              <div class="float-text" v-if="htmlFromEditor" v-html="htmlFromEditor.join('')"></div>
              <div v-if="photos.length > 0" v-for="(img, index) in photos">
                <div v-if="index >= 1">
                  <img class="other-img" :src="getImageUrl(config.apiUrl, img.path)" :alt="img.title" />
                </div>
              </div>
            </section>
        </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors.scss';

.container {
  font-size: 10px;
  font-weight: 500;
}

.large .container{
  font-size: 13px;
}

.small .container {
  font-size: 8px;
}

.contrast .container {
  font-weight: 400;
  background-color: black;
}

.dark .container {
  font-weight: 400;
  background-color: $dark-bg;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 10px 50px 10px;
}

.main :deep(h1), .main :deep(h2), .main :deep(h3), .main :deep(h4), .main :deep(h5), .main :deep(h6) {
  font-size: 4em;
  padding: 10px 0;
  color: $light-heading;
  margin-bottom: 5px;
  font-weight: 700;
}

.contrast .main :deep(h1), .contrast .main :deep(h2), .contrast .main :deep(h3), .contrast .main :deep(h4), .contrast .main :deep(h5), .contrast .main :deep(h6) {
  color: yellow;
  font-weight: 600;
}

.dark .main :deep(h1), .dark .main :deep(h2), .dark .main :deep(h3), .dark .main :deep(h4), .dark .main :deep(h5), .dark .main :deep(h6) {
  color: $dark-heading;
  font-weight: 600;
}

section {
  padding: 0 30px;
}

.other-img {
  max-width: 100%;
  max-height: 100vh;
  border-radius: 4px;
}

.img-container {
  width: 60%;
  padding-bottom: 20px;
  padding-right: 20px;
  float: left;
}

.main-image {
    border-radius: 7px;
    width: 100%;
    height: auto;
}

.section1 .float-text {
  font-size: 2em;
  color: black;
}

.contrast .section1 .float-text {
  color: yellow;
}

.dark .section1 .float-text {
  color: white;
}

.section1 .float-text > :deep(p), .section1 .float-text > :deep(div) {
  margin-bottom: 15px;
}

.float-text :deep(ul), .float-text :deep(ol) {
  position: relative;
  left: 30px;
  margin: 7px 0;
}

.float-text :deep(li) {
  margin-bottom: 2px;
}

.float-text :deep(b) {
  font-weight: 600;
}

.contrast .float-text :deep(b) {
  font-weight: 500;
}

.dark .float-text :deep(b) {
  font-weight: 500;
}

.other :deep(div) {
  font-size: 2em;
}

.other :deep(img) {
  display: block;
  max-width: 100%;
  max-height: 100vh;
  border-radius: 4px;
}

.other :deep(h1), .other :deep(h2), .other :deep(h3), .other :deep(h4), .other :deep(h5), .other :deep(h6) {
  font-size: 2em;
  padding: 10px 0;
  color: $light-heading;
  margin-bottom: 5px;
  font-weight: 700;
}

.contrast .other :deep(h1), .contrast .other :deep(h2), .contrast .other :deep(h3), .contrast .other :deep(h4), .contrast .other :deep(h5), .contrast .other :deep(h6) {
  color: yellow;
  font-weight: 600;
}

.dark .other :deep(h1), .dark .other :deep(h2), .dark .other :deep(h3), .dark .other :deep(h4), .dark .other :deep(h5), .dark .other :deep(h6) {
  color: $dark-heading;
  font-weight: 600;
}

@media (max-width: 600px) {
  .main :deep(h1) {
    font-size: 2.8em;
  }

  .section1 .float-text {
    font-size: 1.8em;
  }

  .section1 {
    padding: 0;
  }

  .img-container {
    width: 100%;
    float: unset;
    padding-right: 0;
  }

  .float-text :deep(ul), .float-text :deep(ol) {
    left: 0;
    margin-left: 30px;
  }
}
</style>