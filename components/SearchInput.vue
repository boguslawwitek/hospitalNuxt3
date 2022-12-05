<script setup>
import { removeDash, normalizeUrl } from '../utils';

const config = useRuntimeConfig();
const foundArticles = useState('foundArticles', () => []);
const searchModalVisible = useState('searchModalVisible', () => false);
const inputValue = useState('searchInputValue', () => "");

function clearInput() {
    inputValue.value = "";
    searchModalVisible.value = false;
}

function getCategoryPath(id) {
    if(id === 8) return '/szpital/';
    else if(id === 1) return '/administracja/';
    else if(id === 2) return '/lecznictwo_szpitalne/';
    else if(id === 3) return '/lecznictwo_otwarte/';
    else if(id === 4) return '/dla_pacjenta/';
    else if(id === 12) return '/budzet_panstwa/';
    else if(id === 13) return '/unia_europejska/';
    else return "/";
}

function getArticleUrl(article) {
    if(article.id === 49 || article.id === 50) {
        return `ogloszenia/${normalizeUrl(removeDash(article.title))}`;
    } else if(article.id === 48) {
        return "";
    } else if(article.id === 35) {
        return "szpital/kontakt";
    } else if(article.id === 58) {
        return "szpital/inwestycje";
    } else {
        return normalizeUrl(`${removeDash(article.title)}-${article.id}`);
    }
}

async function onChangeInput(e) {
    inputValue.value = e.target.value.trim();

    if(inputValue.value && inputValue.value.length >= 3) {
        const value = inputValue.value.trim().toLowerCase().replaceAll(' ', '');

        const { data: articles } = await useFetch(encodeURI(`${config.apiUrl}/api/search?query=${value}`), {baseURL: '', initialCache: false, key: value});
        let contents = articles.value.contents;
        let wards = articles.value.wards;
        let allArticles = [];

        for(let content of contents) {
            if(content.id === 18) continue;
            allArticles.push({title: content.title, id: content.id, category_id: content.category_id});
        }

        for(let ward of wards) {
            allArticles.push({title: ward.title, id: ward.id, category_id: ward.category_id});
        }

        foundArticles.value = allArticles;
        searchModalVisible.value = true;
    } else {
        searchModalVisible.value = false;
    }
}
</script>

<template>
    <div class="container-search">
        <div class="search-container">
            <input class="search-input" ref="input" type="text" name="search" placeholder="Wyszukaj..." autoComplete="off" @input="(e) => onChangeInput(e)" :value="inputValue" />
            <button @click="this.$refs.input.focus()" class="search-btn"><font-awesome-icon icon="fa-solid fa-magnifying-glass" class="icon" /></button>

            <div class="articles" v-if="searchModalVisible">
                <div class="article" v-if="foundArticles && foundArticles.length > 0" v-for="article of foundArticles">
                    <NuxtLink @click="clearInput" :to="`${getCategoryPath(article.category_id)}` + getArticleUrl(article)"><div><span class="material-symbols-outlined article-icon">article</span>{{article.title}}</div></NuxtLink>
                </div>
                <div class="article" v-else>
                    <a class="disabled"><div>Brak wyników...</div></a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/styles/colors.scss';
    .container-search {
        font-size: 10px;
        font-weight: 500;
    }

    .dark .container-search {
        font-weight: 400;
    }

    .large .container-search {
        font-size: 13px;
    }

    .small .container-search {
        font-size: 8px;
    }

    .contrast .container-search {
        font-weight: 400;
    }

    .search-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .search-container .articles {
        position: absolute;
        top: 110%;
        left: 0;
        background-color: $light-bg;
        border: 1px solid #e2e8f0;
        border-radius: 4px;
        height: auto;
        max-height: 300px;
        width: 100%;
        z-index: 2;
        overflow-x: hidden;
        overflow-y: auto;

        &::-webkit-scrollbar {
            width: 16px;
        }

        &::-webkit-scrollbar-track {
            background-color: #edf2f7;
            border-radius: 100px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #3F83F8;
            border-radius: 100px;
        }
    }

    .dark .search-container .articles {
        background-color: #362F78;
        border-color: #5145CD;

        &::-webkit-scrollbar-track {
            background-color: #362F78;
        }
    }

    .contrast .search-container .articles {
        background-color: black;
        border-color: yellow;

        &::-webkit-scrollbar-track {
            background-color: yellow;
        }
    }

    .search-container .articles .article {
        width: 100%;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid #e2e8f0;
        transition: all .3s;

        &:hover {
            background-color: rgba(0,0,0,0.1);
        }
    }

    .dark .search-container .articles .article {
        border-color: #5145CD;
        background-color: rgba(229, 231, 235, 0.2);
    }

    .contrast .search-container .articles .article {
        border-color: yellow;
        background-color: black;
    }

    .search-container .articles .article div {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .search-container .articles .article a {
        display: block;
        width: 100%;
        color: #3F83F8;
        font-size: 2em;
        padding: 5px;
        transition: all .3s;

        &:hover {
            text-decoration: none;
            color: #1C64F2;
        }
    }

    .search-container .articles .article a .article-icon {
        margin-right: 7px;

        &:hover {
            text-decoration: none;
        }
    }

    .dark  .search-container .articles .article a {
        color: white;

        &:hover {
            color: rgba(185, 185, 185, 0.9);
        }
    }

    .contrast .search-container .articles .article a {
        color: yellow;

        &:hover {
            color: yellow;
            text-decoration: underline;
        }
    }

    .search-container .search-btn {
        display: block;
        background-color: #3F83F8;
        border-style: none;
        padding: 10px 12px;
        border-style: none;
        height: 44px;
        border-top: 1px solid #3F83F8;
        border-bottom: 1px solid #3F83F8;
        border-right: 1px solid #3F83F8;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        cursor: pointer;
        transition: all .3s;

        &:hover {
            background-color: #1C64F2;
            border-top: 1px solid #1C64F2;
            border-bottom: 1px solid #1C64F2;
            border-right: 1px solid #1C64F2;
        }
    }
    .search-container .search-input {
        display: block;
        font-size: 20px;
        padding: 10px 15px;
        height: 44px;
        color: black;
        transition: border-color .3s;
        background-color: white;
        border: 1px solid #e2e8f0;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;

        &:hover {
            border-color: #3F83F8;
        }

        &:focus {
            border-color: #3F83F8;
            outline: none;
        }

        &::placeholder {
            color: black;
        }
    }

    .dark .search-container .search-input {
        background-color: rgba(229, 231, 235, 0.2);
        border: 1px solid rgba(229, 231, 235, 0.2);
        color: white;

        &::placeholder {
            color: rgb(179, 179, 179);
        }

        &:hover {
            border-color: #3F83F8;
        }

        &:focus {
            border-color: #3F83F8;
            outline: none;
        }
    }

    .contrast .search-container .search-input {
        background-color: yellow;
        border: 1px solid yellow;
        color: black;

        &:hover {
            border-color: #3F83F8;
        }

        &:focus {
            border-color: #3F83F8;
            outline: none;
        }

        &::placeholder {
            color: black;
        }
    }

    .search-container .icon {
        color: #e9eefa;
        font-size: 20px;
    }

    .dark .search-container .icon {
        color: white;
    }

    .contrast .search-container .icon {
        color: black;
    }

    .disabled {
        pointer-events: none;
        cursor: default;
        text-decoration: none;
    }

    @media (max-width: 1120px) {
        .search-container .articles {
            left: 50%;
            transform: translateX(-50%);
            width: 60%;
        }

        .container-search {
            margin-top: 10px;
        }
    }

    @media (max-width: 600px) {

        .search-container .articles {
            width: 90%;
        }

        .search-container .search-input {
            padding: 10px 5px;
        }
    }
    </style>