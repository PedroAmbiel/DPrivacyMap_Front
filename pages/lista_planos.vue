<template>
  <div>
    <Toast />
    <TopNavBar/>
    <div class="bg-slate-100 fixed w-full h-full">
      <h2 class="place-self-center mt-10 text-4xl font-bold text-black">Cadastro de Planos</h2>
      <!-- <hr class="mt-5 border-4"> -->
      <div class="place-self-end mr-20 mt-10">
        <Button class="bg-[#D9D9D9] border-none hover:!bg-[#bb8383] hover:!border-none mr-32 w-full font-bold" @click="useRouter().push('/cadastro_plano')">Novo Plano</Button>
      </div>
      
      <div class="bg-white flex flex-col mx-20 rounded-lg mt-10 overflow-y-scroll h-3/5">
        <div v-if="planosPendentes == null" class="text-black text-2xl text-center p-5"> Carregando...</div>
        <div v-if="planosPendentes == 'E'" class="text-black text-2xl text-center p-5" > Nenhum plano pendente de finalização </div>
        <div v-if="planosPendentes != 'E'" v-for="item in planosPendentes" class="text-black text-center hover:bg-[#D9D9D9] 
          hover:cursor-pointer rounded-lg p-5 " @click="selecionarFicha(item)" >
            <!-- Id: <span>{{ item.id }}</span>
            <br> -->
            <span class="font-bold text-xl" v-if="item.area != null">{{ item.area }}</span> <span class="font-bold text-xl" v-else> Não Informado</span>
            <br>
            <span v-if="item.finalizado == false">Status:  Redigindo </span>
            <br>
            <span>Data Cadastro: {{ format(item.dataCadastro, 'dd/MM/yyyy HH:mm') }}</span>
        </div>
      </div>
    
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns'
import ProgressSpinner from 'primevue/progressspinner';

  const toast = useToast()
  const planosPendentes = ref()

  onMounted(async () => {
    await buscarListaRedigindo()
  })


  async function buscarListaRedigindo() {
    await useFetch('http://localhost:8000/listar_planos_redigindo/'+userStore().idUsuario, {
      method: 'GET',
      onResponse({ request, response, options }) {
          if(response.status == 200){
            
            planosPendentes.value = response._data
            console.log(planosPendentes.value)
          }
      },
      onResponseError({ request, response, options }) {
          planosPendentes.value = []
      }
    })
  }

  function selecionarFicha(fichaSelecionada:any){
    useRouter().push('/cadastro_plano?idFicha='+fichaSelecionada.id)
  }

</script>

<style>

</style>