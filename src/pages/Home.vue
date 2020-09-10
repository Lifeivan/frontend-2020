<template>
    <div>
        <!-- <div style="margin: 5px">
        <el-card class="box-card">
        <div slot="header">
        <span v-if="message" >
            <span width="30%" style="float: left">{{message.data.posts[0].title}} </span>
            <span>发帖人：{{message.data.posts[0].nickname}}
                <span class="bank"></span>
                发帖时间：{{message.data.posts[0].created}} 
            </span>   
        </span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getdetails(0)">查看详情</el-button>
        </div>
        <div v-if="message" class="text item" v-html="message.data.posts[0].content">
        </div>
        </el-card>
        </div> -->
    
        <div v-if="message.data">
        <div v-for ="index in (0,10)" :key=index>
        <div style="margin: 5px">
        <el-card class="box-card">
        <div slot="header">
        <span v-if="message" >
            <span v-if="message.data.posts[index-1].title" width="30%" style="float: left">{{message.data.posts[index-1].title}} </span>
            <span>发帖人：{{message.data.posts[index-1].nickname}}
                <span class="bank"></span>
                发帖时间：{{message.data.posts[index-1].created}} 
            </span>   
        </span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="getdetails(index-1)">查看详情</el-button>
        </div>
        <div v-if="message" class="text item" v-html="message.data.posts[index-1].content">
        </div>
        </el-card>
        </div>
        </div>
        </div>


        <el-button type="primary" icon="el-icon-edit" style="float: left;margin: 20px 0 20px 0" @click="send()">发帖</el-button>
        <el-input type="textarea" autosize placeholder="请输入标题"  v-model="textarea1"> </el-input>
        <div style="margin: 20px 0"></div>
        <el-input style="max-height:100px" type="textarea" :autosize="{ minRows: 2 , maxRows:10}"  placeholder="请输入内容"  v-model="textarea2"></el-input>

        <el-button round style="float: left; margin: 50px 0" type="text" @click="prepage()">上一页</el-button>
        <el-button round style="float: right; margin: 50px 0" type="text" @click="nextpage()">下一页</el-button>
    </div>
</template>

<script>
import api from "../api"
import params from "../api/global_variable"
export default {
    name:"Home",
    data(){
        return{
            message:'',
            textarea1: '',
            textarea2: ''
        }
    },
    mounted(){
        api.getData(params).then(res =>{
            this.message = res
            console.log(res)
            //对插入图片的文本进行处理
            if(this.message.data.posts)
            {
            // console.log("aa")
            // console.log(this.message.data.posts)
            for(let i=0;i<this.message.data.posts.length;i++)
            {
            // console.log(this.message.data.posts[i].content)
            // var x=this.message.data.posts[i].content
            this.message.data.posts[i].content=api.changeimg(this.message.data.posts[i].content)
            // if(i==7){
            // console.log(x)
            // console.log(this.message.data.posts[i].content)}
            // console.log(this.message.data.posts[i].content)
            // }
            }}
        })
        
        
    },
    methods:{
        prepage(){
            if(params.params.page==1)
            {
                this.$message('没有前一页！')
                return
            }
            params.params.page=params.params.page-1
            api.getData(params).then(res =>{
            this.message = res
            //对插入图片的文本进行处理
            if(this.message.data.posts)
            {
            // console.log("aa")
            // console.log(this.message.data.posts)
            for(let i=0;i<this.message.data.posts.length;i++)
            {
            // console.log(this.message.data.posts[i].content)
            this.message.data.posts[i].content=api.changeimg(this.message.data.posts[i].content)
            // console.log(this.message.data.posts[i].content)
            }
            }
            })
        },
        nextpage(){
            params.params.page=params.params.page+1
            api.getData(params).then(res =>{
            this.message = res
            //对插入图片的文本进行处理
            if(this.message.data.posts)
            {
            // console.log("aa")
            // console.log(this.message.data.posts)
            for(let i=0;i<this.message.data.posts.length;i++)
            {
            // console.log(this.message.data.posts[i].content)
            // var x=this.message.data.posts[i].content
            this.message.data.posts[i].content=api.changeimg(this.message.data.posts[i].content)
            // if(this.message.data.posts[i].content!=x){
            //     console.log(i)
            // console.log(this.message.data.posts[i].content)}
             }
            }
            })
        },
        send(){
            if(this.textarea1==""||this.textarea2=="")
            {
                this.$message('内容不能为空！')
                return
            }
            api.sendPost(
                {
                    "title":this.textarea1,
                    "content":this.textarea2
                }
            ).then(res =>{
            console.log(res)
            if(res.status==200)
            {
               this.$message('发帖成功！')
            }
            })
        },
        getdetails(num){
            const id=this.message.data.posts[num].id
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