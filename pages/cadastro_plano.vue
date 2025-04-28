<template>
  <div>
    <Toast />
    <TopNavBar/>
    <div class="bg-red-700 fixed w-full h-full">
      <div class="place-self-start ml-20 mt-10">
        <Button class="bg-yellow-300 border-none hover:!bg-yellow-600 hover:!border-none mr-32 w-full font-bold" @click="useRouter().push('lista_planos')">Voltar</Button>
      </div>
      <div class="relative bg-white rounded-lg p-10 mt-10 place-self-center">
        <form>
        <div class="flex flex-col gap-y-10 ">
          <div class="flex flex-row gap-10 justify-between">
            <div class="flex flex-col">
              <label for="area" class="text-black">Área</label>
              <InputText id="area" v-model="area" placeholder="Área de Atuação"/>
            </div>

            <div class="flex flex-col">
              <label for="tipo_operacao" class="text-black">Tipo Operação</label>
              <MultiSelect v-model:model-value="tipoOperacaoSelecionado" :options="tipoOperacoes" option-label="nome" id="tipo_operacao" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div>

            <div class="flex flex-col">
              <label for="dados_coletados" class="text-black">Dados Coletados</label>
              <MultiSelect id="dados_coletados" v-model:model-value="dadosColetadosSelecionado" :options="dadosColetados" option-label="nome" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div>

            <div class="flex flex-col">
              <label for="finalidade" class="text-black">Finalidade</label>
              <MultiSelect id="finalidade" v-model:model-value="finalidadeSelecionado" :options="finalidade" option-label="nome" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div>
          </div>

          <div class="flex flex-row justify-between gap-x-10">
            <div class="flex flex-col">
              <label for="revisao" class="text-black">Revisão</label>
              <MultiSelect id="revisao" v-model:model-value="revisaoSelecionado" :options="revisao" option-label="nome" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div>

            <div class="flex flex-col">
              <label for="retencao" class="text-black">Retenção</label>
              <MultiSelect id="retencao" v-model:model-value="retencaoSelecionado" :options="retencao" option-label="nome" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div>

            <div class="flex flex-col">
              <label for="seguranca" class="text-black">Segurança</label>
              <MultiSelect id="seguranca" v-model:model-value="segurancaSelecionado" :options="seguranca" option-label="nome" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div>


          </div>

          <div class="flex flex-row justify-around p-10">
            <div class="flex flex-col">
              <label for="armazenamento" class="text-black">Armazenamento</label>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="Físico" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Físico</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="Digital" pt:box:class="!bg-yellow-300" />
                <label class="text-black pl-2">Digital</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="Físico e Digital" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Físico e Digital</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="N.A." pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">N.A.</label>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="text-black">Exclusão</label>
              <div class="flex flex-row">
                <RadioButton v-model="exclusao" inputId="exclusao" name="exclusao" :value="true" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="exclusao" inputId="exclusao" name="exclusao" :value="false" pt:box:class="!bg-yellow-300" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="text-black">Compartilhamento à Terceiros</label>
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="true" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="false" pt:box:class="!bg-yellow-300" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div>

            <div class="flex flex-col">
              <label for="transferencia_internacional" class="text-black">Transferência Internacional</label>
              <div class="flex flex-row">
                <RadioButton v-model="transferenciaInternacional" inputId="transferencia_internacional" name="transferencia_internacional" :value="true" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="transferenciaInternacional" inputId="transferencia_internacional" name="transferencia_internacional" :value="false" pt:box:class="!bg-yellow-300" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div>

          </div>

          <!-- <div class="flex flex-row justify-between">


            <InputText id="area">
            </InputText>

            <InputText id="area">
            </InputText>
          </div> -->


          <div class="pt-3 flex flex-row gap-x-3">
            <Button value="Salvar" class="font-bold bg-yellow-300 border-none hover:!bg-yellow-600 hover:!border-none">
              SALVAR
            </Button>
            <Button value="Salvar e Enviar" class="font-bold bg-yellow-300 border-none hover:!bg-yellow-600 hover:!border-none" @click="finalizarEnviarFicha()">
              SALVAR E ENVIAR
            </Button>
          </div>

        </div>
        </form>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { createPersistedState } from 'pinia-plugin-persistedstate'

  const toast = useToast()
  const route = useRoute();

  onMounted(async () =>{
    if(route.query.idFicha){
      carregarDadosFicha()
    }
  })

  const tipoOperacaoSelecionado = ref(null)
  const tipoOperacoes = [
    {nome: 'Coleta', value: 'Coleta'},
    {nome: 'Transferência', value: 'Transferência'},
    {nome: 'Processamento', value: 'Processamento'},
    {nome: 'Classificação', value: 'Classificação'},
    {nome: 'Transmissão', value: 'Transmissão'},
    {nome: 'Modificação', value: 'Modificação'},
  ]

  const dadosColetadosSelecionado = ref(null)
  const dadosColetados = [
    {nome: 'Outros', value: 'Outros'},
    {nome: 'Orientação Sexual e/ou Gênero', value: 'Orientação Sexual e/ou Gênero'},
    {nome: 'Dado Financeiro', value: 'Dado Financeiro'},
    {nome: 'Informação de Adolescente/Criança', value: 'Informação de Adolescente/Criança'},
    {nome: 'Dados Religiosos', value: 'Dados Religiosos'},
    {nome: 'Nome', value: 'Nome'},
    {nome: 'Dados de Saúde', value: 'Dados de Saúde'},
    {nome: 'Dados Políticos', value: 'Dados Políticos'},
    {nome: 'Imagens e/ou Vídeos', value: 'Imagens e/ou Vídeos'},
    {nome: 'Documento (RG;CPF;Carteira)', value: 'Documento (RG;CPF;Carteira)'},
  ]

  const finalidadeSelecionado = ref(null)
  const finalidade = [
    {nome: 'Outros', value: 'Outros'},
    {nome: 'Contratos e Relação Comercial', value: 'Contratos e Relação Comercial'},
    {nome: 'Cadastro de Prestadores de Serviços e/ou Fornecedores no Sistema da Empresa', value: 'Cadastro de Prestadores de Serviços e/ou Fornecedores no Sistema da Empresa'},
    {nome: 'Oportunidade de Emprego', value: 'Oportunidade de Emprego'},
    {nome: 'Pesquisas comerciais', value: 'Pesquisas comerciais'},
    {nome: 'Análise de Crédito', value: 'Análise de Crédito'},
    {nome: 'Realização de eventos', value: 'Realização de eventos'},
  ]

  const revisaoSelecionado = ref(null)
  const revisao = [
    {nome: 'N.A.', value: 'N.A.'},
    {nome: 'Anualmente', value: 'Anualmente'},
    {nome: 'Revisão feita sobre a demanda do candidato', value: 'Revisão feita sobre a demanda do candidato'},
    {nome: 'Trimestralmente', value: 'Trimestralmente'},
    {nome: 'Mensalmente', value: 'Mensalmente'},
    {nome: 'Semanalmente', value: 'Semanalmente'},
    {nome: 'Semestralmente', value: 'Semestralmente'},
  ]

  const retencaoSelecionado = ref(null)
  const retencao = [
    {nome: 'Mais de 1 ano', value: 'Mais de 1 ano'},
    {nome: 'Entre 1 e 3 meses', value: 'Entre 1 e 3 meses'},
    {nome: 'Até 1 mês', value: 'Até 1 mês'},
    {nome: 'Entre 6 meses e 1 ano', value: 'Entre 6 meses e 1 ano'},
    {nome: 'N.A.', value: 'N.A.'},
    {nome: 'Entre 3 e 6 meses', value: 'Entre 3 e 6 meses'},
  ]

  const segurancaSelecionado = ref(null)
  const seguranca = [
    {nome: 'Exclusão de E-mails', value: 'Exclusão de E-mails'},
    {nome: 'Outros', value: 'Outros'},
    {nome: 'Limitação de Acesso', value: 'Limitação de Acesso'},
    {nome: 'Limitação de acesso e Exclusão de E-mails', value: 'Limitação de acesso e Exclusão de E-mails'},
    {nome: 'N.A.', value: 'N.A.'},
  ]

  const armazenamento = ref(null)
  // const armazenamento = [
  //   {nome: 'Físico', value: 'Físico'},
  //   {nome: 'Digital', value: 'Digital'},
  //   {nome: 'Digital e Físico', value: 'Digital e Físico'},
  //   {nome: 'N.A.', value: 'N.A.'},
  // ]

  const exclusao = ref(null)

  const compartilhamentoTerceiros = ref(null)

  const transferenciaInternacional = ref(null)

  const area = ref(null)

  async function finalizarEnviarFicha(){
    await useFetch('http://localhost:8000/finalizar_ficha', {
      method: 'POST',
      body:{
        usuario: userStore().idUsuario,
        area: area.value,
        tipoOperacao: tipoOperacaoSelecionado.value,
        dadosColetados: dadosColetadosSelecionado.value,
        finalidade: finalidadeSelecionado.value,
        revisao: revisaoSelecionado.value,
        retencao: retencaoSelecionado.value,
        seguranca: segurancaSelecionado.value,
        armazenamento: armazenamento.value,
        exclusao: exclusao.value,
        compartilhamentoTerceiros: compartilhamentoTerceiros.value,
        transferenciaInternacional: transferenciaInternacional.value,
      },

      onResponse({request, response, options}){
        if(response.status == 200){
          toast.add({severity: 'success', summary: response._data, life: 5000})
          useRouter().push("/home")
        }
      },

      onResponseError({ request, response, options }) {
        toast.add({severity: 'error', summary: response._data, life: 3000})
      } 
    })
  }

  function salvarFicha(){

  }

  async function carregarDadosFicha(){
    await useFetch('http://localhost:8000/buscar_ficha/'+route.query.idFicha, {
    method: 'GET',
    async onResponse({ request, response, options }) {
        if(response.status == 200){
          await preencherCamposComFichaExistente(response._data)
        }
    },
    onResponseError({ request, response, options }) {

    }
  })
  }

  async function preencherCamposComFichaExistente(response:any){
    if(response.armazenamento){
      armazenamento.value = response.armazenamento
    }
    if(response.area){
      area.value = response.area
    }
    if(response.compartilhamentoTerceiros != null){
      compartilhamentoTerceiros.value = response.compartilhamentoTerceiros
    }
    if(response.exclusao != null){
      exclusao.value = response.exclusao
    }
    if(response.transferenciaInternacional != null){
      transferenciaInternacional.value = response.transferenciaInternacional
    }
  }


</script>

<style>
/* Tailwind classes applied manually */
.custom-radio-box {
  @apply transition-all rounded-full border-2 border-gray-300;
}

/* When selected */
.custom-radio-box.p-highlight {
  @apply ring-2 ring-blue-500 border-blue-500;
}

/* When focused */
.custom-radio-box.p-focus {
  @apply ring-2 ring-blue-500;
}
</style>