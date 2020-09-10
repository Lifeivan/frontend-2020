import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "../pages/Layout.vue"
import Home from '../pages/Home.vue'
import Login from "../pages/Login.vue"
import UCenter from "../pages/UCenter.vue"
import Details from "../pages/Details.vue"
import Star from "../pages/Star.vue"
import List from "../pages/List.vue"
import Page400 from "../pages/errorPage/400.vue"
import Page401 from "../pages/errorPage/401.vue"
import Page404 from "../pages/errorPage/404.vue"
import Provider from "../pages/provider/ProviderHome.vue"
import store from "../store"

Vue.use(VueRouter)

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "",
    name: "Layout",
    redirect: {
      name: "Home"
    },
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            isLogin: true
        }
      },
      {
        path: '/star',
        name: 'Star',
        component: Star,
        meta: {
            isLogin: true
        }
      },
      {
        path: '/history',
        name: 'List',
        component: List,
        meta: {
            isLogin: true
        }
      },
      {
        path: "/ucenter",
        name: "UCenter",
        component: UCenter,
        meta: {
          isLogin: true
        }
      },
      {
        path: '/details/:id',
        name: 'Details',
        component: Details,
        meta: {
            isLogin: true
        }
      },
      {
        path: '/provider',
        name: 'Provider',
        component: Provider,
        meta: {
            isLogin: true
        }
      },
      
      
    ]
  },
  {
    path: '/401',
    name: 'page401',
    component: Page401,
  },
  {
    path: '/404',
    name: 'page404',
    component: Page404,
  },
  {
    path: '/400',
    name: 'page400',
    component: Page400,
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) {
    // 是否登陆
    // 判断vuex中是否存储有token
    const token = store.state.LoginModule.token
    if (token) {
      if (to.path === "/login") {
        // 如果访问的是login页面，则回到首页
        console.log("to info");
        next({
          path: ""
        });
      } else {
        // 如果访问的不是login页面，则继续访问当前要访问的页面
        next();
      }
    } 
    else {                      //返回登陆页面
      if (to.name === "Login")
        next();
      else {
        next({
          path: "/login"
        });
      }
    }
  } 
  else {
    next();
  }
})

export default router
