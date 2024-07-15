import { useAbility as useCaslAbility } from "@casl/vue";

export const useAbility = () => {
  const ability = useCaslAbility();
  console.log("Current ability:", ability);
  return ability;
};
