/* eslint-disable arrow-parens */
/* eslint-disable semi */
// 👉 Redirects
export const redirects = [
  // ℹ️ We are redirecting to different pages based on role.
  // NOTE: Role is just for UI purposes. ACL is based on abilities.
  {
    path: "/",
    name: "index",
    redirect: (to) => {
      // TODO: Get type from backend
      const userData = useCookie("userData");

      const userRole = userData.value?.role;

      if (userRole === "General")
        return { name: "apps-control-labs-traceability-process-samples" };
      if (userRole === "admin")
        return { name: "dashboards-reservaciones-board" };

      return { name: "login", query: to.query };
    },
  },
];
export const routes = [
  {
    path: "/traceability",
    name: "traceability",
    component: () =>
      import("@/pages/apps/control-labs-traceability/process/samples.vue"),
  },
  {
    path: "/traceability/process/:id",
    name: "samplesProcess",
    component: () =>
      import(
        "@/pages/apps/control-labs-traceability/process/samples-process.vue"
      ),
  },
  {
    path: "/traceability/lot/preview",
    name: "lot-printing",
    component: () =>
      import("@/pages/apps/control-labs-traceability/reports/lot-print.vue"),
  },
];
