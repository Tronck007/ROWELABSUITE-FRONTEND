/* eslint-disable padding-line-between-statements */
/* eslint-disable newline-before-return */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
import { defineStore } from "pinia";
import UAParser from "ua-parser-js";
import { apiLogin, apiRefreshToken } from "@/services/auth/authService";
import { ability } from "@/plugins/casl/ability";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: useCookie("accessToken").value,
    refreshToken: useCookie("refreshToken").value,
    userData: useCookie("userData").value,
    abilityRules: useCookie("abilityRules").value,
  }),
  actions: {
    async login(credentials) {
      const parser = new UAParser();
      const result = parser.getResult();
      const userAgent = `${result.browser.name} ${result.browser.version} | ${result.os.name} ${result.os.version}`;
      const authType = "Control Lab Traceability";

      const enhancedCredentials = {
        ...credentials,
        userAgent,
        authType,
      };

      try {
        const response = await apiLogin(enhancedCredentials);

        console.log("Login response:", response); // Depuración

        const { status } = response.meta;

        if (status === 401) {
          notify("auth", "loginFail");
          return;
        }

        if (status === 200) {
          const { token, refreshToken, abilityRules, userData } = response;
          this.setAuthData(token, refreshToken, abilityRules, userData);
        }
      } catch (error) {
        throw new Error("Login failed. Please check your credentials.");
      }
    },
    async refreshToken() {
      try {
        const { token, userData, abilityRules } = await apiRefreshToken(
          this.refreshToken,
        );
        this.setAuthData(token, this.refreshToken, abilityRules, userData);
      } catch (error) {
        console.error("Refresh token error:", error);
        this.clearAuthData();
        throw error;
      }
    },
    setAuthData(token, refreshToken, abilityRules, userData) {
      useCookie("accessToken").value = token;
      useCookie("refreshToken").value = refreshToken;
      useCookie("userData").value = userData;
      useCookie("abilityRules").value = abilityRules;
      this.accessToken = token;
      this.refreshToken = refreshToken;
      this.userData = userData;
      this.abilityRules = abilityRules;

      // Actualiza las habilidades en CASL
      ability.update(abilityRules);
      console.log("User data set:", userData); // Depuración
      console.log("Ability rules set:", abilityRules); // Depuración
    },
    clearAuthData() {
      useCookie("accessToken").value = null;
      useCookie("refreshToken").value = null;
      useCookie("userData").value = null;
      useCookie("abilityRules").value = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.userData = null;
      this.abilityRules = null;

      // Resetea las habilidades en CASL
      ability.update([]);
    },
    async logout() {
      try {
        // Puedes llamar a un endpoint API para invalidar el token si es necesario
        // await apiLogout();

        // Limpia los datos de autenticación
        this.clearAuthData();
      } catch (error) {
        console.error("Logout error:", error);
      }
    },
  },
  getters: {
    userName: (state) =>
      state.userData ? state.userData.email.split("@")[0] : "",
    userRole: (state) => (state.userData ? state.userData.role : ""),
    userInitials: (state) => {
      if (state.userData && state.userData.full_name) {
        const [firstName, secondName] = state.userData.full_name.split(" ");
        return `${firstName[0]}${secondName[0]}`.toUpperCase();
      }
      return "";
    },
  },
});
