<script setup>
    import edjsHTML from 'editorjs-html';
    import { normalizeString, removeDash, generateAttachmentsObj } from '../../utils';

    const config = useRuntimeConfig();
    const route = useRoute();
    const {data: data} = await useFetchApi(`nav-article-name-announcements`, '/api/content/49');
    const {data: data2} = await useFetchApi(`nav-article-name-jobs`, '/api/content/50');

    const announcementsName = data.value.title;
    const jobsName = data2.value.title;
    const type = useState('announcements-type', () => null);
    const announcements = useState('announcements-jobs-covid', () => []);
    const attachments = useState(`attachments-covid-jobs-${normalizeString(removeDash(route.params.name))}`, () => []);

    if(route.params.name === normalizeString(removeDash(announcementsName))) {
        type.value = 'covid';
        useHead({
            title: `hospitalnuxt3 - ${announcementsName}`
        });

        const notifications = data.value.notifications;

        if(notifications && notifications.length > 0) {
            announcements.value = [];
            for(let notify of notifications) {
                const contentFromEditor = JSON.parse(notify.body);
                const htmlFromEditor = edjsHTML().parse(contentFromEditor);
                announcements.value.push({id: notify.id, title: notify.title, html: htmlFromEditor, type: notify.type});
            }
        }  

        announcements.value.sort(function(a, b) {return b.id - a.id});
    } else if(route.params.name === normalizeString(jobsName)) {
        type.value = 'jobs';
        const {data: data} = await useFetchApi(`jobs-article-page`, '/api/jobs');

        useHead({
            title: `hospitalnuxt3 - ${jobsName}`
        });

        const jobsData = data.value;

        if(jobsData && jobsData.length > 0) {
            announcements.value = [];
            for(let job of jobsData) {
                const contentFromEditor = JSON.parse(job.body);
                const htmlFromEditor = edjsHTML().parse(contentFromEditor);
                announcements.value.push({id: job.id, title: job.title, html: htmlFromEditor});
            }
        }  

        announcements.value.sort(function(a, b) {return b.id - a.id});

        const {data: fetchArticle50} = await useFetchApi(`for-patient-article-page-data-50`, `/api/content/50`);
        const attachmentsData = fetchArticle50.value.attachments;

        if(attachmentsData && attachmentsData.length > 0) {
            attachments.value = generateAttachmentsObj(config.apiUrl, attachmentsData);
            attachments.value.sort(function(a, b) {return b.id - a.id});
        }
    } else {
        throw createError({ statusCode: 404, statusMessage: 'Nieznaleziono takiej strony' });
    }

    function getType(type) {
        if(type === 'info') return 'Komunikat';
        else if(type === 'error') return 'Zagrożenie';
        else return null;
    }
</script>

<template>
    <div class="container">
      <main class="main">
        <section>
            <h2 v-if="type === 'covid'">{{announcementsName}}</h2>
            <h2 v-else-if="type === 'jobs'">{{jobsName}}</h2>
            <div class="timeline-container">
                <div class="items-container">
                    <ul class="items-list">
                        <li class="item" :class="type === 'covid' ? 'danger' : ''" v-if="announcements && announcements.length > 0" v-for="announcement of announcements">
                            <div class="item-title" :class="type === 'covid' ? 'danger' : ''"><span class="bold-600" v-if="announcement.hasOwnProperty('type')">{{`${getType(announcement.type)}: `}}</span>{{announcement.title}}</div>
                            <div class="item-desc" v-html="announcement.html.join('')"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
        <section v-if="attachments && attachments.length > 0">
          <DownloadList :downloadLinks="attachments" />
        </section>
      </main>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/styles/announcements.scss';
</style>