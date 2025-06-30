import { state } from "~/composables/globalStates/state";

export default defineNuxtRouteMiddleware((to, from) => {
  if (!state.isLoggedIn) {
    return navigateTo("/auth");
  }
});
