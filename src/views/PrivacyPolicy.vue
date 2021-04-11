<template>
<div class="section">
<h1>{{lang["titlePrivacy"]}}</h1>
  <p><strong>A. {{lang["titleA"]}}</strong></p>
<ol>
<li>{{lang["introLi1"]}}</li>
<li>{{lang["introLi2"]}}</li>
</ol>
<p><strong>B. {{lang["titleB"]}}</strong><br />
{{lang["creditP1"]}}</p>
<p><strong>C. {{lang["titleC"]}}</strong></p>
<p>{{lang["collectP1"]}}</p>
<ol>
<li>{{lang["collectLi1"]}}</li>
<li>{{lang["collectLi2"]}}</li>
<li>{{lang["collectLi3"]}}</li>
<li>{{lang["collectLi4"]}}</li>
<li>{{lang["collectLi5"]}}</li>
<li>{{lang["collectLi6"]}}</li>

<li>{{lang["collectLi7"]}}</li>
<li>{{lang["collectLi8"]}}</li>
<li>{{lang["collectLi9"]}}</li>
<li>{{lang["collectLi10"]}}</li>
</ol>

<p><strong>D. {{lang["titleD"]}}</strong></p>
<p>{{lang["useP1"]}}</p>
<ol>
<li style="list-style-type: none;">
<ol>
<li>{{lang["useLi1"]}}</li>
<li>{{lang["useLi2"]}}</li>
<li>{{lang["useLi3"]}}</li>
<li>{{lang["useLi4"]}}</li>
<li>{{lang["useLi5"]}}</li>
<li>{{lang["useLi6"]}}</li>
<li>{{lang["useLi7"]}}</li>
<li>{{lang["useLi8"]}}</li>
<li>{{lang["useLi9"]}}</li>
<li>{{lang["useLi10"]}}</li>
<li>{{lang["useLi11"]}} </li>
</ol>
</li>
</ol>
<p>{{lang["useP2"]}}</p>

<p>{{lang["useP3"]}}</p>
<p><strong>E. {{lang["titleE"]}}</strong></p>
<p>{{lang["divulgeP1"]}}</p>
<p>{{lang["divulgeP2"]}}</p>
<p>{{lang["divulgeP3"]}}Podemos divulgar su información personal:</p>
<ol>
<li>{{lang["divulgeLi1"]}}</li>
<li>{{lang["divulgeLi2"]}}</li>
<li>{{lang["divulgeLi3"]}}</li>
</ol>

<p><strong>F. {{lang["titleF"]}}</strong></p>
<ol>
<li>{{lang["internationalLi1"]}}</li>
<li>{{lang["internationalLi2"]}}</li>
<li>{{lang["internationalLi3"]}}</li>

</ol>
<p><strong>G. {{lang["titleG"]}}</strong></p>
<ol>
<li>{{lang["keepLi1"]}}</li>
<li>{{lang["keepLi2"]}}</li>
<li>{{lang["keepLi3"]}}
</li>
<li>{{lang["keepLi4"]}}</li>

</ol>
<p><strong>H. {{lang["titleH"]}}</strong></p>
<ol>
<li>{{lang["securityLi1"]}}Tomaremos precauciones razonables técnicas y organizacionales para evitar la pérdida, mal uso o alteración de su información personal.</li>
<li>{{lang["securityLi2"]}}</li>
<li>{{lang["securityLi3"]}}</li>
<li>{{lang["securityLi4"]}}</li>
<li>{{lang["securityLi5"]}}</li>
</ol>
<p><strong>I. {{lang["titleI"]}}</strong></p>
<p>{{lang["amendmentsP1"]}}</p>
<p><strong>J. {{lang["titleJ"]}}Sus derechos</strong></p>
<p>{{lang["rightsP1"]}}</p>
<p>{{lang["rightsP2"]}}</p>
<p>{{lang["rightsP3"]}}.</p>
<p><strong>K. {{lang["titleK"]}}Actualizar información</strong></p>
<p>{{lang["actualP1"]}}</p>

</div>
  
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    name:'PrivacyPolicy',
    setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }

}
</script>

<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
  padding:20px;
  background-color: #A7D2DD;
  text-align: left;
  
  
}
</style>