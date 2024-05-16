/* eslint-disable camelcase */
import { equipmentService } from "@/services/apps/control-labs-traceability/EquipmentService"
import { getDominicanRepublicDateTime } from "@/utils/actualDate"
import { defineStore } from 'pinia'

import { useProcessStore } from './'

const date = getDominicanRepublicDateTime()
const userData = useCookie("userData").value 

const processStore = useProcessStore()

function convertDateTime(inputString) { 
  const date = new Date(inputString)
  
  return date.toISOString()
}


const calculateRemainingTime = endTime => {
  const endDate = new Date(endTime)
  const now = date
  const difference = endDate.getTime() - now.getTime()
  
  return Math.max(Math.floor(difference / 60000), 0) // Convertir a minutos y evitar valores negativos
}

const user_code = useCookie("userData").value
export const useTestAndEquipment = defineStore('testAndEquipment', {
  state: () => ({

    headersEnd: [
      { title: "OBJETO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "METODO", key: "quality_test_group_id" }, 
      { title: "ESTADO", key: "state" },
    ],
    subHeadersEnd: [   
      { title: "PRUEBAS", key: "quality_test_id" },
      { title: "DESCRIPCIÓN", key: "quality_test_desc" },
      { title: "INICIO", key: "program_start_equipment_process" },
      { title: "FINAL", key: "program_end_equipment_process" },
      { title: "REAL", key: "real_end_equipment_process" },    
    ],

    
    headers: [
      { title: "OBJETO", key: "equipment_name" },
      { title: "DESCRIPCIÓN", key: "equipment_desc" },
      { title: "# PROCESO", key: "process_code" },
      { title: "PQ", key: "quality_order_number" },
      { title: "METODO", key: "quality_test_group_id" }, 
      { title: "ESTADO", key: "state" },
      { title: "ACCIONES", key: "actions" },
    ],
    subHeaders: [
   
      { title: "PRUEBAS", key: "quality_test_id" },
      { title: "DESCRIPCIÓN", key: "quality_test_desc" },
      { title: "INICIO", key: "program_start_equipment_process" },
      { title: "FINAL", key: "program_end_equipment_process" },
      { title: "T.RESTANTE", key: "remaining_time" }, 
      { title: "ESTADO", key: "is_active" },
      { title: "ACCIONES", key: "actions" },

      
      
    ],
    ExpandedRowFields: "process_generated_id",
    process_test: [],   
    currentProcess: [],
    originalData: {},
    dataTransformed: {},
  }), 
  isLoading: false,

  actions: {
    async createTestprocess(processId, equipmentInfo) {
      const userData = useCookie("userData").value // Asegúrate de obtener el valor actual del cookie aquí
      const { test, hora, minutos, equipment, samples } = equipmentInfo
      const totalMinutos = hora * 60 + minutos
    
      const start = date// Puedes cambiar esto para aceptar una fecha específica si es necesario
      const end = new Date(start.getTime() + totalMinutos * 60000)
    
  
      // Crear el objeto transformado
      const transformedData = {
        processCode: processId,
        samples: samples.map(sample => ({
          samplingId: sample.sampling_id,
          equipmentData: {
            equipment_id: equipment._id,
            equipment_name: equipment.equipment_name,
            equipment_desc: equipment.equipment_desc,
            program_start_equipment_process: convertDateTime(start),
            program_end_equipment_process: convertDateTime(end),
            is_active: equipment.is_active,
            auto_finish: true,
            tests: test.map(t => ({
              quality_test_id: t.quality_test_id,
              quality_test_desc: t.test_desc,
              is_active: true,
            })),
          },
        })),
        user_code: userData.user_id,
      }

      try {
        const { body } = await equipmentService.createEquipmentProcess({
          ...transformedData,  
        })

        const { meta } = body

        if(meta.status === 201) {
          notify('creation', 'ok') 
        }else {
          notify('creation', 'fail') 
        }


        
     
        
      } catch (error) {
        console.error("Error creating new process:", error)
      } finally {
        this.isLoading = false
      }

    
      // Aquí podrías continuar con lógica adicional, como enviar estos datos a un API o guardarlos en base de datos
    },

    async getTestProcessById(id) {
      this.isLoading= true

      const process = await processStore.fetchProcessById(id)

      this.originalData = process          
      this.isLoading= false     

      return process
    
    },


    async endProcess(id, equipmentId) {


     
      try {          
        
        // const processCode = this.originalData.find(p => p.process_code === id)
        
        const updatedData = {
          equipmentId: equipmentId,
          isActive: false,
          deleteInfo: true,
          userCode: userData.user_id,
        }   
     


        const { body }=   await equipmentService.endEquipment(id, updatedData)


        const { meta } = body


        if(meta.status === 200) {
          notify('deletion', 'ok') 
          await this.getTestProcessById(id)
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




  },


  getters: {
    // Definimos processTransformation como un getter que devuelve una función
    processTransformation: state => processEquipment => {
      const equipmentDateIds = {} 
      let idCounter = 0  // Contador global para asignar IDs únicos
      if (!processEquipment || !Array.isArray(processEquipment.samples)) {
        return []
      }
  
      const transformed = processEquipment.samples.reduce((acc, sample) => {

        sample.equipments.forEach(equipment => {
          if (!equipment.is_active) { // Cambia aquí si quieres filtrar por equipos inactivos o activos
            return // Omitimos los equipos que no cumplen con la condición deseada
          }

          const dateKey = `${equipment.equipment_name}-${new Date(equipment.program_start_equipment_process).toISOString().slice(0, 10)}` // Crear clave única con ID del equipo y fecha de inicio
          if (!equipmentDateIds.hasOwnProperty(dateKey)) {
            equipmentDateIds[dateKey] = ++idCounter  // Asignamos un ID incremental único si es la primera vez que vemos esta combinación de equipo y fecha
          }

          
          
          equipment.tests.forEach(test => {
            
            const key = `${equipment.equipment_name}-${dateKey}`// Usamos el ID del equipo como clave para agrupar los tests
            if (!acc[key]) {
              acc[key] = {
                id: equipmentDateIds[dateKey],  // Usamos el ID generado para esta combinación de equipo y fecha
                _id: equipment._id,
                equipment_name: equipment.equipment_name,
                equipment_desc: equipment.equipment_desc,
                process_code: processEquipment.process_code,
                quality_order_number: processEquipment.quality_order_number,
                quality_test_group_id: processEquipment.quality_test_group_id,  
                state: equipment.is_active,              
                program_start_equipment_process: equipment.program_start_equipment_process,
                program_end_equipment_process: equipment.program_end_equipment_process,
                tests_in_process: [], // Iniciamos la lista de tests para este equipo
              }
            }
            
            const existingTest = acc[key].tests_in_process.find(t => t.quality_test_id === test.quality_test_id)
            if (!existingTest) {
              acc[key].tests_in_process.push({
                quality_test_id: test.quality_test_id,
                quality_test_desc: test.quality_test_desc,
                program_start_equipment_process: formatIsoDateTimeToReadable(equipment.program_start_equipment_process),
                program_end_equipment_process: formatIsoDateTimeToReadable(equipment.program_end_equipment_process),
                remaining_time: calculateRemainingTime(equipment.program_end_equipment_process) + " minutos",
                is_active: test.is_active, // Aquí podemos agregar más información de cada test si es necesario
              })
            }
          })

        })
  
        return acc
      }, {})
  
      return Object.values(transformed)
    },

    processInactiveEquipmentTransformation: state => {
      const equipmentDateIds = {} // Diccionario para llevar el seguimiento de los IDs por equipo y fecha
      let idCounter = 0  // Contador global para asignar IDs únicos
  
      return processEquipment => {
        if (!processEquipment || !Array.isArray(processEquipment.samples)) {
          return []
        }
  
        const transformed = processEquipment.samples.reduce((acc, sample) => {
          sample.equipments.forEach(equipment => {
            if (equipment.is_active) {
              return // Omitimos equipos activos para este getter
            }
  
            const dateKey = `${equipment.equipment_name}-${new Date(equipment.program_start_equipment_process).toISOString().slice(0, 10)}` // Crear clave única con ID del equipo y fecha de inicio
            if (!equipmentDateIds.hasOwnProperty(dateKey)) {
              equipmentDateIds[dateKey] = ++idCounter  // Asignamos un ID incremental único si es la primera vez que vemos esta combinación de equipo y fecha
            }
  
            equipment.tests.forEach(test => {
              const key = `${equipment.equipment_name}-${dateKey}`
  
              if (!acc[key]) {
                acc[key] = {
                  id: equipmentDateIds[dateKey],  // Usamos el ID generado para esta combinación de equipo y fecha
                  process_code: processEquipment.process_code,
                  quality_order_number: processEquipment.quality_order_number,
                  quality_test_group_id: processEquipment.quality_test_group_id,
                  equipment_name: equipment.equipment_name,
                  equipment_desc: equipment.equipment_desc,
                  is_active: equipment.is_active,
                  tests_in_process: [],
                }
              }
              const existingTest = acc[key].tests_in_process.find(t => t.quality_test_id === test.quality_test_id)
              if (!existingTest) {
                acc[key].tests_in_process.push({
                  quality_test_id: test.quality_test_id,
                  quality_test_desc: test.quality_test_desc,
                  program_start_equipment_process: formatIsoDateTimeToReadable(equipment.program_start_equipment_process),
                  program_end_equipment_process: formatIsoDateTimeToReadable(equipment.program_end_equipment_process),   
                  real_end_equipment_process: formatIsoDateTimeToReadable(equipment.real_end_equipment_process), 
                  is_active: test.is_active,
                })
              }
            })
          })
  
          return acc
        }, {})
  
        return Object.values(transformed)
      }
    },
    

    transformedDataActive(state) {
      // Invocamos processTransformation pasando state.originalData como argumento
      console.log("state.originalData", state.originalData)
  
      return this.processTransformation(state.originalData)
    },

    transformedDataInactive(state) {
      // Invocamos el getter para equipos inactivos
      return this.processInactiveEquipmentTransformation(state.originalData)
    },
  },
    
  
  
})
