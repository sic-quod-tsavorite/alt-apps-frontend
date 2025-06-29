<template>
  <div class="min-h-screen p-8">
    <h1 class="text-3xl font-bold mb-8">Admin View</h1>
    <!-- Loading wait screen -->
    <div v-if="loading" class="text-center">Loading...</div>
    <!--<div v-else-if="error" class="text-center text-red-500">{{ error }}</div>-->
    <div v-else-if="error" class="text-center text-red-500">
      <p>error: 500 Internal Server Error</p>
    </div>
    <!-- Error message -->
    <div v-else class="flex flex-wrap -mx-2">
      <!-- add new program section -->
      <div class="my-8 p-2 w-full">
        <h2 class="text-2xl font-semibold mb-4">Add Program</h2>
        <!-- Add program form -->
        <form @submit.prevent="addPrgHandler">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Program name -->
            <input
              type="text"
              v-model="newPrg.name"
              placeholder="Name"
              class="p-2 border rounded"
            />
            <!-- Error message & validate -->
            <span class="absolute text-red-500 text-xs ml-2"
              >Can't be empty</span
            >

            <!-- Program description -->
            <input
              type="text"
              v-model="newPrg.description"
              placeholder="description"
              class="p-2 border rounded"
            />
            <!-- Program country -->
            <input
              type="text"
              v-model="newPrg.country"
              placeholder="description"
              class="p-2 border rounded"
            />
            <!-- Hidden program -->
            <div class="p-2 border rounded flex items-center isHiddenCB">
              <input
                type="checkbox"
                v-model="newPrg.isHidden"
                class="p-2 border rounded w-6 h-6 mr-2"
              />
              <span class="uppercase font-bold">Hidden program</span>
            </div>
            <!-- Logo URL -->
            <input
              type="text"
              v-model="newPrg.logo"
              placeholder="Logo URL"
              class="p-2 border rounded h-10"
            />
          </div>
          <button
            type="submit"
            class="mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Create
          </button>
        </form>

        <!-- Edit existing programs -->
        <div class="my-8 py-2 w-full">
          <h2 class="text-2xl font-semibold mb-4">Programs</h2>
          <!-- Loop through the programs -->
          <div
            class="mb-4 p-4 border rounded bg-gray-400 dark:bg-[#181818]"
            v-for="program in programs"
            :key="program._id"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Program name -->
              <input
                type="text"
                v-model="program.name"
                placeholder="Name"
                class="p-2 border rounded"
              />
              <!-- Program description -->
              <input
                type="text"
                v-model="program.description"
                placeholder="description"
                class="p-2 border rounded"
              />
              <!-- Program country -->
              <input
                type="text"
                v-model="program.country"
                placeholder="country"
                class="p-2 border rounded"
              />
              <div class="p-2 border rounded flex items-center isHiddenCB">
                <!-- Hidden program -->
                <input
                  type="checkbox"
                  v-model="program.isHidden"
                  class="p-2 border rounded w-6 h-6 mr-2"
                />
                <span class="uppercase font-bold">Hidden program</span>
              </div>
              <!-- Logo URL -->
              <input
                type="text"
                v-model="program.logo"
                placeholder="Logo URL"
                class="p-2 border rounded h-10"
              />
              <!-- Program logo -->
              <span>
                Thumbnail img:
                <img
                  :src="program.logo"
                  alt="Logo Image"
                  class="w-full h-24 object-cover mb-4 rounded-lg"
                />
              </span>
            </div>

            <div class="mt-4 flex space-x-2">
              <!-- Update and delete buttons -->
              <p>ID:</p>
              <!-- Program ID for testing -->
              <button
                @click="deletePrg(program._id)"
                class="bg-red-600 text-white p-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <!-- Delete button -->
              <button
                @click="updatePrgHandler(program)"
                class="bg-green-600 text-white p-2 rounded hover:bg-green-700"
              >
                Edit
              </button>
              <!-- Edit button -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Custom confirmation dialog -->
  </div>
</template>

<script setup lang="ts">
import { usePrgs } from "~/composables/usePrgs";
import type { Program } from "~/types/interfaces";

const {
  programs,
  error,
  loading,
  fetchPrgs,
  deletePrg,
  addPrg,
  getTokenAndUserId,
  updatePrg,
} = usePrgs();

onMounted(() => {
  fetchPrgs();
});

const newPrg = ref({
  name: "",
  description: "",
  country: "",
  isHidden: false,
  logo: "",
  _createdBy: "",
});

const addPrgHandler = async () => {
  const { userId } = getTokenAndUserId(); // import the userId from the usePrgs module
  newPrg.value._createdBy = userId; // set the userId to the new program
  await addPrg(newPrg.value);
  newPrg.value = {
    ...newPrg.value,
  };
};

const updatePrgHandler = async (program: Program) => {
  const updatedPrg = {
    name: program.name,
    description: program.description,
    country: program.country,
    logo: program.logo,
    isHidden: program.isHidden,
  };
  await updatePrg(program._id, updatedPrg);
};
</script>

<style lang="scss" scoped>
input,
.isHiddenCB {
  background-color: #9e9e9e;
}
.dark input,
.dark .isHiddenCB {
  background-color: #2b2b2b;
}
</style>
