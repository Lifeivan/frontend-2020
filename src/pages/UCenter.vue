<template>
    <div>  
        <div style="margin: 5px"> 
        <el-card >
        <div slot="header">
        <span v-if="info" >
            <span style="float: left;padding: 0px 0px 0px 100px">个人信息</span>
        </span>
        </div>
        <!-- <div v-if="info" style="float: left">
            <div>用户id:{{info.id}}</div><br />
            <div >学号:{{info.username}}</div><br />
            <div >昵称:{{info.nickname}}</div><br />
            <div >创立时间:{{info.created}}</div><br />
        </div> -->
        
        <el-button style="margin: -10px 0px 0px 0px" type="primary" @click="logout()">登出</el-button><br />
        <el-button style="margin: 30px 0px 0px 0px" type="primary" @click="tobeprovider()">申请成为设备提供者</el-button><br />
        <el-button style="margin: 30px 0px 0px 0px" type="primary" @click="history()">浏览记录</el-button>
        </el-card>
        </div>
    </div>
</template>

<script>
import api from "../api"
export default {
    name:"Ucenter",
    data()
    {
        return{
            info:""
        }
    },
    mounted(){
        api.getinfo().then(res =>{
            console.log(res)
            if(res.status==200){
            this.info = res.data
            }
        })
    },
    methods:{
        logout(){
            api.logout().then(res =>{
            console.log(res)
            if(res.status==200){
             this.$message('成功登出')
             this.$router.push('/login')
            }
            })
        
            
        },
        showstar(){
            let star_string=localStorage.getItem("star")
            let star_array=JSON.parse(star_string)
            if(star_array==null)
            {
                this.$message('收藏的帖子数为0！')
                return
            }
            else
            {
                this.$router.push('/star')
            }
        },
        history(){
            let star_string=localStorage.getItem("history")
            let star_array=JSON.parse(star_string)
            if(star_array==null)
            {
                this.$message('没有浏览记录！')
                return
            }
            else
            {
                this.$router.push('/history')
            }
        }
    }
    
}
</script>