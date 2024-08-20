/* eslint-disable */
import { processService } from "@/services/apps/control-labs-traceability/ProcessService";
import { formatIsoDateTimeToReadable } from "@/utils/dateUtils";
import { defineStore } from "pinia";

// Obtiene los datos del usuario desde una cookie
const userData = useCookie("userData").value;

// Define la tienda para el manejo de procesos
export const useProcessStore = defineStore("process", {
  state: () => ({
    processes: [], // Arreglo para almacenar los procesos
    samples: [], // Arreglo para almacenar las muestras
    currentProcess: null, // Proceso actual seleccionado
    originalData: [], // Datos originales sin transformar
    isLoading: false, // Indicador de carga
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
    // Acción para obtener todos los procesos
    async fetchAllProcesses() {
      this.isLoading = true;
      try {
        const { meta, data } = await processService.getAllProcesses();
        this.originalData = data.map((item, index) => ({
          ...item,
          id: `${index}`,
        }));
      } catch (error) {
        console.error("Error fetching processes:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para obtener un proceso por su ID
    async fetchProcessById(id) {
      this.isLoading = true;
      try {
        const { meta, data } = await processService.getProcessById(id);
        this.currentProcess = data;
        return data;
      } catch (error) {
        console.error("Error fetching process by ID:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para obtener muestras por su ID
    async fetchSamplesById(sampling_id) {
      try {
        const { meta, data } =
          await processService.getSamplingById(sampling_id);
        this.samples = data;
      } catch (error) {
        console.error("Error fetching process by ID:", error);
      }
    },

    // Acción para crear un nuevo proceso
    async createNewProcess(processData) {
      this.isLoading = true;
      try {
        const { body } = await processService.createProcess({
          ...processData,
          userCode: userData.user_code,
          userId: userData.user_id,
          email: userData.email,
        });
        const { meta, data } = body;
        if (meta.status === 201) {
          notify("creation", "ok");
          this.originalData.push(data[0]);
        } else {
          notify("creation", "fail");
        }
      } catch (error) {
        console.error("Error creating new process:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para agregar muestras a un proceso existente
    async aggregateSamplesProcess(processId, samples) {
      this.isLoading = true;
      const samplesData = samples.map((sample) => ({ ...sample }));
      try {
        const { body } = await processService.aggregateSamples(processId, {
          user_code: userData.user_code,
          user_id: userData.user_id,
          email: userData.email,
          sampleData: samplesData,
        });
        const { meta, data } = body;
        if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.is_active === undefined) {
              item.is_active = true;
            }
          });
        } else if (data.is_active === undefined) {
          data.is_active = true;
        }
        if (meta.status === 201) {
          notify("creation", "ok");
          const index = this.originalData.findIndex(
            (item) => item.process_code === processId,
          );
          if (index !== -1) {
            if (!Array.isArray(this.originalData[index].samples)) {
              this.originalData[index].samples = [];
            }
            if (Array.isArray(data)) {
              this.originalData[index].samples.push(...data);
            } else {
              this.originalData[index].samples.push(data);
            }
          }
        } else {
          notify("creation", "fail");
        }
      } catch (error) {
        console.error("Error aggregating samples:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para finalizar un proceso
    async endProcess(id) {
      try {
        const processCode = this.originalData.find(
          (p) => p.id === id,
        ).process_code;
        const updatedData = {
          state: "completed",
          userCode: userData.user_code,
          userId: userData.user_id,
          email: userData.email,
        };
        const { body } = await processService.endProcess(
          processCode,
          updatedData,
        );
        const { meta } = body;
        if (meta.status === 200) {
          notify("deletion", "ok");
          this.originalData = this.originalData.filter(
            (p) => p.process_code !== processCode,
          );
        } else {
          notify("deletion", "fail");
        }
      } catch (error) {
        console.error("Error ending process:", error);
      }
    },

    // Acción para eliminar un proceso
    async deleteProcess(id) {
      try {
        const processCode = this.originalData.find(
          (p) => p.id === id,
        ).process_code;
        const updatedData = {
          state: "Inactive",
          userCode: userData.user_code,
          userId: userData.user_id,
          email: userData.email,
        };
        const { body } = await processService.deleteProcess(
          processCode,
          updatedData,
        );
        const { meta } = body;
        if (meta.status === 200) {
          notify("deletion", "ok");
          this.originalData = this.originalData.filter(
            (p) => p.process_code !== processCode,
          );
        } else {
          notify("deletion", "fail");
        }
      } catch (error) {
        console.error("Error deleting process:", error);
      }
    },

    // Acción para eliminar muestras de un proceso
    async deleteSamples(sampleProcessId) {
      this.isLoading = true;
      try {
        await processService.deleteSamples(sampleProcessId);
      } catch (error) {
        console.error("Error deleting samples:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para cargar los datos iniciales
    async loadInitialData() {
      this.isLoading = true;
      try {
        await this.fetchAllProcesses();
      } catch (error) {
        console.error("Error loading initial data:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
  getters: {
    // Transformación de los datos de los procesos para su presentación
    processTransformation: (state) => (processData) => {
      return processData.map((data) => ({
        id: data.id,
        process_code: data.process_code,
        quality_order_number: data.quality_order_number,
        quality_test_group_id: data.quality_test_group_id,
        state: data.state,
        createdAt: formatIsoDateTimeToReadable(data.createdAt),
        samples: (data.samples || []).map((sample) => ({
          sampling_id: sample.sampling_id,
          item_id: sample.item_id,
          item_batch_id: sample.item_batch_id,
          is_active: sample.is_active,
        })),
      }));
    },

    // Datos transformados para la tabla
    transformedData(state) {
      return this.processTransformation(state.originalData);
    },

    // Configuración de la tabla
    tableConfig(state) {
      return {
        headers: {
          main: state.headers,
          sub: state.subHeaders,
        },
        filterSubtables: "samples",
        filterCards: {
          searchInput: true,
          filterStatus: true,
        },
        expandedRows: true,
        buttonConfigs: {
          main: {
            showFinishButton: true,
            showEdit: true,
            showDelete: true,
            showCheck: false,
            showGoto: true,
          },
          sub: {
            showEdit: false,
            showDelete: true,
            showCheck: false,
            showGoto: false,
          },
        },
        goToPage: "samplesProcess",
        isLoading: state.isLoading,
        data: state.transformedData,
      };
    },
  },
});
