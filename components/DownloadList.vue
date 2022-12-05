<template>
    <div class="list-container" v-if="downloadLinks && downloadLinks.length > 0">
        <p class="bold-600">Poniżej znajduje się pliki do pobrania:</p>
        <ol class="download-list">
            <li v-for="link of downloadLinks"><a target="_blank" :href="link.path" download>{{link.title}}</a></li>
        </ol>
    </div>    
</template>

<script>
    export default {
      name: 'DownloadList',
      props: {
        downloadLinks: Array
      },
      setup(props) {
        return {
          downloadLinks: props.downloadLinks,
        };
      }
    };
</script>
  
<style lang="scss" scoped>
    .list-container {
        margin-top: 50px;
        font-size: 2em;
    }
    
    .download-list {
        margin-left: 45px;
        padding-bottom: 20px;
    }
    
    .download-list a {
        color: #3F83F8;
        text-decoration: none;
    
        &:hover {
            text-decoration: underline;
            color: #1C64F2;
        }
    }
</style>  