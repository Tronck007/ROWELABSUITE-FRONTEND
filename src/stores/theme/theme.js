import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useTheme = defineStore('theme', () => {    

  const isNavDrawerOpen = ref(false)


  function toggleNavDrawer() {
    isNavDrawerOpen.value = !isNavDrawerOpen.value
    console.log('isNavDrawerOpen --', isNavDrawerOpen.value)
  }

  return {
    isNavDrawerOpen,
    toggleNavDrawer,
  }



})
