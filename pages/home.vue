<template>
  <Toast position="top-center" class="text-center"/>
  <div class="relative h-screen bg-cover bg-center">
    <div class="absolute inset-0 bg-gradient-to-b from-[#521e1e] from-85% to-[#3c1414] z-0"></div>
      <TopNavBar />
  
  <!-- <DevOnly> 
      <div class="absolute flex flex-col bg-black border-2 rounded-md p-10 m-10">
        <span>Id: {{ userStore().idUsuario }}</span>
        <span>Username: {{ userStore().nome }}</span>
        <span>Email: {{ userStore().email }}</span>
        <span>Nome: {{ userStore().responsavel }}</span>
        <span>Id_Permissão: {{ userStore().perfil }}</span>
      </div>
   </DevOnly> -->

     <div class="relative z-10 flex w-full">
      <!-- Esquerda -->
      <div class="flex flex-col w-1/2 p-10 gap-y-10 h-full">
        <Button
          @click="useRouter().push('/cadastro_plano')"
          label="Cadastrar Plano"
          class="bg-[#D1D1B6] hover:scale-105 transition-all hover:!bg-slate-100 text-black text-3xl p-5 w-2/4 h-fit self-center font-bold rounded-xl shadow-xl border-none hover:!border-none"
        />

        <div class="bg-[#F5EDEB] rounded-lg p-5 overflow-y-auto text-white" style="height: 65vh;">
          <div v-if="planosPendentes == null" class="text-black text-2xl text-center p-5"> Carregando...</div>
          <div v-else-if="planosPendentes == 'E'" class="text-black text-2xl text-center p-5"> Nenhum plano pendente de finalização </div>
          <div v-else v-for="item in planosPendentes" :key="item.id"
            class="text-black text-center hover:bg-[#D9D9D9] hover:cursor-pointer rounded-lg p-5"
            @click="selecionarFicha(item)"
          >
            <span class="font-bold text-xl">
              {{ item.area != null ? item.area : 'Não Informado' }}
            </span>
            <br />
            <span v-if="item.finalizado == false">Status: Redigindo</span>
            <br />
            <span>Data Cadastro: {{ format(item.dataCadastro, 'dd/MM/yyyy HH:mm') }}</span>
          </div>
        </div>
      </div>


      <!-- Direita -->
     <div class="flex items-center justify-center w-1/2">
        <Button
          @click="useRouter().push('/lista_planos_gerados')"
          label="Planos de Ação Concluídos"
          class="bg-[#D1D1B6] hover:scale-105 transition-all hover:!bg-slate-100 text-black shadow-xl text-3xl p-10 w-84 font-bold rounded-xl border-none hover:!border-none"
        />
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
