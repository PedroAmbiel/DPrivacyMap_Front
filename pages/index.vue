<template>
  <Toast position="top-left" />
  <div class="h-screen w-full flex items-center justify-center bg-cover bg-center relative" >

    <div class="absolute inset-0 bg-red-900 z-0">
      <img
          class=" w-full h-full overflow-y-hidden "
          src="../assets/images/home.png"
          alt="Desk with Calendar"
        />
    </div>
    <form @submit.prevent="validarLogin">
      <div class="relative z-10 w-full max-w-md p-8 rounded-xl bg-white bg-opacity-10 backdrop-blur-md shadow-2xl text-white">
        <h1 class="text-4xl font-bold mb-8 text-center">DPrivacy Map</h1>

        <div class="flex flex-col gap-y-5">
          <!-- Campo e-mail -->
          <span class="p-input-icon-left w-full flex relative">
            <i class="pi pi-envelope text-gray-500 absolute top-[35%] right-3" />
            <InputText v-model="email" placeholder="Digite seu e-mail" class="w-full !bg-white !text-black !p-3 !rounded-2xl hover:!bg-gray-200"  />
          </span>

          <!-- Campo senha -->
            <Password
              v-model="password"
              placeholder="Digite sua senha"
              :feedback="false"
              toggle-mask
              class="w-full"
              inputClass="w-full !p-3 !bg-white !text-black !rounded-2xl hover:!bg-gray-200"
            />


          <!-- Checkbox e link -->
          <div class="flex items-center justify-center text-sm">
            <a href="#" class="text-blue-300 hover:text-blue-500 underline ">Esqueci minha senha</a>
          </div>

          <!-- Botão -->
          <Button label="Avançar" type="submit" icon="pi pi-sign-in" class="w-full !bg-white !rounded-xl h-10 !text-red-900 font-semibold hover:!bg-gray-200" />
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const toast = useToast()
const user = userStore()

const email = ref('')
const password = ref('')


async function validarLogin(){
    if(!email.value || !password.value){
      toast.add({severity: 'warn', summary: "Informe o usuário e senha", life: 3000})
      return false
    }

    var msg = await user.login(email.value, password.value)
  
    if(msg == 'T'){
      useRouter().push('/home')
    }else{
      toast.add({severity: 'warn', summary: msg, life: 3000})
    }
  }
</script>
