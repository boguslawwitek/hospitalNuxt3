<script setup>
    import { normalizeUrl, removeDash } from '../utils';
    const { subdirectory } = useSubdirectory();

    const {data: data} = await useFetchApi('hours-footer-page', '/api/settings');
    const {data: dataForPatient} = await useFetchApi('nav-category-for-patient', '/api/category/4');

    const linkToRODO = dataForPatient.value.content.find(a => a.id === 36);

    const settings = data.value;
    let hours = [];

    const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek'];
    const monday = settings.find(d => d.key === 'monday');
    const tuesday = settings.find(d => d.key === 'tuesday');
    const wednesday = settings.find(d => d.key === 'wednesday');
    const thursday = settings.find(d => d.key === 'thursday');
    const friday = settings.find(d => d.key === 'friday');

    hours.push(monday.value, tuesday.value, wednesday.value, thursday.value, friday.value);
</script>

<template>
    <footer class="footer">
        <div class="container">
            <div>
                <div class="bold-600">Pomocne linki</div>
                <ul>
                    <li><NuxtLink to='/szpital/inwestycje'>Inwestycje</NuxtLink></li>
                    <li><a href='#'>Biuletyn Informacji Publicznej</a></li>
                    <li><NuxtLink :to="'/dla_pacjenta/' + normalizeUrl(`${removeDash(linkToRODO.title)}-${linkToRODO.id}`)">{{linkToRODO.title}}</NuxtLink></li>
                    <li><NuxtLink to='/szpital/kontakt'>Kontakt</NuxtLink></li>
                    <li><a href='#'>Deklaracja dostępności</a></li>
                    <li><a href="#" rel="noreferrer" target="_blank">Facebook</a></li>
                </ul>
            </div>
            <div>
              <div class="bold-600">Rejestracja na miejscu</div>
              <div class="hours-container">
                <div>
                    <ul>
                        <li v-if="data && settings" v-for="day in days">{{day}}</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li class="bold-500" v-if="data && settings" v-for="hour in hours">{{hour}}</li>
                    </ul>
                </div>
              </div>
            </div>
            <NuxtLink to='/wosp'><div class="wosp">
              <img class="wosp-img" :src="`${subdirectory}/images/wosp.png`" alt="Wielka Orkiestra Świątecznej Pomocy" width="300px" height="285px" />
            </div></NuxtLink>
        </div>
        <div class="copyright">
          <p>© 2022 Samodzielny Publiczny Zakład Opieki Zdrowotnej. Wszelkie prawa zastrzeżone.</p>
          <p class="author">Wykonane przez <a href='https://bwitek.dev' target="_blank" rel="noreferrer">Bogusław Witek</a></p>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    padding: 30px 0;
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #edf2f7;
    color: black;
    font-size: 10px;
    line-height: 1.2;
    border-top: 1px solid #e2e8f0;
    font-weight: 500;
}

.footer .large {
    font-size: 13px;
}

.footer .small {
    font-size: 8px;
}

.contrast .footer {
    background-color: yellow;
    color: black;
    font-weight: 400;
    border-top: 1px solid #374151;
}

.dark .footer {
    background-color: black;
    color: white;
    font-weight: 400;
    border-top: 1px solid #5145CD;
    background-color: #362F78;
}

.footer ul {
    list-style-type: none;
}

.footer a {
    color: black;
}

.dark .footer a {
    color: white;
}

.contrast .footer a {
    color: black;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    font-size: 2.4em;
}

.copyright {
    max-width: 1600px;
    margin: 30px auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 2em;
    text-align: center;
    padding: 0 20px;
}

.copyright a {
    font-weight: 600;
}

.contrast .copyright a {
    font-weight: 500;
}

.dark ,.copyright a {
    font-weight: 500;
}

.author {
    margin-top: 7px;
}

.hours-container {
    margin-top: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.hours-container :deep(ul) {
    list-style-type: none;
}

.hours-container :deep(li) {
    margin-top: 7px;
}

.hours-container :deep(div) {
    padding: 0 25px 0 0;
}

.hours-container :deep(b) {
    font-weight: 500;
}

.wosp {
    width: 220px;
}

.wosp-img {
    width: 100%;
    height: auto;
}

.container > div {
    margin-bottom: 30px;
}

@media (max-width: 900px) {
    .copyright {
        font-size: 1.6em;
    }

    .container {
        flex-wrap: wrap;
        justify-content: center;
        font-size: 1.9em;
    }

    .container > div {
        margin-right: 30px;
    }
}

@media (max-width: 600px) {
    .hours {
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .container {
        margin: 0 auto;
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
        max-width: 80%;
    }
}

@media (max-width: 420px) {
    .container {
        max-width: unset;
    }
}

@media (max-width: 400px) {
    .wosp-img {
        width: 200px;
    }
}
</style>