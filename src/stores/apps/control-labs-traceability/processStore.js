/* eslint-disable camelcase */

import { processService } from "@/services/apps/control-labs-traceability/ProcessService"
import { formatIsoDateTimeToReadable } from "@/utils/dateUtils"
import { defineStore } from "pinia"

const userData = useCookie("userData").value

export const useProcessStore = defineStore("process", {
  state: () => ({
    processes: [],
    samples: [],
    currentProcess: null,
    originalData: [],
    isLoading: false,
    headers: [
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "T.MUESTRAS", key: "quality_test_group_id" },
      { title: "FECHA", key: "createdAt" },
      { title: "ESTADO", key: "state" },
      { title: "ACCIONES", key: "actions" },
    ],
    subHeaders: [
      { title: "MUESTRAS", key: "sampling_id" },
      { title: "ARTICULOS", key: "item_id" },
      { title: "LOTES", key: "item_batch_id" },
      { title: "ACCIONES", key: "actions" },
      { title: "ESTADO", key: "is_active" },
    ],
  }),
  actions: {
    async fetchAllProcesses() {
      this.isLoading = true
      try {
        const { meta, data } = await processService.getAllProcesses()

        console.log('data', data)

        this.originalData = data.map((item, index) => ({
          ...item,
          id: `${index}`,
        })) 

        console.log('this.originalData', this.originalData)

      } catch (error) {
        console.log("Error fetching processes:", error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchProcessById(id) {
      this.isLoading = true
      try {
        const { meta, data } = await processService.getProcessById(id)

        this.currentProcess = data

        return data
        
      } catch (error) {
        console.error("Error fetching process by ID:", error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchSamplesById(sampling_id) {
      try {
        const { meta, data } = await processService.getSamplingById(sampling_id)

        this.samples = data

      } catch (error) {
        console.error("Error fetching process by ID:", error)
      
      }
    },

    async createNewProcess(processData) {
      this.isLoading = true
      try {
        const { body } = await processService.createProcess({
          ...processData,
          user_code: userData.user_id, 
        })

        const { meta, data } = body

        if(meta.status === 201) {
          notify('creation', 'ok') 
          this.originalData.push(data[0])
        }else {
          notify('creation', 'fail') 
        }


        
     
        
      } catch (error) {
        console.error("Error creating new process:", error)
      } finally {
        this.isLoading = false
      }
    },

    async aggregateSamplesProcess(processId, samples) {
      this.isLoading = true

      const samplesData = samples.map(sample => ({
        ...sample,       
      }))

      try {
        const { body }  = await processService.aggregateSamples(
          processId, {
            user_code: userData.user_id,
            sampleData: samplesData,
          },
          
        )

        const { meta, data } = body

        if (Array.isArray(data)) {
          data.forEach(item => {
            if (item.is_active === undefined) {
              item.is_active = true // Establece true como valor predeterminado si is_active no está presente
            }
          })
        } else {
          // Si data no es un arreglo, simplemente añade is_active si falta
          if (data.is_active === undefined) {
            data.is_active = true
          }
        }

        if(meta.status === 201) {
          notify('creation', 'ok') 

          const index = this.originalData.findIndex(item => item.process_code === processId)

          if (index !== -1) {
            // Añadir los objetos en data al arreglo samples existente
            if (Array.isArray(data)) {
              // Asegura que samples existe y es un arreglo
              if (!Array.isArray(this.originalData[index].samples)) {
                this.originalData[index].samples = []
              }

              // Utiliza el spread operator para añadir todos los elementos de data
              this.originalData[index].samples.push(...data)
            } else {
              // Si data no es un arreglo, simplemente añade el objeto data
              this.originalData[index].samples.push(data)
            }
          }
        }else {
          notify('creation', 'fail') 
        }




      } catch (error) {
        console.error("Error aggregating samples:", error)
      } finally {
        this.isLoading = false
      }
    }, 

    async endProcess(id) {
     
      try {        
        const processCode = this.originalData.find(p => p.id === id).process_code
        
        const updatedData = {
          state: "Completed",
          user_code: userData.user_id,
        }   
     

        const { body }=   await processService.endProcess(processCode, updatedData)


        const { meta } = body


        if(meta.status === 200) {
          notify('deletion', 'ok') 
          this.originalData = this.originalData.filter(p => p.process_code !== processCode) 
        }else {
          notify('deletion', 'fail') 
        }
        
     

        
      } catch (error) {
        console.error("Error deleting process:", error)
      } finally {
       
      }
    },

    async deleteProcess(id) {
     
      try {        
        const processCode = this.originalData.find(p => p.id === id).process_code
        
        const updatedData = {
          state: "Inactive",
          user_code: userData.user_id,
        }
    
        console.log('processCode', updatedData)
     

        const { body }=   await processService.deleteProcess(processCode, updatedData)


        const { meta } = body


        if(meta.status === 200) {
          notify('deletion', 'ok') 
          this.originalData = this.originalData.filter(p => p.process_code !== processCode) 
        }else {
          notify('deletion', 'fail') 
        }
        
     

        
      } catch (error) {
        console.error("Error deleting process:", error)
      } finally {
       
      }
    },

    //TODO: Implementar la eliminación de muestras
    async deleteSamples(sampleProcessId) {
      this.isLoading = true
      try {
        await processService.deleteSamples(sampleProcessId)

        // Aquí deberías filtrar o eliminar las muestras del estado, dependiendo de cómo lo manejes
      } catch (error) {
        console.error("Error deleting samples:", error)
      } finally {
        this.isLoading = false
      }
    },

    // Continúa con el resto de las acciones...
  },
  getters: {
    // Definir el getter como una función reutilizable
    processTransformation: state => processData => {
      return processData.map(data => ({
        id: data.id,
   
        process_code: data.process_code,
        quality_order_number: data.quality_order_number,
        quality_test_group_id: data.quality_test_group_id,
        state: data.state,
        createdAt: formatIsoDateTimeToReadable(data.createdAt),
        samples: (data.samples || []).map(sample => ({
          // sample_process_id: sample.sample_process_id,
          sampling_id: sample.sampling_id,
          item_id: sample.item_id,
          item_batch_id: sample.item_batch_id,
          is_active: sample.is_active,
        })),
      }))
    },
    transformedData(state) {
      return this.processTransformation(state.originalData)
    },
  },
})
