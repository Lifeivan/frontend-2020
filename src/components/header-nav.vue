<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#339999"
            
        >
            <el-menu-item index="1">
            <router-link to="/" tag="li">首页</router-link>
            </el-menu-item>
            <el-menu-item index="2">
                <router-link to="/ucenter" tag="li">个人中心</router-link>
            </el-menu-item>
            <!-- <el-menu-item index="3">
                <router-link to="/login" tag="li">登录</router-link>
            </el-menu-item> -->
             <el-menu-item index="4">
                <router-link to="/provider" tag="li">设备管理（仅设备提供者可用）</router-link>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default {
    name: "HeaderNav",
    data() {
        return {
            activeIndex: "1"
        };
    },
    methods: {
        
    }
};
</script>