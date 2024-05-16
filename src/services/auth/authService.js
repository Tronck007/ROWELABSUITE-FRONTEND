

import { $api } from '@/utils/api'

export async function apiLogin(credentials) {
  console.log('credentials', credentials)
  try {
    const { data } = await $api.post('/auth/login', {
      body: credentials,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    return data
    // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (error) {
    throw error
  }
}

export async function apiRefreshToken(refreshToken) {
  try {
    const response = await $api.post('/auth/refresh-token', {
      body: JSON.stringify({ refreshToken }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    return response.json()
  // eslint-disable-next-line sonarjs/no-useless-catch
  } catch (error) {
    throw error
  }
}
