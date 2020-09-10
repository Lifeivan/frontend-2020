<template>
    <div>
        
        <div style="margin: 5px">
        <el-card class="box-card">
        <div slot="header">
        <span v-if="showtitle" >
            <span style="float: left">{{details.data.title}} </span>
            <span>发帖人：{{details.data.nickname}}
            <span class="bank"></span>
            发布时间：{{details.data.created}} 
            </span>   
            <el-button style=" margin:0px 0px 10px 30px " type="primary" @click="star()">收藏本帖</el-button>
            <el-button style=" margin:0px 0px 10px 30px " type="primary" @click="onlysee()">只看楼主</el-button>
        </span>
        
        </div>
        <div v-if="details" class="text item" v-html="details.data.content">
        </div>
        </el-card>
        </div>
        

        <div v-for ="index in showreply.length" :key=index>
        <div style="margin: 5px">
        <el-card class="box-card">
        <div slot="header">
        <span >
            <span class="bank"></span>
            <span style="float: left">回复人：{{details.data.reply[index-1].nickname}}
            <span class="bank"></span>
            回复时间：{{details.data.reply[index-1].created}} 
            </span>   
        </span>
        </div>
        <div v-if="details" class="text item" v-html="details.data.reply[index-1].content">
        </div>
        </el-card>
        </div>
        </div>
        


        <el-button type="primary" icon="el-icon-edit" style="float: left;margin: 20px 0 20px 0" @click="edit()">编辑帖子</el-button>
        <el-button type="primary" icon="el-icon-edit" style="float: left;margin: 20px 0 20px 20px" @click="answer()">回复主楼</el-button>
        <el-input type="textarea" autosize placeholder="请输入标题,回帖不用输入"  v-model="textarea1"> </el-input>
        <div style="margin: 20px 0;"></div>
        <el-input type="textarea" :autosize="{ minRows: 2 }"  placeholder="请输入内容"  v-model="textarea2"></el-input>

    </div>
</template>
<script>

import api from "../api"
import mydata from "../api/global_variable"
export default {
    name:"Details",
    data(){
        return{
            details:'',
            textarea1:'',
            textarea2:'',
            showtitle:'',
            showreply:[],
            page:"0"
        }
    },
    mounted(){
        api.getDetails(this.$route.params.id).then(res =>{
            if(res.status==200)
            {
               this.details=res
               if(this.details.data.title){this.showtitle=true}
               for(let i=0;i<this.details.data.reply.length;i++)
               {
                   this.showreply[i]=true
               }
            }
                console.log(this.showreply)
            })
        
        api.getinfo().then(res =>{
                    if(res.status==200)
                    {
                        // console.log(res)
                        mydata.mydata.id=res.data.id
                    }
            })
        //浏览记录记录
            let star_string=localStorage.getItem("history")
            //console.log(star_string)
            let star_array=JSON.parse(star_string)
            //console.log(star_array)
            if(star_array==null)star_array=new Array
            //收藏添加本页id
            star_array.push(this.$route.params.id)
            localStorage.setItem('history',JSON.stringify(star_array));

    
    },
    methods:{
        edit()
        {
            const id=mydata.mydata.id            
            if(id!= this.details.data.userId)
            {
                this.$message('不是发帖人，不能编辑本帖！')
                return
            }
            else if(this.textarea1==""||this.textarea2=="")
            {
                this.$message('编辑内容不能为空！')
                return
            }
            {
                api.editPost(this.$route.params.id,
                {
                     "title":this.textarea1,
                    "content":this.textarea2
                })
                .then(res =>{
                    if(res.status==200)
                    {
                      this.$message('编辑成功！请刷新页面查看')
                    }
                })
            }
        },
        answer()
        {
            if(this.textarea2=="")
            {
                this.$message('回复内容不能为空！')
                return
            }
            api.answer(this.$route.params.id,
                {
                    "content": this.textarea2,
                    // "replyId": 1
                })
                .then(res =>{
                    if(res.status==200)
                    {
                      this.$message('回复成功！请刷新页面查看')
                    }
                })
        },
        star(){
            let star_string=localStorage.getItem("star")
            //console.log(star_string)
            let star_array=JSON.parse(star_string)
            //console.log(star_array)
            if(star_array==null)star_array=new Array
            //收藏添加本页id
            star_array.push(this.$route.params.id)
            localStorage.setItem('star',JSON.stringify(star_array));
            //console.log(star_array)
            this.$message('收藏成功')
        },
        onlysee()
        {
            let id=this.details.data.userId
            let owner=new Array
            for(let i=0;i<this.details.data.reply.length;i++)
            {
               if(this.details.data.reply[i].userId==id)
               {
                   owner.push(this.details.data.reply[i])
               }
            }
            this.details.data.reply=owner
            //更新this.showreply
            this.showreply=new Array
            for(let i=0;i<this.details.data.reply.length;i++)
            {
                this.showreply[i]=true
            }
            this.$message('实现只看楼主')
        }
    }
}
</script>