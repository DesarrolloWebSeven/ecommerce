<template>
  <div class="tabs">
    <ul class="tabs_header">
      <li v-for="title in tabTitles" :key="title" @click="selectedTitle = title" :class="{selected: title == selectedTitle}">
        {{title}}
      </li>
    </ul>
<slot />
  </div>
</template>

<script>
import i18next from "i18next";
import { provide, ref } from 'vue'
export default {
    name:'TabsWrapper',
    setup(props, {slots}){
      const tabTitles = ref(slots.default().map((tab)=> tab.props.title))
      const selectedTitle= ref(tabTitles.value[0])
      provide("selectedTitle", selectedTitle)
      return{
        tabTitles,
        selectedTitle
      }
    }

}
</script>

<style lang="scss" scoped>
.tabs{
  max-width: 400px;
}
.tabs_header{
  list-style: none;
  display: flex;
  margin-bottom: 0px;
  
}
.tabs_header li{
    
    text-align: center;
    margin-right: 10px;
    padding: 10px;
    background-color: #0F606B;
    
    
    cursor: pointer;
    
  }
.tabs_header li.selected{
  background-color: #A7D2DD;
  color: white;
}


</style>