<template>
<el-container style="height:100%;">
  <el-header>
    <admin-header></admin-header>
  </el-header>
  <el-container style="height:100%">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '../' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>登录</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row style="margin-top: 50px;">
        <div class="login">
          <h1 class=title>登录</h1>
          <span class="login-label">用户名</span>
          <!-- <div>{{$store.state.username}}</div> -->
          <el-input v-model=username placeholder="请输入用户名" class="login-input"></el-input><br>
          <span class="login-label">密码</span>
          <el-input v-model=password placeholder="请输入密码" class="login-input" type="password"></el-input><br/>
          <el-button type="primary" class="login-btn" @click="login(username, password)">登录</el-button>
          <el-button class="login-btn">取消</el-button>
        </div>
      </el-row>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import * as common from '../../common/common.js'
  export default {
    data() {
      return {
        username: "",
        password: ""
      }
    },
    methods: {
      login(username, password){
        axios.get(common.url3+"getUser",{
          params:{
              userName: username,
              password: password
            },
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          console.log(res);
          sessionStorage.sessionId = res.data.data;
          console.log(sessionStorage);
          if(res.status == 200){
            this.$router.push({path: "../data/createKnowledgeGraph"}) 
          }else{
            alert("用户名或密码输入错误！");
          }
        })
      }
    },
    mounted(){
        console.log(common)
    },
    computed: {
     
    },
    components:{
      adminHeader
    }
  }
</script>

<style>
  a {
    text-decoration: none;
    color: #999999;
  }
  /* 布局 */
   .el-header {
    background-color: #545c64;
    color: #333;
    text-align: center;
  }
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  /* login */
  .login {
    width: 50%;
    height: 300px;
    padding: 20px;
    margin-top: 50px;
    margin: 20px auto;
    background-color: #ffffff;
  }
  .login-label, .login-input {
    margin-top: 10px;
  }
  .login-input {
    width: 80%;
  }
  .login-label {
    display: inline-block;
    width: 100px;
    text-align: left;
  }
  .login-btn {
    margin-top: 20px;
  }
</style>
