<template>
  <div class="relative h-screen bg-cover bg-center">

    <div class="absolute inset-0 bg-[#802F1D] z-0"> 
      <!-- <img
            class=" w-full h-full overflow-y-hidden"
            src="../assets/images/home.png"
            alt="Desk with Calendar"
          /> -->
    </div>
    <TopNavBar/>
    
    <DevOnly>
      <div class="absolute flex flex-col bg-black border-2 rounded-md p-10 m-10">
        <span>Id: {{ userStore().idUsuario }}</span>
        <span>Username: {{ userStore().nome }}</span>
        <span>Email: {{ userStore().email }}</span>
        <span>Nome: {{ userStore().responsavel }}</span>
        <span>Id_Permissão: {{ userStore().perfil }}</span>
      </div>
   </DevOnly>

    <div class="relative z-10 flex justify-center items-center mt-20">
      <div class="flex flex-col gap-y-10 justify-center">
        <Button @click="useRouter().push('/lista_planos')" label="Solicitar Plano de Ação" class="bg-slate-200 hover:!bg-slate-300 text-black text-3xl p-10 w-84 h-44 font-bold rounded-xl border-none hover:!border-none" />
        <!-- <Button label="Inventário" class="bg-red-900 hover:!bg-red-800 text-white text-3xl w-72 font-bold  rounded-xl border-none hover:!border-none" />
        <Button label="Riscos" class="bg-red-900 hover:!bg-red-800 text-white text-3xl w-72 font-bold  rounded-xl border-none hover:!border-none" /> -->
        <Button @click="useRouter().push('/lista_planos_gerados')" label="Acompanhar Planos de Ação" class="bg-slate-200 hover:!bg-slate-300 text-black text-3xl p-10 w-84 h-44 font-bold  rounded-xl border-none hover:!border-none" />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
