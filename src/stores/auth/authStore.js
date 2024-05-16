import { defineStore } from 'pinia'
// eslint-disable-next-line import/no-unresolved
import UAParser from 'ua-parser-js'
// eslint-disable-next-line import/no-unresolved
import { apiLogin, apiRefreshToken } from '@/services/auth/authService'



export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: useCookie('accessToken').value, // Utilizar directamente useCookie
    userData: useCookie('userData').value,
    userAbilityRules: useCookie('userAbilityRules').value,
  }),
  actions: {
    async login(credentials) {
      try {     


        const parser = new UAParser()
        const result = parser.getResult()
        let userAgent = `${result.browser.name + ' ' + result.browser.version} | ${result.os.name + ' ' + result.os.version}`
        let authType = 'Control Lab Traceability'
        
        const enhancedCredentials = {
          userCode: credentials.userCode,
          password: credentials.password,
          userAgent: userAgent,
          authType: authType,
        }   
        
        const { meta, token, userData, userAbilityRules } = await apiLogin(enhancedCredentials)
        

        if (meta.status !== 200) {
          throw new Error(meta.message)
        }

        this.setAuthData(token, userData, userAbilityRules)     

        return { token, userData, userAbilityRules }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },
    logout() {
      this.clearAuthData()
    },
    async refreshToken() {
      const refreshToken = useCookie('refreshToken').value
      try {
        const { token, userData, userAbilityRules } = await apiRefreshToken(refreshToken)

        this.setAuthData(token, userData, userAbilityRules)
      } catch (error) {
        console.error('Refresh token error:', error)
        this.clearAuthData()
        throw error
      }
    },
    setAuthData(token, userData, userAbilityRules) {
      useCookie('accessToken').value = token
      useCookie('userData').value = userData
      useCookie('userAbilityRules').value = userAbilityRules
      this.accessToken = token
      this.userData = userData
      this.userAbilityRules = userAbilityRules
    },
    clearAuthData() {
      useCookie('accessToken').value = null
      useCookie('userData').value = null
      useCookie('userAbilityRules').value = null
      this.accessToken = null
      this.userData = null
      this.userAbilityRules = null
    },
  },
})
