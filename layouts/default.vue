<template>
  <UApp>
    <div class="antialiased">
      <header>
        <div class="p-4 bg-gray-300 dark:bg-gray-950 flex">
          <UNavigationMenu color="neutral" :items="items" class="w-full" />
          <UTooltip text="Choose theme">
            <Icon
              :name="modeIcon[$colorMode.preference]"
              class="w-5 h-5 m-auto"
            />
            <select v-model="$colorMode.preference" class="pl-2 pr-2 rounded">
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </UTooltip>
        </div>
      </header>
      <slot />
    </div>
  </UApp>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();

const modeIcon: Record<string, string> = {
  system: "material-symbols:auto-awesome",
  light: "material-symbols:light-mode",
  dark: "material-symbols:dark-mode",
};

const items = ref<NavigationMenuItem[][]>([
  [
    {
      label: "Home",
      //icon: 'i-lucide-book-open',
      to: "/",
    },
    {
      label: "Alternatives",
      to: "/alternatives",
    },
    {
      label: "Dynamic Link",
      to: "/alternatives/dynamic-link",
    },
  ],
]);
</script>

<style lang="scss" scoped>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
</style>
