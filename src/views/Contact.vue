<template>
  <main class="contact-page">
    <div class="container">
      <section class="row section">
        <h1 class="text-center">{{ lang["descriptionContactP1"] }}</h1>
        <form class="col-12 col-lg-6 mb-md-3" @submit.prevent="contactMail">
          <div class="row">
            <div class="col-6">
              <label class="form-label">{{ lang["name"] }}</label>
              <input
                type="text"
                v-model="firstName"
                id="firsName"
                class="form-control"
                :placeholder="lang['plName']"
                required
              />
            </div>
            <div class="col-6">
              <label class="form-label">{{ lang["lastName"] }}</label>
              <input
                type="text"
                v-model="lastName"
                id="lastName"
                class="form-control"
                :placeholder="lang['plLastName']"
                required
              />
            </div>
          </div>
          <label class="form-label">{{ lang["email"] }}</label>
          <input
            type="email"
            v-model="email"
            id="email"
            class="form-control"
            :placeholder="lang['plEmail']"
            required
          />
          <label class="form-label">{{ lang["type"] }}</label>
          <select v-model="subject" id="consult" class="form-select" required>
            <option selected>{{ lang["select1"] }}</option>
            <option>{{ lang["select2"] }}</option>
            <option>{{ lang["select3"] }}</option>
            <option>{{ lang["select4"] }}</option>
          </select>
          <label class="form-label">{{ lang["descriptionQuery"] }}</label>
          <textarea
            class="form-control"
            v-model="message"
            id="texto"
            rows="3"
            required
          ></textarea>
          <div class="alert alert-success" role="alert" v-if="success">
            {{ success }}
          </div>
          <button class="d-flex flex-row btn btn-primary">
            {{ lang["sendForm"] }}
          </button>
        </form>
        <div class="d-sm-none d-lg-block col-lg-6">
          <iframe
            class="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.789771417989!2d-3.6987739852400594!3d40.34700936780193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4226dc6a64c46b%3A0x23e1b239d4aea935!2sLa%20Nave!5e0!3m2!1ses!2ses!4v1618921704011!5m2!1ses!2ses"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { useStore } from "vuex";
import { computed, ref } from "vue";
export default {
  name: "HelpContact",
  setup() {
    let firstName = ref("");
    let lastName = ref("");
    let email = ref("");
    let subject = ref("");
    let message = ref("");
    let success = ref("");

    const contactMail = async () => {
      try {
        const res = await axios.post("usuario/contacto", {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          subject: subject.value,
          message: message.value,
        });
        if (res.status === 200)
          success.value = "Su mensaje se ha enviado con éxito";
      } catch (err) {
        console.log(err.message);
      }
    };

    return {
      success,
      firstName,
      lastName,
      email,
      subject,
      message,
      contactMail,
      lang: computed(() => useStore().getters.getLang),
    };
  },
};
</script>

<style lang="scss" scoped>
.contact-page {
  margin: 120px auto;
  width: 80%;
  color: rgb(99, 98, 98);
}

section {
  color: black;
  margin: 40px 0;
  padding: 0 50px 0;
}

h1 {
  margin-bottom: 40px;
}

label {
  display: block;
  color: black;
  margin-bottom: 3px;
  text-align: left;
}

input,
select,
textarea,
.success {
  margin-bottom: 10px;
}

button {
  border: none;
  justify-content: center;
  width: 40%;
  background-color: #0f606b;
}

button:hover {
  background-color: #707070;
}

.map {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
</style>