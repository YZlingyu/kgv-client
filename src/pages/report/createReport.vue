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
        <el-breadcrumb-item>生成报告</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- <el-row class="chooseRow">
        
      </el-row> -->
      <el-row class="blank">
        <h1>请选择行业，生成报告</h1>
        <el-select v-model="industryValue" placeholder="请选择">
          <el-option
            v-for="item in industries"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <div class="report-graph" id="">
          <h1>请输入报告名称</h1>
          <el-input v-model="reportName" placeholder="请输入内容"></el-input>
          <h1>请选择报告所需图表</h1>
          <el-row>
            <div class="chart" data-index="1" @click="toggle($event)">
            <div class="mask">
              <div class="check">
                <i class="el-icon-success"></i>
              </div>
            </div>
          </div>
          </el-row>
          <el-row>
            <el-button class="btn-save" type="primary" round>提交</el-button>
          </el-row>

        </div>
      </el-row>
      <el-row class="blank">
        <div class="report">
          <h1>人工智能2018年工业报告v1.0</h1>
          <el-row>
            <div class="report-chart">

            </div>
          </el-row>
        </div>
      </el-row>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import $ from 'jquery';
  import * as common from '../../common/common.js'
  export default {
    data() {
      return {
        show: 1,
        activeName: 'first',
        industries: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        industryValue: '',
        reportName: ''
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
      drawTree(data){
        var echarts = require('echarts/lib/echarts');
        var myChart = echarts.init(document.getElementById('main'));
        myChart.showLoading();
        myChart.hideLoading();

          var option = {
              tooltip: {
                  trigger: 'item',
                  triggerOn: 'mousemove'
              },
              series: [
                  {
                      type: 'tree',
                      legend: {
                        width: 700,
                        height: 300,
                        orient: 'horizontal'
                      },
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
      },
      drawRadar(){
        var echarts = require('echarts/lib/echarts');
        var radarChart = echarts.init(document.getElementById('radar'));
        var option = {
              radar: {
                  // shape: 'circle',
                  name: {
                      textStyle: {
                          color: '#fff',
                          backgroundColor: '#999',
                          borderRadius: 3,
                          padding: [3, 5]
                    }
                  },
                  indicator: [
                    { name: '社交智能', max: 100},
                    { name: '知识表示', max: 100},
                    { name: '随机优化', max: 100},
                    { name: '遗传算法', max: 100},
                    { name: '计算机性能分析', max: 100},
                    { name: '吞吐量', max: 100}
                  ]
              },
              series: [{
                  type: 'radar',
                  // areaStyle: {normal: {}},
                  data : [
                      {
                          value : [40, 55, 33, 17, 5, 8],
                          name : '企业'
                      }
                  ]
              }]
          };

        radarChart.setOption(option);
      },
      drawBar(){
        var echarts = require('echarts/lib/echarts');
        var barChart = echarts.init(document.getElementById('bar'));
        var option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '20%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['社交智能', '知识表示', '随机优化', '遗传算法', '计算机性能分析', '吞吐量'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    type:'bar',
                    barWidth: '60%',
                    data:[10, 24, 8, 2, 0, 16]
                }
            ]
        };
        barChart.setOption(option);
      },
      drawBarLine(id, xData, yData) {
        var that = this;
        // alert(xData, yData);
        var echarts = require('echarts/lib/echarts');
        var myChart = echarts.init(document.getElementById(id));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#283b56'
                    }
                }
            },
            toolbox: {
                show: true,
                feature: {
                    dataView: {readOnly: false},
                    restore: {},
                    saveAsImage: {},
                    magicType: {
                    type: ['line', 'bar']
                  }
                }
            },
            dataZoom: {
                show: false,
                start: 0,
                end: 100
            },
            xAxis: {
                type: 'category',
                boundaryGap: true,
                name:'领域',
                axisLabel: {
                  interval: 0,
                  rotate: 45
                },
                data: xData
            },
            yAxis: {
                type: 'value',
                scale: true,
                name: '个数',
                max: 300,
                min: 0,
                boundaryGap: [0.2, 0.2]
            },
            series: [{
                name:'',
                type:'bar',
                data:yData
            }]
        };

        // app.count = 11
        myChart.setOption(option);
      },
      drawPie(id,legendData,seriesData){
        var echarts = require('echarts/lib/echarts');
        var pieChart = echarts.init(document.getElementById(id));
        var option = {
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'horizontal',
                  left: 'left',
                  data: legendData
                  // data: ['支持政策','打压政策']
              },
              series : [
                  {
                      name: '',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '60%'],
                      data: seriesData,
                      // data:[
                      //     {value:335, name:'支持政策'},
                      //     {value:310, name:'打压政策'}
                      // ],
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          };
        pieChart.setOption(option);
      },
      drawStack(id,legendData,seriesData){
        var echarts = require('echarts/lib/echarts');
        var pieChart = echarts.init(document.getElementById(id));
        var option = {
              title: {
                  text: '堆叠区域图'
              },
              tooltip : {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#6a7985'
                      }
                  }
              },
              legend: {
                  data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
              },
              toolbox: {
                  feature: {
                      saveAsImage: {}
                  }
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : ['周一','周二','周三','周四','周五','周六','周日']
                  }
              ],
              yAxis : [
                  {
                      type : 'value'
                  }
              ],
              series : [
                  {
                      name:'邮件营销',
                      type:'line',
                      stack: '总量',
                      areaStyle: {normal: {}},
                      data:[120, 132, 101, 134, 90, 230, 210]
                  },
                  {
                      name:'联盟广告',
                      type:'line',
                      stack: '总量',
                      areaStyle: {normal: {}},
                      data:[220, 182, 191, 234, 290, 330, 310]
                  },
                  {
                      name:'视频广告',
                      type:'line',
                      stack: '总量',
                      areaStyle: {normal: {}},
                      data:[150, 232, 201, 154, 190, 330, 410]
                  },
                  {
                      name:'直接访问',
                      type:'line',
                      stack: '总量',
                      areaStyle: {normal: {}},
                      data:[320, 332, 301, 334, 390, 330, 320]
                  },
                  {
                      name:'搜索引擎',
                      type:'line',
                      stack: '总量',
                      label: {
                          normal: {
                              show: true,
                              position: 'top'
                          }
                      },
                      areaStyle: {normal: {}},
                      data:[820, 932, 901, 934, 1290, 1330, 1320]
                  }
              ]
          };
        pieChart.setOption(option);
      },
      toggle(event){
        // console.log(event.target.getAttribute("data-index"))
        // console.log(event.target.children[0].className);
        var self;
        self = event.target.children[0];
        // console.log(event.target.children[0])
        if(event.target.children[0].className == "mask"){
            self.style.display = "block";
        }else{
            event.target.parentNode.style.display="none";
            // console.log(event.target.parentNode)
        }
      },
      getIndustries(){
        axios.get(common.url1+"findCompanyByCompany",{
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          if(res){
            console.log("these are the industries");
          }
          else{
            console.log(err);
          }
        })
      },
      getGraphs(industry){
        axios.get(common.url1+"findCompanyByCompany",{
          params:{
            industry : industry
          },
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          if(res){
            console.log("these are the graphs");
          }
          else{
            console.log(err);
          }
        })
      },
      saveReport(){
        axios.get(common.url1+"findCompanyByCompany",{
          params:{
            industry : this.industryValue,
            name: this.reportName,
            graphList: this.graphList
          },
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          if(res){
            console.log("these are the graphs");
          }
          else{
            console.log(err);
          }
        })
      }
    },
    created(){//初始化标签位置

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
     text-align: center;
     .blank {
       width: 95%;
       margin: 10px auto;
       height: 100%;
       border-radius: 15px;
       padding: 10px 20px;
       box-sizing: border-box;
       background-color: #fff;
      
       .el-select {
         width: 100%;
       }
       h1 {
        text-align: left;
       }
       .chart {
         width: 300px;
         height: 250px;
         border: 1px solid #eee;
         position: relative;
         .mask {
           position: absolute;
           top: 0;
           left: 0;
           width: 300px;
           height: 250px;
           background-color: rgba(0,0,0,0.2);
           display: none;
           .check {
             line-height: 250px;
           }
         }
         .unchecked {
           display: none;
         }
       }
       .report{
         h1 {
           text-align: center;
         }
         .report-chart {
           width: 500px;
           height: 400px;
           border: 1px solid #eee;
         }
       }
     }
     .btn-save{
       margin: 20px auto 0 auto;
     }
   }
  }
</style>
