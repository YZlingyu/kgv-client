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
        <el-menu-item index="1" @click="show=1">
          <i class="el-icon-setting"></i>
          <span slot="title">关系图谱</span>
        </el-menu-item>
        <el-menu-item index="2" @click="show=2">
          <i class="el-icon-menu"></i>
          <span slot="title">数据报表</span>
        </el-menu-item>
        <el-menu-item index="3" @click="show=3">
          <i class="el-icon-setting"></i>
          <span slot="title">行业报告</span>
        </el-menu-item>
        <router-link to="./technologyChain">
          <el-menu-item index="4">
            <i class="el-icon-menu"></i>
            <span slot="title">查看技术链</span>
          </el-menu-item>
        </router-link>
      </el-menu>
    </el-aside>
    <el-main>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{type.name}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{entity}}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-row v-show="show === 1" class="container">
        <el-col :span="16">
          <div class="card">
            <h1 class="title">{{type.name}}关系图谱</h1>
            <div id="main"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="card basic-info">
            <h1 class="title">{{type.name}}信息</h1>
            <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="tab-left">
              <el-tab-pane label="相关实体" name="first">
                <div class="company">
                  <div class="company-link">
                    <i class="el-icon-document"></i>
                    <span class="title-output">链接机构</span><span class="title-output">{{enterpriseList.length}}</span><span class="title-output">所</span>
                    <div class="output-list" v-for="(item, index) in enterpriseList" :key="item.id">
                      <router-link :to="{path: './entityInfo?type=company', query:{entity:item}}">
                        <div class="order">{{ index+1 }}</div>
                        <span class="output-word">{{item}}</span>
                        <span class="tag" v-if="item.no">{{item.no}}</span>
                      </router-link>
                    </div>
                  </div>
                  <div class="company-link">
                    <i class="el-icon-document"></i>
                    <span class="title-output">链接技术</span><span class="title-output">{{enterpriseDetail.domain.length}}</span><span class="title-output">个</span>
                    <div class="output-list" v-for="(item, index) in enterpriseDetail.domain" :key="item.id">
                      <router-link :to="{path: './entityInfo?type=technology', query:{entity:item}}">
                        <div class="order">{{ index+1 }}</div>
                        <span class="output-word">{{item}}</span>
                      </router-link>
                    </div>
                  </div>
                  <div class="company-link">
                    <i class="el-icon-document"></i>
                    <span class="title-output">链接专利</span><span class="title-output">{{patentList.length}}</span><span class="title-output">个</span>
                    <div class="output-list" v-for="(item, index) in patentList" :key="item.id">
                      <router-link :to="{path: './entityInfo?type=patent', query:{entity:item}}">
                        <div class="order">{{ index+1 }}</div>
                        <span class="output-word">{{item}}</span>
                      </router-link>
                    </div>
                  </div>

                </div>
              </el-tab-pane>
              <el-tab-pane label="基本信息" name="second">
                <el-row>
                  <el-col :span="7">
                    <img :src="'../../static/'+logo+'.png'" class="person">
                  </el-col>
                  <el-col :span="17">
                    <span class="title-output" style="line-height: 80px;">{{enterpriseDetail.name}}</span><br/>
                    <!-- <span v-if="enterpriseDetail">融资公司数：{{enterpriseDetail.financing}}</span><br/>
                    <span v-if="enterpriseDetail">投资公司数：{{enterpriseDetail.investing}}</span><br/> -->
                  </el-col>
                </el-row>
                <el-row style="margin-top: 20px;">
                  <el-col :span="6">
                    <span v-if="enterpriseDetail" class="sub_title company_detail">成立时间：</span>
                  </el-col>
                  <el-col :span="18">
                    <span class="company_detail">{{enterpriseDetail.createTime}}</span><br/>
                  </el-col>
                  <el-col :span="6">
                    <span v-if="enterpriseDetail" class="sub_title company_detail">公司地址：</span>
                  </el-col>
                  <el-col :span="18">
                    <span class="company_detail">{{enterpriseDetail.addr}}</span><br/>
                  </el-col>
                  <el-col :span="6">
                    <span v-if="enterpriseDetail" class="sub_title company_detail">所属领域：</span>
                  </el-col>
                  <el-col :span="18">
                    <span v-for="label in enterpriseDetail.domain" :key="label.index" class="company_detail">{{label}}&nbsp;&nbsp;</span><br/>
                  </el-col>
                  <el-col :span="6">
                    <span v-if="enterpriseDetail" class="sub_title company_detail">公司介绍：</span>
                  </el-col>
                  <el-col :span="18">
                    <span>{{enterpriseDetail.introduction}}</span><br/>
                  </el-col>
                  <el-col :span="6">
                    <span v-if="enterpriseDetail" class="sub_title company_detail">投资公司：</span>
                  </el-col>
                  <el-col :span="18">
                    <span v-for="item in investment" :key="item.id">{{item}}<br/></span>
                  </el-col>
                  <el-col :span="6">
                    <span v-if="enterpriseDetail" class="sub_title company_detail">融资公司：</span>
                  </el-col>
                  <el-col :span="18">
                    <span v-for="item in financing" :key="item.id">{{item}}<br/></span>
                  </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="新闻" name="third">
                <span class="title-output">新闻</span><span class="title-output">{{newsList.length}}</span><span class="title-output">条</span>
                <timeline>
                  <timeline-item color="dodgerblue" v-for="item in newsList" :key="item.index">
                    <div class="news_title">{{item.title}}</div><br/>
                    <div class="news_time">{{item.time}}</div><br/>
                    <div class="news_detail">{{item.abs}}</div>
                  </timeline-item>
                </timeline>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      
      <el-row v-show="show === 2">
          <div class="draw-canvas-table">
            <h1>企业成果列表</h1>
            <el-table
              :data="outputTableData"
              style="width: 100%"
              class="fundTable">
              <el-table-column
                prop="index"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="发布日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="成果名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="range"
                label="成果领域">
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      <el-row v-show="show === 2">
          <div class="draw-canvas-table">
            <h1>企业专利列表</h1>
            <el-table
              :data="patentTableData"
              style="width: 100%"
              class="fundTable">
              <el-table-column
                prop="index"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="发布日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="成果名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="range"
                label="成果领域">
              </el-table-column>
            </el-table>
          </div>
        </el-row>
      <el-row v-show="show === 2">
          <div class="draw-canvas-table">
            <h1>企业获投公司列表</h1>
            <el-table
              :data="getFundTableData"
              style="width: 100%"
              class="fundTable">
              <el-table-column
                prop="index"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="获投日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="fundAmount"
                label="获投金额">
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <el-row v-show="show === 2">
          <div class="draw-canvas-table">
            <h1>企业投资公司列表</h1>
            <el-table
              :data="outFundTableData"
              style="width: 100%"
              class="fundTable">
              <el-table-column
                prop="index"
                label="序号"
                width="180">
              </el-table-column>
              <el-table-column
                prop="date"
                label="投资日期"
                width="180">
              </el-table-column>
              <el-table-column
                prop="name"
                label="公司名称"
                width="180">
              </el-table-column>
              <el-table-column
                prop="fundAmount"
                label="投资金额">
              </el-table-column>
            </el-table>
          </div>
        </el-row>

        <el-row v-show="show ===3">
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
                width="240">
                <template slot-scope="scope">
                  <el-button @click="checkReport(scope.row)" type="text" size="small">查看</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <el-row v-show="show ===4" class="blank">
          <div class="report">
            <h1>人工智能2018年工业报告v1.0</h1>
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
        </el-row>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  import * as common from '../../common/common.js'
  // import * as assets from '../../assets'
  export default {
    data() {
      return {
        type: {},
        show: 1,
        logo: "",
        activeName: 'first',
        investment: [],
        financing: [],
        companyId: "",
        enterpriseList: [],
        enterpriseDetail: {},
        enterpriseRange: '',
        technologyList: [],
        technologyLength: '',
        newsList: [],
        patentList: [],
        entity: '',
        absList: [],
        nodes: [],
        edges: [],
        treeData: {},
        outputTableData: [],
        patentTableData: [],
        getFundTableData: [],
        outFundTableData: [],
        width:700,
        height:350,
        tagsNum:20,
        RADIUS:100,
        speedX:Math.PI/360,
        speedY:Math.PI/360,
        tags: [],
        showNews: '',
        tableData: []
      }
    },
    computed:{
        CX(){
            return this.width/2;
        },
        CY(){
            return this.height/2;
        }
    },
    watch: {
      '$route':'fetchData'
    },
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      getCompanies(){
        if(this.type.id == 1){
          for(var enterprise of this.enterpriseList){
            if(enterprise){
              this.treeData.children[0].children.push({"name": enterprise, "children": []});
            }
            this.drawTree(this.treeData);
          }
        } 
        else if(this.type.id == 2){
          // axios.get(common.url1+"findComByTech",{
          //   params:{
          //     technologyName : e
          //   },
          //   datatype:'jsonp',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //   }
          // }).then((res, err) => {
          //   if(res){
          //     this.enterpriseList = res.data.data;
          //     // console.log(111111111111)
          //     // console.log(res.data.data.length);
          //     this.nodeList = [];
          //     self.enterpriseLength = res.data.data.length;
          //     // if(res.data.data.length !== 0){
          //     //   this.enterpriseList.push(res.data.data);
          //     // }
          //     // console.log(this.enterpriseList)
          //     for(var enterprise of this.enterpriseList){
          //       if(enterprise){
          //         this.treeData.children[0].children.push({"name": enterprise.name, "children": []});
          //       }
          //       this.drawTree(this.treeData);
          //     }
          //   }
          //   else{
          //     console.log(err);
          //   }
          // })
        }else if(this.type.id == 3){
          // axios.get(common.url1+"findCompanyByCompany",{
          //   params:{
          //     company : e
          //   },
          //   datatype:'jsonp',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //   }
          // }).then((res, err) => {
          //   if(res){
          //     //  this.enterpriseList = res.data.data;
          //     // console.log(111111111111)
          //     // console.log(res.data.data.length);
          //     this.nodeList = [];
          //     self.enterpriseLength = res.data.data.length;
          //     // if(res.data.data.length !== 0){
          //     //   this.enterpriseList.push(res.data.data);
          //     // }
          //     // console.log(this.enterpriseList)
          //     for(var enterprise of this.enterpriseList){
          //       if(enterprise){
          //         this.treeData.children[0].children.push({"name": enterprise.name, "children": []});
          //       }
          //       this.drawTree(this.treeData);
          //     }
          //   }
          //   else{
          //     console.log(err);
          //   }
          // })
        }else{
          alert("好像除了一些状况！");
        }
      },
      getNews(){
        var self = this;
        if(self.type.id == 1){
           axios.get(common.url4+"getCompanyNewsById/2",{
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res) {
              // console.log(res.data.data);
              for(var item of res.data.data){
                // console.log(item)
                self.newsList.push({
                  title: item.title,
                  time: item.newsTime,
                  abs: item.newsIntroduction
                })
              }
              // console.log(self.newsList);
              // this.newsList = res.data.data;
              // // console.log(111111111111)
              // // console.log(res.data.data.length);
              // this.nodeList = [];
              // if(res.data.data.length !== 0){
              //   this.newsList.push(res.data.data);
              // }
              // // console.log(this.newsList)
              // for(var news of this.newsList){
              //   if(news){
              //     this.treeData.children[2].children.push({"name": news.name, "children": []});
              //   }
              //   this.drawTree(this.treeData);
              // }
            }
            else {
              console.log(err);
            }
          })
        }
       
      },
      getCompanyDetail(e){
        var self = this;
        axios.get(common.url4+"getCompanyInfoByName/"+e,{
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res){
              var res = res.data.data;
              // console.log(res);
              // self.companyId = res.id;
              self.enterpriseDetail.name = res.companyName;
              self.enterpriseDetail.addr = res.companyAdd;
              self.enterpriseDetail.createTime = res.companyCreateDate;
              self.enterpriseDetail.domain = res.companyDomain.split(",");
              self.enterpriseDetail.introduction = res.companyIntroduction;
              var investment = res.investmentId.split(',');
              var financing = res.financingId.split(',');
              // for(var item of investment){
              if(investment){
                for(var i=0; i<investment.length; i++){
                  axios.get(common.url4+"getCompanyInfoById/"+investment[i],{
                    datatype:'jsonp',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
                  }).then((res, err) => {
                    if(res){
                      var fundAmount = Math.floor(Math.random()*1000);
                      if(res.data.data){
                        self.investment.push(res.data.data.companyName);
                        self.enterpriseList.push(res.data.data.companyName);
                        self.outFundTableData.push({
                          index: i+1,
                          date: res.data.data.companyCreateDate,
                          name: res.data.data.companyName,
                          fundAmount: fundAmount
                        })
                      }else{
                        self.investment.push("无投资");
                      }
                      // console.log(res.data.data.companyName);
                    }else{
                      console.log(err);
                    }
                  })
                }
              }else{
                self.investment.push("无投资");
              }
              
              if(financing){
                // for(var item of financing){
                for(var j=0; j<financing.length; j++){
                  axios.get(common.url4+"getCompanyInfoById/"+financing[j],{
                    datatype:'jsonp',
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }
                  }).then((res, err) => {
                    if(res){
                      if(res.data.data){
                        var fundAmount = Math.floor(Math.random()*1000);
                        self.financing.push(res.data.data.companyName);
                        self.enterpriseList.push(res.data.data.companyName);
                        self.getFundTableData.push({
                          index: i+1,
                          date: res.data.data.companyCreateDate,
                          name: res.data.data.companyName,
                          fundAmount: fundAmount
                        })
                      }else {
                        self.financing.push("未融资");
                      }
                      // console.log(res.data.data.companyName);
                    }else{
                      console.log(err);
                    }
                  })
                }
              }else {
                self.financing.push("未融资");
              }
              
              
              // self.enterpriseList = res.
              // for(var item in )
            }else{
              console.log(err);
            }
          })
      },
      getAbsImport(e){
        axios.get(common.url2+"absImport/toName",{
          params:{
            name: e
          },
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          if(res.data[0]){
            this.absList = res.data;
            // console.log(this.absList)
          }
            console.log(err);
        })
      },
      getPatent() {
        var self = this;
        axios.get(common.url4+"getCompanyPatentById/2",{
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res){
              // console.log(res);
              for(var item of res.data.data){
                self.patentList.push(item.patentName);
              }
              for(var i=0; i<res.data.data.length; i++){
                self.patentTableData.push({
                  index: i+1,
                  date: res.data.data[i].publishTime,
                  name: res.data.data[i].patentName,
                  range: res.data.data[i].patentDomain
                })
              }
            }
            else{
              console.log(err);
            }
          })
      },
      getOutput(){
        var self = this;
        axios.get(common.url4+"getEnterpriseAchievementsById/2",{
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res){
              // console.log(res);
              for(var i=0; i<res.data.data.length; i++){
                self.outputTableData.push({
                  index: i+1,
                  date: res.data.data[i].publishTime,
                  name: res.data.data[i].achievementsName,
                  range: res.data.data[i].achievementsDomain
                })
              }
            }
            else{
              console.log(err);
            }
          })
      },
      getReport(){
        var self = this;
        axios.get(common.url2+"getReportByTechnology/人工智能",{
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res){
              console.log(res);
              for(var item of res.data.data){
                self.tableData.push({
                  name: item.reportName,
                  date: item.createTime,
                  region: item.tech
                });

              }
            }
            else{
              console.log(err);
            }
          })
      },
      getTreeData(e) {
        this.treeData.name = e;
        this.treeData.children = [];
        this.treeData.children.push({"name": "企业", "children": []});
        this.treeData.children.push({"name": "技术", "children":[]});
        this.treeData.children.push({"name": "新闻", "children":[]});
        // this.drawTree(this.treeData);
        if( this.type.id ==1 ){
          // console.log(this.enterpriseList)
          for(var enterprise of this.enterpriseList){
            if(enterprise){
              this.treeData.children[0].children.push({"name": enterprise, "children": []});
            }
          }
          for(var item of this.enterpriseDetail.domain){
            this.treeData.children[1].children.push({"name": item, "children": []});
          }
          for(var item of this.newsList){
            this.treeData.children[2].children.push({"name": item.title, "children": []});
          }
          this.drawTree(this.treeData);
        }else if(this.type.id == 2){
          // axios.get(common.url1+"findComByTech",{
          //   params:{
          //     technologyName : e
          //   },
          //   datatype:'jsonp',
          //   headers: {
          //     'Content-Type': 'application/x-www-form-urlencoded',
          //   }
          // }).then((res, err) => {
            
          //   if(res){
          //     // console.log(res.data)
          //     if(res.data.code == 200){
          //       for(var item of res.data.data) {
          //         this.treeData.children[0].children.push({"name": item, "children": []});
          //       }
          //     }
          //     axios.get(common.url1+"findTechnologyChildrens",{
          //       params:{
          //         technology : e
          //       },
          //       datatype:'jsonp',
          //       headers: {
          //         'Content-Type': 'application/x-www-form-urlencoded',
          //       }
          //     }).then((res, err) => {
                
          //       this.technologyLength = res.data.data.length;
          //       // console.log(res.data.data)
          //       this.technologyList = res.data.data;
          //       // console.log(this.technologyList);
          //       if(res.data.code == 200){
          //         for(var technology of this.technologyList){
          //           if(technology){
          //             this.treeData.children[1].children.push({"name": technology, "children":[]});
          //           }else{
          //           }
          //         }
          //       }
          //       axios.get(common.url1+"findNewsByTechnology",{
          //         params:{
          //           technologyName: e
          //         },
          //         datatype:'jsonp',
          //         async: true,
          //         headers: {
          //           'Content-Type': 'application/x-www-form-urlencoded',
          //         }
          //       }).then((res, err) => {
          //         // console.log(res.data)
          //         if(res.data.code == 200){
          //           for(var item of res.data.data) {
          //             this.treeData.children[2].children.push({"name": item.title, "children": []});
          //           }
          //         }
          //       // console.log(this.treeData);
          //       this.drawTree(this.treeData);
          //       })
          //     })
          //   }
          //   else{
          //     console.log(err);
          //   }
          // })
        }else if(this.type.id == 3){}
        this.drawTree(this.treeData);
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
      fetchData(){
        // console.log('路由发送变化doing...');
        location.reload();
      },
      checkReport(row) {
        // console.log(row);
        this.show = 4;
      }
    },
    created(){//初始化标签位置
    
        var self = this;
        let tags = [];
        // this.type = this.$route.query.type;
        this.getReport();
        // this.entity = this.$route.query.entity;
        this.entity = "人工智能";
        this.logo = this.$route.query.entity;
        if(this.$route.query.type == "company"){
          this.type.name = "企业";
          this.type.id = 1;
          this.getCompanyDetail(this.entity);
          this.getNews();
          this.getPatent();
          this.getOutput();
          } else if(this.$route.query.type == "technology") {
            this.type.name = "技术";
            this.type.id = 2;

          }else if(this.$route.query.type == "patent") {
            this.type.name = "专利";
            this.type.id = 3;
          }
          
          
          // this.getTreeData(this.entity);
          // this.getCompanies();
          
        // this.getTechnologies(this.entity);
        // this.getCompanies(this.entity);
        // axios.get(common.url2+"enterpriseBaseImport/comName",{
        //   params:{
        //     enterprise: this.$route.query.entity
        //   },
        //   datatype:'jsonp',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //   }
        // }).then((res, err) => {
        //   if(res.data[0]){
        //     this.enterpriseDetail = res.data[0];
        //     this.enterpriseRange = res.data[0].opeRange.split("，");
        //     console.log(this.enterpriseRange.length)
        //      for(let i = 0; i < this.enterpriseRange.length; i++){
        //         let tag = {};
        //         let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
        //         let a = Math.acos(k);
        //         let b = a * Math.sqrt(this.tagsNum * Math.PI);
        //         tag.text = this.enterpriseRange[i];
        //         tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);
        //         tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b); 
        //         tag.z = this.RADIUS * Math.cos(a);
        //         tags.push(tag);
        //     }
        //     this.tags = tags;
        //   }
        // })
        
        // for(let i = 0; i < this.tagsNum; i++){
        //     let tag = {};
        //     let k = -1 + (2 * (i + 1) - 1) / this.tagsNum;
        //     let a = Math.acos(k);
        //     let b = a * Math.sqrt(this.tagsNum * Math.PI);
        //     tag.text = i + 'tag';
        //     tag.x = this.CX +  this.RADIUS * Math.sin(a) * Math.cos(b);
        //     tag.y = this.CY +  this.RADIUS * Math.sin(a) * Math.sin(b); 
        //     tag.z = this.RADIUS * Math.cos(a);
        //     tags.push(tag);
        // }
        // this.tags = tags;
    },
    mounted(){
        // console.log(this.type);
        // console.log(this.entity);
        
      // console.log(this.$route.query.entity);
      
      // this.getCompanyDetail(this.entity);
      // this.getAbsImport(this.entity);
      
      // this.getTreeData(this.entity);
      // console.log(this.enterpriseList);
      // this.drawRadar();
      // // this.drawBar();
      // this.drawBarLine("bar",["语音识别","信息传输","零售","计算机网络","图像识别"],[120,88,269,210,300]);
      // this.drawBarLine("patentBar",["语音识别","信息传输","零售","计算机网络","图像识别"],[200,130,150,260,280]);
      // this.drawBarLine("paperBar",["语音识别","信息传输","零售","计算机网络","图像识别"],[182,300,200,258,122]);
      // this.drawBarLine("getFundBar",["2015","2016","2017","2018","2019"],[220,203,240,130,142]);
      // this.drawBarLine("outFundBar",["2015","2016","2017","2018","2019"],[220,203,240,130,142]);
      // this.drawPie("pie",['支持政策','打压政策'], [{value:335, name:'支持政策'},{value:310, name:'打压政策'}]);
      // setInterval(() => {
      //     this.rotateX(this.speedX);
      //     this.rotateY(this.speedY);
      // }, 17)
      // console.log(this.treeData);
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
      this.getTreeData(this.entity);
    },
    components:{
      adminHeader, Timeline, TimelineItem, TimelineTitle
    }
  }
</script>

<style scoped lang="less">
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
  }

  /* main */
  .container{
    .card {
      background-color: #ffffff;
      border-radius: 5px;
      height: 740px;
      width: 98%;
      margin: 20px auto;
      padding: 10px;
      box-sizing: border-box;
      #main {
        overflow: scroll;
        height: 600px;
        width: 100%;
      }
    }
    
    .draw-canvas-table{
      background-color: #ffffff;
    }

    .basic-info {
      .el-tab-pane{
          height: 470px;
          overflow-x: hidden;
          overflow-y: scroll;
          text-align: left;
          .title-output{
            font-weight: bold;
            margin: 10px 0 20px 0;
          }
          .company_detail{
            display: inline-block;
            line-height: 20px;
            margin-bottom: 10px;
            color: rgb(55, 65, 74);
          }
          .sub_title{
            font-weight: bold;
          }
          .company-link {
            margin-bottom: 20px; 
            .output-list{
              margin-top: 10px;
              .tag{
                background-color: #CCEEFF;
                padding: 3px;
                border-radius: 5px;
              }
              .order{
                width: 20px;
                height: 20px;
                line-height: 20px;
                text-align: center;
                display: inline-block;
                border-radius: 100px;
                background-color: dodgerblue;
                color: #ffffff;
                margin-right: 10px;
              }
              .output-word{
                margin-right: 15px;
              }
            }
          }
          
          .person{
            width: 80px;
            height: 80px;
            border: 1px solid #ccc;
          }
        }
    }
    .blank {
      width: 95%;
      margin: 10px auto;
      height: 100%;
      overflow-y: scroll;
      border-radius: 15px;
      padding: 10px 20px;
      box-sizing: border-box;
      background-color: #fff;
      .report{
        h1 {
          text-align: center;
        }
        .wrapper-sub, #pie2{
          float: left;
          text-align: center;
          margin-bottom: 20px;
          .report-chart {
            width: 520px;
            height: 400px;
            border: 1px solid #eee;
            margin-bottom: 10px;
            position: relative;
            text-align: center;
          }
        }
        .wrapper-sub:nth-child(even) {
            float: right;
          }
      }
    }
  }
  

  /* 基本信息 */
  

  // .pop-trigger{
  //   margin-left: 20px;
  //   background-color: #84D0FF;
  //   height: 70px;
  //   line-height: 70px;
  //   text-align: center;
  // }
  // .pop-right{
  //   width: 15px;
  //   background-color: #ccc;
  //   padding: 5px;
  //   position: absolute;
  //   right: 0;
  //   top: 200px;
  // }
  // .el-icon-back{
  //   position: absolute;
  //   right: 25px;
  //   top: 250px;
  // }
  
  
  /* ---nav3--- */
  // .news-card1, .news-card2 {
  //   background-color: #ffffff;
  //   border-radius: 5px;
  // }
  // .news-card1 {
  //   width: 730px;
  //   height: 500px;
  //   margin: 10px 0;
  //   padding: 20px;
  // }
  // .news-card2 {
  //   width: 90%;
  //   height: 1040px;
  //   padding: 20px;
  //   margin-top: 10px;
  //   text-align: left;
  // }
  // #pie {
  //   width: 700px;
  //   height: 450px;
  // }
  // .newsList {
  //   border-bottom: 1px solid #eee;
  //   padding: 10px; 
  //   position: relative;
  // }
  // .pop-out {
  //   position: absolute;
  //   top: 0;
  //   left: -220px;
  //   width: 200px;
  //   border: 1px solid #999999;
  //   border-radius: 5px;
  //   padding: 10px;
  //   background-color: #ffffff;
  //   box-shadow: -5px 5px 5px #999999;
  // }
  // .cell {
  //   text-align: center;
  // }
  
</style>
