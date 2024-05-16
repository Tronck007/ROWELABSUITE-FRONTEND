import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notifications: [],
  }),
  actions: {
    addNotification(notification) {
      // Genera un ID único para cada notificación. Considera usar una librería como uuid para esto.
      const id = Date.now() + Math.random().toString(36).substr(2, 9)

      this.notifications.push({ ...notification, id })

      // Opcionalmente, puedes hacer que las notificaciones desaparezcan después de un tiempo.
      if (notification.autoClose) {
        setTimeout(() => {
          this.removeNotification(id)
        }, 5000) // Cierra la notificación después de 5 segundos
      }
    },

    removeNotification(id) {
      this.notifications = this.notifications.filter(n => n.id !== id)
    },

    // Ejemplo de métodos específicos para diferentes tipos de notificaciones
    notifySuccess(message) {
      this.addNotification({ message, type: 'success', autoClose: true })
    },

    notifyError(message) {
      this.addNotification({ message, type: 'error', autoClose: true })
    },

    notifyInfo(message) {
      this.addNotification({ message, type: 'info', autoClose: true })
    },

    notifyWarning(message) {
      this.addNotification({ message, type: 'warning', autoClose: true })
    },
  },
})
