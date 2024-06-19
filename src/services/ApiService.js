/* eslint-disable semi */
/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable camelcase */
/* eslint-disable sonarjs/no-useless-catch */
import { $api } from "@/utils/api";

/* eslint-disable sonarjs/no-useless-catch */
class ApiService {
  constructor(resourcePath) {
    this.resourcePath = resourcePath;
  }

  async fetchAll(subPath = "") {
    try {
      const { data } = await $api.get(`${this.resourcePath}/${subPath}`);

      const { body } = data;

      return body;
    } catch (error) {
      throw error;
    }
  }

  async fetchById(id, subPath = "") {
    try {
      const fullPath = subPath
        ? `${subPath}/${id}`
        : `${this.resourcePath}/${id}`;

      const { data } = await $api.get(fullPath);

      const { body } = data;

      return body;
    } catch (error) {
      throw error;
    }
  }

  async create(subPath = "", dataInput) {
    // Nota el cambio en el orden de los parámetros
    try {
      const fullPath = `${this.resourcePath}/${subPath}`;
      const { data } = await $api.post(fullPath, dataInput);

      return data;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data, subPath = "") {
    try {
      const fullPath = subPath
        ? `${subPath}/${id}`
        : `${this.resourcePath}/${id}`;

      const response = await $api.put(fullPath, {
        body: JSON.stringify(data),
      });

      return response.json();
    } catch (error) {
      throw error;
    }
  }

  async updatePatch(id, dataInfo, subPath = "") {
    try {
      const fullPath = subPath
        ? `${subPath}/${id}`
        : `${this.resourcePath}/${id}`;

      const { userCode, userId, email, sampleData } = dataInfo;

      const { data } = await $api.patch(fullPath, {
        userCode,
        userId,
        email,
        sampleData,
      });

      return data;
    } catch (error) {
      throw error;
    }
  }

  async delete(id, updatedata, subPath = "") {
    try {
      const fullPath = subPath
        ? `${subPath}/${id}`
        : `${this.resourcePath}/${id}`;

      const { userCode, useId, email, state } = updatedata;

      const data = await $api.patch(fullPath, {
        userCode,
        useId,
        email,
        state,
      });

      return {
        body: {
          meta: { message: data.messages, status: 200 },
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async deleteEquipment(id, updatedata, subPath = "") {
    try {
      const fullPath = subPath
        ? `${subPath}/${id}`
        : `${this.resourcePath}/${id}`;

      const { equipmentId, status, process_details, userCode, userId, email } =
        updatedata;

      // const data = await $api.patch(fullPath, {
      //   equipmentId,
      //   status,

      //   process_details,
      //   userCode,
      //   userId,
      //   email,
      // });
      const data = await $api.patch(fullPath, {
        updatedata,
      });

      return {
        body: {
          meta: { message: data.messages, status: 200 },
        },
      };
    } catch (error) {
      console.error("Error in deleteEquipment", error);
      throw error;
    }
  }
}

export default ApiService;
