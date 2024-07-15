import { canNavigate } from "@layouts/plugins/casl";
import { useAuthStore } from "@/stores/auth/authStore"; // Asegúrate de la ruta correcta

export const setupGuards = (router) => {
  router.beforeEach((to) => {
    const authStore = useAuthStore();
    const isLoggedIn = !!(authStore.userData && authStore.accessToken);

    // console.log("Navigating to:", to.path); // Log the destination path
    // console.log("User logged in:", isLoggedIn);
    // console.log("User data:", authStore.userData);
    // console.log("Ability rules:", authStore.abilityRules);
    // console.log("Route meta:", to.meta); // Log route meta

    if (to.meta.public) {
      console.log("Public route, allowing navigation");
      return;
    }

    if (to.meta.unauthenticatedOnly) {
      if (isLoggedIn) {
        console.log("Unauthenticated only route, redirecting to home");
        return "/";
      } else {
        console.log("Unauthenticated only route, allowing navigation");
        return;
      }
    }

    if (!canNavigate(to) && to.matched.length) {
      console.log("User cannot navigate to this route, checking authorization");
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

    console.log("Navigation allowed");
  });
};
