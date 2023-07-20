import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useUserStore = defineStore({
  id: "user",
  state: () => {
    const token = useCookie("token");
    return {
      token: token.value || "",
      user: null,
    };
  },
  getters: {
    isLoggedIn: (state) => !!state.token,
  },
  actions: {
    async login(credentials) {
      const config = useRuntimeConfig();
      const { data, error, execute } = useFetch("/api/auth/login", {
        method: "POST",
        baseURL: config.public.apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      // Execute the request
      await execute();

      if (error.value) {
        // Handle error
        throw error.value.data.message;
      } else {
        let response = data.value;
        const cookie = useCookie("token");
        cookie.value = response.token;
        this.token = response.token;
        this.user = response.user;
        return response;
      }
    },

    async register(payload) {
      const config = useRuntimeConfig();
      const { data, error, execute } = useFetch("/api/auth/register", {
        method: "POST",
        baseURL: config.public.apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Execute the request
      await execute();

      if (error.value) {
        // Handle error
        throw error.value.data.message;
      } else {
        let response = data.value;
        return response;
      }
    },

    logout() {
      const token = useCookie("token");
      token.value = null;
      this.token = "";
      this.user = null;
    },

    async fetchUser() {
      if (!this.token) return;
      const config = useRuntimeConfig();
      const { data, error, execute } = useFetch("/api/profile", {
        method: "GET",
        baseURL: config.public.apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
      });
      await execute();
      if (error.value) {
        throw error.value.data.message;
      } else {
        this.user = data.value;
      }
    },

    async updateProfile(payload) {
      const config = useRuntimeConfig();
      const { data, error, execute } = useFetch("/api/profile", {
        method: "PUT",
        baseURL: config.public.apiBaseUrl,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token}`,
        },
        body: JSON.stringify(payload),
      });

      // Execute the request
      await execute();

      if (error.value) {
        // Handle error
        console.log(error.value);
        throw error.value;
      } else {
        let response = data.value;
        console.log(response);

        // Update this.user using the payload properties
        this.user = {
          ...this.user, // Spread the existing properties
          ...payload, // Overwrite with the properties from payload
        };

        return response;
      }
    },
  },
});
