/* eslint-disable arrow-parens */
/* eslint-disable semi */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-useless-catch */
import { catalogService } from "@/services/apps/control-labs-traceability/CatalogService";

export const useCatalogStore = defineStore("catalog", {
  state: () => ({
    catalogTest: [],
    catalogEquipment: [],
  }),
  actions: {
    async getCatalogAllEquipment() {
      try {
        const { data } = await catalogService.getAllEquipment();

        if (!Array.isArray(data)) {
          this.catalogEquipment = [];

          return;
        }
        const uniqueEquipmentMap = new Map();

        data.forEach((item) => {
          if (!uniqueEquipmentMap.has(item._id)) {
            uniqueEquipmentMap.set(item._id, {
              _id: item._id,
              combined: `${item.equipment_name} - ${item.equipment_desc}`,
              is_active: item.is_active,
              location: item.location,
              mode_of_use: item.mode_of_use,
              equipment_name: item.equipment_name,
              equipment_desc: item.equipment_desc,
            });
          }
        });
        this.catalogEquipment = Array.from(uniqueEquipmentMap.values());
        this.catalogEquipment.sort((a, b) =>
          a.combined.localeCompare(b.combined),
        );
      } catch (error) {
        throw error;
      }
    },

    async getCatalogTestById(ids) {
      console.log("ids", ids);
      try {
        const idArray = ids.split(",");

        // Fetch all tests for each ID
        const allTests = await Promise.all(
          idArray.map(async (id) => {
            const { data } = await catalogService.getTestCatalogById(id.trim());
            return data;
          }),
        );

        // Find common tests if there are multiple IDs
        let commonTests = allTests[0];
        if (idArray.length > 1) {
          commonTests = allTests.reduce((common, tests) => {
            return common.filter((test) =>
              tests.some(
                (t) =>
                  t.quality_test_id.trim().toLowerCase() ===
                  test.quality_test_id.trim().toLowerCase(),
              ),
            );
          });
        }

        // Process the unique tests
        const uniqueTests = commonTests.reduce((acc, item) => {
          acc[item.quality_test_id.trim().toLowerCase()] = item;
          return acc;
        }, {});

        this.catalogTest = Object.values(uniqueTests).sort((a, b) =>
          a.test_desc.localeCompare(b.test_desc),
        );
      } catch (error) {
        throw error;
      }
    },
  },
});
