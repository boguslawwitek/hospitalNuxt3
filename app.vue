<script setup>
  import { onMounted } from 'vue';
  const { themeType, setThemeType } = useThemeType();
  const { fontSize, setFontSize } = useFontSize();

  const { setInnerWidth } = useInnerWidth();

  onMounted(() => {
    if(localStorage.hasOwnProperty('themeType')) {
      if(localStorage.getItem("themeType") === "dark") {
        setThemeType('dark');
      } else if(localStorage.getItem("themeType") === "contrast") {
        setThemeType('contrast');
      }
    }

    if(localStorage.hasOwnProperty('fontSize')) {
      if(localStorage.getItem("fontSize") === "small") {
        setFontSize('small');
      } else if(localStorage.getItem("fontSize") === "large") {
        setFontSize('large');
      }
    }
  });

  if (process.client) {
    setInnerWidth(window.innerWidth);
    
    window.addEventListener('resize', function() {
      setInnerWidth(window.innerWidth);
    });
  }
</script>

<template>
  <div :class="themeType + ' ' + fontSize">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>