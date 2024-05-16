<script setup>
import { useAuthStore } from "@/stores/auth/authStore"

import authV1BottomShape from "@images/svg/auth-v1-bottom-shape.svg?raw"
import authV1TopShape from "@images/svg/auth-v1-top-shape.svg?raw"
import { VNodeRenderer } from "@layouts/components/VNodeRenderer"
import { themeConfig } from "@themeConfig"

const ability = useAbility()

definePage({
  meta: {
    layout: "blank",
    unauthenticatedOnly: true,
  },
})

const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const isPasswordVisible = ref(false)
const rememberMe = ref(false)
const refVForm = ref()





const errors = ref({
  userCode: undefined,
  password: undefined,
  loginFailed: undefined, // Para mostrar errores de login
})

const credentials = ref({
  userCode: "",
  password: "",
})

const handleLogin = async () => {
  try {
    // Llama a login y actualiza las reglas de Ability directamente en el store
    const { userAbilityRules } = await authStore.login({
      userCode: credentials.value.userCode,
      password: credentials.value.password,
    })



    ability.update(userAbilityRules)

    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : '/')
    })

    // ability.update(response.userAbilityRules)
    router.replace("/")
  } catch (err) {
    console.error("Login error:", err)
    errors.value.loginFailed = "Login failed. Please check your credentials." // Ajustar mensaje según el error
  }
}

const onSubmit = async () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      errors.value.loginFailed = undefined // Reinicia el estado de error de login
      await handleLogin()
    }
  })
}
</script>


<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <!-- 👉 Top shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <!-- 👉 Bottom shape -->
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <!-- 👉 Auth Card -->
      <VCard
        class="auth-card pa-4"
        max-width="448"
      >
        <VCardItem class="justify-center">
          <template #prepend>
            <div class="d-flex">
              <VNodeRenderer :nodes="themeConfig.app.logo" />
            </div>
          </template>

          <VCardTitle class="font-weight-bold text-capitalize text-h3 py-1">
            {{ themeConfig.app.title }}
          </VCardTitle>
        </VCardItem>

        <VCardText class="pt-1">
          <h4 class="text-h4 mb-1">
            Bienvenido a
            <span class="text-capitalize">{{ themeConfig.app.title }}</span>! 👋🏻
          </h4>
        </VCardText>

        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          > 
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.userCode"
                  label="Código de usuario"
                  placeholder="00000"
                  type="number"
                  autofocus
                  :rules="[requiredValidator]"
                  :error-messages="errors.user_code"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.password"
                  label="Contraseña"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="
                    isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'
                  "
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <!-- remember me checkbox -->
                <div class="d-flex align-center justify-space-between flex-wrap mt-2 mb-4">
                  <VCheckbox
                    v-model="rememberMe"
                    label="Recuerdame" 
                  />
                </div>

                <!-- login button -->
                <VBtn
                  block
                  type="submit"
                >
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
