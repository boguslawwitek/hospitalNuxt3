<script setup>
    import edjsHTML from 'editorjs-html';
    import { normalizeString, generateImagesObj, removeDash } from '../../utils';

    const config = useRuntimeConfig();
    const route = useRoute();
    const {data: data} = await useFetchApi(`nav-category-hospital-treatment`, '/api/category/2');
    const category = data.value.ward;

    const article = category.find(c => c.id === parseInt(route.params.article_id));
    const ward = useState(`hospital-treatment-ward-${article.id}`);
    const body = useState(`hospital-treatment-body-${article.id}`);
    const additionalData = useState(`hospital-treatment-additionaldata-${article.id}`);
    const additionalDataFirstEl = useState(`hospital-treatment-additionaldatafirst-${article.id}`);
    const contactData = useState(`hospital-treatment-contactdata-${article.id}`);

    const images = useState(`images-hospital-treatment-${normalizeString(removeDash(route.params.article_name))}`, () => null);

    if(article && normalizeString(removeDash(article.title)) === route.params.article_name) {
        useHead({
            title: `hospitalnuxt3 - ${article.title}`
        });

        const {data: dataArticle} = await useFetchApi(`hospitaltreatment-article-page-${article.id}`, `/api/ward/${article.id}`);
        ward.value = dataArticle;

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
        <section v-if="ward">
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
        <section>
          <div class="important" v-if="additionalData">
            <div class="red" v-if="additionalDataFirstEl" v-html="additionalDataFirstEl"></div>
            <div v-html="additionalData.join('')"></div>
          </div>
        </section>
        <section v-if="images">
          <SimpleGallery :images="images" divClass="gallery" />
        </section>
      </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/department.scss';
</style>