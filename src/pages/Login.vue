<template>
    <div class="login">
        <h1 class="title">设备租赁智能管理平台</h1>
        <div style="margin-top: 50px"></div>
        <el-row>
            <el-col :span="10" :offset= "3"><el-button class="Menu" @click="changeType('login')">登陆</el-button></el-col>
            <el-col :span="11"><el-button class="Menu" @click="changeType('register')" style="margin-left = 20px">注册</el-button></el-col>
        </el-row>
        <el-form
            :model="ruleForm"
            status-icon
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            style="margin-top = 50px"
        >
            <el-form-item label="用户名" prop="username" >
                <el-input type="username" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" v-show="type === 'register'">
                <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">{{typeName[type]}}</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

import api from "../api"
import { mapMutations } from "vuex"

export default {
    name: "Login",
    data() {
        return {
            ruleForm: {
                username: "",
                password: "",
                email:""
            },
            type:"login",
            typeName:{
                "login":"登陆",
                "register":"注册"
            }


        };
    },
    methods: {
        ...mapMutations("LoginModule",["setToken"]),
        submitForm(formName) {
            if(this.type==="login"){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        api.getLogin({
                            username:this.ruleForm.username,
                            password:this.ruleForm.password
                        })
                        .then(res =>{
                            console.log("ok")
                            if(res.status===200){
                            //将jwt存到本地
                            localStorage.setItem("token",res.data.jwt);
                            //this.$router.replace("/");
                            //将jwt存到vuex中
                            this.setToken(res.data.jwt);
                            // //将用户id存下
                            // mydata.mydata.id=res.data.userId
                            }
                        })
                        .catch(error => {
                            console.log("fail")
                            if (error.response) {
                                //返回错误code
                                this.$message({
                                    showClose: true,
                                    message: error.response.data.message,
                                    type: "error"
                                });
                            }
                        })
                    }
                    else {
                        console.log("error submit!!");
                        return false;
                    }
                })
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        changeType(type) {
            this.type = type
        }
    }
};
</script>
<style scoped>
.title{
    text-align: center;
}

.login{
    width:800px;
    margin: 0 auto;
    margin-top: 80px;
}
.Menu{
    width: 350px;
}

</style>