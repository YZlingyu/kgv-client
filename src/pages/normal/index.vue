<template>
  <div id="container">
    <div id="slide1" v-bind:style="{height:height1+'px',width:width1+'px'}">
      <el-row style="background-color: #fff;">
        <router-link to="../">
          <img src="../../assets/logo.png" class="logo">
          <h1 class="index-title">中关村四方现代服务产业技术创新战略联盟</h1>
        </router-link>
        <router-link to="/admin/login"><span class="find1">登录</span></router-link>
      </el-row>

      <!-----search------>
      <el-row style="text-align: center;">
        <div class="search-bar">
          <span :class="['search-label', {'active':(searchType === 0)}]" @click="changeType(0)">全部</span>
          <span :class="['search-label', {'active':(searchType === 1)}]" @click="changeType(1)">企业</span>
          <!-- <span :class="['search-label', {'active':(searchType === 2)}]" @click="changeType(2)">专家</span> -->
          <span :class="['search-label', {'active':(searchType === 3)}]" @click="changeType(3)">技术</span>
          <!-- <span :class="['search-label', {'active':(searchType === 4)}]" @click="changeType(4)">成果</span> -->
          <span :class="['search-label', {'active':(searchType === 5)}]" @click="changeType(5)">专利</span>
        </div>
        <el-input placeholder="请输入专家名称、成果名称、技术等，以空格隔开"  v-model="entity" class="input-with-select-index">
          <el-button slot="append" style="background-color: #AE99E5; color:#fff;" @click="searchEntity">搜一下</el-button>
        </el-input>
        <div class="tip">
          <span class="tip-content">热搜：</span>
          <span class="tip-content">人工智能</span>
          <span class="tip-content">人脸识别</span>
          <span class="tip-content">货架商品识别</span>
          <i class="el-icon-refresh tip-content"></i>
          <span class="tip-content">换一批</span>
        </div>
      </el-row>

      <router-link to="/technologyChain"><el-button round class="tech-button">查看技术链</el-button></router-link>

    </div>
    <div id="slide2" v-bind:style="{width:width1+'px'}">
      <div style="padding: 20px 50px; box-sizing: border-box; margin: 20px auto; width: 90%;">
        <h1 class="title">投资关系信息总览</h1>
        <div id="main"></div>
      </div>

    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import navFooter from "../../components/footer.vue"
  import axios from 'axios'
  import * as common from '../../common/common.js'
  var screenWidth = document.body.clientWidth;
  var screenHeight = document.body.clientHeight;
  //console.log(screenHeight);
  export default {
    //name: 'app',
    data() {
      return {
        width1: screenWidth,
        height1: screenHeight,
        searchType: 0,
        entity: '',
        activeName: 'first',
        newsList: []
      }
    },
    methods: {
      searchEntity(){
        var entity = this.entity;
        if(entity){
          switch(this.searchType)
          {
            case 0:
            this.$router.push({path: "./entityInfo?entity="+entity}) 
            break;
            case 1:
            this.$router.push({path: "./entityInfo?type=company&entity="+entity}) 
            break;
            case 2:
            this.$router.push({path: "./entityInfo?type=specialist&entity="+entity}) 
            break;
            case 3:
            this.$router.push({path: "./entityInfo?type=technology&entity="+entity}) 
            break;
            case 4:
            this.$router.push({path: "./entityInfo?type=output&entity="+entity}) 
            break;
            case 5:
            this.$router.push({path: "./entityInfo?type=patent&entity="+entity}) 
            break;
          }
        }
      },
      changeType(x){
        this.searchType = x;
      },
      drawForce(nodes, edges){
        var width = 1200;
        var height = 1000;

        var svg = d3.select("#main")
          .append("svg")
          .attr("width",width)
          .attr("height",height);

        var force = d3.layout.force()
          .nodes(nodes)		//指定节点数组
          .links(edges)		//指定连线数组
          .size([width,height])	//指定范围
          .linkDistance(150)	//指定连线长度
          .charge(-400);	//相互之间的作用力

        force.start();	//开始作用
        //添加连线
        var svg_edges = svg.selectAll("line")
          .data(edges)
          .enter()
          .append("line")
          .style("stroke","#ccc")
          .style("stroke-width",1)
          .attr("marker-end", "url(#resolved)" );

        var color = "#ba3232";

        //添加节点
        var svg_nodes = svg.selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("r",30)
          .style("fill",color)
          .style('stroke',"#9e1e1e")
          .call(force.drag)	//使得节点能够拖动
          .on("mouseover",(d,i) => {
            console.log(this);
            // this.attr.border = "2px solid #000";
          });

         //添加描述节点的文字
        var svg_texts = svg.selectAll(".text")
          .data(nodes)
          .enter()
          .append("text")
          .style("fill", "white")
          .attr("dx", -20)
          .attr("dy", 0)
          .attr("font-size", 12)
          .text(function(d){
            return d.name;
          });

        var edges_text = svg.selectAll(".linetext")
          .data(edges)
          .enter()
          .append("text")
          .attr("class","linetext")
          .style("fill", "black")
          .attr("font-size", 9)
          .text("投资");
         //arrow
        var marker=
          svg.append("marker")
            .attr("id", "resolved")
            .attr("markerUnits","userSpaceOnUse")
            .attr("viewBox", "0 -5 10 10")//坐标系的区域
            .attr("refX",32)//箭头坐标
            .attr("refY", -1)
            .attr("markerWidth", 12)//标识的大小
            .attr("markerHeight", 12)
            .attr("orient", "auto")//绘制方向，可设定为：auto（自动确认方向）和 角度值
            .attr("stroke-width",2)//箭头宽度
            .append("path")
            .attr("d", "M0,-5L10,0L0,5")//箭头的路径
            .attr('fill','#999999');//箭头颜色


        force.on("tick", function(){	//对于每一个时间间隔

         //更新连线坐标
        svg_edges.attr("x1",function(d){ return d.source.x; })
          .attr("y1",function(d){ return d.source.y; })
          .attr("x2",function(d){ return d.target.x; })
          .attr("y2",function(d){ return d.target.y; });

        //更新节点坐标
        svg_nodes.attr("cx",function(d){ return d.x; })
          .attr("cy",function(d){ return d.y; });

        //更新文字坐标
        svg_texts.attr("x", function(d){ return d.x; })
          .attr("y", function(d){ return d.y; });

          edges_text.attr("x",function(d){ return (d.source.x + d.target.x) / 2 ; });
          edges_text.attr("y",function(d){ return (d.source.y + d.target.y) / 2 ; });
        });
      }
    },
    created(){
    },
    mounted(){
      const that = this
      window.onresize = () => {
        return (() => {
          window.width1 = document.body.clientWidth
          window.height1 = document.body.clientHeight
          that.width1 = window.width1
          that.height1 = window.height1
        })()
      };

      axios.get(common.url1+"findRGGAll",{
          datatype:'jsonp',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          }
        }).then((res, err) => {
          var nodes=[];
          for(var item of res.data.nodes){
            nodes.push({"name":item.slice(0,4)})
          }
          var edges = res.data.Relations;
          
            this.drawForce(nodes, edges);
        })
    },
    watch: {
      width1 (val) {
        if (!this.timer) {
          this.width1 = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400)
        }
      },
      height1 (val) {
        if (!this.timer) {
          this.height1 = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400)
        }
      }
    },
    components:{
      navFooter
    }
  }
</script>

<style  scoped lang="less">
  #slide1{
    height: 100%;
    width: 100%;
    background: -webkit-linear-gradient(#172A7F, #006699); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#172A7F,#006699); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#172A7F,#006699); /* Firefox 3.6 - 15 */
    background: linear-gradient(#172A7F,#006699); /* 标准 */
    text-align: center;
  }
  #slide2{
    width: 100%;
    background-color: #ffffff;
  }
  a{
    text-decoration: none;
    color: #000000;
  }
  .index-title {
    color: #000000;
    text-align: left;
    font-size: 18px;
    float: left;
    line-height: 60px;
  }
  /*----top-nav-----*/
  .logo{
    width: 60px;
    height: 60px;
    margin: 10px 30px 10px 30px;
    float: left;
  }
  .find1{
    float:right;
    color: #000;
    line-height: 80px;
    margin-right: 100px;
  }
  .middle{
    width: 300px;
    height: 80px;
    line-height: 80px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    float: left;
  }
  .right{
    width: 300px;
    height: 80px;
    line-height: 80px;
    margin-right: 60px;
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    float:right;
  }

  /*-----search----*/
  .search-bar{
    width: 100%;
    padding: 0 25%;
    box-sizing: border-box;
    text-align: center;
    margin-top: 200px;
    display: flex;
    justify-content: space-between;
  }
  .search-label{
    width: 100px;
    color: #ffffff;
    font-weight: bolder;
    font-size: 16px;
    padding: 10px 0 30px 0;
  }
  .input-with-select-index{
    width: 60%;
    margin: 0 auto 30px auto;
  }
  .tip-content{
    color: #fff;
    margin-right: 10px;
  }
  .el-input-group__append{
    background-color: #AE99E5;
    color: #fff;
  }
  .active{
    background-color: #fff;
    color: #006699;
  }
  .tech-button{
    width:200px;
    margin: 100px auto;
  } 
  /*-----slide2----*/
  #main {
    width: 1200px;
    height: 1000px;
  }
  /* force */
  .text {
    font-size: 9px;
  }
</style>
