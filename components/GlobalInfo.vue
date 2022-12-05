<script setup>
    const {data: data} = await useFetchApi('hours-footer-page', '/api/settings');
    const settings = data.value;
    const settingsGlobalInfo = settings.find(d => d.key === 'global_info');

    const globalInfo = useState('global-information', () => "");
    globalInfo.value = settingsGlobalInfo.value;
</script>

<template>
    <div class="global-info-container" v-if="globalInfo && globalInfo.length > 1">
        <div class="global-info">
          <p>{{globalInfo}}</p>
        </div>
    </div>
</template>

<style lang="scss">
  .global-info-container {
    max-width: 1200px;
    margin: 0 auto;
  }
  .global-info {  
    margin: 10px;
    font-size: 1.4em;
    color: red;
    border: 4px solid red;
    padding: 10px;
    border-radius: 20px;
    background-color: transparent;
    font-weight: 600;
    text-align: center;
  }
</style>