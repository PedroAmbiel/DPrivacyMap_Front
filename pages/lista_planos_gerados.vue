<template>
  <Toast/>
  <TopNavBar/>
  <div class="flex h-screen text-black">
    <div class="w-1/3 bg-gray-100 p-4 overflow-auto">
      <h2 class="text-xl font-semibold mb-4 text-center">Fichas Concluidas</h2>
      <ul class="space-y-2" v-if="fichasConcluidas != undefined && fichasConcluidas != 'E'">
        <li
          v-for="item in fichasConcluidas"
          :key="item"
          class="p-2 px-5 bg-white shadow rounded cursor-pointer relative hover:bg-red-300" @click="fichaSelecionada = item.id; buscarSecaoResposta()" :class="fichaSelecionada == item.id ? `!bg-red-400` : ``">
            <!-- <b>Id:</b> <span>{{ item.id }}</span> -->
            <!-- <br> -->
            <span v-if="item.area != null" class="text-2xl font-bold">{{ item.area }}</span> <span v-else> Não Informado</span>
            <br>
            <b>Status:</b> <span v-if="item.finalizado == true"> Finalizado </span>
            <br>
            <b>Data Cadastro:</b> <span>{{ format(item.dataCadastro, 'dd/MM/yyyy HH:mm') }}</span>

            <div class="absolute right-10 top-[20%] text-center flex flex-col">
              <span class="font-bold text-2xl">{{ item.totalSecoes }}</span>
              <span class="font-bold text-2xl">PLANOS</span>
            </div>
        </li>
      </ul>

      <div class="space-y-2 font-bold text-center text-xl" v-if="fichasConcluidas == 'E'">
        Nenhum plano encontrado
      </div>



      <ul class="space-y-2 animate-pulse" v-if="fichasConcluidas == undefined">
        <li class="p-6 bg-gray-300 shadow rounded">
        </li>
        <li class="p-6 bg-gray-300 shadow rounded">
        </li>
        <li class="p-6 bg-gray-300 shadow rounded">
        </li>
      </ul>
    </div>


    <!-- DIREITA -->
    <div class="flex-1 bg-white p-6 overflow-y-scroll">
      <p class="text-gray-500" v-if="secoes == undefined || secoes == 'E'">Selecione um plano para visualizar!</p>
      <ul>
        <li v-for="(secao, index) in secoes" class="p-2 px-5 bg-white  rounded relative">
        <BlockUI :blocked="secao.resposta == null" :class="secao.resposta == null ? `animate-pulse` : `` " class="relative">
          <div class="text-xl font-bold p-8">
            <span>{{ index + 1 }} </span> -
            <span>{{ secao.plano }}</span>
            <br>
            <span class="text-sm font-normal p-8">Risco: {{ secao.risco }}</span>
          </div>
          <div class="text-sm absolute right-0 top-0 p-2 flex flex-row">
            <span class="text-sm right-0 top-0 px-2">Data Inicio: {{ secao.dataInicio != null ? format(secao.dataInicio, 'dd/MM/yyyy HH:mm') : `pendente` }}</span>
            <span class="text-sm right-0 top-0 px-2">Data Fim: {{ secao.dataFim != null ? format(secao.dataFim, 'dd/MM/yyyy HH:mm') : `pendente` }}</span>
          </div>
          <div v-if="secao.dataFim != null">
            {{ secao.resposta }}
          </div>
        </BlockUI>
      </li> 
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { format } from 'date-fns'

onMounted(async () =>{  
  buscarListaPlanos()
})

const fichasConcluidas = ref()

const fichaSelecionada = ref()

const secoes = ref()


async function buscarListaPlanos(){

  await useFetch('http://localhost:8000/buscar_planos_concluidos/'+userStore().idUsuario, {
    method: 'GET',
    onResponse({ request, response, options }) {
        if(response.status == 200){
          
          fichasConcluidas.value = response._data
          console.log(fichasConcluidas.value)
        }
    },
    onResponseError({ request, response, options }) {
      fichasConcluidas.value = []
    }
  })
}

async function buscarSecaoResposta(){
  await useFetch('http://localhost:8000/buscar_secoes/'+fichaSelecionada.value, {
    method: 'GET',
    onResponse({ request, response, options }) {
        if(response.status == 200){
          
          secoes.value = response._data
          console.log(secoes.value)
        }
    },
    onResponseError({ request, response, options }) {
      secoes.value = []
    }
  })
}

</script>

<style>

</style>