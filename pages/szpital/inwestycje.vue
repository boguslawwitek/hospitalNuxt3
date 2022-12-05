<script setup>
import { generateImagesObj, removeDash, normalizeUrl, getImageUrl } from '../../utils';

    useHead({
        title: `hospitalnuxt3 - Inwestycje`
    });

    const config = useRuntimeConfig();
    const categorySort = useState(`category-hospital-inwestycje-sorted`, () => null);
    const categoryWithUEImgs = useState(`category-ue-hospital-inwestycje-with-imgs`, () => null);

    const {data: category} = await useFetchApi('category-inwestycje', '/api/category/12');
    const {data: categoryUE} = await useFetchApi('category-inwestycje-ue', '/api/category/13');

    const photosArray = [];

    for(const categoryEl of categoryUE.value.content) {
        const {data: categoryArticle} = await useFetchApi(`inwestycje-article-${categoryEl.id}`, `/api/content/${categoryEl.id}`);
        const photos = categoryArticle.value.photos;

        if(photos && photos.length > 0) {
            photosArray.push({id: categoryEl.id, title: categoryEl.title, imgs: photos});
        } else {
            photosArray.push({id: categoryEl.id, title: categoryEl.title, imgs: []});
        }
    }

    photosArray.sort(function(a, b) {return a.id - b.id});
    categoryWithUEImgs.value = photosArray;

    category.value.content.sort(function(a, b) {return a.id - b.id});
    categorySort.value = category.value;
</script>

<template>
    <div class="container">
      <main class="main">
        <section>
            <h2>Inwestycje</h2>
            <div class="flex">
              <div class="content">
                <div v-if="category, categorySort">
                    <h3>{{category.name}}</h3>
                    <ul>
                        <li v-for="option in categorySort.content"><NuxtLink v-if="option" :to="`/budzet_panstwa/` + normalizeUrl(`${removeDash(option.title)}-${option.id}`)">{{option.title}}</NuxtLink></li>
                    </ul>
                    <h3>{{categoryUE.name}}</h3>
                    <ul v-if="categoryWithUEImgs">
                        <li v-for="option in categoryWithUEImgs" class="ue-el"><NuxtLink v-if="option" :to="`/unia_europejska/` + normalizeUrl(`${removeDash(option.title)}-${option.id}`)">{{option.title}}<div v-if="option.imgs && option.imgs.length > 0"><img :src="getImageUrl(config.apiUrl, option.imgs[0].path)" alt="" /></div></NuxtLink></li>
                    </ul>
                </div>
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
    padding-bottom: 50px;
}

.large .container {
    font-size: 13px;
}

.small .container {
    font-size: 8px;
}

.contrast .container {
    background-color: black;
    font-weight: 400;
    color: yellow;
}

.dark .container {
    background-color: $dark-bg;
    font-weight: 400;
    color: white;
}

.main {
    max-width: 1200px;
    margin: 0 auto;
}

.main section {
    padding: 20px 30px;
}

.main section h2 {
    font-size: 4em;
    padding: 10px 0;
    color: $light-heading;
    margin-bottom: 5px;
    font-weight: 700;
}

.contrast .main section h2 {
    color: yellow;
    font-weight: 600;
  }

.dark .main section h2 {
    color: $dark-heading;
    font-weight: 600;
}

.main section :deep(h3) {
    color: $light-heading;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 1.5em;
}

.main section :deep(ul) {
    margin-bottom: 30px;
}

.contrast .main section :deep(h3) {
    color: yellow;
    font-weight: 600;
  }

.dark .main section :deep(h3) {
    color: $dark-heading;
}

.main section :deep(a) {
    color: black;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
}

.dark .main section :deep(a) {
    color: white;
}

.contrast .main section :deep(a) {
    color: yellow;
}

.ue-el :deep(img) {
    max-width: 98%;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.8em;
}

.flex .content {
  padding: 5px 50px 5px 0;
  width: 100%;
}

.flex .content :deep(ul), .flex .content :deep(ol) {
  margin-left: 30px;
}

.flex .content :deep(div):nth-child(1) {
  margin-bottom: 30px;
}

.flex .content :deep(p) {
  margin-bottom: 10px;
}

.flex .right {
  width: 35%;
}

.red {
  color: red;
  font-size: 1.2em;
  font-weight: 600;
}

.main :deep(b) {
    font-weight: 600;
}

.main :deep(mark) {
    background-color: transparent;
    color: red;
}

.main :deep(p) {
    margin-top: 5px;
}

.main .ue-img {
    max-width: 730px;
    min-width: 150px;
    width: 100%;
}

.main .ue-img2 {
    max-width: 800px;
    width: 100%;
}

@media (max-width: 900px) {
    .main section h2 {
        font-size: 3.5em;
    }

    .flex {
      flex-direction: column;
      padding: 0 10px;
    }

    .flex .content {
      padding: 5px 0 5px 0;
      width: 100%;
    }
}

@media (max-width: 600px) {
    .main section {
        padding: 10px 5px;
    }

    .main section h2 {
        font-size: 3em;
    }
}

@media (max-width: 400px) {
    .main section h2 {
        font-size: 2.5em;
    }
}
</style>