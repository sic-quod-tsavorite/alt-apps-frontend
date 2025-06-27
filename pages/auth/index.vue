<template>
  <div class="flex h-150">
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
      <!-- Top part: Login -->
      <div class="mb-12">
        <p class="text-3xl font-semibold mb-6 text-center">Welcome!</p>
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

const { fetchToken, registerUser, name, email, password, user } = useUsers();
const registerDialog = ref<HTMLDialogElement | null>(null);

const toggleRegisterDialog = () => {
  if (registerDialog.value) {
    if (registerDialog.value.open) {
      registerDialog.value.close();
    } else {
      registerDialog.value.showModal();
    }
  }
};
</script>

<style lang="scss" scoped>
dialog {
  background-color: white;
  border: 1px solid #d1d5db;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin: 0;
  max-width: 90%;
  width: 400px;
  pointer-events: none;
  opacity: 0;
  transform: scale(0);
  transition: all 0.3s ease-in-out;
  position: absolute;
  top: auto;
  left: auto;
  right: 38px;
  bottom: 38px;
}

dialog[open] {
  opacity: 1;
  transition: all 0.3s ease-in-out;
  pointer-events: inherit;
  transform: scale(1);
}
dialog::backdrop {
  position: absolute;
  z-index: -1;
}
</style>
