import { defineStore } from "pinia";
import { markRaw } from "vue";
import { dialogMeta, dynamicComponents } from "@/utils/dialogConfigurations";

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    currentProcess: null,
    openBySection: null,
    dialogVisible: false,
    currentActionId: null,
    dialogConfig: null,
    currentStep: { value: 0 },
  }),
  actions: {
    openDialogWithActionId(actionIds) {
      this.dialogConfig = this.createDialogConfig(actionIds);
    },
    closeDialog() {
      this.dialogVisible = false;
      this.dialogConfig = null;
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
