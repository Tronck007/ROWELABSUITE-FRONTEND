/* eslint-disable */
import { catalogService } from "@/services/apps/control-labs-traceability/CatalogService";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    catalogTest: [],
    catalogEquipment: [],
    totalItems: 0,
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
  }),
  actions: {
    async getCatalogAllEquipment() {
      try {
        // Inicializar variables
        const limit = 10; // Puedes ajustar el límite si es necesario
        let allData = [];

        // Hacer la primera solicitud para obtener el número total de elementos
        const firstResponse = await catalogService.getAllEquipment(1, limit);
        const { meta } = firstResponse;

        // Verificar si los datos son válidos
        if (!meta || !meta.totalDocuments) {
          this.catalogEquipment = [];
          return;
        }

        const totalItems = meta.totalDocuments;

        // Hacer una solicitud para obtener todos los elementos de una vez
        const { data } = await catalogService.getAllEquipment(1, totalItems);

        // Verificar si los datos son válidos
        if (!Array.isArray(data)) {
          this.catalogEquipment = [];
          return;
        }

        // Crear un mapa único de equipos y ordenar los resultados
        const uniqueEquipmentMap = new Map(
          data.map((item) => [
            item._id,
            {
              _id: item._id,
              combined: `${item.equipment_name} - ${item.equipment_desc}`,
              is_active: item.is_active,
              location: item.location,
              mode_of_use: item.mode_of_use,
              equipment_name: item.equipment_name,
              equipment_desc: item.equipment_desc,
            },
          ]),
        );

        // Convertir el mapa en un array y ordenarlo
        this.catalogEquipment = Array.from(uniqueEquipmentMap.values()).sort(
          (a, b) => a.combined.localeCompare(b.combined),
        );

        // Actualizar la información de paginación en el frontend si es necesario
        this.totalItems = totalItems; // Número total de elementos
        this.currentPage = 1; // Resetea la página actual
        this.totalPages = Math.ceil(totalItems / limit); // Número total de páginas
      } catch (error) {
        console.error("Error fetching equipment:", error);
      }
    },

    async getCatalogTestById(ids) {
      try {
        const idArray = ids.split(",").map((id) => id.trim());

        const allTests = await Promise.all(
          idArray.map((id) => catalogService.getTestCatalogById(id)),
        ).then((responses) => responses.map((response) => response.data));

        let commonTests = allTests[0];
        if (idArray.length > 1) {
          commonTests = allTests.reduce((common, tests) =>
            common.filter((test) =>
              tests.some(
                (t) =>
                  t.quality_test_id.trim().toLowerCase() ===
                  test.quality_test_id.trim().toLowerCase(),
              ),
            ),
          );
        }

        this.catalogTest = Object.values(
          commonTests.reduce((acc, test) => {
            acc[test.quality_test_id.trim().toLowerCase()] = test;
            return acc;
          }, {}),
        ).sort((a, b) => a.test_desc.localeCompare(b.test_desc));
      } catch (error) {
        console.error("Error fetching tests:", error);
      }
    },
  },
});
