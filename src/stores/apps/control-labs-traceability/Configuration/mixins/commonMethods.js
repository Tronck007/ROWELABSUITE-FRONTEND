
export const commonMethods = {
  methods: {
    handleLoading(action) {
      this.isLoading = true;
      return action()
        .finally(() => {
          this.isLoading = false;
        });
    },
    async fetchData(action) {
      try {
        const data = await action();
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  },
};
