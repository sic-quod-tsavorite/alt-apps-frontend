<template>
  <div class="flex h-screen">
    <!-- Left side with background image -->
    <div
      class="w-1/2 bg-cover bg-center"
      style="
        background-image: url('https://picsum.photos/800/1200?random=1');
        background-color: #1a202c; /* A dark blue-gray fallback */
      "
    ></div>

    <!-- Right side with login and register forms -->
    <div class="w-1/2 bg-white flex-grow text-gray-800 flex flex-col p-8">
      <!-- Top part: Login and Logout -->
      <div class="mb-12">
        <p class="text-3xl font-semibold mb-6 text-center">Welcome Back!</p>
        <input
          type="text"
          class="w-full mb-4 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Email"
          v-model="email"
        />
        <input
          type="password"
          class="w-full mb-6 p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          v-model="password"
        />
        <button
          class="bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 w-full transition duration-200 ease-in-out"
          @click="fetchToken(email, password)"
        >
          Login
        </button>
        <button
          class="bg-gray-500 text-white p-3 rounded-md hover:bg-gray-600 w-full mt-3 transition duration-200 ease-in-out"
          @click="logout"
        >
          Logout
        </button>
      </div>

      <!-- Lower part: Register -->
      <div class="flex-grow flex flex-col justify-end">
        <p
          class="text-xl font-medium text-center cursor-pointer text-indigo-600 hover:text-indigo-800 transition duration-200 ease-in-out"
          @click="toggleRegisterDialog"
        >
          Don't have an account? Register here!
        </p>
        <dialog
          ref="registerDialog"
          class="p-6 rounded-lg shadow-xl bg-white border border-gray-300"
        >
          <p class="text-2xl font-semibold mb-6 text-center text-gray-800">
            Register New Account
          </p>
          <form class="flex flex-col gap-4">
            <input
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Name"
              v-model="name"
            />
            <input
              type="text"
              class="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Email"
              v-model="email"
            />
            <input
              type="password"
              class="w-full p-3 border border-gray-300 rounded-md bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Password"
              v-model="password"
            />
            <button
              class="bg-emerald-500 text-white p-3 rounded-md hover:bg-emerald-600 w-full mt-4 transition duration-200 ease-in-out"
              @click.prevent="registerUser(name, email, password)"
            >
              Register
            </button>
          </form>
          <button
            class="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 w-full mt-3 transition duration-200 ease-in-out"
            @click.prevent="toggleRegisterDialog"
          >
            Close
          </button>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from "@/composables/auth/useUsers";

const { fetchToken, registerUser, logout, name, email, password, user } =
  useUsers();
const registerDialog = ref<HTMLDialogElement | null>(null);

const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    if (registerDialog.value.open) {
      registerDialog.value.close();
    } else {
      registerDialog.value.showModal(); // Use showModal for a proper modal dialog
    }
  }
};
</script>

<style lang="scss" scoped>
dialog {
  background-color: white;
  border: 1px solid #d1d5db; /* gray-300 */
  padding: 1.5rem; /* p-6 */
  border-radius: 0.5rem; /* rounded-lg */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05); /* shadow-xl */

  /* Centering the dialog */
  position: fixed; /* Use fixed for true centering */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0; /* Remove default margin */
  max-width: 90%; /* Limit width on smaller screens */
  width: 400px; /* Fixed width for larger screens */

  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

dialog[open] {
  opacity: 1;
  pointer-events: inherit;
  transform: translate(-50%, -50%) scale(1); /* Scale in effect */
}

dialog::backdrop {
  background-color: rgba(0, 0, 0, 0.5); /* Darker backdrop */
  backdrop-filter: blur(5px); /* Add a blur effect */
}
</style>
