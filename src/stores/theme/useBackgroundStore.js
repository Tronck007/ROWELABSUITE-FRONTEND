import { defineStore } from 'pinia'

export const useBackgroundStore = defineStore('backgroundStore', {
  state: () => ({
    // No necesitas inicializar el estado aquí si siempre vas a leer de localStorage
  }),
  getters: {
    colorDeFondo: () => {
      return localStorage.getItem('R-LABSSUITE-initial-loader-bg') || '#ffffff' // Color por defecto
    },
  },
})
