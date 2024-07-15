<script setup>
import { useAuthStore } from "@/stores/auth/authStore"
import { useTheme } from "@/stores/theme/theme"
import { useRouter } from 'vue-router'
import { ref, onMounted, onUnmounted, computed } from 'vue'


//OPEN CONFIGURATION
const theme = useTheme()
const authStore = useAuthStore()
const router = useRouter()


// Definir una referencia para el temporizador
let inactivityTimer = ref(null)

// Inicializa el temporizador de inactividad
const startInactivityTimer = () => {
  // Limpiar el temporizador existente
  clearTimeout(inactivityTimer.value)

  // Establecer un nuevo temporizador
  inactivityTimer.value = setTimeout(
    () => {
      logout()
    },
    30 * 60 * 1000,
  ) // 30 minutos * 60 segundos * 1000 milisegundos
}

// Restablece el temporizador de inactividad cuando se detecta actividad
const resetInactivityTimer = () => {
  startInactivityTimer()
}

// Agregar y remover event listeners para la inactividad
onMounted(() => {
  startInactivityTimer()
  window.addEventListener("mousemove", resetInactivityTimer)
  window.addEventListener("keypress", resetInactivityTimer)
  window.addEventListener("scroll", resetInactivityTimer)
})

onUnmounted(() => {
  clearTimeout(inactivityTimer.value)
  window.removeEventListener("mousemove", resetInactivityTimer)
  window.removeEventListener("keypress", resetInactivityTimer)
  window.removeEventListener("scroll", resetInactivityTimer)
})

const handleClick = () => {
  theme.toggleNavDrawer()
}

const logout = async () => {
  await authStore.logout()
  router.replace("/login")
}

const userName = computed(() => authStore.userName)
const userRole = computed(() => authStore.userRole)
const userInitials = computed(() => authStore.userInitials)
</script>

<template>
  <VBadge
    dot
    location="bottom right"
    offset-x="3"
    offset-y="3"
    bordered
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      color="primary"
      variant="tonal"
    >
      <span>{{ userInitials }}</span>

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <!-- 👉 User Avatar & Name -->
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                >
                  <VAvatar
                    color="primary"
                    variant="tonal"
                  >
                    <span>{{ userInitials }}</span>
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              {{ userName }}
            </VListItemTitle>
            <VListItemSubtitle>{{ userRole }}</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Settings -->
          <VListItem
            link
            @click="handleClick"
          >
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-settings"
                size="22"
              />
            </template>

            <VListItemTitle>Configuraciones</VListItemTitle>
          </VListItem>

          <!-- Divider -->
          <VDivider class="my-2" />

          <!-- 👉 Logout -->
          <VListItem @click="logout">
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-logout"
                size="22"
              />
            </template>

            <VListItemTitle>Cerrar Sesión</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge>
</template>

<style scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 18px;
}
</style>
