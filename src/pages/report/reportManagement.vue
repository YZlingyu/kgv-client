<template>
<el-container style="height:100%;">
  <el-header>
    <admin-header></admin-header>
  </el-header>
  <el-container style="height:100%">
    <el-aside width="200px" height="100%">
       <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="height: 100%">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>数据图表</span>
          </template>
          <el-menu-item-group>
            <router-link to="../data/createKnowledgeGraph">
              <el-menu-item index="1-1">数据导入</el-menu-item>
            </router-link>
            <router-link to="../data/editKnowledgegraph">
              <el-menu-item index="1-2">编辑数据</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>行业报告</span>
          </template>
          <el-menu-item-group>
            <router-link to="../report/createReportGraph">
              <el-menu-item index="2-1">生成图表</el-menu-item>
            </router-link>
            <router-link to="../report/createReport">
              <el-menu-item index="2-2">生成报告</el-menu-item>
            </router-link>
            <router-link to="../report/reportManagement">
              <el-menu-item index="2-3">报告管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>行业报告</el-breadcrumb-item>
        <el-breadcrumb-item>报告管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="blank">
        <el-table
          :data="tableData"
          border>
          <el-table-column
            fixed
            prop="name"
            label="创建时间"
            width="280">
          </el-table-column>
          <el-table-column
            prop="date"
            label="报告名称"
            width="280">
          </el-table-column>
          <el-table-column
            prop="region"
            label="报告领域"
            width="280">
          </el-table-column>
          <el-table-column
            label="操作"
            width="280">
            <template slot-scope="scope">
              <el-button @click="checkReport(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
        show: 1,
        activeName: 'first',
        tableData: []
      }
    },
    computed:{
    },
    watch: {
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      checkReport(row) {
        console.log(row);
        this.$router.push({path: "./reportDetail?id="+row.id}) 
      }
    },
    created(){//初始化标签位置
       axios.get(common.url2+"getAllReport",{
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          if(res){
            var res = res.data.data;
            console.log(res);
            for(var i=0; i<res.length; i++){
              this.tableData.push({
                "name": res[i].reportName,
                "date": res[i].createTime,
                "region": res[i].tech,
                "id": i
              })
            }
          }
          else{
            console.log(err);
          }
        })
    },
    mounted(){
      this.entity = this.$route.query.entity;
      
    },
    components:{
      adminHeader
    }
  }
</script>

<style scoped lang="less">
 a {
    text-decoration: none;
    color: #999999;
  }
  /* 布局 */
  .el-container {
    .el-header {
     background-color: #545c64;
     color: #333;
     text-align: center;
   }
   
   .el-aside {
     background-color: #D3DCE6;
     color: #333;
     text-align: center;
     height: 100%;
   }
   
   .el-main {
     background-color: #E9EEF3;
     color: #333;
     text-align: left;
     .blank {
       width: 95%;
       margin: 10px auto;
       height: 100%;
       border-radius: 15px;
       padding: 30px;
       box-sizing: border-box;
       background-color: #fff;
       text-align: left;
       .el-table__header {
         width: 100% !important;
       }
     }
   }
  }
</style>
