/* eslint-disable arrow-parens */
/* eslint-disable semi */

// 👉 Redirects
export const redirects = [
  {
    path: "/",
    name: "index",
    redirect: (to) => {
      const userData = useCookie("userData").value;

      const userRole = userData?.role;

      if (userRole === "Manager-Control-Labs") {
        return { name: "apps-control-labs-traceability-process-samples" };
      }

      if (userRole === "Guest") {
        return { name: "visitor-control" };
      }

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
    // meta: {
    //   action: "read",
    //   subject: "Process",
    // },
  },
  {
    path: "/traceability/process/:id",
    name: "samplesProcess",
    component: () =>
      import(
        "@/pages/apps/control-labs-traceability/process/samples-process.vue"
      ),
    // meta: {
    //   action: "read",
    //   subject: "Process",
    // },
  },
  // {
  //   path: "/apps/control-labs-traceability/process/samples",
  //   name: "apps-control-labs-traceability-process-samples",
  //   component: () =>
  //     import("@/pages/apps/control-labs-traceability/process/samples.vue"),
  //   meta: {
  //     action: "read",
  //     subject: "Process",
  //   },
  // },
];
