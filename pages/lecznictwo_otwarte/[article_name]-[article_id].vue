<script setup>
    import edjsHTML from 'editorjs-html';
    import { normalizeString, generateImagesObj, getAttachmentsUrl, removeDash } from '../../utils';

    const config = useRuntimeConfig();
    const route = useRoute();
    const {data: data} = await useFetchApi(`nav-category-open-treatment`, '/api/category/3');
    const category = data.value.content;
    let wards = null;
    if(data.value.hasOwnProperty('ward') && data.value.ward.length > 0) wards = data.value.ward;
    const title = useState('article-open-treatment-title', () => null); 

    const type = useState('ward-article-type', () => null);
    const article = category.find(c => c.id === parseInt(route.params.article_id));
    const images = useState(`images-open-treatment-${normalizeString(removeDash(route.params.article_name))}`, () => null);
    const dataArticle = useState(`data-article-open-treatment-${normalizeString(removeDash(route.params.article_name))}`);
    const html = useState(`html-open-treatment-${normalizeString(removeDash(route.params.article_name))}`);

    const ward = wards.find(w => w.id === parseInt(route.params.article_id));
    const body = useState(`open-treatment-body-${ward && ward.hasOwnProperty('id') ? ward.id : null}`);
    const additionalData = useState(`open-treatment-additionaldata-${ward && ward.hasOwnProperty('id') ? ward.id : null}`);
    const additionalDataFirstEl = useState(`open-treatment-additionaldatafirst-${ward && ward.hasOwnProperty('id') ? ward.id : null}`);
    const contactData = useState(`open-treatment-contactdata-${ward && ward.hasOwnProperty('id') ? ward.id : null}`);

    let pdf51 = null;

    if(article && normalizeString(removeDash(article.title)) === route.params.article_name) {
        type.value = 'article';

        useHead({
            title: `hospitalnuxt3 - ${article.title}`
        });

        title.value = article.title;

        if(article.id === 51) {
          const { data } = await useFetchApi(`open-treatment-article-page-${article.id}`, `/api/content/${article.id}`);
          dataArticle.value = data;

          const attachments = data.value.attachments;

          if(attachments && attachments.length > 0) {
            pdf51 = attachments[0];
          }

        } else {
          const { data } = await useFetchApi(`open-treatment-article-page-${article.id}`, `/api/content/${article.id}`);
          dataArticle.value = data;

          const contentFromEditor = JSON.parse(data.value.body);
          html.value = edjsHTML().parse(contentFromEditor);

          const photos = data.value.photos;

          if(photos && photos.length > 0) {
              images.value = generateImagesObj(config.apiUrl, dataArticle.value.photos, 360, 240);
          }
        }
    } else if(ward && normalizeString(removeDash(ward.title)) === route.params.article_name) {
        type.value = 'ward';

        useHead({
            title: `hospitalnuxt3 - ${ward.title}`
        });

        title.value = ward.title;
        const {data: dataArticle} = await useFetchApi(`open-treatment-article-page-ward-${ward.id}`, `/api/ward/${ward.id}`);
        ward.value = dataArticle.value;

        const contentFromEditor = JSON.parse(dataArticle.value.body);
        const contentFromEditor2 = JSON.parse(dataArticle.value.additional_data);
        const contentFromEditor3 = JSON.parse(dataArticle.value.contact_data);
        const htmlAdditionalData = edjsHTML().parse(contentFromEditor2);

        body.value = edjsHTML().parse(contentFromEditor);
        additionalDataFirstEl.value = htmlAdditionalData.shift();
        additionalData.value = htmlAdditionalData;
        contactData.value = edjsHTML().parse(contentFromEditor3);
        
        const photos = dataArticle.value.photos;

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
        <section v-if="html && type === 'article' && article.id !== 51">
            <img class="ue-img" v-if="dataArticle && dataArticle.id === 7 && images && images.length > 0" :src="images[0].src" alt="" />
            <h2 v-if="title">{{title}}</h2>
            <div class="flex">
              <div class="content">
                <div v-html="html.join('')"></div>
              </div>
            </div>
            <img class="ue-img2" v-if="dataArticle && dataArticle.id === 7 && images && images.length > 1" :src="images[1].src" alt="" />
        </section>
        <section v-if="ward && type === 'ward'">
            <h2>{{ward.title}}</h2>
            <div class="flex">
              <div class="left">
                <div v-html="body.join('')"></div>
              </div>
              <div class="right">
                <HospitalMap />
                <ul>
                  <li class="place">{{ward.localization}}</li>
                  <li class="call">
                    <div class="contact" v-html="contactData.join('')"></div>
                  </li>
                </ul>
              </div>
            </div>
        </section>
        <section v-if="type === 'ward'">
          <div class="important" v-if="additionalData">
            <div class="red" v-if="additionalDataFirstEl" v-html="additionalDataFirstEl"></div>
            <div v-html="additionalData.join('')"></div>
          </div>
        </section>
        <section v-if="images && images.length > 0">
          <SimpleGallery :images="images" divClass="gallery" />
        </section>
        <section v-if="article && type === 'article' && article.id === 51">
            <h2 v-if="title">{{title}}</h2>
            <a target="_blank" :href="getAttachmentsUrl(config.apiUrl, pdf51.path)" class="download">Otwórz w nowej karcie</a>
            <object v-if="pdf51" :data='getAttachmentsUrl(config.apiUrl, pdf51.path)' type="application/pdf" frameborder="0" class="embed">
              <p>Twoja przeglądarka nie wspiera podglądu. Użyj przycisku "Otwórz w nowej karcie" powyżej.</p>
              <embed v-if="pdf51" :src="getAttachmentsUrl(config.apiUrl, pdf51.path)" class="embed" />
            </object>
        </section>
      </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors.scss';
@import '../assets/styles/department.scss';

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

.embed {
    max-width: 1600px;
    min-width: 150px;
    min-height: 600px;
    width: 90%;
}

.download {
    display: inline-block;
    background-color: #3F83F8;
    color: white;
    padding: 10px 15px;
    border-radius: 4px;
    border-style: none;
    font-size: 2em;
    margin: 10px 10px 10px 0;
    cursor: pointer;
    transition: background-color .3s;

    &:hover {
        text-decoration: none;
        background-color: #1C64F2;
    }
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