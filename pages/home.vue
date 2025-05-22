<template>
  <div class="relative h-screen bg-cover bg-center">
    <Toast/>
    <div class="absolute inset-0 bg-gradient-to-b from-[#521e1e] from-85% to-[#3c1414] z-0" /> 

    <TopNavBar/>
    <div class="relative z-10 flex justify-center items-center h-screen">
      <div class="flex flex-col gap-y-10 justify-center">
        <Button @click="useRouter().push('/lista_planos')" label="Operações" class="bg-[#D1D1B6] hover:scale-105 transition-all hover:!bg-slate-100 text-black text-3xl p-10 w-84 h-44 font-bold rounded-xl border-none hover:!border-none" />
        <Button @click="useRouter().push('/lista_planos_gerados')" label="Planos de Ação" class="bg-[#D1D1B6] hover:scale-105 transition-all hover:!bg-slate-100 text-black text-3xl p-10 w-96 h-44 font-bold  rounded-xl border-none hover:!border-none" />
      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { format } from 'date-fns'
import ProgressSpinner from 'primevue/progressspinner';

  const toast = useToast()
  const planosPendentes = ref()
  const route = useRoute()

  onMounted(async () => {
    await buscarListaRedigindo()
    if(route.query.sucesso){
      // alert('entrou')
      await verificarSucesso(route.query.sucesso)
    }
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

  async function verificarSucesso(tipoSucesso:any) {
    if(tipoSucesso == 'true'){
      toast.add({severity: 'success', summary: "Ficha salva com sucesso!", life: 3000, closable:false})
    }
  }

  function selecionarFicha(fichaSelecionada:any){
    useRouter().push('/cadastro_plano?idFicha='+fichaSelecionada.id)
  }

</script>
