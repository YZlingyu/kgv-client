<template>
<el-container style="height:100%;">
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose2">
    <span>请选择产业</span><br/>
    <el-select v-model="technology" placeholder="请选择" style="width:100%; margin: 10px auto;" @change="chooseTechnologyChain">
      <el-option
        v-for="item in technologys"
        :key="item.value"
        :label="item.value"
        :value="item.label">
      </el-option>
    </el-select><br/>
    <span>请填写可视化工作表信息</span><br/>
    <div class="worksheet" v-for="sheet in workSheet" :key="sheet.index">
      <el-row class="axis-row">
      <p>工作表名称：</p>
      <el-input v-model="sheet.name" placeholder="请输入内容"></el-input>
      <!-- <el-checkbox-group v-model="checkList" style="margin: 10px auto;">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 B"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
      </el-checkbox-group> -->
    </el-row>
    <el-row class="axis-row">
      <p>维度</p>
      <el-input v-model="sheet.abscissa" placeholder="请输入内容"></el-input>
    </el-row>
    <el-row class="axis-row">
      <p>度量</p>
      <el-input v-model="sheet.ordinate" placeholder="请输入内容"></el-input>
    </el-row>
    </div>
    <el-row style="text-align:center;">
      <i class="el-icon-circle-plus" style="margin: 10px auto; text-align: center;" @click="addWorkSheet"></i>
    </el-row>
    
    <span slot="footer" class="dialog-footer" style="display:flex;justify-content: center;">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <!-- <el-button type="primary" @click="saveWorksheet">确 定</el-button> -->
    </span>
  </el-dialog>
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
      <div class="analysis" v-show="showFlag">
        <div class="left-bar" ref="leftBar" :style="{height:clientHeight+'px'}">
          <div class="left-bar-content">
            <div class="table-list-wrapper">
              <div class="item item-title">产业链</div>
              <!-- <li class="item table-list-item"><a>外勤工作表</a></li> -->
              <div style="height: 50px; line-height: 50px;background-color: #ccc;text-align:center;">{{technologyName}}</div>
            </div>
            <div class="field-wrapper">
              <div class="item item-title">工作表</div>
                <el-collapse v-model="activeName" accordion  v-for="sheet in workSheet" :key="sheet.index">
                  <el-collapse-item :title=sheet.name name="1" style="background-color: rgb(84, 92, 100);">
                    <div class="item item-title">字段</div>
                    <div class="dimension-wrapper">
                      <div class="item dimension-name">维度</div>
                      <li class="item dimension-item" draggable="true" @dragstart='drag1($event)' v-for="dimension in sheet.abscissa.split(',')"><a :data-column="dimension">{{dimension}}</a></li>
                    </div>
                    <div class="measure-wrapper">
                      <div class="item measure-name">度量</div>
                      <li class="item measure-item" draggable="true" @dragstart='drag2($event)' v-for="measure in sheet.ordinate.split(',')"><a :data-column="measure" class="measure-name">{{measure}}</a>
                      </li>
                    </div>
                  </el-collapse-item>
                  <!-- <el-collapse-item title="反馈 Feedback" name="2">
                    <div class="item item-title">字段</div>
                    <div class="dimension-wrapper">
                      <div class="item dimension-name">维度</div>
                      <li class="item dimension-item" draggable="true" @dragstart='drag1($event)' v-for="dimension in dimensionList"><a :data-column="dimension.t_name">{{dimension.t_name}}</a></li>
                    </div>
                    <div class="measure-wrapper">
                      <div class="item measure-name">度量</div>
                      <li class="item measure-item" draggable="true" @dragstart='drag2($event)' v-for="measure in measureList"><a :data-column="measure.t_name" class="measure-name">{{measure.t_name}}</a>
                      </li>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="效率 Efficiency" name="3">
                    <div class="item item-title">字段</div>
                    <div class="dimension-wrapper">
                      <div class="item dimension-name">维度</div>
                      <li class="item dimension-item" draggable="true" @dragstart='drag1($event)' v-for="dimension in dimensionList"><a :data-column="dimension.t_name">{{dimension.t_name}}</a></li>
                    </div>
                    <div class="measure-wrapper">
                      <div class="item measure-name">度量</div>
                      <li class="item measure-item" draggable="true" @dragstart='drag2($event)' v-for="measure in measureList"><a :data-column="measure.t_name" class="measure-name">{{measure.t_name}}</a>
                      </li>
                    </div>
                  </el-collapse-item>
                  <el-collapse-item title="可控 Controllability" name="4">
                   <div class="item item-title">字段</div>
                    <div class="dimension-wrapper">
                      <div class="item dimension-name">维度</div>
                      <li class="item dimension-item" draggable="true" @dragstart='drag1($event)' v-for="dimension in dimensionList"><a :data-column="dimension.t_name">{{dimension.t_name}}</a></li>
                    </div>
                    <div class="measure-wrapper">
                      <div class="item measure-name">度量</div>
                      <li class="item measure-item" draggable="true" @dragstart='drag2($event)' v-for="measure in measureList"><a :data-column="measure.t_name" class="measure-name">{{measure.t_name}}</a>
                      </li>
                    </div>
                  </el-collapse-item> -->
                </el-collapse>
              </div>
            </div>
        </div>
        <div class="main-content" ref="mainContent" :style="{height:clientHeight+'px'}">
          <div class="drag-wrapper">
            <div class="drag-item border-1px" @drop='drop1($event)' @dragover='allowDrop($event)' @dragleave='dragleave1($event)'><label class="drag-title-label">维度</label>
            </div>
            <!-- <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave2($event)'><label class="drag-title-label">对比</label></div> -->
            <div class="drag-item border-1px" id="measure-list" @drop='drop3($event)' @dragover='allowDrop($event)' @dragleave='dragleave3($event)'><label class="drag-title-label">度量</label></div>
            <!-- <div class="drag-item border-1px" @drop='drop4($event)' @dragover='allowDrop($event)' @dragleave='dragleave4($event)'><label class="drag-title-label">次轴</label></div>
            <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave($event)'><label class="drag-title-label">筛选器</label></div> -->
            <!-- <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave($event)'> -->
            <!-- <label class="drag-title-label">颜色</label>
            <el-color-picker v-model="defaultColor"></el-color-picker> -->
            <!-- </div> -->
          </div>
          <div class="graph-wrapper">
            <div class="graph">
              <!-- <v-column @optionConfig="_initOption" :optionUpdate="optionUpdate"></v-column> -->
            </div>
            <!--  <div class="graph">
              <img src="./pie.png" style="{width: 900px;height: 400px;}">
            </div> -->
          </div>
        </div>
        <div class="right-bar" ref="rightBar" :style="{height:clientHeight+'px'}">
          <right-bar :technologyName="technologyName" :baseUrl="baseUrl" :option="option" :type="type" :tableName="tableName" :searchmeasure="searchmeasure" :searchdimension="searchdimension" :searchmethods="searchmethods" @update-type="update" @update-option="updateOption"></right-bar>
        </div>
      </div>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
  import adminHeader from "../../components/adminHeader.vue"
  import axios from 'axios'
  import * as common from '../../common/common.js'
  import $ from 'jquery';
  import echarts from 'echarts';
  import rightBar from './graph-right';
  import colorPicker from '../../components/plugin/vue-color-picker/colorPicker'
  let qs = require("qs");
  var  BASE_URL ="http://127.0.0.1:8088/lxy/";
  export default {
    data() {
      return {
        technologys: [],
        technologyChainNames: {},
        technology: '',
        technologyName: '人工智能',
        workSheet:[{
          "name": "人工智能",
          "abscissa": "年,月",
          "ordinate": "人数,ss",
          "technologyId": "1"
        }],
        workSheetName: '',
        checkList: [],
        dialogVisible: false,
        show: 1,
        activeName: 'first',
        showFlag: true,
        baseUrl: BASE_URL,
        defaultColor: '#409EFF',
        clientHeight: (document.documentElement.clientHeight - 60) || (document.body.clientHeight - 60),
        dimension: '',
        dimensionDrag:'',
        measure: '',
        measureDrag: '',
        chartDate: {},
        tableName: '',
        myChart: {},
        option: {
          series: []
        },//
        // optionUpdate: {},
        dimensionList: [],
        measureList: [],
        searchdimension: [],
        searchmeasure: [],
        searchmethods: [],
        color: '#f00',
        type: 1 ,//0柱状图，1堆叠柱状图，2条形图，3条形堆叠图，4折现图，5饼图，6堆叠面积图
        graphData: {
          barLine: {
            // xAxis: [ 2013,2014,2015,2016,2017,2018],
            // seriesData: [72.00, 74.50, 84.7, 89.00, 93.00, 95.00],
            xAxis: [ "Q1'11", "Q2'11", "Q3'11", "Q4'12", "Q1'12", "Q2'12", "Q3'12", "Q4,12", "Q1,13", "Q2'13", "Q3'13", "Q4'13", "Q1,14", "Q2'14", "Q3'14", "Q4'14", "Q1'15", "Q2'15", "Q3'15", "Q4'15", "Q1'16", "Q2'16"],
            seriesData: [62, 96, 66, 68, 64, 138, 125, 102, 186, 283, 211, 141, 321, 555, 394, 942, 769, 398, 911, 485, 636, 1049],
            formatter: "$"
          },
          pie: {
            legendData: ['计算机视觉', '机器人', '自然语言处理', '智能驾驶', '深度学习', '智能金融', '智能医疗', '智能家居', '智能安防', '芯片'],
            seriesData: [
                {value:96, name:'计算机视觉'},
                {value:92, name:'机器人'},
                {value:77, name:'自然语言处理'},
                {value:38, name:'智能驾驶'},
                {value:26, name:'深度学习'},
                {value:15, name:'智能金融'},
                {value:10, name:'智能医疗'},
                {value:9, name:'智能家居'},
                {value:5, name:'智能安防'},
                {value:3, name:'芯片'}]
          },
          verticalBar: {
            yAxis: ['计算机视觉', '机器人', '自然语言处理', '智能驾驶', '深度学习', '智能金融', '智能医疗', '智能家居', '智能安防', '芯片'],
            seriesData: [{
              type: 'bar',
              data: [96, 92, 77, 38, 26, 15, 10, 9, 5, 3]
           }],
          },
          barAndLine: {
            xAxis: [ "Q1'11", "Q2'11", "Q3'11", "Q4'12", "Q1'12", "Q2'12", "Q3'12", "Q4,12", "Q1,13", "Q2'13", "Q3'13", "Q4'13", "Q1,14", "Q2'14", "Q3'14", "Q4'14", "Q1'15", "Q2'15", "Q3'15", "Q4'15", "Q1'16", "Q2'16"],
            // seriesData: [62, 96, 66, 68, 64, 138, 125, 102, 186, 283, 211, 141, 321, 555, 394, 942, 769, 398, 911, 485, 636, 1049],
            formatter: "$",
            // xAxis: ['计算机视觉', '机器人', '自然语言处理', '智能驾驶', '深度学习', '智能金融', '智能医疗', '智能家居', '智能安防', '芯片'],
            // seriesData: [ {
            //     type:'bar',
            //     data:[96, 92, 77, 38, 26, 15, 10, 9, 5, 3]
            // },
            seriesData: [ {
                type:'bar',
                data:[62, 96, 66, 68, 64, 138, 125, 102, 186, 283, 211, 141, 321, 555, 394, 942, 769, 398, 911, 485, 636, 1049]
            },
            {
                type:'line',
                yAxisIndex: 1,
                data:[11, 21, 13, 22, 20, 38, 37, 38, 43, 50, 63, 47, 70, 77, 84, 80, 92, 84, 120, 100, 134, 121]
            }]
          },
          stack: {
            xAxis: ['计算机视觉', '机器人', '自然语言处理', '智能驾驶', '深度学习', '智能金融', '智能医疗', '智能家居', '智能安防', '芯片'],
            seriesData: [
                {
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[96, 92, 77, 38, 26, 15, 10, 9, 5, 3]
                }
            ]
          }
        }
      }
    },
    computed:{
    },
    watch: {
      type: {
      handler: function(){
        console.log(this.type);
        if(this.type == 2){
          this.option = this.drawPie(this.graphData.pie.legendData, this.graphData.pie.seriesData);
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this._init();
        }else if(this.type == 3){
          this.option = this.drawVerticalBar(this.graphData.verticalBar.yAxis, this.graphData.verticalBar.seriesData);
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this._init();
        }else if(this.type == 4){
          this.option = this.drawBarLine(this.graphData.barAndLine.xAxis, this.graphData.barAndLine.seriesData, this.graphData.barAndLine.formatter, "");
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this._init();
        }else if(this.type == 5){
          this.option = this.drawStack(this.graphData.stack.xAxis, this.graphData.stack.seriesData);
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this._init();
        }else{
          this.option = this.drawBar(this.graphData.barLine.xAxis, this.graphData.barLine.seriesData, this.graphData.barLine.formatter);
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          this._init();
        }
      // this.getData('worker',this.type,this.searchdimension,this.searchmeasure, this.searchmethods);
      },
      //深度观察
      deep: true
    }
    },
    methods: {
      handleClose2(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      saveWorksheet(){
        // console.log()
        for(var i=0; i<this.workSheet.length; i++){
          this.workSheet[i].technologyId = this.technology;
        }
        // console.log(this.workSheet);
        // axios.defaults.headers.post['Content-Type']='application/json;charse=UTF-8'
        var datatosend = qs.stringify({
              workCharts: this.workSheet
            })
        console.log(datatosend)
        axios
          .post(common.url2+"saveWorkChart/"+this.technology,this.workSheet)
          .then(function(response) {
            console.log(response)
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });

        this.dialogVisible = false;
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      addWorkSheet(){
        this.workSheet.push({
          "name": "",
          "abscissa": "",
          "ordinate": "",
          "technologyId": ""
        });
      },
      _init(){
        window.addEventListener('resize', function() {
              this.myChart.resize();
            }.bind(this))
            // this.$emit('optionConfig',this.option);
      },
      _deepCopy(obj) {
        let str, newobj;
        str = newobj = obj instanceof Array ? [] : {};
        if (typeof obj !== 'object') {
          return;
        } else if (window.JSON) {
          str = JSON.stringify(obj) // 系列化对象
          newobj = JSON.parse(str) // 还原
        } else {
          for (var i in obj) {
            newobj[i] = typeof obj[i] === 'object' ? _deepCopy(obj[i]) : obj[i];
          }
        }
        return newobj;
      },
      // _initOption(option){
      //   this.optionUpdate = option;
      // },
      update(utype) { //根据左边修改图表type
        this.type = utype;
      },
      showFlagMethod(flag) {
        this.showFlag = flag;
      },
      getData(table,type,dimension,measure,methods){ //获取拖拽后的数据，并生成图表
        this.$http.get(BASE_URL+'chart/query?dimension='+dimension+'&table='+table+'&type='+type+'&values='+measure+'&methods='+methods).then((response) => {
            var data = response.body;
            console.log(data)
            this.option = this._deepCopy(data);
            // console.log(this.option);
            this.myChart.setOption(this.option,true);//true表示和之前的option合并
            this._init();
          });
      },
      updateOption(newOption){
        console.log(newOption);
        this.option = newOption;
        this.myChart.setOption(this.option,true);//true表示和之前的option合并
        this._init();
      },
      headleChangeColor (color) {
        // console.log(`颜色值改变事件：${color}`);
        console.log("11111");
        console.log(color);
      },
      drag1(event) {
        this.dimension = event.currentTarget;
        //通过复制被拖拽节点，使原来的位置上仍保存节点
        this.dimensionDrag = this.dimension.cloneNode(true);
      },
      drag2(event) {
        this.measure = event.currentTarget;
        //通过复制被拖拽节点，使原来的位置上仍保存节点
        this.measureDrag = this.measure.cloneNode(true);
        // let dt = event.dataTransfer;
        // dt.setData("Text", event.target.id);
        // dt.effectAllowed = "copy";
      },
      drop1(event) {
          event.preventDefault();
          event.target.appendChild(this.dimensionDrag);
          let dimensionDragList = event.target.getElementsByTagName('a');
          var dimensionValues = [];
          for(let i in dimensionDragList){
            if(dimensionDragList[i].innerText != undefined){
              dimensionValues.push(dimensionDragList[i].getAttribute('data-column'));
            }
          }
          this.searchdimension = dimensionValues;
          // this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods);
          this.option = this.drawBar(this.graphData.barLine.xAxis,[])
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          // this._init();
      },
      drop2(event) {
          event.preventDefault();
      },
      drop3(event) {
          event.preventDefault();
          //申明方法DOM
          let computeDisplay = document.createElement("i");
          computeDisplay.innerText = '';
          // computeDisplay.innerText = '(求和)';
          let computeSelect = document.createElement("div");
          var searchMethodsSelect = this.searchmethods;
      
          // computeSelect.setAttribute('class','computed');
          // computeSelect.innerHTML = '<ul index='+searchMethodsSelect.length+' class="measure-compute"><li><a data-method="sum">求和</a></li><li><a data-method="avg">平均数</a></li><li><a data-method="count">计数</a></li><li><a data-method="max">最大值</a></li><li><a data-method="min">最小值</a></li></ul>';
          //将methods DOM加入拖拽DOM元素中
          // searchMethodsSelect.push('sum');
          this.searchmeasure.push(this.measureDrag.getElementsByTagName('a')[0].getAttribute('data-column'));
          this.measureDrag.getElementsByTagName("a")[0].appendChild(computeDisplay);
          this.measureDrag.getElementsByTagName("a")[0].appendChild(computeSelect);

          this.measureDrag.getElementsByTagName("a")[0].addEventListener('click', function(){
                var lc = this.lastChild.lastChild;
                lc.style.display='block';

          });

          event.target.appendChild(this.measureDrag);

          var that = this;
          // $('.measure-compute li').on('click',function(){
          //   var index = $(this).parent().attr("index");
          //   //更新显示文字
          //   let selectMethodText = $(this).find('a').text();
          //   $(this).parents('div').prev('i').text('(' + selectMethodText + ')');
          //   //保存对应methods
          //   let selectMethod = $(this).find('a').attr('data-method');
          //   $(this).parent().hide();
          //   console.log($(this).parent())
          //   searchMethodsSelect[index] = selectMethod;
          //   // console.log(searchMethodsSelect);
          //   this.option = {"yAxis":{"name":"人数","type":"value"},"xAxis":{"name":"性别","type":"category","data":["女","男"],"boundaryGap":true,"axisLabel":{"show":true,"interval":"0","inside":false}},"legend":{"data":["人数"]},"series":[{"type":"bar","name":"人数","stack":"0","color":null,"data":[5291040,5128368],"areaStyle":null,"yAxisIndex":0,"xAxisIndex":0}],"tooltip":{"show":true,"trigger":"axis","formatter":""}}
          //   this.myChart.setOption(that.option,true);
          //   // that.getData(that.tableName, that.type, that.searchdimension, that.searchmeasure, searchMethodsSelect);
          //   return false;
          // });


          this.searchmethods = searchMethodsSelect;
          // console.log(this.searchmeasure);
          this.option = this.drawBar(this.graphData.barLine.xAxis,this.graphData.barLine.seriesData,this.graphData.barLine.formatter)
          this.myChart.setOption(this.option,true);//true表示和之前的option合并
          // this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods);
      },
      drop4(event) {
          event.preventDefault();
          event.target.appendChild(this.measureDrag);
      },
      allowDrop(event) {
        event.preventDefault();
        // let dt = event.dataTransfer;
        // dt.effectAllowed = "copy";
        // dt.dropEffect = "copy";
      },
      dragleave1(event) {
        event.preventDefault();
        let dom = event.target.parentNode;
        console.log(dom);
        if(dom.nodeName.toLowerCase() == 'li'){
            $(dom).remove();
        }
        // this.optionUpdate.xAxis = {};
        // this.myChart.setOption(this.option,true);
      },
      // dragleave2(event) {
      //    event.preventDefault();
      //    let domRemove = event.currentTarget;
      //    $(domRemove).find('.item').remove();
      //    this.option.series = [];
      //    this.myChart.setOption(this.option,true);
      // },
      dragleave3(event) {
        event.preventDefault();
        let dom = event.target.parentNode;
        if(dom.nodeName.toLowerCase() == 'li'){
            $(dom).remove();
        }
        // let dom = event.target.parentNode;
        // if(dom.className.indexOf('dimension-item') || dom.className.indexOf('measure-item')){
        //    $(dom).remove();
        //    event.stopPropagation();
        // }
        // let domRemove = event.currentTarget;
        // $(domRemove).find('.item').remove();
        // this.optionUpdate.series = [];
        // this.myChart.setOption(this.option,true);
      },
      dragleave4(event) {
        event.preventDefault();
        let dom = event.target.parentNode;
        if(dom.nodeName.toLowerCase() == 'li'){
            // $(dom).remove();
        }
        // let dom = event.target.parentNode;
        // if(dom.className.indexOf('dimension-item') || dom.className.indexOf('measure-item')){
        //    $(dom).remove();
        // }
        // let domRemove = event.currentTarget;
        // $(domRemove).find('.item').remove();
        // this.myChart.setOption(this.option,true);
      },
      dragleave(event) {
        event.preventDefault();
        let dom = event.target.parentNode;
        if(dom.nodeName.toLowerCase() == 'li'){
            // $(dom).remove();
        }
      },
      ischild(a,b) {
        for(; a ; a = a.parentNode) {
            if(a === b){
              return true;
            }
        }
        return false;
      },
      chooseTechnologyChain(){
        // console.log(this.technology);
        // console.log(this.technologys);
        for(var i=0; i<this.technologys.length; i++){
          if(this.technologys[i].label == this.technology){
            this.technologyName = this.technologys[i].value;
          }
        }
        // console.log(this.technologyName);
        // axios.get(common.url2+"getTechnologyChainByName",{
        //   params:{
        //     id: this.searchNode,
        //     name: this.technologyChainNames[this.searchNode]
        //   },
        //   datatype:'jsonp',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //   }
        // }).then((res, err) => {
        //   if(res){
        //   }
        //   else{
        //     console.log(err);
        //   }
        // })
      },
      // drawRadar(id, indicator, data){
      //   var option = {
      //         radar: {
      //             // shape: 'circle',
      //             name: {
      //                 textStyle: {
      //                     color: '#fff',
      //                     backgroundColor: '#999',
      //                     borderRadius: 3,
      //                     padding: [3, 5]
      //               }
      //             },
      //             indicator: [
      //               { name: '社交智能', max: 100},
      //               { name: '知识表示', max: 100},
      //               { name: '随机优化', max: 100},
      //               { name: '遗传算法', max: 100},
      //               { name: '计算机性能分析', max: 100},
      //               { name: '吞吐量', max: 100}
      //             ]
      //         },
      //         series: [{
      //             type: 'radar',
      //             // areaStyle: {normal: {}},
      //             data : [
      //                 {
      //                     value : [40, 55, 33, 17, 5, 8],
      //                     name : '企业'
      //                 }
      //             ]
      //         }]
      //     };

      //   radarChart.setOption(option);
      // },
      drawBar(datax, seriesData, formatter){
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
                    nameRotate: 180,
                    axisLabel: {
                      rotate: 40, 
                    },
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    axisLabel: {
                      formatter: '{value}'+formatter
                    },
                }
            ],
            series : [
                {
                    type:'bar',
                    barWidth: '60%',
                    data: seriesData
                }
            ]
        };
        return option;
      },
      drawBarLine(xAxis, seriesData, formatterX, formatterY) {
        var that = this;
        var option = {
             tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          xAxis: [
              {
                  type: 'category',
                  data: xAxis,
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'+formatterX
              },
            },
            {
              type: 'value',
              axisLabel: {
                formatter: '{value}'+formatterY
              },
            },
          ],
          series: seriesData
        };
        return option;
      },
      drawPie(legendData,seriesData){
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
        return option;
      },
      drawStack(xAxisData,seriesData){
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
                      data : xAxisData
                  }
              ],
              yAxis : [
                  {
                      type : 'value'
                  }
              ],
              series : seriesData
          };
        return option;
      },
      drawVerticalBar(yAxis,series){
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: yAxis
            },
            series: series
        };
        return option;
      }
    },
    created(){//初始化标签位置
       axios.get(common.url2+"getTechnologyList",{
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          console.log(res.data.data)
          if(res){
            for(var i=0;i<res.data.data.length; i++){
              this.technologys.push({
                value: res.data.data[i].name,
                label: res.data.data[i].id
              })
            }
            console.log(this.technologys)
          }
          else{
            console.log(err);
          }
        })
      
      // this.$http.get(BASE_URL+'all/columns?table_name='+this.tableName).then((response) => {
      //   var data = response.body;
      //   // console.log(response);
      //     for(let i in data) {
      //       if(data[i].t_type == 1){
      //         this.measureList.push(data[i]);
      //       } else if(data[i].t_type == 2){
      //         this.dimensionList.push(data[i]);
      //       }
      //     }
      // });
      this.$nextTick(() => {
      });
    },
    mounted(){
      this.entity = this.$route.query.entity;
      this.myChart = echarts.init(document.querySelector('.graph-wrapper .graph'));
      this.myChart.setOption(this.option);
      this._init();
    },
    components:{
      adminHeader, rightBar, colorPicker
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../components/graphBase/css/mixin.styl";
a 
  text-decoration: none;
  color: #999999; 
.el-header 
  background-color: #545c64;
  color: #333;
  text-align: center;
.el-aside
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  height: 100%;

.el-main 
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
.analysis
  position: fixed;
  background-color: #ffffff;
  margin: 20px auto;
  top: 60px;
  width: 100%;
  height: 100%;
  // display: flex;
  .left-bar
    // flex: 0 0 200px;
    width: 200px;
    height: 100%;
    float: left;
    color: #000;
    overflow-y: auto;
    // overflow-x: hidden;
    .el-collapse-item__header
      background-color: rgb(84, 92, 100);
      color: #fff;
    .item
      height: 40px;
      line-height: 40px;
      list-style: none;
      text-align: center;
      a
        color: #7E8C8D;
        // background-color: #ccc;
      a:hover
        display: block;
        height: 40px;
        line-height: 40px;
        background-color: #eee;
        font-weight: bold;
        // background-color: rgba(255,255,255,0.3);
    .item-title
      padding-left: 10px;
      text-align: left;
      font-weight: bold;
  .main-content
    // flex: 1;
    // position: absolute;
    float: left;
    width: 50%;
    // top: 0px;
    // left: 200px;
    // right: 200px;
    height: 100%;
    padding: 5px 15px;
    text-align: left;
    overflow: auto;
    // overflow-x: auto;
    .drag-wrapper
      .drag-item
        height: 40px;
        min-width: 530px;
        line-height: 40px;
        border-1px(#ccc);
        .drag-title-label
          padding-right: 10px;
          color: #000;
        .el-color-picker__trigger
          height: 25px;
          width: 25px;
          margin-top: 5px;
        .measure-item, .dimension-item
          // background-color: #29A2E6;
          position: relative;
          background-color: #366797;
          display: inline-block;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 3px;
          cursor: pointer;
          margin: 0 5px;
          padding: 0px 10px;
          a
            color: #fff;
            font-weight: 700;
            .computed
              position: absolute;
              top: 30px;
              //display: none;
              Width: 100%;
              margin-left: -10px;
              background-color: #fff;
              z-index: 50;
              .measure-compute
                display:none;
              a
                display: block;
                width: 100%;
                color: #314871;
              a:hover
                // background-color: #F5F5F5;
    .graph-wrapper
      min-width: 530px;
      min-height: 450px;
      .graph
        // min-width: 500px;
        // min-height: 400px;
        width: 700px;
        height: 400px;
        margin: 30px 15px 20px;
        border: 1px solid #ccc; 
  .right-bar
    // flex: 0 0 200px;
    width: 200px;
    height: 100%;
    float: left;
    padding: 5px 5px 20px 5px;
    background-color: #ffffff;
    color: #000;
    overflow-y: auto;
    // overflow-x: hidden;
</style>
