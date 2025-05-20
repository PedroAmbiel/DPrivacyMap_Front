<template>
  <div>
    <Toast />
    <div class="bg-white relative w-full h-screen">
      <TopNavBar/>
    <!-- <h2 class="place-self-center text-4xl font-bold text-black">Cadastro de Planos</h2> -->
      <!-- <hr class="mt-5 border-4"> -->
      <div class="place-self-end pt-32 pb-4 px-20">
        <Button class="bg-[#6e2828] border-none text-white hover:!bg-slate-100 shadow-xl hover:!border-none w-full font-bold" @click="useRouter().push('/cadastro_plano')">Nova Operação</Button>
      </div>

    <DataTable :value="planosPendentes" class="bg-[#a5a3a3] text-slate-200 flex flex-col mx-20 rounded-lg overflow-y-auto h-auto" 
    pt:table:class="!bg-[#a5a3a3]"
    style="max-height: 70vh;">
      <template #empty>
        Nenhum plano encontrado
      </template>
        <Column header="Área">
          <template #body="slotProps">
              <span>  {{slotProps.data.area}} </span>
          </template>
        </Column>
        <Column header="Status">
          <template #body="slotProps">
              <span v-if="slotProps.data.finalizado == false">  Em andamento </span>
              <span v-else > Concluído </span>
          </template>
        </Column>
        <Column header="Data Cadastro">
          <template #body="slotProps">
              {{ format(slotProps.data.dataCadastro, 'dd/MM/yyyy HH:mm') }}
          </template>
        </Column>
        <Column header="Data Cadastro">
          <template #body="slotProps">
              <Button class="bg-[#a5a3a3] border-none text-white hover:!bg-slate-100 hover:!border-none" :class="slotProps.data.finalizado == false ? `!bg-[#2fc25b]` : ``" @click="slotProps.data.finalizado == false ? selecionarFicha(slotProps.data) : visualizarFinalizado(slotProps.data)" >{{ slotProps.data.finalizado == false ?  'Continuar' : 'Visualizar' }}</Button>
          </template>
        </Column>
    </DataTable>
      
      <!-- <div class="bg-[#a5a3a3] text-slate-200 flex flex-col mx-20 rounded-lg overflow-y-auto h-auto" style="max-height: 70vh;">
        <div v-if="planosPendentes == null" class="text-2xl text-center p-5"> Carregando...</div>
        <div v-if="planosPendentes == 'E'" class="text-2xl text-center p-5" > Nenhum plano pendente de finalização </div>
        <div v-if="planosPendentes != 'E'" v-for="item in planosPendentes" class="border-b-2 border-grey-100 hover:text-black rounded-none text-center hover:!bg-slate-100 
          transition-colors hover:cursor-pointer p-5 " @click="item.finalizado == false ? selecionarFicha(item) : visualizarFinalizado(item)" >
            <span class="font-bold" v-if="item.area != null">Área: {{ item.area }}</span> <span class="font-bold" v-else> Não Informado</span>
            -
            <span v-if="item.finalizado == false"> <b> Status: </b>  Em andamento </span>
            <span v-else=><b>Status:</b> Concluído </span>
            -
            <span> <b> Data Cadastro: </b> {{ format(item.dataCadastro, 'dd/MM/yyyy HH:mm') }}</span>
        </div>
      </div> -->
    
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

  function visualizarFinalizado(fichaSelecionada:any){
    useRouter().push('/lista_planos_gerados?fichaSelecionada='+fichaSelecionada.id)
  }

</script>

<style scoped>
::v-deep(.p-datatable-header-cell) {
  @apply bg-[#6e2828];
}

::v-deep(.p-row-even) {
  @apply bg-[#6e2828];
}

::v-deep(.p-row-odd) {
  @apply bg-[#6e2828];
}
</style>