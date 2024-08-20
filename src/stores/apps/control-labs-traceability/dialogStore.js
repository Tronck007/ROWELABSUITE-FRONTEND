/* eslint-disable */
import { defineStore } from "pinia";
import { markRaw } from "vue";
import { dialogMeta, dynamicComponents } from "@/utils/dialogConfigurations";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    currentProcessItem: {},
    dialogVisible: false,
    dialogConfig: null,
    currentStep: 0,
  }),
  actions: {
    openDialogWithActionId(actionIds) {
      this.dialogConfig = this.createDialogConfig(actionIds);
      this.dialogVisible = true; // Asegura que el diálogo esté visible
    },
    closeDialog() {
      this.dialogVisible = false;
      this.dialogConfig = null;
      this.currentStep = 0; // Reinicia el paso actual cuando se cierra el diálogo
    },
    createDialogConfig(actionIds) {
      const menuItems = [];
      const stepsConfig = [];

      actionIds.forEach((actionId) => {
        const menuItem = dialogMeta.menuItems.find(
          (item) => item.actionId === actionId,
        );
        if (menuItem) {
          menuItems.push(menuItem);
        }

        const stepConfig = dialogMeta.stepsConfig.find(
          (step) => step.actionId === actionId,
        );
        if (stepConfig) {
          stepsConfig.push({
            ...stepConfig,
            component: dynamicComponents[stepConfig.componentID],
          });
        }
      });

      return {
        menuItems,
        stepsConfig,
        componentMap: markRaw(dynamicComponents),
      };
    },
  },
});
