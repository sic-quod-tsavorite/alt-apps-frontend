// initialize isLoggedIn from localStorage or default to false
const isLoggedInFromStorage = import.meta.client
  ? localStorage.getItem("isLoggedIn") === "true"
  : false; // Default to false on server-side

export const state = reactive({
  isLoggedIn: isLoggedInFromStorage,
});

// watch for changes in isLoggedIn and update localStorage
if (import.meta.client) {
  watch(
    () => state.isLoggedIn,
    (newValue) => {
      localStorage.setItem("isLoggedIn", String(newValue));
    }
  );
}
