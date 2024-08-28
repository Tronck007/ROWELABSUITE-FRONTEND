import { abilitiesPlugin } from "@casl/vue";
import { useAuthStore } from "@/stores/auth/authStore"; // Asegúrate de la ruta correcta
import { ability } from "./ability";

export default function (app) {
  const authStore = useAuthStore();
  const userAbilityRules = authStore.abilityRules || [];

  ability.update(userAbilityRules);

  app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true,
  });
}
