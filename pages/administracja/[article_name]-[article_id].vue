<script setup>
    import { normalizeString, removeDash } from '../../utils';

    const route = useRoute();
    const {data: data} = await useFetchApi(`nav-category-administration`, '/api/category/1');
    const administrationCategory = data.value.content;

    const article = administrationCategory.find(c => c.id === parseInt(route.params.article_id));
    let article2 = null;
    const employees = useState('category-administration-employees', () => []);
    const employees2 = useState('category-administration-employees2', () => []);

    if(article && normalizeString(removeDash(article.title)) === route.params.article_name && article.display_on_menu === 1) {
        useHead({
            title: `hospitalnuxt3 - ${article.title}`
        });

        const {data: dataArticle} = await useFetchApi(`administration-article-page-${article.id}`, `/api/content/${article.id}`);
        employees.value = dataArticle.value.employees;

        if(article.id === 11) {
            const {data: dataArticle2} = await useFetchApi(`administration-article-page-${article.id}-2`, `/api/content/18`);
            employees2.value = dataArticle2.value.employees;
            article2 = dataArticle2.value;
        }
    } else {
        throw createError({ statusCode: 404, statusMessage: 'Nieznaleziono takiej strony' })
    }
</script>

<template>
    <div class="container">
      <main class="main">
        <section>
            <h2 v-text="article.title"></h2>
            <div class="cards">
                <div class="card" v-for="person in employees">
                    <div class="name">{{person.name}}</div>
                    <div class="role">{{person.workplace}}</div>
                    <div class="contact" v-if="person.phone"><div class="icon"><span class="material-symbols-outlined">call</span></div>{{person.phone}}</div>
                    <div class="contact" v-if="person.email"><div class="icon"><span class="material-symbols-outlined">mail</span></div>{{person.email}}</div>
                </div>
            </div>
        </section>
        <section v-if="article.id === 11">
            <h2 v-text="article2.title"></h2>
            <div class="cards">
                <div class="card" v-for="person in employees2">
                    <div class="name">{{person.name}}</div>
                    <div class="role">{{person.workplace}}</div>
                    <div class="contact" v-if="person.phone"><div class="icon"><span class="material-symbols-outlined">call</span></div>{{person.phone}}</div>
                    <div class="contact" v-if="person.email"><div class="icon"><span class="material-symbols-outlined">mail</span></div>{{person.email}}</div>
                </div>
            </div>
        </section>
      </main>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/styles/administration.scss';
</style>