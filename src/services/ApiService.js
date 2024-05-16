/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-useless-catch */
import { $api } from '@/utils/api'

/* eslint-disable sonarjs/no-useless-catch */
class ApiService {
  constructor(resourcePath) {
    this.resourcePath = resourcePath
  }

  async fetchAll(subPath = '') {
    try {
      const { data } = await $api.get(`${this.resourcePath}/${subPath}`)

      console.log('data', data)
    

      const { body } = data


      
      
      return body
    } catch (error) {
      throw error
    }
  }

  async fetchById(id, subPath = '') {
    try {
      const fullPath = subPath ? `${subPath}/${id}` : `${this.resourcePath}/${id}`

     

      const { data } = await $api.get(fullPath)



      const { body } = data

      
      
      return body
    } catch (error) {
      throw error
    }
  }

  async create(subPath = '', dataInput) { // Nota el cambio en el orden de los parámetros
    try {
      const fullPath = `${this.resourcePath}/${subPath}`

      console.log('fullPath', fullPath)
      console.log('dataInput', dataInput)



      const { data } = await $api.post(fullPath, dataInput)
      
      return data
    } catch (error) {
      throw error
    }
  }

  async update(id, data, subPath = '') {
    try {
      const fullPath = subPath ? `${subPath}/${id}` : `${this.resourcePath}/${id}`

      const response = await $api.put(fullPath, {
        body: JSON.stringify(data),
      })

      
      return response.json()
    } catch (error) {
      throw error
    }
  }

  async updatePatch(id, dataInfo, subPath = '') {

 
    try {
      const fullPath = subPath ? `${subPath}/${id}` : `${this.resourcePath}/${id}`



      const { user_code, sampleData } = dataInfo

      const { data } = await $api.patch(fullPath, {
        user_code,
        sampleData,
      })


      console.log('data', data)
      
      return data
    } catch (error) {
      throw error
    }
  }

  async delete(id, updatedata, subPath = '') {
    try {
      const fullPath = subPath ? `${subPath}/${id}` : `${this.resourcePath}/${id}`

      const{ user_code, state } = updatedata

      const  data  = await $api.patch(fullPath, {
        user_code, state, 
      })

      return { body: {
        meta: { message: data.messages, status: 200 }, 
      },
      
      }

    } catch (error) {
      throw error
    }
  }

  async deleteEquipment(id, updatedata, subPath = '') {
    try {
      const fullPath = subPath ? `${subPath}/${id}` : `${this.resourcePath}/${id}`



      const{ equipmentId, isActive, deleteInfo, userCode } = updatedata

      const  data  = await $api.patch(fullPath, {
        equipmentId, isActive, deleteInfo, userCode,
      })

      return { body: {
        meta: { message: data.messages, status: 200 }, 
      },
      
      }

    } catch (error) {
      throw error
    }
  }
}


export default ApiService
