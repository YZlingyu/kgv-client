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
          <span slot="title">相关分析</span>
        </el-menu-item>
        <!-- <el-menu-item index="3" @click="show=3">
          <i class="el-icon-setting"></i>
          <span slot="title">新闻视角</span>
        </el-menu-item> -->
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
      <el-row v-show="show === 1">
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
          <el-tab-pane label="相关实体   " name="first">
            <div class="company">
              <div class="company-link">
                <i class="el-icon-document"></i>
                <span class="title-output">链接机构</span><span class="title-output">{{enterpriseList.length}}</span><span class="title-output">所</span>
                <div class="output-list" v-for="(item, index) in enterpriseList" :key="item.id">
                  <router-link :to="{path: './company', query:{entity:item}}">
                    <div class="order">{{ index+1 }}</div>
                    <span class="output-word">{{item}}</span>
                    <span class="tag" v-if="item.no">{{item.no}}</span>
                  </router-link>
                </div>
              </div>
              <div class="company-link">
                <i class="el-icon-document"></i>
                <span class="title-output">链接技术</span><span class="title-output">{{technologyList.length}}</span><span class="title-output">个</span>
                <div class="output-list" v-for="(item, index) in technologyList" :key="item.id">
                  <router-link :to="{path: './technology', query:{entity:item}}">
                    <div class="order">{{ index+1 }}</div>
                    <span class="output-word">{{item.name}}</span>
                  </router-link>
                </div>
              </div>
              <div class="company-link">
                <i class="el-icon-document"></i>
                <span class="title-output">链接专利</span><span class="title-output">{{technologyList.length}}</span><span class="title-output">个</span>
                <div class="output-list" v-for="(item, index) in technologyList" :key="item.id">
                  <router-link :to="{path: './technology', query:{entity:item}}">
                    <div class="order">{{ index+1 }}</div>
                    <span class="output-word">{{item.name}}</span>
                  </router-link>
                </div>
              </div>

            </div>
          </el-tab-pane>
          <el-tab-pane label="基本信息" name="second">
            <el-row>
              <el-col :span="7">
                <img src="../../assets/404.png" class="person">
              </el-col>
              <el-col :span="17">
                <span class="title-output">{{entity}}</span><br/>
                <span v-for="label in enterpriseRange" :key="label.index">{{label}}&nbsp;&nbsp;</span><br/>
                <span v-if="enterpriseDetail">{{enterpriseDetail.address}}</span><br/>
                <span v-if="enterpriseDetail">{{enterpriseDetail.website}}</span><br/>
              </el-col>
            </el-row>
            <p class="output-detail">北京蓦然认知科技有限公司简称“蓦然认知”，成立于2016年5月5号，总部位于北京市海淀区清华科技园。蓦然认知是一家专注于认知计算，自然语言理解技术的初创公司，对外提供人机协作，智能对话整体解决方案，是国内唯一家能够全语音完成复杂任务的决策引擎。</p>
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
        <div class="draw-canvas" style="float:left;">
          <h1>企业技术领域贡献</h1>
          <div id="radar"></div>
        </div>
        <div class="draw-canvas" style="float:right;">
          <h1>企业领域成果输出量</h1>
          <div id="bar"></div>
        </div>
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
        <div class="draw-canvas" style="float:left;">
          <h1>企业领域专利输出量</h1>
          <div id="patentBar"></div>
        </div>
        <div class="draw-canvas" style="float:right;">
          <h1>企业领域论文输出量</h1>
          <div id="paperBar"></div>
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
            <h1>企业论文列表</h1>
            <el-table
              :data="paperTableData"
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
      <el-row v-show="show === 3">
        <el-col :span="16">
          <div class="news-card1">
            <h1 class="title">企业领域标签</h1>
            <div id='app' >
              <svg :width='width' :height='height' @mousemove='listener($event)'>
                <a :href="tag.href" v-for='tag in tags' :key="tag.id">
                  <text :x='tag.x' :y='tag.y' :font-size='20 * (600/(600-tag.z))' :fill-opacity='((400+tag.z)/600)'>{{tag.text}}</text>
                </a>
              </svg>
            </div>
          </div>
          <div class="news-card1">
            <h1 class="title">企业舆情组成对比</h1>
            <div id="pie"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="news-card2">
            <h1 class="title">企业新闻详情</h1>
            <div class="newsList" v-for="(item, index) in newsList" :key="item.newsId">
              <div class="output-list news-list" @mouseover="changeShowNews(item.newsId)" @mouseout="displayNews()">
                <span class="order">{{index+1}}</span>
                <span class="output-word">{{item.title}}</span>
              </div>
              <div class="pop-out" v-show="showNews === item.newsId">{{item.abs}}</div>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row v-show="show === 3">
        <div class="draw-canvas" style="float:left;">
          <h1>企业获投金额</h1>
          <div id="getFundBar"></div>
        </div>
        <div class="draw-canvas" style="float:right;">
          <h1>企业对外投资金额</h1>
          <div id="outFundBar"></div>
        </div>
      </el-row>
      <el-row v-show="show === 3">
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
                prop="range"
                label="获投金额">
              </el-table-column>
            </el-table>
          </div>
        </el-row>
        <el-row v-show="show === 3">
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
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'
  import * as common from '../../common/common.js'
  export default {
    data() {
      return {
        type: {},
        show: 1,
        activeName: 'first',
        enterpriseList: [],
        enterpriseDetail: '',
        enterpriseRange: '',
        technologyList: [],
        technologyLength: '',
        newsList: [],
        entity: '',
        absList: [],
        nodes: [],
        edges: [],
        treeData: {},
        outputTableData: [{
            index: 1,
            date: '2016-05-02',
            name: '阿里巴巴翻译平台软件',
            range: '文字识别'
          }, {
            index: 2,
            date: '2016-05-04',
            name: '阿里巴巴中文站开发质量实时检测系统软件',
            range: '质量检测'
          }, {
            index: 3,
            date: '2016-05-01',
            name: '阿里巴巴零售通无忧购服务工具软件',
            range: '软件工程'
          }, {
            index: 4,
            date: '2016-05-03',
            name: '阿里巴巴零售通客户关系管理客户端iOS版软件',
            range: 'IOS'
          }],
          patentTableData: [{
            index: 1,
            date: '2016-05-02',
            name: '阿里巴巴翻译平台软件',
            range: '文字识别'
          }, {
            index: 2,
            date: '2016-05-04',
            name: '阿里巴巴中文站开发质量实时检测系统软件',
            range: '质量检测'
          }, {
            index: 3,
            date: '2016-05-01',
            name: '阿里巴巴零售通无忧购服务工具软件',
            range: '软件工程'
          }, {
            index: 4,
            date: '2016-05-03',
            name: '阿里巴巴零售通客户关系管理客户端iOS版软件',
            range: 'IOS'
          }],
          paperTableData: [{
            index: 1,
            date: '2016-05-02',
            name: '阿里巴巴翻译平台软件',
            range: '文字识别'
          }, {
            index: 2,
            date: '2016-05-04',
            name: '阿里巴巴中文站开发质量实时检测系统软件',
            range: '质量检测'
          }, {
            index: 3,
            date: '2016-05-01',
            name: '阿里巴巴零售通无忧购服务工具软件',
            range: '软件工程'
          }, {
            index: 4,
            date: '2016-05-03',
            name: '阿里巴巴零售通客户关系管理客户端iOS版软件',
            range: 'IOS'
          }],
          getFundTableData: [{
            index: 1,
            date: '2016-05-02',
            name: 'IBM',
            fundAmount: '300'
          }, {
            index: 2,
            date: '2016-05-04',
            name: '微软',
            fundAmount: '500'
          }, {
            index: 3,
            date: '2016-05-01',
            name: '微策略',
            fundAmount: '500'
          }, {
            index: 4,
            date: '2016-05-03',
            name: 'Google',
            fundAmount: '1000'
          }],
          outFundTableData: [{
            index: 1,
            date: '2016-05-02',
            name: '百度',
            fundAmount: '200'
          }, {
            index: 2,
            date: '2016-05-04',
            name: '京东',
            fundAmount: '300'
          }, {
            index: 3,
            date: '2016-05-01',
            name: '今日头条',
            fundAmount: '300'
          }, {
            index: 4,
            date: '2016-05-03',
            name: 'keep',
            fundAmount: '100'
          }],
        width:700,
        height:350,
        tagsNum:20,
        RADIUS:100,
        speedX:Math.PI/360,
        speedY:Math.PI/360,
        tags: [],
        showNews: ''
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
      popOut(){
        this.showPop = !this.showPop;
      },
      showRightPop(){
        this.showRight= !this.showRight;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      changeShowNews(a){
        this.showNews = a;
      },
      displayNews(){
        this.showNews = '';
      },
      getCompanies(e){
        if(this.type.id == 1){
          axios.get(common.url1+"findCompanyByCompany",{
            params:{
              company : e
            },
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            var self = this;
            if(res){
              this.enterpriseList = res.data.data;
              console.log(res.data.data);
              // this.nodeList = [];
              // self.enterpriseLength = res.data.data.length;
              // this.enterpriseList.concat(res.data.data);
              // for(var enterprise of this.enterpriseList){
              //   if(enterprise){
              //     this.treeData.push({"name": enterprise.name, "children": []});
              //   }
              //   this.drawTree(data);
              // }
            }
            else{
              console.log(err);
            }
          })
        } 
        else if(this.type.id == 2){
          axios.get(common.url1+"findComByTech",{
            params:{
              technologyName : e
            },
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res){
              this.enterpriseList = res.data.data;
              console.log(res.data)
            }
            else{
              console.log(err);
            }
          })
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
          //     this.enterpriseList = res.data.data;
          //     console.log(res.data)
          //   }
          //   else{
          //     console.log(err);
          //   }
          // })
        }else{
          alert("好像除了一些状况！");
        }
      },
      getNews(e){
        if(this.type.id == 1){
           axios.get(common.url1+"findNewsByCompany",{
            params:{
              company : e
            },
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            if(res) {
              this.newsList = res.data.data;
              console.log(res.data)
            }
            else {
              console.log(err);
            }
          })
        }
       
      },
      getCompanyDetail(e){
        axios.get(common.url2+"enterpriseBaseImport/comName",{
          params:{
            enterprise: e
          },
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          if(res.data[0]){
            this.enterpriseDetail = res.data[0];
            this.enterpriseRange = res.data[0].opeRange.split("，");
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
            console.log(this.absList)
          }
            console.log(err);
        })
      },
      getEnterprises(e){
        var self = this;
        axios.get(common.url2+"absImport/toName",{
          params:{
            name : e
          },
          datatype:'jsonp',
          async: true,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          this.nodeList = [];
           self.enterpriseLength = res.data.length;
           this.enterpriseList.concat(res.data);
           for(var enterprise of this.enterpriseList){
             if(enterprise){
               this.treeData.push({"name": enterprise.name, "children": []});
             }
             this.drawTree(data);
           }
        })
      },
      getTechnologies(e){
        var self = this;
        this.nodeList = [];
        console.log(e)
        axios.get(common.url2+"enterpriseTechnologyImport/comName",{
          params:{
            comName : e
          },
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          console.log(res.data);
           this.technologyLength = res.data.length;
           this.technologyList = res.data[0].technologys.split(",");
           for(var technology of self.technologyList){
             if(technology){
               self.nodeList.push({"name": technology.name, "type": 3});
             }else{
             }
           }
        })
      },
      getTreeData(e) {
        this.treeData.name = this.entity;
        this.treeData.children = [];
        this.treeData.children.push({"name": "企业", "children": []});
        this.treeData.children.push({"name": "技术", "children":[]});
        this.treeData.children.push({"name": "新闻", "children":[]});

        if( this.type.id ==1 ){
          axios.get(common.url1+"findCompanyByCompany",{
            params:{
              company : e
            },
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            
            if(res){
              // console.log(res.data)
              if(res.data.code == 200){
                for(var item of res.data.data) {
                  this.treeData.children[0].children.push({"name": item.name, "children": []});
                }
              }
              axios.get(common.url1+"findCompanyByTechnology",{
                params:{
                  technology : e
                },
                datatype:'jsonp',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
              }).then((res, err) => {
                
                this.technologyLength = res.data.data.length;
                console.log(res.data.data)
                this.technologyList = res.data.data;
                // console.log(this.technologyList);
                if(res.data.code == 200){
                  for(var technology of this.technologyList){
                    if(technology){
                      this.treeData.children[1].children.push({"name": technology, "children":[]});
                    }else{
                    }
                  }
                }
                axios.get(common.url1+"findNewsByCompany",{
                  params:{
                    company: e
                  },
                  datatype:'jsonp',
                  async: true,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  }
                }).then((res, err) => {
                  console.log(res.data)
                  if(res.data.code ==200){
                    for(var item of res.data.data) {
                      this.treeData.children[2].children.push({"name": item.title, "children": []});
                    }
                  }
                console.log(this.treeData);
                this.drawTree(this.treeData);
                })
              })
            }
            else{
              console.log(err);
            }
          })
        }else if(this.type.id == 2){
          axios.get(common.url1+"findComByTech",{
            params:{
              technologyName : e
            },
            datatype:'jsonp',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            }
          }).then((res, err) => {
            
            if(res){
              console.log(res.data)
              if(res.data.code == 200){
                for(var item of res.data.data) {
                  this.treeData.children[0].children.push({"name": item, "children": []});
                }
              }
              axios.get(common.url1+"findTechnologyChildrens",{
                params:{
                  technology : e
                },
                datatype:'jsonp',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                }
              }).then((res, err) => {
                
                this.technologyLength = res.data.data.length;
                console.log(res.data.data)
                this.technologyList = res.data.data;
                // console.log(this.technologyList);
                if(res.data.code == 200){
                  for(var technology of this.technologyList){
                    if(technology){
                      this.treeData.children[1].children.push({"name": technology, "children":[]});
                    }else{
                    }
                  }
                }
                axios.get(common.url1+"findNewsByTechnology",{
                  params:{
                    technologyName: e
                  },
                  datatype:'jsonp',
                  async: true,
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                  }
                }).then((res, err) => {
                  console.log(res.data)
                  if(res.data.code == 200){
                    for(var item of res.data.data) {
                      this.treeData.children[2].children.push({"name": item.title, "children": []});
                    }
                  }
                console.log(this.treeData);
                this.drawTree(this.treeData);
                })
              })
            }
            else{
              console.log(err);
            }
          })
        }else if(this.type.id == 3){}
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
      rotateX(angleX){
        var cos = Math.cos(angleX);
        var sin = Math.sin(angleX);
        for(let tag of this.tags){
            var y1 = (tag.y- this.CY) * cos - tag.z * sin  + this.CY;
            var z1 = tag.z * cos + (tag.y- this.CY) * sin;
            tag.y = y1;
            tag.z = z1;
        } 
      },
      rotateY(angleY){
          var cos = Math.cos(angleY);
          var sin = Math.sin(angleY);
          for(let tag of this.tags){
              var x1 = (tag.x - this.CX) * cos - tag.z * sin + this.CX;
              var z1 = tag.z * cos + (tag.x-this.CX) * sin;
              tag.x = x1;
              tag.z = z1;
          } 
      },
      listener(event){//响应鼠标移动
          var x = event.clientX - this.CX;
          var y = event.clientY - this.CY;
          this.speedX = x*0.0001>0 ? Math.min(this.RADIUS*0.00002, x*0.0001) : Math.max(-this.RADIUS*0.00002, x*0.0001);
          this.speedY = y*0.0001>0 ? Math.min(this.RADIUS*0.00002, y*0.0001) : Math.max(-this.RADIUS*0.00002, y*0.0001); 
      },
      fetchData(){
        // console.log('路由发送变化doing...');
        location.reload();
      }
    },
    created(){//初始化标签位置
        var self = this;
        let tags = [];
        // this.type = this.$route.query.type;
        this.entity = this.$route.query.entity;
        if(this.$route.query.type == "company"){
          this.type.name = "企业";
          this.type.id = 1;
        } else if(this.$route.query.type == "technology") {
          this.type.name = "技术";
          this.type.id = 2;
        }else if(this.$route.query.type == "patent") {
          this.type.name = "专利";
          this.type.id = 3;
        }
        console.log(this.type);
        console.log(this.entity);
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
      
      // console.log(this.$route.query.entity);
      this.getCompanies(this.entity);
      this.getNews(this.entity);
      // this.getCompanyDetail(this.entity);
      // this.getAbsImport(this.entity);
      // this.getTechnologies(this.entity);
      this.getTreeData(this.entity);
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
      
    },
    components:{
      adminHeader, Timeline, TimelineItem, TimelineTitle
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
  .card {
    background-color: #ffffff;
    border-radius: 5px;
    height: 740px;
    width: 98%;
    margin: 20px auto;
    padding: 10px;
    box-sizing: border-box;
  }
  #main {
    overflow: scroll;
    height: 600px;
    width: 100%;
  }
  .draw-canvas {
    display: inline-block;
    height: 700px;
    width: 49%;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 20px;
  }
  #radar, #bar, #patentBar, #paperBar, #getFundBar, #outFundBar {
    width: 450px;
    height: 500px;
    padding-left: 50px;
  }
  #radar div, #bar div {
    width: 450px !important;
    height: 700px !important;
  }
  .draw-canvas-table {
    display: inline-block;
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    margin-top: 20px;
  }
  /* 基本信息 */
  .el-tab-pane{
    height: 470px;
    overflow-x: hidden;
    overflow-y: scroll;
    text-align: left;
  }
  .title-output{
    font-weight: bold;
    margin: 10px 0 20px 0;
  }
  .output-list{
    margin-top: 10px;
  }
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
  .output-des{
    font-size: 16px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    margin-top: 5px;
  }
  .pop-trigger{
    margin-left: 20px;
    background-color: #84D0FF;
    height: 70px;
    line-height: 70px;
    text-align: center;
  }
  .pop-right{
    width: 15px;
    background-color: #ccc;
    padding: 5px;
    position: absolute;
    right: 0;
    top: 200px;
  }
  .el-icon-back{
    position: absolute;
    right: 25px;
    top: 250px;
  }
  .person{
    width: 80px;
    height: 80px;
  }
  .company-link {
    margin-bottom: 20px; 
  }
  /* ---nav3--- */
  .news-card1, .news-card2 {
    background-color: #ffffff;
    border-radius: 5px;
  }
  .news-card1 {
    width: 730px;
    height: 500px;
    margin: 10px 0;
    padding: 20px;
  }
  .news-card2 {
    width: 90%;
    height: 1040px;
    padding: 20px;
    margin-top: 10px;
    text-align: left;
  }
  #pie {
    width: 700px;
    height: 450px;
  }
  .newsList {
    border-bottom: 1px solid #eee;
    padding: 10px; 
    position: relative;
  }
  .pop-out {
    position: absolute;
    top: 0;
    left: -220px;
    width: 200px;
    border: 1px solid #999999;
    border-radius: 5px;
    padding: 10px;
    background-color: #ffffff;
    box-shadow: -5px 5px 5px #999999;
  }
  .cell {
    text-align: center;
  }
</style>
