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
      <el-row class="blank" v-show="show === 1">
        <h1>报告领域：人工智能</h1>
        <!-- <el-input v-model="industryValue" placeholder="人工智能" :disabled="true"></el-input> -->
        <div class="report-graph" id="">
          <h1>请输入报告名称</h1>
          <el-input v-model="reportName" placeholder="请输入内容"></el-input>
          <h1>请选择报告所需图表</h1>
          <el-row style="text-align: center;">
            <!-- <el-checkbox-group v-model="checkList" v-for="(item, index) in graphList" :key="item.id">
              <div class="wrapper">
                <div class="chart" data-index="index"></div>
                <el-checkbox :label="index+1"></el-checkbox>
              </div>
            </el-checkbox-group> -->
            <div  v-for="(item, index) in graphList" :key="item.id">
              <div class="wrapper">
                <div class="chart" data-index="index"></div>
                  <input type="checkbox" :value="index+1" v-model="checkList" @change="selectChange">
                  <el-tooltip class="item" effect="dark" :content="item.chartInfo" placement="bottom">
                    <label for="" style="width: 90%;display: block;overflow-x: scroll;">{{item.chartInfo}}</label>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" :content="item.note" placement="bottom">
                    <p>{{item.note}}</p>
                  </el-tooltip>
              </div>
            </div>
          </el-row>
          <el-row>
            <el-button class="btn-save" type="primary" round @click="changeBlank">提交</el-button>
          </el-row>

        </div>
      </el-row>
      <!-- <el-row class="blank" v-show="show === 2">
        <div class="report">
          <h1>人工智能2018年工业报告v1.0</h1>
          <div class="wrapper2">
            <div class="wrapper-sub" v-for="(item, index) in graphList2" :key="item.id">
              <div class="report-chart"></div>
              <h6>sdc</h6>
            </div>
          </div>
          <el-row class="clearfloat">
            <div class="wrapper-sub">
              <div class="report-chart" id="bar2"></div>
              <h6>人工智能成果量统计图</h6>
            </div>
            <div class="wrapper-sub">
              <div class="report-chart" id="bar3"></div>
              <h6>chengguo</h6>
            </div><br/>
            <div class="wrapper-sub">
              <div class="report-chart" id="radar2"></div>
              <h6>chengguo</h6>
            </div>
            <div class="wrapper-sub">
              <div class="report-chart" id="pie2"></div>
              <h6>chengguo</h6>
            </div>
          </el-row>
        </div>
      </el-row> -->
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import $ from 'jquery';
  import echarts from 'echarts';
  import * as common from '../../common/common.js'
  let qs = require("qs");
  export default {
    data() {
      return {
        show: 1,
        activeName: 'first',
        industries: [],
        industryValue: '人工智能',
        reportName: '',
        checkList: [],
        graphList: [],
        myChart: {},
        graphList2: [],
        myOutputChart: {}
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
      changeBlank() {
        var that = this;
        // console.log(this.checkList);
        // console.log(this.graphList);
        var layouts=[];
        var names=[];
        var notes=[];

        for(var i=0; i<this.checkList.length; i++){
          layouts.push(this.graphList[this.checkList[i]-1].layout);
          names.push(this.graphList[this.checkList[i]-1].chartInfo);
          notes.push(this.graphList[this.checkList[i]-1].note);
        }
        // console.log(layouts, names, notes);
        
        var datatosend = qs.stringify({
              reportId: 1,
              tech: '人工智能',
              reportName: this.reportName,
              layouts: JSON.stringify(layouts),
              chartName: JSON.stringify(names),
              chartNote: JSON.stringify(notes)
            })
        axios
          .post(common.url2+"saveReport", datatosend)
          .then(function(response) {
            axios.get(common.url2+"getAllReport",{
              datatype:'jsonp',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              }
            }).then((res, err) => {
              if(res){
                var res = res.data.data;
                // console.log(res);
                that.$router.push({path: "./reportDetail?id="+(res.length-1)})
              }
              else{
                console.log(err);
              }
            })
            // that.show = 2;
            // for(var index of that.checkList){
            //   that.graphList2.push(that.graphList[index]);
            //   // console.log(that.graphList2[j].layout);
            //   // console.log(document.getElementsByClassName('report-chart').length)
            //   // that.myOutputChart[j] = echarts.init(document.getElementsByClassName('report-chart')[j]);
            //   // that.myOutputChart[j].setOption(JSON.parse(that.graphList2[j].layout));
            // }
            // for(var j=0; j<that.graphList2.length; j++){
            //   console.log(that.graphList2[j].layout);
            //   console.log(document.getElementsByClassName('report-chart').length)
            //   this.$nextTick(function () {
            //     that.myOutputChart[j] = echarts.init(document.getElementsByClassName('report-chart')[j]);
            //   })
            //   that.myOutputChart[j].setOption(JSON.parse(that.graphList2[j].layout));
            // }
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });
      },
      drawRadar(id, indicator, data){
        var echarts = require('echarts/lib/echarts');
        var radarChart = echarts.init(document.getElementById(id));
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
      drawBar(id, datax,datay){
        var echarts = require('echarts/lib/echarts');
        var barChart = echarts.init(document.getElementById(id));
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
                    data : datax,
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
                    data:datay
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
      },
      _init(){
        window.addEventListener('resize', function() {
              this.myChart.resize();
            }.bind(this))
            // this.$emit('optionConfig',this.option);
      },
      selectChange(val){
        console.log(this.checkList);
      }
    },
    created(){//初始化标签位置
      // axios.get(common.url2+"getTechnologyList",{
      //     datatype:'jsonp',
      //     headers: {
      //       'Content-Type': 'application/x-www-form-urlencoded',
      //     }
      //   }).then((res, err) => {
      //     console.log(res.data.data)
      //     if(res){
      //       for(var i=0;i<res.data.data.length; i++){
      //         this.industries.push({
      //           value: res.data.data[i].name,
      //           label: res.data.data[i].id
      //         })
      //       }
      //       console.log(this.industries)
      //     }
      //     else{
      //       console.log(err);
      //     }
      //   })

        axios.get(common.url2+"getChartByTech/人工智能",{
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          // console.log(res.data.data)
          if(res){
            // console.log(res.data.data);
            this.graphList = res.data.data;
            console.log(res)
          }
          else{
            console.log(err);
          }
        })
    },
    mounted(){
      this.entity = this.$route.query.entity;
      // this.drawRadar('radar');
      // this.drawBar('bar',['社交智能', '知识表示', '随机优化', '遗传算法', '计算机性能分析', '吞吐量'],[10, 24, 8, 2, 0, 16]);
      // this.drawBarLine("barLine", ['星期一','星期二','星期三','星期四'], [10,3,24,15]);
      // this.drawPie('pie',
      //           ['支持政策','打压政策'],
      //           [
      //               {value:335, name:'支持政策'},
      //               {value:310, name:'打压政策'}
      //           ]);
      // this.drawStack('stack');
      // this.drawRadar('radar2');
      // this.drawBar('bar2',['社交智能', '知识表示', '随机优化', '遗传算法', '计算机性能分析', '吞吐量'],[10, 24, 8, 2, 0, 16]);
      // this.drawBar('bar3',['社交智能', '知识表示', '随机优化', '遗传算法', '计算机性能分析', '吞吐量'],[10, 24, 8, 2, 0, 16]);
      // this.drawPie('pie2',
      //           ['支持政策','打压政策'],
      //           [
      //               {value:335, name:'支持政策'},
      //               {value:310, name:'打压政策'}
      //           ]);
    },
    updated(){
      this.$nextTick(function () {
      })

      for(var i=0; i<this.graphList.length; i++){
          this.myChart[i] = echarts.init(document.getElementsByClassName('chart')[i]);
          this.myChart[i].setOption(JSON.parse(this.graphList[i].layout));
        }
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
  .clearfloat:after {
    display:block;
    clear:both;
    content:"";
    visibility:hidden;
    height:0;
  }
  .clearfloat{
    zoom:1;
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
     min-height: 100%;
   }
   
   .el-main {
     background-color: #E9EEF3;
     color: #333;
     text-align: center;
     .blank {
       width: 95%;
       margin: 10px auto;
       height: 100%;
       overflow-y: scroll;
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
       .wrapper {
         float: left;
         text-align: center;
         margin-bottom: 20px;
         max-width: 30%;
         h1{
           text-align: center;
         }
         .chart, #pie {
            width: 332px;
            height: 250px;
            border: 1px solid #eee;
            margin-right: 30px;
            margin-bottom: 10px;
            position: relative;
            text-align: center;
            .unchecked {
              display: none;
            }
          }
          p, label {
            width: 90%;
            overflow: hidden;/*超出部分隐藏*/
            white-space: nowrap;/*不换行*/
            text-overflow:ellipsis;/*超出部分文字以...显示*/
          }
          label {
            color: #545c64;
          }
          p {
            color: #999999;
          }
          .el-checkbox {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
       }
       
       .report{
         h1 {
           text-align: center;
         }
         .wrapper2{
            display: flex;
            flex-wrap: wrap;
            .wrapper-sub, #pie2{
              text-align: center;
              margin-bottom: 20px;
              margin-right: 30px;
              .report-chart {
                width: 500px;
                height: 400px;
                border: 1px solid #eee;
                margin-bottom: 10px;
                position: relative;
                text-align: center;
              }
            }
          }
       }
     }
     .btn-save{
       margin: 20px auto 0 auto;
     }
   }
  }
</style>
