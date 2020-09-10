<template>
    <div>

        <div v-if="message">
        <div v-for ="index in message.length" :key=index>
        <div style="margin: 5px">
        <el-card class="box-card">
        <div slot="header">
        <span v-if="message" >
            <span width="30%" style="float: left">{{message[index-1].title}} </span>
            <span>发帖人：{{message[index-1].nickname}}
                <span class="bank"></span>
                发帖时间：{{message[index-1].created}} 
            </span>   
        </span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getdetails(index-1)">查看详情</el-button>
        </div>
        <div v-if="message" class="text item" v-html="message[index-1].content">
        </div>
        </el-card>
        </div>
        </div>
        </div>

        
    </div>
</template>

<script>
import api from "../api"

export default {
    name:"List",
    data(){
        return{
            message:[],
            textarea1: '',
            textarea2: ''
        }
    },
    mounted(){
        let star_string=localStorage.getItem("history")
        let star_array=JSON.parse(star_string)
        if(star_array==null)
        {
            this.$message('没有浏览记录！')
            this.$router.push('/')
        }
        else
        {
            for(let i=0;i<star_array.length;i++)
            { console.log(star_array[i])

                api.getDetails(star_array[i]).then(res =>{
                if(res.status==200)
                {
                   let data={
                       "id":'',
                       "nickname":'',
                       "title":'',
                       "created":'',
                       "content":''
                   }
                   data.id=res.data.id
                   data.nickname=res.data.nickname
                   data.title=res.data.title
                   data.created=res.data.created
                   data.content=res.data.content
                   this.message.push(data)
                }
            })
            }
        }
        
    },
    methods:{
        
        getdetails(num){
            const id=this.message[num].id
            this.$router.push('/details/'+String(id))
        }
    }


    

}
</script>
<style>
  .bank{
    padding-left:1.8em
 }
  .text {
    font-size: 14px;
  }

  .item {
    font-size: 13px;
    float: left
  }

  .box-card {
    width: 100%;
  }
</style>