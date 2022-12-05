<script setup>
    import edjsHTML from 'editorjs-html';
    import { normalizeString, generateImagesObj, removeDash } from '../../utils';

    const config = useRuntimeConfig();
    const route = useRoute();
    const {data: data} = await useFetchApi(`nav-category-hospital`, '/api/category/8');
    const category = data.value.content;
    const title = useState('article-hospital-title', () => null); 

    const article = category.find(c => c.id === parseInt(route.params.article_id));
    const images = useState(`images-hospital-${normalizeString(removeDash(route.params.article_name))}`, () => null);
    const dataArticle = useState(`data-article-hospital-${normalizeString(removeDash(route.params.article_name))}`);
    const html = useState(`html-hospital-${normalizeString(removeDash(route.params.article_name))}`);

    if(article && normalizeString(removeDash(article.title)) === route.params.article_name) {
        useHead({
            title: `hospitalnuxt3 - ${article.title}`
        });

        title.value = article.title;

        const { data } = await useFetchApi(`hospital-article-page-${article.id}`, `/api/content/${article.id}`);
        dataArticle.value = data;

        const contentFromEditor = JSON.parse(data.value.body);
        html.value = edjsHTML().parse(contentFromEditor);

        const photos = data.value.photos;

        if(photos && photos.length > 0) {
            images.value = generateImagesObj(config.apiUrl, dataArticle.value.photos, 360, 240);
        }
    } else {
        throw createError({ statusCode: 404, statusMessage: 'Nieznaleziono takiej strony' });
    }
</script>

<template>
    <div class="container">
      <main class="main">
        <section v-if="html">
            <h2 v-if="title">{{title}}</h2>
            <div class="flex">
              <div class="content">
                <div v-html="html.join('')"></div>
              </div>
            </div>
        </section>
        <section v-if="images && dataArticle.id !== 7">
          <SimpleGallery :images="images" divClass="gallery" />
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
    font-size: 1.5em;
}

.contrast .main section :deep(h3) {
    color: yellow;
    font-weight: 600;
  }
  
.dark .main section :deep(h3) {
    color: $dark-heading;
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