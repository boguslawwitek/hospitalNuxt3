<script setup>
    import { normalizeUrl, removeDash } from '../utils';
    const { innerWidth, isMobile } = useInnerWidth();
    const btnsState = useState('btnsState', () => [false, false, false, false, false]);
    const menuIsOpen = useState('menuIsOpen', () => false);

    const setBtnState = (index) => {
        const defaultValue = [false, false, false, false, false];
        defaultValue[index] = !btnsState.value[index];
        btnsState.value = defaultValue;
    }

    const closeAllDropdowns = () => {
        btnsState.value = [false, false, false, false, false];
        menuIsOpen.value = false;
    }

    const setMenuIsOpen = () => {
        menuIsOpen.value = !menuIsOpen.value; 
    }

    const dropdowns = [];

    const {data: dataHospital} = await useFetchApi('nav-category-hospital', '/api/category/8');
    dropdowns.push({name: dataHospital.value.name.trim(), id: dataHospital.value.id, articles: dataHospital.value.content, ward: [], path: 'szpital'});

    const {data: dataAdministration} = await useFetchApi('nav-category-administration', '/api/category/1');
    dropdowns.push({name: dataAdministration.value.name.trim(), id: dataAdministration.value.id, articles: dataAdministration.value.content, ward: [], path: 'administracja'});

    const {data: dataHospitalTreatment} = await useFetchApi('nav-category-hospital-treatment', '/api/category/2');
    dropdowns.push({name: dataHospitalTreatment.value.name.trim(), id: dataHospitalTreatment.value.id, articles: dataHospitalTreatment.value.ward, ward: [], path: 'lecznictwo_szpitalne'});

    const {data: dataOpenTreatment} = await useFetchApi('nav-category-open-treatment', '/api/category/3');
    dropdowns.push({name: dataOpenTreatment.value.name.trim(), id: dataOpenTreatment.value.id, articles: dataOpenTreatment.value.content, ward: dataOpenTreatment.value.ward, path: 'lecznictwo_otwarte'});

    const {data: dataForPatient} = await useFetchApi('nav-category-for-patient', '/api/category/4');
    dropdowns.push({name: dataForPatient.value.name.trim(), id: dataForPatient.value.id, articles: dataForPatient.value.content, ward: [], path: 'dla_pacjenta'});

    const {data: dataAnnouncements} = await useFetchApi('nav-article-name-announcements', '/api/content/49');
    const {data: dataJobs} = await useFetchApi('nav-article-name-jobs', '/api/content/50');
    const announcementsName = dataAnnouncements.value.title;
    const jobsName = dataJobs.value.title;
</script>
    
<template>
    <div class="container">
    <nav class="nav">
        <div class="mobile-bar" v-show="innerWidth && isMobile">
            <button @click="setMenuIsOpen" class="hamburger hamburger--slider" :class="menuIsOpen ? 'is-active' : null" type="button" aria-label="Menu" aria-controls="navigation">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </button>
            <NuxtLink class="mobile-bar-home" to="/"><p>hospital<span>nuxt3</span></p></NuxtLink>
        </div>
        <ul v-show="(innerWidth && !isMobile) || menuIsOpen">
            <li><NuxtLink @click="closeAllDropdowns" to="/" exact activeClass="active">Strona główna</NuxtLink></li>
            <li class="dropdown-li" v-for="(dropdown, index) in dropdowns">
                <div v-if="dropdown.articles && dropdown.articles.length > 0">
                    <div v-if="dropdown.articles.length === 1">
                        <NuxtLink @click="closeAllDropdowns" :to="`/${dropdown.path}/` + normalizeUrl(`${dropdown.articles[0].title}-${dropdown.articles[0].id}`)" exact activeClass="active">{{dropdown.name}}</NuxtLink>
                    </div>
                    <div v-else>
                        <button class="btns" @click="setBtnState(index)">{{dropdown.name}}<font-awesome-icon icon="fa-solid fa-angle-down" class="icons" :class="btnsState[index] ? 'up' : null" /></button>
                        <ul class="dropdown" :class="btnsState[index] ? 'open' : null">
                            <li v-if="dropdown.path === 'szpital'"><NuxtLink to="/szpital/inwestycje" activeClass="active" @click="closeAllDropdowns">Inwestycje</NuxtLink></li>
                            <li v-for="option in dropdown.ward"><NuxtLink v-if="option" @click="closeAllDropdowns" :to="`/${dropdown.path}/` + normalizeUrl(`${removeDash(option.title)}-${option.id}`)" activeClass="active">{{option.title}}</NuxtLink></li>
                            <li v-for="option in dropdown.articles"><NuxtLink v-if="(option.hasOwnProperty('display_on_menu') && option.display_on_menu === 1) || !option.hasOwnProperty('display_on_menu')" @click="closeAllDropdowns" :to="`/${dropdown.path}/` + normalizeUrl(`${removeDash(option.title)}-${option.id}`)" activeClass="active">{{option.title}}</NuxtLink></li>
                            <li v-if="dropdown.path === 'szpital'"><NuxtLink to="/szpital/kontakt" activeClass="active" @click="closeAllDropdowns">Kontakt</NuxtLink></li>
                            <li v-if="dropdown.path === 'szpital'"><a href="#" target="_blank" rel="noreferrer">Biletyn Informacji Publicznej<font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="external" /></a></li>
                            <li v-if="dropdown.path === 'szpital'"><a href='http://www.pfsz.org' target="_blank" without rel="noreferrer">Polska Federacja Szpitali<font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="external" /></a></li>
                        </ul>
                    </div>
                </div>
            </li>
            <li><NuxtLink @click="closeAllDropdowns" :to="`/ogloszenia/${normalizeUrl(removeDash(jobsName))}`" activeClass="active">{{jobsName}}</NuxtLink></li>
            <li><NuxtLink @click="closeAllDropdowns" :to="`/ogloszenia/${normalizeUrl(removeDash(announcementsName))}`" activeClass="active">{{announcementsName}}</NuxtLink></li>
            <li><SearchInput v-show="innerWidth && isMobile" /></li>
        </ul> 
    </nav>
    </div>
</template>

<style lang="scss" scoped>
$nav-color: #6875F5;
$active-btn-color: rgba(0,0,0,0.1);

.container {
    background-color: $nav-color;
    width: 100%;
    font-size: 10px;
}

.small .container {
    font-size: 8px;
}

.contrast .container {
    background-color: yellow;
}

.nav {
    max-width: 1900px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav ul {
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav ul > li {
    margin: 0 2px;
}

.large .nav ul > li {
    margin: 2px auto;
}

.nav ul a, .nav ul button {
    padding: 12px 15px;
    display: block;
    color: white;
    background-color: $nav-color;
    border-style: none;
    cursor: pointer;
    transition: background-color .3s;
    border-radius: 5px;
    font-weight: 400;

    &:hover {
        text-decoration: none;
        background-color: $active-btn-color;
    }
}

.nav ul a.active {
    cursor: unset;
}

.nav ul .dropdown a.active {
    background-color: #5850EC;

    &:hover {
        background-color: #5850EC;
        color: white;
    }
}

.contrast .nav ul .dropdown a.active {
    &:hover {
        color: black;
    }
}

.nav ul a.active, .nav ul .btns.active {
    background-color: $active-btn-color;
    color: white;
}

.contrast .nav ul a, .contrast .nav ul .btns {
    background-color: yellow;
    color: black;

    &:hover {
        background-color: rgb(211, 211, 34);
    }
}

.contrast .nav ul a.active, .contrast .nav ul .btns.active {
    color: black;
    background-color: rgb(211, 211, 34);

    &:hover {
        background-color: rgb(211, 211, 34);
        text-decoration: none;
    }
}

.dropdown-li div, .dropdown-li div div {
    width: 100%;
}

.nav ul .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
}

.nav ul li.dropdown-li {
    position: relative;
    top: 0;
    left: 0;
}

.nav ul .dropdown {
    display: none;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    position: absolute;
    top: 107%;
    left: 0;
    width: 350px;
    font-size: 1em;
    background-color: #edf2f7;
    border-radius: 5px;
    padding: 3px 0;
    z-index: 1;
    max-height: 600px;
    overflow-x: hidden;
    overflow-y: auto;
    border: 1px solid #e2e8f0;

    &::-webkit-scrollbar {
        width: 16px;
    }
     
    &::-webkit-scrollbar-track {
        background-color: #edf2f7;
        border-radius: 100px;
    }
     
    &::-webkit-scrollbar-thumb {
        background-color: $nav-color;
        border-radius: 100px;
    }
}

.dark .nav ul .dropdown {
    background-color: #362F78;
    border: none;

    &::-webkit-scrollbar-track {
        background-color: #362F78;
    }
}

.contrast .nav ul .dropdown {
    background-color: yellow;
    border: 1px solid black;

    &::-webkit-scrollbar-track {
        background-color: black;
        border: 1px solid red;
    }

    &::-webkit-scrollbar-thumb {
        border: 1px solid red;
        background-color: yellow;
    }
}

.nav ul .dropdown.open {
    display: flex;
}

.nav .dropdown li {
    margin: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.nav .dropdown ul, .nav .dropdown li {
    width: 100%;
}

.nav .dropdown a {
    color: black;
    background-color: #edf2f7;
    padding: 7px 15px;
    width: 95%;
    margin: 0 auto;
    transition: all .3s;

    &:hover {
        color: black;
    }
}

.nav .dropdown a .external {
    margin-left: 3px;
}

.dark .nav .dropdown a {
    color: white;
    background-color: #362F78;

    &:hover {
        background-color: $active-btn-color;
    }
}

.contrast .nav .dropdown a {
    background-color: black;
    color: yellow;

    &:hover {
        background-color: black;
        text-decoration: underline;
    }
}

.btns .icons {
    font-size: 1.3em;
    pointer-events: none;
    margin-left: 3px;
    transition: transform .2s ease-in-out;
    transform: rotate(0);
    width: fit-content;
}

.btns .icons.up {
    transform: rotate(-180deg);
}

.mobile-bar {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 12px 0;
    padding: 0 10px;
}

.mobile-bar p {
    color: white;
    font-weight: 300;
    margin-left: 12px;
    font-size: 3em;
}

.mobile-bar-home {
    &:hover {
        text-decoration: none;
    }
}

.large .mobile-bar p {
    font-size: 3.2em;
}   

.contrast .mobile-bar p {
    color: black;
}

.mobile-bar span {
    color: #6aceeb;
}

.contrast .mobile-bar > .btns > span > span.hamburger-inner {
    background-color: black;

    &::after {
        background-color: black;
    }

    &::before {
        background-color: black;
    }
}

@media (min-width: 1920px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 2.35em;
    }
    
}

@media (min-width: 1835px) and (max-width: 1920px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 2.26em;
    }
    
}

@media (min-width: 1735px) and (max-width: 1835px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 2.11em;
    }
    
}

@media (min-width: 1617px) and (max-width: 1735px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 1.94em;
    }
    
}

@media (min-width: 1515px) and (max-width: 1617px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 1.79em;
    }
    
}

@media (min-width: 1417px) and (max-width: 1515px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 1.64em;
    }
    
}

@media (min-width: 1315px) and (max-width: 1417px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 1.49em;
    }
    
}

@media (min-width: 1200px) and (max-width: 1315px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 1.34em;
    }
    
}

@media (min-width: 1121px) and (max-width: 1215px) {
  
    .nav ul a, .nav ul .btns {
        font-size: 1.2em;
    }
    
}

@media (max-width: 1120px) {

    .container {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 4;
    }
  
    .nav ul a, .nav ul .btns {
        font-size: 2em;
        width: 90%;
        margin: 0 auto;
        justify-content: space-between;
    }

    .nav {
        height: auto;
        flex-direction: column;
    }

    .nav ul {
        flex-direction: column;
        width: 100%;
    }

    .nav ul a {
        text-align: left;
        margin: 0 auto;
    }

    .nav li {
        width: 90%;
        margin: 2px auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .nav ul > li {
        margin: 2px 0;
    }

    .nav ul .dropdown {
        width: 90%;
        left: 50%;
        transform: translateX(-50%);
    }

    .nav > ul > li:nth-last-child(1) {
        margin-bottom: 20px;
    }
    
}

@media (max-width: 600px) {
    .nav ul .dropdown {
        width: 95%;
    }
}
</style>