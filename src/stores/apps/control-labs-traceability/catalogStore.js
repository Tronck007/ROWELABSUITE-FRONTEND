/* eslint-disable */
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

        this.catalogEquipment = Array.from(uniqueEquipmentMap.values()).sort(
          (a, b) => a.combined.localeCompare(b.combined),
        );
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
