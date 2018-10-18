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
            <router-link to="../report/createReportGraph">
              <el-menu-item index="2-2">生成报告</el-menu-item>
            </router-link>
            <router-link to="../report/reportManagement">
              <el-menu-item index="2-3">报告管理</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="1" @click="show=1">
          <i class="el-icon-setting"></i>
          <span slot="title">关系图谱</span>
        </el-menu-item>
        <el-menu-item index="2" @click="show=2">
          <i class="el-icon-menu"></i>
          <span slot="title">相关分析</span>
        </el-menu-item>
        <el-menu-item index="3" @click="show=3">
          <i class="el-icon-setting"></i>
          <span slot="title">新闻视角</span>
        </el-menu-item>
        <router-link to="./technologyChain">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">查看技术链</span>
          </el-menu-item>
        </router-link> -->
      </el-menu>
    </el-aside>
    <el-main>
       <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>知识图谱</el-breadcrumb-item>
        <el-breadcrumb-item>生成知识图谱</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="admin-background">
        <div class="admin-row">
          <span class="admin-label">图谱名称</span><br/>
          <el-input v-model="graphName" placeholder="请输入图谱名称" class="admin-input"></el-input><br/>
          <span class="admin-label">图谱说明</span><br/>
          <el-input v-model="graphDes" placeholder="请输入图谱说明" class="admin-input"></el-input><br/>
          <span class="admin-label">图谱节点（最多可输入三级节点）</span>
          <div class="node" v-for="(v,i) in list1[0].node1" :key="v.index">
            <el-input v-model="list1[0].node1[i].value" placeholder="请输入节点名称" class="admin-input"></el-input>
            <i class="el-icon-circle-plus" @click="addRow2(i)"></i>
            <i class="el-icon-delete" @click="deleteRow1(i)"></i>
            <div v-for="(v,j) in list1[0].node1[i].node2" :key="v.index">
              <el-input v-model="list1[0].node1[i].node2[j].value" placeholder="请输入节点名称" class="admin-input admin-input2"></el-input>
              <i class="el-icon-circle-plus" @click="addRow3(i,j)"></i>
              <i class="el-icon-delete" @click="deleteRow2(i,j)"></i>
              <el-row style="text-align: center;">
                <i class="el-icon-circle-plus add" @click="addRow4(i,$event)"></i>
              </el-row>
              <!-- <div v-for="(v,k) in list1[0].node2[i].node3[j].node4" :key="v.index">
                <el-input v-model="list1[0].node2[i].node3[j].node4[k].value" placeholder="请输入节点名称" class="admin-input admin-input3"></el-input>
                <i class="el-icon-circle-plus" @click="addRow3(i,j)"></i>
                <i class="el-icon-delete" @click="deleteRow3(i,j,k)"></i>
              </div> -->
            </div>
          </div>
          <el-row style="text-align: center;">
            <i class="el-icon-circle-plus add" @click="addRow1()"></i>
          </el-row>
        </div>
        <el-row style="width: 100%; text-align: center;">
          <el-button size="small" type="primary" class="save" @click="save1">保存</el-button>
        </el-row>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import * as common from '../../common/common.js'
  let qs = require("qs");
  export default {
    data() {
      return {
        show: 1,
        activeName: 'first',
        graphName: "",
        graphDes: "",
        graphNode: "",
        list1: [{ 
          value: "", 
          node1: [
              {value: "", node2:[]}
            ] 
          }],
        props1: [
          {
            name: "人工智能",
            children: [
              {
                name: "人工智能技术",
                children: [{ name: "人脸识别", children: [] }]
              }
            ]
          }
        ],
        props2: {},
        list2: [],
        list3:[],
        companyList: [],
        fileList: [],
        count: 1,
        thidTech: []
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
      addRow1() {
        this.list1[0].node1.push({ value: "", node2: [] });
        // this.props1.push({"id":1,"label":"", "children": []});
      },
      deleteRow1(i) {
        this.list1[0].node1.splice(i, 1);
        // this.props1.splice(i,1);
      },
      addRow2(i) {
        this.list1[0].node1[i].node2.push({ value: "", node3: [] });
        // console.log($el)
        // this.props1[i].children.push({"id":1,"label":"", "children":[]});
      },
      addRow4(i,e) {
        // console.log(e.target);
        // e.target.style.display = "none";
        this.list1[0].node1[i].node2.push({ value: "", node3: [] });
        // this.props1[i].children.push({"id":1,"label":"", "children":[]});
      },
      deleteRow2(i,j) {
        this.list1[0].node1[i].node2.splice(j, 1);
        // this.props1[i].children.splice(i,1);
      },
      // addRow3(i, j) {
      //   this.list1[0].node_1[i].node_2[j].node_3.push({ value: "", node_4: [] });
      //   // this.props1[i].children[j].children.push({"id":1,"label":"", "children":[]});
      // },
      // deleteRow3(i,j,k) {
      //   this.list1[0].node_1[i].node_2[j].node_3.splice(k, 1);
      //   // this.props1[i].children[j].children.splice(j,1);
      // },
      save1() {
        this.list1[0].value = this.graphName;
        console.log(JSON.stringify(this.list1))
        // this.list2.value = this.graphName;
        // this.list2.node1 = this.list1;
        // this.list2.push({ 
        //   value: this.graphName, 
        //   node1: this.list1
        //   })
        // this.props2.label = this.graphName;
        // this.props2.children = this.props1;
        this.show = 2;
        var datatosend = qs.stringify({
              groupName: this.graphName,
              groupExplain: this.graphDes,
              groupNode:JSON.stringify(this.list1)
            })
            console.log(datatosend)
         axios
          .post(common.url2+"saveKnowledgeGroup",datatosend)
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error);
          });
          this.$router.push({path: "./editKNowledgegraph"}) 
        // this.list3.node.push(this.list1);
        // console.log(JSON.stringify(this.list3));
        // this.drawTree("newGraph1", this.list2);
      },
      
    },
    created(){//初始化标签位置
      
    },
    mounted(){
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
     text-align: center;
     .admin-background {
        background-color: #ffffff;
        border-radius: 5px;
        width: 95%;
        height: 700px;
        margin-top: 20px;
        padding: 20px;
        overflow-y: scroll;
        .admin-row {
          width: 80%;
          margin: 0 auto;
          text-align: left;
          .admin-label {
            height: 60px;
            line-height: 30px;
            vertical-align: middle;
            margin-right: 20px;
            
          }
        }
        .admin-input, .el-input {
          display: inline-block;
          width: 80%;
          margin-bottom: 10px;
        }
        .admin-input2 {
          margin-left: 20px;
        }
        .admin-input3 {
          margin-left: 40px;
        }
      }
      .admin-input, .el-input {
        display: inline-block;
        width: 80%;
        margin-bottom: 10px;
      }
      .add {
        margin: 10px auto;
      }
      .save {
        margin-top: 100px;
      }
      /* graph1 */
      #newGraph1 {
        width: 500px;
        height: 500px;
      }
      .upload-file-wrapper {
        width: 95%;
        height: 500px;
      }
      .admin-graph-background {
        background-color: #ffffff;
        border-radius: 5px;
        padding: 10px;
        box-sizing: border-box;
        margin-top: 10px;
      }
      .title1 {
        font-size: 18px;
      }
      /* company */
      .companyList {
        border-bottom: 1px dashed #ccc;
        padding: 10px;
        box-sizing: border-box;
      }
      .company {
        line-height: 40px;
        height: 40px;
        color: #999999;
      }
      .el-tree {
        display: inline-block;
      }
    }
  }
</style>
