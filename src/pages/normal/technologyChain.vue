<template>
<el-container style="height:100%;">
  <el-header>
    <admin-header></admin-header>
  </el-header>
  <el-container style="height:100%">
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>技术链</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row>
        <div class="technologyGraph">
          <h1 class="title">技术链图谱</h1>
          <div id="main"></div>
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
        enterpriseList: [],
        technologyList: [],
        newsList: []
      }
    },
    methods: {
    },
    mounted(){
      // this.getEnterprise();
      // this.getNews();
      let echarts = require('echarts/lib/echarts');
      let myChart = echarts.init(document.getElementById('main'));
      myChart.showLoading();
      axios.get(common.url1+"findTechnologyChain",{
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          console.log(res)
          var data = res.data.data;
            myChart.hideLoading();

        var option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',

                    data: [data],

                    top: '18%',
                    bottom: '14%',

                    layout: 'radial',

                    symbol: 'emptyCircle',

                    symbolSize: 7,

                    initialTreeDepth: 1,

                    animationDurationUpdate: 750

                }
            ]
        }
        myChart.setOption(option);
      })
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
  /* ---graph--- */
  .technologyGraph {
    width: 98%;
    height: 900px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 20px;
    padding-top: 10px;
  }
  #main {
    width: 900px;
    height: 900px;
    text-align:center;
    margin: 0 auto;
  }
  /* ---list--- */
  .list {
    width: 100%;
    height: 900px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 20px;
    padding: 10px 20px;
    text-align: left;
  }
  .com-name{
    color: dodgerblue;
  }
  .tag1 {
    background-color: #eeeeee;
    border-radius: 5px;
    margin-right: 5px;
    color:#999999;
    padding: 5px;
  }
  .news-date {
    color: #999999;
  }
</style>
