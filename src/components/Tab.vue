<template>
  <div class="tab-content" v-show="title == selectedTitle">
    <slot />
  </div>
</template>

<script>
import {inject} from 'vue'
export default {
name:'Tab',
props: ['title'],
setup(){
  const selectedTitle =inject("selectedTitle")
  return{
    selectedTitle
  }
}
}
</script>

<style scoped>
.tab-content{
  min-height: 200px;
  max-width: 500px;
  padding: 20px;
  border-radius:5px;
  background-color: #A7D2DD;

}

</style>