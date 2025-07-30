<template>
  <UApp>
    <div class="antialiased">
      <header class="sticky top-0 z-10">
        <div class="p-4 bg-gray-300 dark:bg-gray-950 flex">
          <UNavigationMenu color="neutral" :items="items" class="w-full" />
          <div class="theme-picker flex">
            <span class="m-auto mr-2 theme-pre-text">Choose theme:</span>
            <Icon
              :name="modeIcon[$colorMode.preference]"
              class="w-5 h-5 m-auto"
            />
            <select v-model="$colorMode.preference" class="pl-2 pr-2 rounded">
              <option value="system">Auto</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </header>
      <slot />
    </div>
  </UApp>
</template>

<script lang="ts" setup>
import type { NavigationMenuItem } from "@nuxt/ui";
import { state } from "../composables/globalStates/state";
import { useUsers } from "~/composables/auth/useUsers";

const colorMode = useColorMode();

const { logout } = useUsers();

const modeIcon: Record<string, string> = {
  system: "material-symbols:auto-awesome",
  light: "material-symbols:light-mode",
  dark: "material-symbols:dark-mode",
};

const items = computed<NavigationMenuItem[][]>(() => {
  const menuItems: NavigationMenuItem[] = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Alternatives",
      to: "/alternatives",
    },
  ];

  if (state.isLoggedIn) {
    menuItems.push({ label: "Admin", to: "/auth/admin" });
  }

  if (state.isLoggedIn) {
    menuItems.push({ label: "Logout", onSelect: logout });
  } else {
    menuItems.push({ label: "Login", to: "/auth" });
  }

  return [menuItems];
});
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

.theme-picker {
  .theme-pre-text,
  select {
    transform: scaleX(0);
    transform-origin: right;
    transition: all 0.3s ease-in-out;
  }
  .theme-pre-text {
    width: max-content;
    color: #00000000;
  }
  select {
    margin-right: -70px;
  }
}

.theme-picker:hover {
  .theme-pre-text,
  select {
    transform: scaleX(1);
    transition: all 0.3s ease-in-out;
  }
  .theme-pre-text {
    color: #314158;
  }
  select {
    margin-right: 0;
  }
}

.dark .theme-picker:hover {
  .theme-pre-text {
    color: #e2e8f0;
  }
}
</style>
