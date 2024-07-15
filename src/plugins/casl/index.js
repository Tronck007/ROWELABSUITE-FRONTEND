import { abilitiesPlugin } from "@casl/vue";
import { useAuthStore } from "@/stores/auth/authStore"; // Asegúrate de la ruta correcta
import { ability } from "./ability";

export default function (app) {
  const authStore = useAuthStore();
  const userAbilityRules = authStore.abilityRules || [];
  console.log("Initializing CASL with rules:", userAbilityRules);

  ability.update(userAbilityRules);
  console.log("Initialized ability:", ability);

  app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  });
}
