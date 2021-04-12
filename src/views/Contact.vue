<template>
  <div class="section">
    <h1>{{lang["descriptionContactP1"]}}</h1>
    <form class="row g-3">
      <div class="col-md-6">
        <label class="form-label">{{lang["name"]}}</label>
        <input
          type="text"
          name="firstName"
          id="firsName"
          class="form-control"
          :placeholder="lang['plLastName']"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">{{lang["lastName"]}}</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          class="form-control"
         :placeholder="lang['plName']"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">{{lang["email"]}}</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          :placeholder="lang['plEmail']"
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">{{lang["type"]}}</label>
        <select type="consult" name="consult" id="consult" class="form-select">
          <option selected>{{lang["select1"]}}</option>
          <option>{{lang["select2"]}}</option>
          <option>{{lang["select3"]}}</option>
          <option>{{lang["select4"]}}</option>
        </select>
      </div>
      <div class="col">
  <label class="form-label">{{lang["descriptionQuery"]}}</label>
  <textarea class="form-control" id="texto" rows="3"></textarea>
</div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary">{{lang["sendForm"]}}</button>
      </div>
    </form>
    <div class="col-md-6">
      <h3>Nos encontramos en Madrid....</h3> 
    </div>
    
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: "HelpContact",
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }
  
};
</script>

<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
  padding:20px;
  background-color: #707070;
  text-align: center;
  color:#fff;
  border-radius:25px;  
  
}
</style>