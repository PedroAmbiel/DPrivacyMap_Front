<template>
  <div>
    <Toast />
    <div class="bg-white relative w-full h-screen">
      <TopNavBar/>
      <div class="place-self-end pt-32 pb-4 px-20">
        <Button class="bg-[#6e2828] border-none text-white hover:!bg-slate-100 shadow-xl hover:!border-none w-full font-bold" @click="useRouter().push('/cadastro_plano')">Nova Operação</Button>
      </div>

    <DataTable :value="planosPendentes" class="bg-[#a5a3a3] flex flex-col mx-20 rounded-lg overflow-y-auto h-auto" 
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
        <Column >
          <template #body="slotProps">
              <Button class="bg-[#a5a3a3] border-none text-white hover:!bg-slate-100 hover:!border-none" :class="slotProps.data.finalizado == false ? `!bg-[#2fc25b]` : ``" @click="slotProps.data.finalizado == false ? selecionarFicha(slotProps.data) : visualizarFinalizado(slotProps.data)" >{{ slotProps.data.finalizado == false ?  'Continuar' : 'Visualizar' }}</Button>
          </template>
        </Column>
    </DataTable>
    
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
  @apply bg-white text-black;
}

::v-deep(.p-row-odd) {
  @apply bg-white text-black;
}
</style>