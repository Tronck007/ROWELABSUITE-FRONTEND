import { canNavigate } from "@layouts/plugins/casl";
import { useAuthStore } from "@/stores/auth/authStore"; // Asegúrate de la ruta correcta

export const setupGuards = (router) => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();
    const isLoggedIn = !!(authStore.userData && authStore.accessToken);

    if (to.meta.public) {
      return;
    }

    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn) {
        return "/";
      } else {
        return;
      }
    }

    if (!canNavigate(to) && to.matched.length) {
      return isLoggedIn
        ? { name: "not-authorized" }
        : {
            name: "login",
            query: {
              ...to.query,
              to: to.fullPath !== "/" ? to.path : undefined,
            },
          };
    }
  });
};
