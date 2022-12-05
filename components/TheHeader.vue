<script setup>
    import SearchInput from './SearchInput.vue';
    const config = useRuntimeConfig();
    const { subdirectory } = useSubdirectory();
    const { themeType, setThemeType } = useThemeType();
    const { fontSize, setFontSize } = useFontSize();
    const { innerWidth, isMobile } = useInnerWidth();

    function handleResetSettingsBtn() {
        setThemeType(null);
        setFontSize(null);
        localStorage.clear();
    }

    function handleDarkThemeBtn() {
        if(themeType.value === 'dark') {
            localStorage.removeItem("themeType");
            setThemeType(null);
            return;
        } else {
            localStorage.setItem("themeType", "dark");
            setThemeType('dark');
            return;
        }
    }

    function handleContrastThemeBtn() {
        if(themeType.value === 'contrast') {
            localStorage.removeItem("themeType");
            setThemeType(null);
            return;
        } else {
            localStorage.setItem("themeType", "contrast");
            setThemeType('contrast');
            return;
        }
    }

    function handleIncraseFontSizeBtn() {
        if(fontSize.value === null) {
            localStorage.setItem("fontSize", "large");
            setFontSize('large');
            return;
        } else if(fontSize.value === 'small') {
            localStorage.removeItem("fontSize");
            setFontSize(null);
            return;
        } else if(fontSize.value === 'large'){
            setFontSize('large');
            return;
        }
    }

    function handleDecreaseFontSizeBtn() {
        if(fontSize.value === null) {
            localStorage.setItem("fontSize", "small");
            setFontSize('small');
            return;
        } else if(fontSize.value === 'large') {
            localStorage.removeItem("fontSize");
            setFontSize(null);
            return;
        } else if(fontSize.value === 'small'){
            setFontSize('small');
        }
    }
</script>
    
<template>
    <div class="bg">
        <div class="top-bar">
            <div class="top-bar-left">
                <a title='Kliknij aby przejść do Facebooka. Strona otwiera się w nowej karcie.' href="#" rel="noreferrer" target="_blank"><font-awesome-icon icon="fa-brands fa-facebook" class="top-bar-icon" /></a>
            </div>
            <div class="top-bar-right">
                <button title='Kliknij aby przywrócić ustawienia początkowe.' @click="handleResetSettingsBtn" :disabled="!themeType && !fontSize ? true : false"><span class="material-symbols-outlined">restart_alt</span></button>
                <button title='Kliknij aby powiększyć czcionkę na stronie.' @click="handleIncraseFontSizeBtn" :disabled="fontSize === 'large' ? true : false"><span class="material-symbols-outlined">text_increase</span></button>
                <button title='Kliknij aby pomnniejszyć czcionkę na stronie.' @click="handleDecreaseFontSizeBtn" :disabled="fontSize === 'small' ? true : false"><span class="material-symbols-outlined">text_decrease</span></button>
                <button :title="themeType !== 'dark' ? 'Kliknij aby włączyć tryb ciemny.' : themeType  === 'dark' ? 'Kliknij aby wyłączyć tryb ciemny.' : null" @click="handleDarkThemeBtn"><span class="material-symbols-outlined">dark_mode</span></button>
                <button :title="themeType !== 'contrast' ? 'Kliknij aby włączyć tryb wysokiego kontrastu.' : themeType === 'contrast' ? 'Kliknij aby wyłączyć tryb wysokiego kontrastu.' : null" @click="handleContrastThemeBtn"><span class="material-symbols-outlined">contrast</span></button>
            </div>
        </div>
        <div class="container">
            <header class="header">
                <div>
                    <NuxtLink to="/">
                        <div class="logo-container">
                            <img :src="`${config.public.logoUrl}`" alt="Logo szpitala" width="64px" height="68px" />
                            <div>hospital<span>nuxt3</span></div>
                        </div>
                    </NuxtLink>
                    <p>Samodzielny Publiczny Zakład Opieki Zdrowotnej</p>
                </div>
                <div class="right-container">
                    <a href='tel:+48612973600'>
                        <div class="middle">
                            <span class="material-symbols-outlined">call</span><div>61 29 73 600</div>
                        </div>
                    </a>
                    <SearchInput v-show="innerWidth && !isMobile" />
                </div>
            </header>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors.scss';
.bg {
    padding-top: 57px;
    background-color: #edf2f7;
    font-size: 10px;
    font-weight: 500;
}

.dark .bg {
    font-weight: 400;
    background-color: #362F78;
}

.large .bg {
    font-size: 13px;
}

.small .bg {
    font-size: 8px;
}

.contrast .bg {
    font-weight: 400;
    background-color: black;
}

.container {
    max-width: 1600px;
    margin: 0 auto;
}

.header {
    color: black;
    padding: 20px 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.dark .header {
    color: white
}

.header a {
    color: black;

    &:hover {
        text-decoration: none;
    }
}

.dark .header a {
    color: white;
}

.logo-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 6em;
}

.logo-container div {
    margin-left: 10px;
    font-weight: 600;
}

.dark .logo-container div {
    font-weight: 500;
}

.contrast .logo-container div {
    color: yellow;
    font-weight: 500;
}

.logo-container span {
    color: #5850EC;
}

.dark .logo-container span {
    color: #8DA2FB;
}

.contrast .logo-container span {
    color: #5850EC;
}

.header p {
    margin-top: 10px;
    font-size: 2em;
}

.contrast .header p {
    color: yellow;
}

.contrast .header p {
    color: yellow;
}

.middle {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    margin: 12px 0;
}

.dark .middle {
    font-weight: 500;
}

.middle div {
    font-size: 4em;
}

.contrast .middle {
    font-weight: 500;
    color: yellow;
}

.middle span {
    font-size: 5em;
    border-right: 1px solid #615b5b;
    padding-right: 7px;
    margin-right: 7px;
}

.top-bar {
    padding: 7px 10px;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $light-bg;
    z-index: 3;
}

.dark .top-bar {
    background-color: $dark-header;
}

.contrast .top-bar {
    background-color: black;
}

.dark .top-bar {
    border-bottom: 1px solid #5145CD;
}

.contrast .top-bar {
    border-bottom: 1px solid #374151;
}

.top-bar a {
    font-size: 30px;
}

.top-bar button {
    background-color: transparent;
    border-style: none;
    cursor: pointer;
    margin-right: 7px;
}

.top-bar button span {
    font-size: 30px;
}

.top-bar button:disabled {
    pointer-events: none;
    cursor: unset;
}

.top-bar button span, .top-bar-icon {
    color: black;
    pointer-events: none;
}

.dark .top-bar button span, .dark .top-bar-icon {
    color: white;
}

.contrast .top-bar button span, .contrast .top-bar-icon {
    color: yellow;
}

.top-bar button:disabled span {
    color: grey;
}

.contrast .top-bar button:disabled span {
    color: grey;
}

@media (max-width: 1300px) {
  
    .large .header {
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .large .middle {
        margin: 25px 0;
    }
    
}

@media (max-width: 1120px) {
    .top-bar {
        top: 80px;
    }

    .container {
        padding-top: 80px;
    }

    .header {
        padding: 20px 10px 0 10px;
    }
}

@media (max-width: 1045px) {
  
    .header {
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .middle {
        margin: 25px 0;
    }
    
}

@media (max-width: 600px) {
    .logo-container {
        font-size: 4.2em;
    }

    .large .logo-container {
        font-size: 3.5em;
    }

    .large .middle div {
        font-size: 3em;
    }

    .header p {
        font-size: 1.5em;
    }

}

@media (max-width: 400px) {
    .logo-container {
        font-size: 3.5em;
    }

    .large .logo-container {
        font-size: 2.8em;
    }
}
</style>