<script setup>
  const { innerWidth, isMobile } = useInnerWidth();
</script>

<template>
    <div>
      <TheNav v-show="innerWidth && isMobile" />
      <TheHeader />
      <TheNav v-show="innerWidth && !isMobile" />
      <GlobalInfo />
        <slot />
      <TheFooter />
    </div>
</template>