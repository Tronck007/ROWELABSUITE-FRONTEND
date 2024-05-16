import { apiRefreshToken } from '@/services/auth/authService'
import axios from 'axios'

// Define una instancia de Axios con la configuración necesaria
const $api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

// Configura un interceptor para agregar el token de acceso a las solicitudes
$api.interceptors.request.use(config => {
  const accessToken = useCookie('accessToken').value
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  
  return config
})

// Bandera para evitar bucle infinito de actualización de token
let isRefreshing = false

// Almacena la promesa de refresco para que las solicitudes subsiguientes esperen
let refreshPromise = null

// Configura un interceptor para manejar las respuestas con código de estado 401
$api.interceptors.response.use(response => response, async error => {
  const originalRequest = error.config
  if (error.response && error.response.status === 401 && !originalRequest._retry) {
    if (isRefreshing) {
      // Si ya estamos refrescando el token, esperamos a que la promesa se resuelva
      await refreshPromise

      // Reintenta la solicitud original
      return $api(originalRequest)
    }

    originalRequest._retry = true
    isRefreshing = true
    // eslint-disable-next-line promise/no-promise-in-callback
    refreshPromise = apiRefreshToken(useCookie('refreshToken').value)
      .then(refreshResponse => {
        if (refreshResponse.token) {
          useCookie('accessToken').value = refreshResponse.token
          useCookie('refreshToken').value = refreshResponse.refreshToken
          $api.defaults.headers.common['Authorization'] = `Bearer ${refreshResponse.token}`
        }
      })
      .catch(refreshError => {
        console.error('Error refreshing token:', refreshError)

        // Considera manejar el fallo de refresco de token, como cerrar sesión
      })
      .finally(() => {
        isRefreshing = false
        refreshPromise = null
      })

    await refreshPromise

    // Una vez el token ha sido refrescado, reintenta la solicitud original
    return $api(originalRequest)
  }

  // Si el error no es 401 o ya se intentó reintentar, rechaza la promesa
  return Promise.reject(error)
})

export { $api }
