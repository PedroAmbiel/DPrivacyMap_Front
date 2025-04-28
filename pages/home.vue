<template>
  <div class="relative h-screen bg-cover bg-center">
    <!-- Red Overlay -->
    <div class="absolute inset-0 bg-red-900 z-0">
      <img
            class=" w-full h-full overflow-y-hidden "
            src="../assets/images/home.png"
            alt="Desk with Calendar"
          />
      </div>
    <TopNavBar/>
    <!-- Centered Buttons -->
    <div class="relative z-10 flex justify-center items-center mt-20">
      <div class="flex flex-col gap-y-10 justify-center">
        {{ userStore().idUsuario }}
        {{ userStore().nome }}
        {{ userStore().email }}
        {{ userStore().responsavel }}
        {{ userStore().perfil }}
        
        <Button @click="useRouter().push('/lista_planos')" label="Solicitar Plano de Ação" class="bg-red-900 hover:!bg-red-800 text-white text-3xl p-10 w-84 h-44 font-bold rounded-xl border-none hover:!border-none" />
        <!-- <Button label="Inventário" class="bg-red-900 hover:!bg-red-800 text-white text-3xl w-72 font-bold  rounded-xl border-none hover:!border-none" />
        <Button label="Riscos" class="bg-red-900 hover:!bg-red-800 text-white text-3xl w-72 font-bold  rounded-xl border-none hover:!border-none" /> -->
        <Button label="Acompanhar Planos de Ação" class="bg-red-900 hover:!bg-red-800 text-white text-3xl p-10 w-84 h-44 font-bold  rounded-xl border-none hover:!border-none" />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
