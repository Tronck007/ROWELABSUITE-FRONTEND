<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <div class="position-relative my-sm-16">
      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1TopShape })"
        class="text-primary auth-v1-top-shape d-none d-sm-block"
      />

      <VNodeRenderer
        :nodes="h('div', { innerHTML: authV1BottomShape })"
        class="text-primary auth-v1-bottom-shape d-none d-sm-block"
      />

      <VCard class="auth-card pa-4" max-width="448">
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
          <VForm ref="refVForm" @submit.prevent="onSubmit">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.userCode"
                  label="Código de usuario"
                  placeholder="00000"
                  type="number"
                  autofocus
                  :rules="[requiredValidator]"
                  :error-messages="errors.userCode"
                />
              </VCol>

              <VCol cols="12">
                <AppTextField
                  v-model="credentials.password"
                  label="Contraseña"
                  placeholder="············"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center justify-space-between flex-wrap mt-2 mb-4">
                  <VCheckbox v-model="rememberMe" label="Recuerdame" />
                </div>

                <VBtn block type="submit">Login</VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { useAuthStore } from '@/stores/auth/authStore'


const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const isPasswordVisible = ref(false)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const errors = ref({
  userCode: undefined,
  password: undefined,
})

const refVForm = ref()

const credentials = ref({
  userCode: '',
  password: '',
})

const rememberMe = ref(false)

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      errors.value.loginFailed = undefined // Reinicia el estado de error de login
      login()
    }
  })
}

const login = async () => {
  try {
    await authStore.login(credentials.value)
    await nextTick(() => {
      router.replace(route.query.to ? String(route.query.to) : '/')
    })
  } catch (err) {
    console.error('Login error:', err)
    errors.value.loginFailed = 'Login failed. Please check your credentials.'
  }
}
</script>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
