<template>
  <Toast/>
  <TopNavBar/>
  <div class="flex h-screen text-black">
    <!-- ESQUERDA -->
    <div class="w-1/3 bg-gray-100 p-4 overflow-auto mt-16">
      <h2 class="text-xl font-semibold mb-4 text-center">Fichas Concluídas</h2>
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
              <span class="font-bold text-1xl">PLANOS</span>
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
    <div class="flex-1 bg-white p-6 overflow-y-scroll relative mt-16">
      <p class="text-gray-500" v-if="secoes == undefined || secoes == 'E'">Selecione um plano para visualizar!</p>
      <div class="flex items-center group w-fit relative cursor-pointer rounded-full h-10 transition-colors duration-500" @click="carregarDadosFicha(fichaSelecionada)">
        <i v-if="fichaSelecionada != null"
          class="pi pi-search-plus text-2xl p-2 transition-transform duration-700 rounded-full"
        ></i>
        
        <span v-if="fichaSelecionada != null"
          class="absolute left-6 opacity-100 transition-all duration-300 transform translate-x-0 group-hover:translate-x-2 text-black px-3 py-1 text-lg"
        >
          Detalhes
        </span>
      </div>
      <hr class="border-black my-2">
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
          <div v-if="secao.dataFim != null" class="text-justify">
            <span v-html="formatarTopicosParaLista(secao.resposta)" />
          </div>
        </BlockUI>
      </li> 
      </ul>
    </div>
  </div>


  <Dialog v-model:visible="visible" modal :draggable="false" header="Operações do plano" :style="{ width: '40rem' }" position="left"
    class="bg-white" @hide="activeStep = '1'">
    <template #header>
      <span class="text-black">Operações do Plano</span>
    </template>
        <Stepper class="" v-model:value="activeStep">
          <StepItem value="1">
            <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '1') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (areaSelecionada != null 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">
              Área
            </Step>
            <StepPanel v-slot="{ activateCallback, value }" pt:root:class="!bg-white">
              <div class="border-none bg-surface-50 mt-10 w-full
                dark:bg-surface-950 flex-col flex justify-start items-start font-medium ">
                <!-- <label for="area" class="text-slate-800 text-2xl text-center">ÁREA</label> -->
                <Listbox v-model:model-value="areaSelecionada" :disabled="true" :options="area" option-label="nome" option-value="nome" id="area" 
                  fluid listStyle="max-height:1000px"
                  placeholder="Área de Atuação"
                  class="w-full border-none rounded-none bg-white shadow-none">
                    <template #option="slotProps">
                      <div
                        :class="[
                          'cursor-pointer px-3 py-2 rounded-md duration-150',
                          slotProps.selected
                            ? 'bg-white text-black w-full h-full'
                            : 'hover:bg-white hover:underline text-black w-full h-full'
                        ]"
                      >
                        <i class="pi pi-circle" v-if="areaSelecionada != slotProps.option.nome"/> <i v-else class="pi pi-circle-fill" />
                        {{ slotProps.option.nome }}
                      </div>
                    </template>
                    <template #content>

                    </template>
                </Listbox>
              </div>
              <div class="py-6">
                <Button label="Próximo" @click="activateCallback('2'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all" />
              </div>
            </StepPanel>
          </StepItem>

          <StepItem value="2">
            <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '2') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (tipoOperacaoSelecionado != null && tipoOperacaoSelecionado.length != 0
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">
              Tipo Operação
              </Step>
          <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="border-none bg-surface-50 mt-10 w-full
                dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
              <Listbox v-model:model-value="tipoOperacaoSelecionado" :disabled="true" multiple :options="tipoOperacoes" option-label="nome" option-value="nome" 
              id="tipo_operacao" placeholder="Selecione"
              fluid listStyle="max-height:1000px"
              class="w-full border-none rounded-none bg-white shadow-none">
                    <template #option="slotProps">
                      <div
                        :class="[
                          'cursor-pointer px-3 py-2 rounded-md duration-150',
                          slotProps.selected
                            ? 'bg-white text-black w-full h-full'
                            : 'hover:bg-white hover:underline text-black w-full h-full'
                        ]"
                      >
                        <i class="pi pi-stop" v-if="!slotProps.selected"/> <i v-else class="pi pi-check-square" />
                        {{ slotProps.option.nome }}
                      </div>
                    </template>
              </Listbox>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click=" activateCallback('1'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click=" activateCallback('3'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
            </StepItem>

            <StepItem value="3" >
              <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '3') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (dadosColetadosSelecionado != null && dadosColetadosSelecionado.length != 0 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Dados Coletados</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="border-none bg-surface-50 mt-10 w-full
              dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
              <Listbox id="dados_coletados" v-model:model-value="dadosColetadosSelecionado" :disabled="true" multiple :options="dadosColetados" option-label="nome" 
              option-value="nome" placeholder="Selecione"
              fluid listStyle="max-height:1000px"
              class="w-full border-none rounded-none bg-white shadow-none">
                    <template #option="slotProps">
                      <div
                        :class="[
                          'cursor-pointer px-3 py-2 rounded-md duration-150',
                          slotProps.selected
                            ? 'bg-white text-black w-full h-full'
                            : 'hover:bg-white hover:underline text-black w-full h-full'
                        ]"
                      >
                      <i class="pi pi-stop" v-if="!slotProps.selected"/> <i v-else class="pi pi-check-square" />
                        {{ slotProps.option.nome }}
                      </div>
                    </template>
              </Listbox>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('2'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('4'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
          </StepPanel>
        </StepItem>

          <StepItem value="4">
            <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '4') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (finalidadeSelecionado != null && finalidadeSelecionado.length != 0 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Finalidade</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="border-none bg-surface-50 mt-10 w-full
              dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
              <Listbox id="finalidade" v-model:model-value="finalidadeSelecionado" :disabled="true" multiple :options="finalidade" option-label="nome" 
              option-value="nome" placeholder="Selecione"
              fluid listStyle="max-height:1000px"
              class="w-full border-none rounded-none bg-white shadow-none">
                    <template #option="slotProps">
                      <div
                        :class="[
                          'cursor-pointer px-3 py-2 rounded-md duration-150',
                          slotProps.selected
                            ? 'bg-white text-black w-full h-full'
                            : 'hover:bg-white hover:underline text-black w-full h-full'
                        ]"
                      >
                      <i class="pi pi-stop" v-if="!slotProps.selected"/> <i v-else class="pi pi-check-square" />
                        {{ slotProps.option.nome }}
                      </div>
                    </template>
              </Listbox>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('3'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('5');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

        <StepItem value="5">
          <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '5') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (revisaoSelecionado != null && revisaoSelecionado.length != 0 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Revisão</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
                                        <!-- <div class="border-none bg-surface-50 mt-10 w-full
                                          dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
                                          <Listbox id="revisao" v-model:model-value="revisaoSelecionado" :disabled="true" multiple :options="revisao" option-label="nome" 
                                          option-value="nome" placeholder="Selecione"
                                          fluid listStyle="max-height:1000px"
                                          class="w-full border-none rounded-none bg-white shadow-none">
                                                <template #option="slotProps">
                                                  <div
                                                    :class="[
                                                      'cursor-pointer px-3 py-2 rounded-md duration-150',
                                                      slotProps.selected
                                                        ? 'bg-white text-black w-full h-full'
                                                        : 'hover:bg-white hover:underline text-black w-full h-full'
                                                    ]"
                                                  >
                                                    <i class="pi pi-stop" v-if="!slotProps.selected"/> <i v-else class="pi pi-check-square" />
                                                    {{ slotProps.option.nome }}
                                                  </div>
                                                </template>
                                          </Listbox>
                                        </div> -->
              <div class="flex flex-col py-5">
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="Revisão feita sobre a demanda do candidato" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Revisão feita sobre a demanda do candidato</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="Semanalmente" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Semanalmente</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="Mensalmente" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Mensalmente</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="Trimestralmente" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Trimestralmente</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="Semestralmente" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Semestralmente</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="Anualmente" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Anualmente</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="revisaoSelecionado" :disabled="true" inputId="revisao" name="revisao" value="N.A." pt:box:class="!bg-white"/>
                <label class="text-black pl-2">N.A.</label>
              </div>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('4'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('6'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

        <StepItem value="6">
          <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '6') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (retencaoSelecionado != null && retencaoSelecionado.length != 0 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Retenção</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
                                              <!-- <div class="border-none bg-surface-50 mt-10 w-full
                                                dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
                                                <Listbox id="retencao" :disabled="true" v-model:model-value="retencaoSelecionado" multiple :options="retencao" option-label="nome" 
                                                option-value="nome" placeholder="Selecione"
                                                fluid listStyle="max-height:1000px"
                                                class="w-full border-none rounded-none bg-white shadow-none">
                                                      <template #option="slotProps">
                                                        <div
                                                          :class="[
                                                            'cursor-pointer px-3 py-2 rounded-md duration-150',
                                                            slotProps.selected
                                                              ? 'bg-white text-black w-full h-full'
                                                              : 'hover:bg-white hover:underline text-black w-full h-full'
                                                          ]"
                                                        >
                                                          <i class="pi pi-stop" v-if="!slotProps.selected"/> <i v-else class="pi pi-check-square" />
                                                          {{ slotProps.option.nome }}
                                                        </div>
                                                      </template>
                                                </Listbox>
                                              </div> -->
              <div class="flex flex-col py-5">
              <div class="flex flex-row">
                <RadioButton v-model="retencaoSelecionado" :disabled="true" inputId="retencao" name="retencao" value="Mais de 1 ano" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Mais de 1 ano</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="retencaoSelecionado" :disabled="true" inputId="retencao" name="retencao" value="Entre 1 e 3 meses" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Entre 1 e 3 meses</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="retencaoSelecionado" :disabled="true" inputId="retencao" name="retencao" value="Até 1 mês" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Até 1 mês</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="retencaoSelecionado" :disabled="true" inputId="retencao" name="retencao" value="Entre 6 meses e 1 ano" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Entre 6 meses e 1 ano</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="retencaoSelecionado" :disabled="true" inputId="retencao" name="retencao" value="Entre 3 e 6 meses" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Entre 3 e 6 meses</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="retencaoSelecionado" :disabled="true" inputId="retencao" name="retencao" value="N.A." pt:box:class="!bg-white"/>
                <label class="text-black pl-2">N.A.</label>
              </div>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('5');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('7');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>
            
          <StepItem value="7">
            <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '7') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (segurancaSelecionado != null 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Segurança</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="flex flex-col py-10">
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" :disabled="true" inputId="seguranca" name="seguranca" value="Exclusão de E-mails" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Exclusão de E-mails</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" :disabled="true" inputId="seguranca" name="seguranca" value="Limitação de Acesso" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Limitação de Acesso</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" :disabled="true" inputId="seguranca" name="seguranca" value="Limitação de acesso e Exclusão de E-mails" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Limitação de acesso e Exclusão de E-mails</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" :disabled="true" inputId="seguranca" name="seguranca" value="Outros" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Outros</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" :disabled="true" inputId="seguranca" name="seguranca" value="N.A." pt:box:class="!bg-white"/>
                <label class="text-black pl-2">N.A.</label>
              </div>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('6'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('8');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

        <StepItem value="8">
          <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '8') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (armazenamento != null 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Armazenamento</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="flex flex-col py-10">
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" :disabled="true" inputId="armazenamento" name="armazenamento" value="Físico" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Físico</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" :disabled="true" inputId="armazenamento" name="armazenamento" value="Digital" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Digital</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" :disabled="true" inputId="armazenamento" name="armazenamento" value="Físico e Digital" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Físico e Digital</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" :disabled="true" inputId="armazenamento" name="armazenamento" value="N.A." pt:box:class="!bg-white"/>
                <label class="text-black pl-2">N.A.</label>
              </div>
            </div>

            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('7');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('9'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

        <StepItem value="9">
          <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '9') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (exclusao != null 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Exclusão</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="flex flex-col py-10">
              <div class="flex flex-row">
                <RadioButton v-model="exclusao" :disabled="true" inputId="exclusao" name="exclusao" :value="true" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="exclusao" :disabled="true" inputId="exclusao" name="exclusao" :value="false" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('8'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('10');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

          <StepItem value="10">
            <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '10') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (compartilhamentoTerceiros != null 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Compartilhamento à terceiros</Step>
            <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
            <div class="flex flex-col py-10">
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" :disabled="true" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="true" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" :disabled="true" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="false" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('9'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('11');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
          </StepPanel>
        </StepItem>

      <StepItem value="11">
        <Step 
              :pt="{
                number: {
                  class: [
                    (activeStep == '11') 
                      ? '!bg-gray-200 !text-white border-none' // custom color when active
                      : (transferenciaInternacional != null 
                          ? 'bg-green-400 text-black border-none' 
                          : 'bg-red-400 text-black border-none')
                  ]
                },
                title: {
                  class: 'text-black text-xl'
                }
              }">Transferência Internacional</Step>
        <StepPanel v-slot="{ activateCallback }" pt:root:class="!bg-white">
          <div class="flex flex-col py-10">
            <div class="flex flex-row">
              <RadioButton v-model="transferenciaInternacional" :disabled="true" inputId="transferencia_internacional" name="transferencia_internacional" :value="true" pt:box:class="!bg-white"/>
              <label class="text-black pl-2">Sim</label>
            </div>
            <div class="flex flex-row">
              <RadioButton v-model="transferenciaInternacional" :disabled="true" inputId="transferencia_internacional" name="transferencia_internacional" :value="false" pt:box:class="!bg-white" />
              <label class="text-black pl-2">Não</label>
            </div>
          </div>
          <div class="py-6">
            <Button label="Voltar" @click="activateCallback('10');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
          </div>
        </StepPanel>
      </StepItem>
      </Stepper>
    </Dialog>

</template>

<script lang="ts" setup>
import { format } from 'date-fns'

const route = useRoute()

onMounted(async () =>{  
  buscarListaPlanos()
})

const visible = ref(false);

const activeStep = ref()

const fichasConcluidas = ref()

const fichaSelecionada = ref()

const secoes = ref()
const idFichaEdicao = ref(null)

  const tipoOperacaoSelecionado = ref(null);
  const tipoOperacoes = [
    { nome: 'Reprodução', value: 'Reprodução'}, 
    { nome: 'Utilização', value: 'Utilização'}, 
    { nome: 'Transmissão', value: 'Transmissão'}, 
    { nome: 'Avaliação', value: 'Avaliação'}, 
    { nome: 'Produção', value: 'Produção'}, 
    { nome: 'Recepção', value: 'Recepção'}, 
    { nome: 'Coleta', value: 'Coleta'}, 
    { nome: 'Controle', value: 'Controle'}, 
    { nome: 'Modificação', value: 'Modificação'}, 
    { nome: 'Classificação', value: 'Classificação'}, 
    { nome: 'Transferência', value: 'Transferência'}, 
    { nome: 'Difusão', value: 'Difusão'}, 
    { nome: 'Acesso', value: 'Acesso'}, 
    { nome: 'Comunicação', value: 'Comunicação'}, 
    { nome: 'Arquivamento', value: 'Arquivamento'}, 
    { nome: 'Eliminação', value: 'Eliminação'}, 
    { nome: 'Processamento', value: 'Processamento'}, 
    { nome: 'Extração', value: 'Extração'}, 
    { nome: 'Distribuição', value: 'Distribuição'}, 
    { nome: 'Armazenamneto', value: 'Armazenamneto'}
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
    {nome: 'Contratos e Relação Comercial', value: 'Contratos e Relação Comercial'},
    {nome: 'Cadastro de Prestadores de Serviços e/ou Fornecedores no Sistema da Empresa', value: 'Cadastro de Prestadores de Serviços e/ou Fornecedores no Sistema da Empresa'},
    {nome: 'Oportunidade de Emprego', value: 'Oportunidade de Emprego'},
    {nome: 'Pesquisas comerciais', value: 'Pesquisas comerciais'},
    {nome: 'Análise de Crédito', value: 'Análise de Crédito'},
    {nome: 'Realização de eventos', value: 'Realização de eventos'},
    {nome: 'Outros', value: 'Outros'},
  ]

  const revisaoSelecionado = ref(null)
  const revisao = [
    {nome: 'Revisão feita sobre a demanda do candidato', value: 'Revisão feita sobre a demanda do candidato'},
    {nome: 'Semanalmente', value: 'Semanalmente'},
    {nome: 'Mensalmente', value: 'Mensalmente'},
    {nome: 'Trimestralmente', value: 'Trimestralmente'},
    {nome: 'Semestralmente', value: 'Semestralmente'},
    {nome: 'Anualmente', value: 'Anualmente'},
    {nome: 'N.A.', value: 'N.A.'},
  ]

  const retencaoSelecionado = ref(null)
  const retencao = [
    {nome: 'Mais de 1 ano', value: 'Mais de 1 ano'},
    {nome: 'Entre 1 e 3 meses', value: 'Entre 1 e 3 meses'},
    {nome: 'Até 1 mês', value: 'Até 1 mês'},
    {nome: 'Entre 6 meses e 1 ano', value: 'Entre 6 meses e 1 ano'},
    {nome: 'Entre 3 e 6 meses', value: 'Entre 3 e 6 meses'},
    {nome: 'N.A.', value: 'N.A.'},
  ]

  const segurancaSelecionado = ref(null)

  const armazenamento = ref(null)
  const exclusao = ref(null)

  const compartilhamentoTerceiros = ref(null)

  const transferenciaInternacional = ref(null)

  const areaSelecionada = ref()
  const area = [
    {nome: 'Regulatórios', value: 'Regulatórios'},
    {nome: 'Manufatura', value: 'Manufatura'},
    {nome: 'Financeiro', value: 'Financeiro'},
    {nome: 'Qualidade / P&D', value: 'Qualidade / P&D'},
    {nome: 'Excelência Operacional', value: 'Excelência Operacional'},
    {nome: 'Vendas', value: 'Vendas'},
    {nome: 'Recursos Humanos', value: 'Recursos Humanos'},
    {nome: 'Supply Chain', value: 'Supply Chain'},
    {nome: 'Contabil', value: 'Contabil'},
    {nome: 'Tecnologia da Informação', value: 'Tecnologia da Informação'},
  ]


async function buscarListaPlanos(){

  await useFetch('http://localhost:8000/buscar_planos_concluidos/'+userStore().idUsuario, {
    method: 'GET',
    onResponse({ request, response, options }) {
        if(response.status == 200){
          
          fichasConcluidas.value = response._data
          if(route.query.fichaSelecionada){
            selecionarFicha(route.query.fichaSelecionada)
          }
          console.log(fichasConcluidas.value)
        }
    },
    onResponseError({ request, response, options }) {
      fichasConcluidas.value = []
    }
  })
}

async function selecionarFicha(idFicha:any) {
  for(var ficha of fichasConcluidas.value){
    if(ficha.id == Number(idFicha)){
      console.log("entrou" , ficha)
      fichaSelecionada.value = ficha.id
    }
  }
  buscarSecaoResposta()
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

async function carregarDadosFicha(idFicha:any){
  
    await useFetch('http://localhost:8000/buscar_ficha/'+idFicha, {
    method: 'GET',
    async onResponse({ request, response, options }) {
        if(response.status == 200){
          if(response._data != false){
            
            await preencherCamposComFichaExistente(response._data)
          }
        }
    },
    onResponseError({ request, response, options }) {

    }
  })
  }

  async function preencherCamposComFichaExistente(response:any){
  console.log(response)

    if(response.armazenamento){
      armazenamento.value = response.armazenamento
    }

    if(response.area){
        area.forEach(y => {
          if(response.area == y.nome){
            areaSelecionada.value = y.nome
        }
      });
      // areaSelecionada.value = response.area
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

    if(response.seguranca){
      segurancaSelecionado.value = response.seguranca
    }

    if(response.tipoOperacao){
      var auxOperacoes = []
      for(let i of response.tipoOperacao){
        for(let x of tipoOperacoes){
          if(x.nome == i){
            auxOperacoes.push(x.nome)
          }
        }
      }
      tipoOperacaoSelecionado.value = auxOperacoes
    }

    if(response.dadosColetados){
      var auxDados = []
      for(let i of response.dadosColetados){
        for(let x of dadosColetados){
          if(x.nome == i){
            auxDados.push(x.nome)
          }
        }
      }
      dadosColetadosSelecionado.value = auxDados
    }

    if(response.finalidade){
      var auxFinalidade = []
      for(let i of response.finalidade){
        for(let x of finalidade){
          if(x.nome == i){
            auxFinalidade.push(x.nome)
          }
        }
      }
      finalidadeSelecionado.value = auxFinalidade
    }

    if(response.revisao){
      revisaoSelecionado.value = response.revisao
    }

    if(response.retencao){
      retencaoSelecionado.value = response.retencao
    }

    visible.value = true
  }

  function limparTexto(texto: string): string {
    return texto
      .replace(/^```(?:plaintext)?\s*/i, '')
      .replace(/\s*```$/, '')               
      .replace(/[*!@#$%^&()_+=\[\]{};:'"\\|<>\/?`~]/g, '') 
      .replace(/[\r\n]{2,}/g, '\n\n')       
      .trim();                              
  }

function formatarTopicosParaLista(texto: string): string {
  // Separar os tópicos com base no hífen
  const partes = texto.split(/\s*-\s+/);

  // A primeira parte é o parágrafo introdutório
  const introducao = partes.shift()?.trim() || '';

  // Gerar lista formatada
  const listaFormatada = partes.map(parte => `<li>- ${parte.trim()}</li><br/>`).join('\n');

  // Retornar HTML completo
  return `<p>${introducao}</p><br/><ul>${listaFormatada}</ul>`;
}

</script>

<style scoped>

::v-deep(.p-listbox-list) {
  @apply grid gap-4;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  justify-content: start; 
  align-items: start;
  width: 100%; 
}

::v-deep(.p-listbox-item) {
  @apply flex items-center p-2 border rounded cursor-pointer;
  white-space: normal;
  word-break: break-word;
}

::v-deep(.p-listbox-option-selected) {
  background-color: transparent !important;
  color: inherit !important;
}

::v-deep(.p-listbox-option:hover) {
  background-color: white !important;
  color: black !important;
}

::v-deep(.p-focus) {
  background-color: white !important;
  color: inherit !important;
}

::v-deep(.p-disabled){
  background-color: white;
}
</style>