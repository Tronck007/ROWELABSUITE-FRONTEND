<script setup>
import { useAuthStore } from "@/stores/auth/authStore";
import { useTheme } from "../../stores/theme/theme";


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


const userProfileList = [
  {
    type: "navItem",
    icon: "tabler-adjustments",
    title: "Settings",

  },

  { type: "divider" },
  {
    type: "navItem",
    icon: "tabler-logout",
    title: "Logout",
 
  },
]

import avatar1 from '@images/avatars/avatar-1.png';
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
      <VImg :src="avatar1" />

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
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              John Doe
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />

          <!-- 👉 Profile -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-user"
                size="22"
              />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>

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

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>

          <!-- 👉 Pricing -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-currency-dollar"
                size="22"
              />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>

          <!-- 👉 FAQ -->
          <VListItem link>
            <template #prepend>
              <VIcon
                class="me-2"
                icon="tabler-help"
                size="22"
              />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
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

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
