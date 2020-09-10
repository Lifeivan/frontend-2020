export default {
    namespaced:true,
    state:{
        token:""
    },
    mutations:{
        setToken(state,value){
            state.token = value
        },
        clearToken(state){
            state.token = ""
        }
    }
}