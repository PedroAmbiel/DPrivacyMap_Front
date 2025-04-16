import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'userStore',
  state: () => ({ 
    idUsuario: null,
    nome: null,
    responsavel: null,
    perfil: null,
    email: null,
  }),
  persist:{
    storage: piniaPluginPersistedstate.localStorage(),
    afterHydrate: (ctx) =>{
      ctx.store.$state.lastRefreshedAt = new Date(ctx.store.$state.lastRefreshedAt);
      ctx.store.$state.lastLoginVerify = new Date(ctx.store.$state.lastLoginVerify);
      ctx.store.$state.accessExpireOn = new Date(ctx.store.$state.accessExpireOn);
      ctx.store.$state.refreshExpireOn = new Date(ctx.store.$state.refreshExpireOn);
    }
  },
  actions: {
    async login(email: string, senha : string){
      let msg; 
      await useFetch('http://localhost:8000/login', {
        method: 'POST',
        body: {
          email: email,
          senha: senha
        },
  
        onResponse({request, response, options}){
          console.log(response)
          if(response.status == 200){
            console.log(response._data)
            userStore().idUsuario = response._data.id.toString()
            userStore().nome = response._data.nome
            userStore().responsavel = response._data.responsavel
            userStore().email = response._data.email
            userStore().perfil = response._data.perfil
            msg = "T"
          }
        },
        onResponseError({ request, response, options }) {
          console.log(response)
          msg = response._data.detail.toString()
        },
      })

      return msg;
  },

  isAutenticado(){
    if(this.idUsuario){
      return true
    }else{
      return false
    }
  },

  // possuiEmpresaCadastrada(){
  //   var router = useRouter()

  //   useFetch('http://localhost:8080/api/prestador/buscarempresa', {
  //     method: 'GET',
  //     query: { idPrestador: this.idPrestador },
      
  //     onResponse({options, request, response, error}){
  //       if(response.status == 200){
  //         router.push('/painel')
  //         userStore().empresaCadastrada = true
  //       }
  //     },
  //     onResponseError({ request, options, error, response }) {
  //         if(response.status == 404){
  //           router.push('/cadastro-empresa')
  //         }
  //     }
  //   })
  // },

  limparUserStore(){
    this.$reset()
  },

}})
