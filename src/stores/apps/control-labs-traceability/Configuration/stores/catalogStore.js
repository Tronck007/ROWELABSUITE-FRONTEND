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

    async getCatalogTestById(id) {
      console.log("id", id);
      try {
        const { meta, data } = await catalogService.getTestCatalogById(id);

        const uniqueTests = data.reduce((acc, item) => {
          acc[item.quality_test_id] = item;

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
