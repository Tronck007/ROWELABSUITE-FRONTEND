<template>
  <div class="notification-container">
    <VAlert
      v-for="notification in notifications"
      :key="notification.id"
      :color="notification.type"
      class="mb-4"
      dense
      dismissible
      @click:close="removeNotification(notification.id)"
    >
      {{ notification.message }}
    </VAlert>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const removeNotification = id => {
  notificationStore.removeNotification(id)
}
</script>

<style scoped>
.notification-container {
  position: fixed;
  z-index: 100;
  inset-block-end: 0;
  inset-inline-end: 0;
  max-inline-size: 300px;
}
</style>
