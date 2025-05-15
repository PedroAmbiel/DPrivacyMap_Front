<template>
  <div>
    <!-- Top Navbar -->
    <div class="relative z-3 flex items-center justify-between px-10 py-4 bg-[#521e1e] top-0">
      <i class="pi pi-home text-[#D1D1B6] text-4xl hover:cursor-pointer" @click="useRouter().push('/home')"></i>
      <h1 v-if="useRoute().path == '/home'" class="text-[#D1D1B6] font-bold text-3xl">DPrivacy Map</h1>
      <h1 v-if="useRoute().path == '/lista_planos'" class="text-[#D1D1B6] font-bold text-3xl">Operações</h1>
      <h1 v-if="useRoute().path == '/cadastro_plano'" class="text-[#D1D1B6] font-bold text-3xl">Nova Operação</h1>
      <h1 v-if="useRoute().path == '/lista_planos_gerados'" class="text-[#D1D1B6] font-bold text-3xl">Planos Gerados</h1>
      <i class="pi pi-sign-out text-[#D1D1B6] text-4xl hover:cursor-pointer" @click="userStore().limparUserStore(), useRouter().push('/')"></i>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style>

</style>