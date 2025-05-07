<template>
  <div>
    <!-- Top Navbar -->
    <div class="relative z-10 flex items-center justify-between px-6 py-8 bg-red-900 top-0">
      <i class="pi pi-home text-white text-4xl hover:cursor-pointer" @click="useRouter().push('/home')"></i>
      <h1 class="text-white font-bold text-4xl">DPrivacy Map</h1>
      <i class="pi pi-sign-out text-white text-4xl hover:cursor-pointer" @click="userStore().limparUserStore(), useRouter().push('/')"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>