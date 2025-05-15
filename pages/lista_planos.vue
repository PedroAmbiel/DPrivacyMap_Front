<template>
  <div>
    <Toast />
    <TopNavBar/>
    <div class="bg-white relative w-full h-screen">
      <!-- <h2 class="place-self-center text-4xl font-bold text-black">Cadastro de Planos</h2> -->
      <!-- <hr class="mt-5 border-4"> -->
      <div class="place-self-end py-10 px-20">
        <Button class="bg-slate-300 border-none hover:!bg-[#bb8383] hover:!border-none w-full font-bold" @click="useRouter().push('/cadastro_plano')">Nova Operação</Button>
      </div>
      
      <div class="bg-slate-300 flex flex-col mx-20 rounded-lg overflow-y-scroll h-3/5">
        <div v-if="planosPendentes == null" class="text-black text-2xl text-center p-5"> Carregando...</div>
        <div v-if="planosPendentes == 'E'" class="text-black text-2xl text-center p-5" > Nenhum plano pendente de finalização </div>
        <div v-if="planosPendentes != 'E'" v-for="item in planosPendentes" class="border-b-2 border-grey-100 rounded-none text-black text-center hover:bg-[#D9D9D9] 
          hover:cursor-pointer p-5 " @click="selecionarFicha(item)" >
            <!-- Id: <span>{{ item.id }}</span>
            <br> -->
            <span class="font-bold" v-if="item.area != null">Área: {{ item.area }}</span> <span class="font-bold text-xl" v-else> Não Informado</span>
            -
            <span v-if="item.finalizado == false"> <b> Status: </b>  Em andamento </span>
            <span v-else=><b>Status:</b> Concluído </span>
            -
            <span> <b> Data Cadastro: </b> {{ format(item.dataCadastro, 'dd/MM/yyyy HH:mm') }}</span>
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