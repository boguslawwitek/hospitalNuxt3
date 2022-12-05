<script setup>
import { ref } from 'vue';

    useHead({
        title: 'hospitalnuxt3 - Kontakt'
    });

    const inputName = ref('');
    const inputEmail = ref('');
    const inputPhoneNumber = ref('');
    const inputMessage = ref('');
    const inputAccept = ref('');

    const {data: data} = await useFetchApi('hours-footer-page', '/api/settings');
    const settings = data.value;

    const systemMail = settings.find(d => d.key === 'system_mail');
    const contactPhone = settings.find(d => d.key === 'contact_phone');
    const fax = settings.find(d => d.key === 'fax');
    const hospitalAddress = settings.find(d => d.key === 'hospital_address');

    const sendFormStatus = useState('sendContactFormStatus', () => {return {msg: "", err: false}});

    async function sendFormData() {
        sendFormStatus.value = {msg: "", err: false};

        const formData = {};
        formData.name = inputName.value.trim();
        formData.email = inputEmail.value.trim();
        formData.phoneNumber = inputPhoneNumber.value.trim();
        formData.message = inputMessage.value.trim();
        formData.accept = inputAccept.value;

        if(formData.accept && 
        formData.name.length > 0 && 
        formData.name.length <= 320 && 
        formData.email.length > 5 && 
        formData.email.length <= 320 && 
        formData.message.length > 0 && 
        formData.message.length <= 320 && 
        formData.phoneNumber.length === 9) {
            inputName.value = "";
            inputEmail.value = "";
            inputPhoneNumber.value = "";
            inputMessage.value = "";
            inputAccept.value = false;
            
            // const response = await $fetch( '/api/contact', {
            //     method: 'POST',
            //     body: JSON.stringify(formData),
            //     headers: {
            //         'Content-type': 'application/json; charset=UTF-8',
            //     },
            // });

            // if(response.status === 200) sendFormStatus.value = {msg: "Wysłano wiadomość.", err: false};
            // else sendFormStatus.value = {msg: "Wystąpił błąd, spróbuj ponownie.", err: true};

            sendFormStatus.value = {msg: "Wystąpił błąd, spróbuj ponownie.", err: true};
        } else {
            sendFormStatus.value = {msg: "Wystąpił błąd, spróbuj ponownie.", err: true};
        }
    }
</script>

<template>
    <div class="container">
      <main class="main">
        <section class="section2">
            <h2>Formularz kontaktowy</h2>
            <form @submit.prevent="sendFormData">
                <div>
                    <label for="name">Imię i nazwisko<span class="required">*</span></label>
                    <input type="text" id="name" name="name" maxlength="320" required autocomplete="off" v-model="inputName" />
                </div>
                <div>
                    <label for="email">Adres e-mail<span class="required">*</span></label>
                    <input type="email" id="email" name="email" maxlength="320" required autocomplete="off" v-model="inputEmail" />
                </div>
                <div>
                    <label for="telephone">Telefon<span class="required">*</span></label>
                    <input type="tel" id="phone-number" maxlength="9" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" name="phone-number" required autoComplete="off" v-model="inputPhoneNumber" />
                </div>
                <div>
                    <label for="message">Wiadomość<span class="required">*</span></label>
                    <textarea class="message" maxlength="320" type="text" id="message" name="message" required autocomplete="off" v-model="inputMessage" />
                </div>
                <div class="checkbox-container">
                    <input type="checkbox" id="accept" name="accept" required autocomplete="off" v-model="inputAccept" />
                    <label for="accept">Wyrażam zgodę na przetwarzanie moich danych osobowych podanych w powyższym formularzu.<span class="required">*</span></label>
                </div>
                <div class="status-container">
                    <input type="submit" value="Wyślij">
                    <p class="status" :class="sendFormStatus.err ? 'error' : ''">{{sendFormStatus.msg}}</p>
                </div>
            </form>
        </section>
        <section class="section1">
            <h2>Kontakt</h2>
            <div>
                <div class="icon"><span class="material-symbols-outlined">pin_drop</span></div>
                <div>
                    <div class="title">Adres:</div>
                    <div class="desc">{{hospitalAddress.value}}</div>
                </div>
            </div>
            <div>
                <div class="icon"><span class="material-symbols-outlined">call</span></div>
                <div>
                    <div class="title">Telefon:</div>
                    <div class="desc">{{contactPhone.value}}</div>
                </div>
            </div>
            <div>
                <div class="icon"><span class="material-symbols-outlined">fax</span></div>
                <div>
                    <div class="title">Fax:</div>
                    <div class="desc">{{fax.value}}</div>
                </div>
            </div>
            <div>
                <div class="icon"><span class="material-symbols-outlined">mail</span></div>
                <div>
                    <div class="title">E-Mail:</div>
                    <div class="desc">{{systemMail.value}}</div>
                </div>
            </div>
        </section>
      </main>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/colors.scss';

.container {
    font-size: 10px;
    color: black;
    font-weight: 500;
}
  
.large .container {
    font-size: 13px;
}
  
.small .container {
    font-size: 8px;
}

.contrast .container {
    background-color: black;
    color: yellow;
    font-weight: 400;
}
  
.dark .container {
    color: white;
    background-color: $dark-bg;
    font-weight: 400;
}

.main {
    max-width: 1600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

.main section {
    padding: 20px 30px;
    width: 50%;
}

.main section h2 {
    font-size: 4em;
    padding: 10px 0;
    color: $light-heading;
    margin-bottom: 5px;
    font-weight: 600;
}

.contrast .main section h2 {
    color: yellow;
    font-weight: 600;
  }
  
.dark .main section h2 {
    color: $dark-heading;
    font-weight: 600;
}

.main .section1 > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 8px 0;
}

.main .section1 .icon {
    margin-right: 20px;
}

.main .section1 .icon span {
    font-size: 5em;
}

.main .section1 .title {
    font-size: 1.8em;
    font-weight: 600;
}

.contrast .main .section1 .title {
    font-size: 1.8em;
    font-weight: 500;
}

.dark .main .section1 .title {
    font-size: 1.8em;
    font-weight: 500;
}

.main .section1 .desc {
    font-size: 2.2em;
}

.main .section2 .required {
    margin-left: 3px;
    color: red;
}

.main .section2 label {
    font-size: 1.8em;
}

.main .section2 form > div {
    margin: 14px 0;
}

.main .section2 input, .main .section2 textarea {
    display: block;
    border: 1px solid #3F83F8;
    font-size: 2em;
    padding: 5px 15px;
    border-radius: 3px;
    width: 95%;
    background-color: transparent;
}

.main .section2 textarea {
    height: 130px;
    resize: none;
}

.main .section2 form label {
    display: block;
    margin-bottom: 3px;
}

.main .section2 button, .main .section2 input[type=submit] {
    display: block;
    width: fit-content;
    background-color: #3F83F8;
    color: white;
    border-style: none;
    border-radius: 5px;
    padding: 10px 15px;
    font-size: 2em;
    cursor: pointer;
    transition: all .3s;

    &:hover {
        background-color: #1C64F2;
    }
}

.main .checkbox-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px 0;
}

.main .checkbox-container label {
    margin-left: 10px;
    width: auto;
}

.main .checkbox-container input {
    width: auto;
    transform: scale(1.4);
}

.status-container {
    margin-top: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.status {
    font-size: 1.4rem;
    font-weight: 600;
    color: #4caf50;
    margin-left: 20px;
}

.status.error {
    color: #d50000;
}

@media (max-width: 1200px) {
    .main {
        flex-direction: column;
    }
    
    .main section {
        width: 100%;
    }
}

@media (max-width: 600px) {
    .main section h2 {
        font-size: 2.8em;
    }

    .main .section1 > div {
        justify-content: center;
        align-items: flex-start;
        flex-direction: column;
    }

    .main .section1 .icon span {
        margin-bottom: 5px;
    }
}
</style>