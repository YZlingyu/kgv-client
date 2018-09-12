<template>
<el-container style="height:100%;">
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose2">
    <span>请选择产业</span>
    <el-select v-model="technology" placeholder="请选择">
    <el-option
      v-for="item in technologys"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    <span slot="footer" class="dialog-footer" style="display:flex;justify-content: center;">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
              <div style="height: 50px; line-height: 50px;background-color: #ccc;text-align:center;">人工智能</div>
            </div>
            <div class="field-wrapper">
              <div class="item item-title">工作表</div>
                <el-collapse v-model="activeName" accordion>
                  <el-collapse-item title="一致性 Consistency" name="1" style="background-color: rgb(84, 92, 100);">
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
                  <el-collapse-item title="反馈 Feedback" name="2">
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
                  </el-collapse-item>
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
            <div class="drag-item border-1px" @drop='drop4($event)' @dragover='allowDrop($event)' @dragleave='dragleave4($event)'><label class="drag-title-label">次轴</label></div>
            <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave($event)'><label class="drag-title-label">筛选器</label></div>
            <div class="drag-item border-1px" @drop='drop2($event)' @dragover='allowDrop($event)' @dragleave='dragleave($event)'>
            <label class="drag-title-label">颜色</label>
            <el-color-picker v-model="defaultColor"></el-color-picker>
            </div>
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
          <right-bar :baseUrl="baseUrl" :option="option" :type="type" :tableName="tableName" :searchmeasure="searchmeasure" :searchdimension="searchdimension" :searchmethods="searchmethods" @update-type="update" @update-option="updateOption"></right-bar>
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
  var  BASE_URL ="http://127.0.0.1:8088/lxy/";
  export default {
    data() {
      return {
        technologys: [{
          value: 1,
          label: '人工智能'
        }, {
          value: 2,
          label: '新材料'
        }],
        technology: '',
        dialogVisible: true,
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
        tableName: 'worker',
        myChart: {},
        option: {
          series: []
        },//
        // optionUpdate: {},
        dimensionList: [
          {
            t_name:"a"
          },
          {
            t_name:"b"
          },
          {
            t_name:"c"
          },
          {
            t_name:"d"
          }],
        measureList: [],
        searchdimension: [],
        searchmeasure: [],
        searchmethods: [],
        color: '#f00',
        type: 1 //0柱状图，1堆叠柱状图，2条形图，3条形堆叠图，4折现图，5饼图，6堆叠面积图
      }
    },
    computed:{
    },
    watch: {
      type: {
      handler: function(){
      this.getData('worker',this.type,this.searchdimension,this.searchmeasure, this.searchmethods);
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
          this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods);

      },
      drop2(event) {
          event.preventDefault();
      },
      drop3(event) {
          event.preventDefault();
          //申明方法DOM
          let computeDisplay = document.createElement("i");
          computeDisplay.innerText = '(求和)';
          let computeSelect = document.createElement("div");
          var searchMethodsSelect = this.searchmethods;
      
          computeSelect.setAttribute('class','computed');
          computeSelect.innerHTML = '<ul index='+searchMethodsSelect.length+' class="measure-compute"><li><a data-method="sum">求和</a></li><li><a data-method="avg">平均数</a></li><li><a data-method="count">计数</a></li><li><a data-method="max">最大值</a></li><li><a data-method="min">最小值</a></li></ul>';
          //将methods DOM加入拖拽DOM元素中
          searchMethodsSelect.push('sum');
          this.searchmeasure.push(this.measureDrag.getElementsByTagName('a')[0].getAttribute('data-column'));
          this.measureDrag.getElementsByTagName("a")[0].appendChild(computeDisplay);
          this.measureDrag.getElementsByTagName("a")[0].appendChild(computeSelect);

          this.measureDrag.getElementsByTagName("a")[0].addEventListener('click', function(){
                var lc = this.lastChild.lastChild;
                lc.style.display='block';

          });

          event.target.appendChild(this.measureDrag);

          var that = this;
          $('.measure-compute li').on('click',function(){
            var index = $(this).parent().attr("index");
            //更新显示文字
            let selectMethodText = $(this).find('a').text();
            $(this).parents('div').prev('i').text('(' + selectMethodText + ')');
            //保存对应methods
            let selectMethod = $(this).find('a').attr('data-method');
            $(this).parent().hide();
            searchMethodsSelect[index] = selectMethod;
            // console.log(searchMethodsSelect);
            that.getData(that.tableName, that.type, that.searchdimension, that.searchmeasure, searchMethodsSelect);
            return false;
          });


          this.searchmethods = searchMethodsSelect;
          // console.log(this.searchmeasure);
        
          this.getData(this.tableName, this.type, this.searchdimension, this.searchmeasure, this.searchmethods);
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
      }
    },
    created(){//初始化标签位置
      
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
            color: #000;
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
