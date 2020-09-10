import axios from "../utils/request"


const api = {
    /**
     * 登陆
     */
    getRegister(params){
        console.log(params);
        return axios.patch("/api/v1/register",params);
    },

    getLogin(params){
        console.log(params);
        return axios.patch("/api/v1/login",params);
    },
    /**
     * 帖子列表
     */
    getData(params){
        return axios.get("/api/v1/post",params)
    },

    sendPost(params){
        return axios.post("/api/v1/post",params)
    },

    getinfo(){
        return axios.get("/api/v1/user")
    },

    logout(){
        return axios.patch("/api/v1/logout")
    },

    getDetails(id){
        return axios.get("/api/v1/post/"+String(id))
    },

    editPost(id,params)
    {
        return axios.put("/api/v1/post/"+String(id),params)
    },

    answer(id,params)
    {
        return axios.post("/api/v1/post/"+String(id)+'/reply',params)
    },


    changeimg(str)
    {
    //1，匹配出图片img标签（即匹配出所有图片），过滤其他不需要的字符
    //2.从匹配出来的结果（img标签中）循环匹配出图片地址（即src属性）
    //匹配图片（g表示匹配所有结果,i表示区分大小写）
    var imgReg =/<img.*?(?:>|\/>)/gi;
    //匹配src属性
    var srcReg =/src=['"]?([^'"]*)['"]?/i;
    var arr = str.match(imgReg)
    if(arr==null||arr=="")return str
    //更新str
    for (var i = 0; i < arr.length; i++) {
    var src = arr[i].match(srcReg);
    var newsrc="<img "+src[i]+"  width=100  height=100 >"
    str=str.replace(arr[i],newsrc)
    }
    return str
    }
}

export default api;