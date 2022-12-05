<script setup>
  import { getImageUrl } from '../utils';
  const config = useRuntimeConfig();
  const {data: data} = await useFetchApi(`map-photo-9`, '/api/photo/9');

  const mapImage = useState('mapImage', () => [{
    src: getImageUrl(config.apiUrl, data.value.path),
    thumbnail: getImageUrl(config.apiUrl, data.value.path),
    w: 1920,
    h: 1080
  }]);
</script>

<template>
    <div>
      <div class="image"><SimpleGallery :images="mapImage" /></div>
      <div class="map-info">Kliknij zdjęcie, aby powiększyć</div>
    </div>
</template>

<style lang="scss" scoped>
.image {
  width: 100%;
  max-width: 350px;
  min-width: 150px;
  border: 3px dashed gray;
  padding: 10px;
}

.image img {
  display: block;
  height: 100%;
  width: 100%;
}

.map-info {
  color: grey;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 15px;
}
</style>