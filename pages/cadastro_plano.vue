<template>
  <div class="bg-white relative h-full">
    <Toast />
    <TopNavBar/>
    <div class="place-self-start px-10 my-3">
      <Button class="bg-[#6e2828] border-none text-white hover:!bg-slate-100 shadow-xl hover:!border-none mr-32 w-full font-bold" @click="useRouter().push('home')">Voltar</Button>
    </div>
    <div>
      <div class="text-black">

        <form>
          <Stepper class="p-10" v-model:value="activeStep">
          
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
                <Listbox v-model:model-value="areaSelecionada" :options="area" option-label="nome" option-value="nome" id="area" 
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
              <Listbox v-model:model-value="tipoOperacaoSelecionado" multiple :options="tipoOperacoes" option-label="nome" option-value="nome" 
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
              <Listbox id="dados_coletados" v-model:model-value="dadosColetadosSelecionado" multiple :options="dadosColetados" option-label="nome" 
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

            <!-- <div class="flex flex-col">
              <label for="finalidade" class="text-black">Finalidade</label>
              <Listbox id="finalidade" v-model:model-value="finalidadeSelecionado" multiple :options="finalidade" option-label="nome" option-value="nome" placeholder="Selecione"
              class="w-full md:w-80"/>
            </div> -->
          <!-- </div> -->

          <!-- <div class="flex flex-row justify-between gap-x-10"> -->
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
              <Listbox id="finalidade" v-model:model-value="finalidadeSelecionado" multiple :options="finalidade" option-label="nome" 
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
            <div class="border-none bg-surface-50 mt-10 w-full
              dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
              <Listbox id="revisao" v-model:model-value="revisaoSelecionado" multiple :options="revisao" option-label="nome" 
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
            <div class="border-none bg-surface-50 mt-10 w-full
              dark:bg-surface-950 flex-col flex justify-start items-start font-medium">
              <Listbox id="retencao" v-model:model-value="retencaoSelecionado" multiple :options="retencao" option-label="nome" 
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
              <Button label="Voltar" @click="activateCallback('5');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('7');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

            <!-- <div class="flex flex-col"> -->
              <!-- <label for="seguranca" class="text-black">Segurança</label>
              <MultiSelect id="seguranca" v-model:model-value="segurancaSelecionado" :options="seguranca" option-label="nome" option-value="nome" placeholder="Selecione"
              class="w-full md:w-80"/> -->
              
              <!-- <label for="seguranca" class="text-black">Segurança</label>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Exclusão de E-mails" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Exclusão de E-mails</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Limitação de Acesso" pt:box:class="!bg-yellow-300" />
                <label class="text-black pl-2">Limitação de Acesso</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Limitação de acesso e Exclusão de E-mails" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Limitação de acesso e Exclusão de E-mails</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Outros" pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">Outros</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="N.A." pt:box:class="!bg-yellow-300"/>
                <label class="text-black pl-2">N.A.</label>
              </div>
            </div> -->


          <!-- </div> -->

          <!-- <div class="flex flex-row justify-around p-10"> -->
            
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
              <!-- <label for="seguranca" class="text-black">Segurança</label>
              <MultiSelect id="seguranca" v-model:model-value="segurancaSelecionado" :options="seguranca" option-label="nome" option-value="nome" placeholder="Selecione"
              class="w-full md:w-80"/> -->
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Exclusão de E-mails" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Exclusão de E-mails</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Limitação de Acesso" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Limitação de Acesso</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Limitação de acesso e Exclusão de E-mails" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Limitação de acesso e Exclusão de E-mails</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="Outros" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Outros</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="segurancaSelecionado" inputId="seguranca" name="seguranca" value="N.A." pt:box:class="!bg-white"/>
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
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="Físico" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Físico</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="Digital" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Digital</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="Físico e Digital" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Físico e Digital</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="armazenamento" inputId="armazenamento" name="armazenamento" value="N.A." pt:box:class="!bg-white"/>
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
                <RadioButton v-model="exclusao" inputId="exclusao" name="exclusao" :value="true" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="exclusao" inputId="exclusao" name="exclusao" :value="false" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div>
            <div class="py-6 flex flex-row gap-4">
              <Button label="Voltar" @click="activateCallback('8'); " class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
              <Button label="Próximo" @click="activateCallback('10');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
            </div>
            </StepPanel>
          </StepItem>

            <!-- <div class="flex flex-col">
              <label class="text-slate-800 text-2xl ">COMPARTILHAMENTO À TERCEIROS</label>
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="true" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="false" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div> -->

            <!-- <div class="flex flex-col">
              <label for="transferencia_internacional" class="text-slate-800 text-2xl">TRANSFERÊNCIA INTERNACIONAL</label>
              <div class="flex flex-row">
                <RadioButton v-model="transferenciaInternacional" inputId="transferencia_internacional" name="transferencia_internacional" :value="true" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="transferenciaInternacional" inputId="transferencia_internacional" name="transferencia_internacional" :value="false" pt:box:class="!bg-white" />
                <label class="text-black pl-2">Não</label>
              </div>
            </div> -->

          <!-- </div> -->

          <!-- <div class="flex flex-row justify-around p-10"> -->
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
                <RadioButton v-model="compartilhamentoTerceiros" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="true" pt:box:class="!bg-white"/>
                <label class="text-black pl-2">Sim</label>
              </div>
              <div class="flex flex-row">
                <RadioButton v-model="compartilhamentoTerceiros" inputId="compartilhamento_terceiros" name="compartilhamento_terceiros" :value="false" pt:box:class="!bg-white" />
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
              <RadioButton v-model="transferenciaInternacional" inputId="transferencia_internacional" name="transferencia_internacional" :value="true" pt:box:class="!bg-white"/>
              <label class="text-black pl-2">Sim</label>
            </div>
            <div class="flex flex-row">
              <RadioButton v-model="transferenciaInternacional" inputId="transferencia_internacional" name="transferencia_internacional" :value="false" pt:box:class="!bg-white" />
              <label class="text-black pl-2">Não</label>
            </div>
          </div>
          <div class="py-6">
            <Button label="Voltar" @click="activateCallback('10');" class="bg-white border-black hover:!bg-white hover:!border-black hover:scale-105 transition-all"/>
          </div>
        </StepPanel>
      </StepItem>

          <!-- </div> -->

          <!-- <div class="flex flex-row justify-between">


            <InputText id="area">
            </InputText>

            <InputText id="area">
            </InputText>
          </div> -->
        <!-- </StepPanels> -->
        
      <!-- </div> -->
            <div class="pt-12 flex flex-row gap-x-3">
              <Button value="Salvar" class="bg-[#6e2828] border-none text-white hover:!bg-slate-100 shadow-xl hover:!border-none font-bold" @click="salvarFicha()">
                SALVAR
              </Button>
              <Button value="Salvar e Enviar" class="bg-[#6e2828] border-none text-white hover:!bg-slate-100 shadow-xl hover:!border-none font-bold" @click="finalizarEnviarFicha()">
                SALVAR E ENVIAR
              </Button>
            </div>
          </Stepper>
        </form>
      </div>

    </div>

  </div>
</template>

<script lang="ts" setup>
import { createPersistedState } from 'pinia-plugin-persistedstate'


  const toast = useToast()
  const route = useRoute();
  const activeStep = ref('1')

  onMounted(async () =>{
    if(route.query.idFicha){
      carregarDadosFicha()
    }
  })

  const idFichaEdicao = ref(null)

  const tipoOperacaoSelecionado = ref(null);
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


  function validarPreenchimento(){
    //CHECANDO SE TODOS OS CAMPOS FORAM PREENCHIDOS
    let valido = true
    // console.log(tipoOperacaoSelecionado.value)
    // console.log(areaSelecionada.value)
    // console.log(dadosColetadosSelecionado.value)
    // console.log(finalidadeSelecionado.value)
    // console.log(revisaoSelecionado.value)
    // console.log(retencaoSelecionado.value)
    // console.log(segurancaSelecionado.value)
    // console.log(armazenamento.value)
    // console.log(exclusao.value)
    // console.log(compartilhamentoTerceiros.value)
    // console.log(transferenciaInternacional.value)
    if(tipoOperacaoSelecionado.value == '' || tipoOperacaoSelecionado.value == null){
      // alert("ENTROU 1")
      valido = false
    }

    else if(areaSelecionada.value == '' || areaSelecionada.value == null){
      // alert("ENTROU 2")
      valido = false
    }

    else if(dadosColetadosSelecionado.value == '' || dadosColetadosSelecionado.value == null){
      // alert("ENTROU 3")
      valido = false
    }

    else if(finalidadeSelecionado.value == '' || finalidadeSelecionado.value == null){
      // alert("ENTROU 4")
      valido = false
    }

    else if(revisaoSelecionado.value == '' || revisaoSelecionado.value == null){
      // alert("ENTROU 5")
      valido = false
    }

    else if(retencaoSelecionado.value == '' || retencaoSelecionado.value == null){
      // alert("ENTROU 6")
      valido = false
    }

    else if(segurancaSelecionado.value == '' || segurancaSelecionado.value == null){
      // alert("ENTROU 7")
      valido = false
    }

    else if(armazenamento.value == '' || armazenamento.value == null){
      // alert("ENTROU 8")
      valido = false
    }

    else if(exclusao.value == null){
      // alert("ENTROU 9")
      valido = false
    }

    else if(compartilhamentoTerceiros.value == null){
      // alert("ENTROU 10")
      valido = false
    }

    else if(transferenciaInternacional.value == null){
      // alert("ENTROU 11")
      valido = false
    }

    if(valido == false){
      toast.add({severity: 'error', summary: 'Erro: Preencha todos os campos', life: 3000})
    }

    return valido
  }

  async function finalizarEnviarFicha(){
    if(validarPreenchimento() == false){
      return null
    }else{
      await useFetch('http://localhost:8000/finalizar_ficha', {
        method: 'PUT',
        body:{
          idFicha: idFichaEdicao.value,
          usuario: userStore().idUsuario,
          area: areaSelecionada.value != undefined ? areaSelecionada.value : null,
          tipoOperacao: tipoOperacaoSelecionado.value != undefined ? tipoOperacaoSelecionado.value : null,
          dadosColetados: dadosColetadosSelecionado.value != undefined ? dadosColetadosSelecionado.value : null,
          finalidade: finalidadeSelecionado.value != undefined ? finalidadeSelecionado.value : null,
          revisao: revisaoSelecionado.value != undefined ? revisaoSelecionado.value : null,
          retencao: retencaoSelecionado.value != undefined ? retencaoSelecionado.value : null,
          seguranca: segurancaSelecionado.value != undefined ? segurancaSelecionado.value : null,
          armazenamento: armazenamento.value,
          exclusao: exclusao.value,
          compartilhamentoTerceiros: compartilhamentoTerceiros.value,
          transferenciaInternacional: transferenciaInternacional.value,
        },
  
        onResponse({request, response, options}){
          if(response.status == 200){
            console.log(JSON.parse(response._data).idFicha)
            useFetch('http://localhost:8000/criar_secoes', {
              method: 'POST',
              body:{
                idFicha: JSON.parse(response._data).idFicha,
              }, 
            })

            useRouter().push('/home?sucesso=true')
          }
        },
  
        onResponseError({ request, response, options }) {
          toast.add({severity: 'error', summary: response._data, life: 3000})
        } 
      })
    }

  }

  async function salvarFicha(){
    await useFetch('http://localhost:8000/atualizar_ficha', {
      method: 'PUT',
      body:{
        idFicha: idFichaEdicao.value,
        usuario: userStore().idUsuario,
        area: areaSelecionada.value != undefined ? areaSelecionada.value : null,
        tipoOperacao: tipoOperacaoSelecionado.value != undefined ? tipoOperacaoSelecionado.value : null,
        dadosColetados: dadosColetadosSelecionado.value != undefined ? dadosColetadosSelecionado.value : null,
        finalidade: finalidadeSelecionado.value != undefined ? finalidadeSelecionado.value : null,
        revisao: revisaoSelecionado.value != undefined ? revisaoSelecionado.value : null,
        retencao: retencaoSelecionado.value != undefined ? retencaoSelecionado.value : null,
        seguranca: segurancaSelecionado.value != undefined ? segurancaSelecionado.value : null,
        armazenamento: armazenamento.value,
        exclusao: exclusao.value,
        compartilhamentoTerceiros: compartilhamentoTerceiros.value,
        transferenciaInternacional: transferenciaInternacional.value,
      },

      onResponse({request, response, options}){
        if(response.status == 200){
          toast.add({severity: 'success', summary: response._data, life: 5000})
          useRouter().push("/home?sucesso=true")
        }
      },

      onResponseError({ request, response, options }) {
        toast.add({severity: 'error', summary: response._data, life: 3000})
      } 
    })
  }

  async function carregarDadosFicha(){
    idFichaEdicao.value = route.query.idFicha
    await useFetch('http://localhost:8000/buscar_ficha/'+route.query.idFicha, {
    method: 'GET',
    async onResponse({ request, response, options }) {
        if(response.status == 200){
          if(response._data != false){
            await preencherCamposComFichaExistente(response._data)
          }else{
            useRouter().push('/lista_planos')
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
      var auxRevisao = []
      for(let i of response.revisao){
        for(let x of revisao){
          if(x.nome == i){
            auxRevisao.push(x.nome)
          }
        }
      }
      revisaoSelecionado.value = auxRevisao
    }

    if(response.retencao){
      var auxRetencao = []
      for(let i of response.retencao){
        for(let x of retencao){
          if(x.nome == i){
            auxRetencao.push(x.nome)
          }
        }
      }
      retencaoSelecionado.value = auxRetencao
    }
  }


</script>

<style scoped>

/* Grid layout for 4 columns that auto-fit content width */
::v-deep(.p-listbox-list) {
  @apply grid gap-4;
  grid-template-columns: repeat(3, max-content); /* Each column sizes to fit its content */
  justify-content: start; /* Prevent full-width stretching */
}

/* Individual listbox items */
::v-deep(.p-listbox-item) {
  @apply flex items-center p-2 border rounded cursor-pointer whitespace-nowrap;
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

</style>
