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
      <div class="admin-background">
        <el-row>
          <el-col :span="16">
            <div class="admin-graph-background left">
              <div id="graph"></div>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="admin-graph-background right">
              <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="节点设置" name="first">
                  <el-row>
                    <div class="title">基本信息</div>
                  </el-row>
                  <!-- <el-row>
                    <el-col :span="8">
                      <p>Label:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input class="deep" v-model="label" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row> -->
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-col :span="8">
                      <p>Name:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="name" placeholder="" v-bind:disabled="disabledInput"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-col :span="8">
                      <p>ID:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="id" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-col :span="8">
                      <p>Father:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="father" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-button type="primary" plain size="medium" class="size" @click="modify">修改
                      </el-button/>
                      <el-button type="primary" plain size="medium" class="size" @click="save">保存</el-button>
                      <el-button type="danger" plain size="medium" class="size" @click="deletee">删除</el-button>&nbsp;&nbsp;&nbsp;
                      <el-button type="warning" plain size="medium" class="size" @click="appear">添加子节点</el-button>
                  </el-row>
                  <div style="height:16px;"></div>
                  <div id="add" style="display:none">
                    <el-row>
                      <div class="title">添加子节点</div>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>Label:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="a_label" placeholder=""></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>Name:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="a_name" placeholder=""></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>FatherID:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="id" placeholder="" :disabled="true"></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>R_Label:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-select v-model="a_rlabel" placeholder="请选择">
                          <el-option
                            v-for="item in r_labelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>R_Name:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="a_rname" placeholder=""></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-button type="primary" plain size="medium" @click="addyes">确定</el-button>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="关系设置" name="second">
                  <el-row>
                    <div class="title">基本信息</div>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <p>Father:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="rfather" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-col :span="8">
                      <p>Son:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="rson" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <!-- <el-row>
                    <el-col :span="8">
                      <p>R_Label:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="rlabel" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row> -->
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-col :span="8">
                      <p>R_Name:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="rname" placeholder="" v-bind:disabled="disabledInput2"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <el-row>
                    <el-button type="primary" plain size="medium" class="size" @click="r_modify">修改
                      </el-button/>
                      <el-button type="primary" plain size="medium" class="size" @click="r_save">保存</el-button>
                      <el-button type="danger" plain size="medium" class="size" @click="r_deletee">删除</el-button>&nbsp;&nbsp;&nbsp;
                      <el-button type="warning" plain size="medium" class="size" @click="r_appear">添加新关系</el-button>
                  </el-row>
                  <div style="height:30px;"></div>
                  <div id="r_add" style="display:none">
                    <el-row>
                      <div class="title">添加新关系</div>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <p>Father:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="a_rfather" placeholder=""></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>Son:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="a_rson" placeholder=""></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>R_Label:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-select v-model="a_rrlabel" placeholder="请选择">
                          <el-option
                            v-for="item in rr_labelOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-col :span="8">
                        <p>R_Name:</p>
                      </el-col>
                      <el-col :span="14">
                        <el-input v-model="a_rrname" placeholder=""></el-input>
                      </el-col>
                    </el-row>
                    <div style="height:8px;"></div>
                    <el-row>
                      <el-button type="primary" plain size="medium" @click="r_addyes">确定</el-button>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="企业选择" name="third">
                  <el-row>
                    <div class="title">填入要添加企业的节点ID</div>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <p>ID:</p>
                    </el-col>
                    <el-col :span="14">
                      <el-input v-model="id" placeholder="" :disabled="true"></el-input>
                    </el-col>
                  </el-row>
                  <div style="height:8px;"></div>
                  <hr/>
                  <div style="height:8px;"></div>
                  <el-row>
                    <div class="title">勾选要添加的企业:</div>
                  </el-row>
                  <el-row>
                    <div style="height:420px;overflow:auto;overflow-x:hidden;">
                      <el-table ref="multipleTable" :data="companies" tooltip-effect="dark" style="width: 100%;margin-left:0px;" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="60">
                        </el-table-column>
                        <el-table-column label="可选企业" width="280">
                          <template slot-scope="scope">{{ scope.row.com_name }}</template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-row>
                  <div style="height:20px;"></div>
                  <el-row>
                    <el-button type="primary" plain size="medium" @click="addcompany">确定</el-button>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-col>
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
        label: "",
        name: "",
        id: "",
        father: "",
        disabledInput: true,
        disabledInput2: true,
        a_label: "",
        a_name: "",
        a_rlabel: "",
        a_rname: "",
        r_labelOptions: [
          {
            value: '0',
            label: '投资（A轮）'
          },
          {
            value: '1',
            label: '投资（B轮）'
          },
          {
            value: '2',
            label: '投资（天使轮）'
          },
          {
            value: '3',
            label: '投资（A+）'
          },
          {
            value: '4',
            label: '投资（种子轮）'
          },
          {
            value: '5',
            label: '投资（C轮）'
          },
          {
            value: '6',
            label: '投资（D轮）'
          },
          {
            value: '7',
            label: '投资（Pre-A轮）'
          },
          {
            value: '8',
            label: '投资（B+轮）'
          },
          {
            value: '9',
            label: '投资（E轮）'
          },
          {
            value: '10',
            label: '投资'
          },
        ],
        level: 0,

        rfather: "",
        rfatherid: "",
        rson: "",
        rsonid: "",
        rlabel: "",
        rname: "",
        oldname: "",
        a_rfather: "",
        a_rson: "",
        a_rrlabel: "",
        a_rrname: "",
        rr_labelOptions: [
          {
            value: '0',
            label: '投资（A轮）'
          },
          {
            value: '1',
            label: '投资（B轮）'
          },
          {
            value: '2',
            label: '投资（天使轮）'
          },
          {
            value: '3',
            label: '投资（A+）'
          },
          {
            value: '4',
            label: '投资（种子轮）'
          },
          {
            value: '5',
            label: '投资（C轮）'
          },
          {
            value: '6',
            label: '投资（D轮）'
          },
          {
            value: '7',
            label: '投资（Pre-A轮）'
          },
          {
            value: '8',
            label: '投资（B+轮）'
          },
          {
            value: '9',
            label: '投资（E轮）'
          },
          {
            value: '10',
            label: '投资'
          }
        ],

        companies: [],
        multipleSelection: [],
      }
    },
    methods: {
      handleClick(tab, event) {
      //点击tab
      var that = this;
      console.log(tab, event);
      document.getElementById("add").style.display = "none";
      document.getElementById("r_add").style.display = "none";
      axios
        .post(common.url3+"find_enterprise")
        .then(function(response) {
          console.log(response)
          that.companies = response.data.enterprises;
        })
        .catch(function(error) {
          console.log(error);
          alert("error!");
        });
      },
      draw(nodes, edges) {
        var that = this;
        var width = 770;
        var height = 680;
        var svg = d3
          .select("#graph")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        var force = d3.layout
          .force()
          .nodes(nodes) //指定节点数组
          .links(edges) //指定连线数组
          .size([width, height]) //指定范围
          .linkDistance(150) //指定连线长度
          .charge(-400); //相互之间的作用力

        force.start(); //开始作用

        //console.log(nodes);
        //console.log(edges);

        //添加连线
        var svg_edges = svg
          .selectAll("line")
          .data(edges)
          .enter()
          .append("line")
          .style("stroke", "#d0d0d0")
          .style("stroke-width", 3.4)
          .on("click", function(d, i) {
            that.rfather = edges[i].source.name;
            that.rfatherid = edges[i].source.id;
            that.rson = edges[i].target.name;
            that.rsonid = edges[i].target.id;
            that.rlabel = edges[i].rel;
            that.rname = edges[i].properties.name;
            that.activeName = "second";
            document.getElementById("r_add").style.display = "none";
          });

        //var color = d3.scale.category20();

        //添加节点
        var svg_nodes = svg
          .selectAll("circle")
          .data(nodes)
          .enter()
          .append("circle")
          .attr("r", 20)
          .style("fill", function(d, i) {
            if (nodes[i].level == "0") {
              return "#E800E8";
            } else if (nodes[i].level == "1") {
              return "FF8000";
            } else if (nodes[i].level == "2") {
              return "#6EB0EA";
            } else if (nodes[i].level == "3") {
              return "8CEA00";
            } else if (nodes[i].level == "4") {
              return "#90E4EA";
            } else if (nodes[i].level == "5") {
              return "#7D7DFF";
            } else if (nodes[i].level == "6") {
              return "#80FFFF";
            } else if (nodes[i].level == "7") {
              return "#95CACA";
            } else if (nodes[i].level == "8") {
              return "#D2A2CC";
            } else if (nodes[i].level == "9") {
              return "#E8E8D0";
            } else {
              return "#ADADAD";
            }
          })
          // .style("stroke", "black")
          // .style("stroke-width", 1)
          .call(force.drag) ////使得节点能够拖动
          .on("click", function(d, i) {
            console.log(d)
            that.name = nodes[i].name;
            that.id = nodes[i].id;
            that.label = nodes[i].type;
            that.father = nodes[i].father;
            that.activeName = "first";
            that.level = nodes[i].level;
            document.getElementById("add").style.display = "none";
          });

        //添加描述节点的文字
        var svg_texts = svg
          .selectAll("text")
          .data(nodes)
          .enter()
          .append("text")
          .style("fill", "black")
          .attr("dx", -50)
          .attr("dy", 30)
          .text(function(d) {
            return d.name;
          });

        force.on("tick", function() {
          //对于每一个时间间隔

          //更新连线坐标
          svg_edges
            .attr("x1", function(d) {
              return d.source.x;
            })
            .attr("y1", function(d) {
              return d.source.y;
            })
            .attr("x2", function(d) {
              return d.target.x;
            })
            .attr("y2", function(d) {
              return d.target.y;
            });

          //更新节点坐标
          svg_nodes
            .attr("cx", function(d) {
              return d.x;
            })
            .attr("cy", function(d) {
              return d.y;
            });

          //更新文字坐标
          svg_texts
            .attr("x", function(d) {
              return d.x;
            })
            .attr("y", function(d) {
              return d.y;
            });
        });
      },

      appear() {
        //点击添加子节点
        document.getElementById("add").style.display = "";
      },

      modify() {
        //点击修改
        this.disabledInput = false;
      },

      save() {
        //点击保存
        var that = this;
        axios
          .post(common.url3+"mod_node/"+this.id+"/"+this.name
            // qs.stringify({
            //   id: this.id,
            //   name: this.name
            // })
          )
          .then(function(response) {
            console.log(response+1111111);
            that.disabledInput = true;
            alert("修改成功！");
            document.getElementById("graph").innerHTML = "";
            that.draw(response.data[0], response.data[1]);
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });
      },

      addyes() {
        //点击确定
        console.log(this.level);
        var that = this;
        axios
          .post(
            common.url3+"add_node/"+this.id+"/"+this.level+"/"+
            this.a_name+"/"+this.a_label+"/"+this.a_rlabel+"/"+this.a_r_name
            // qs.stringify({
            //   // params: {
            //   father: this.id,
            //   // father_level: this.
            //   name: this.a_name,
            //   label: this.a_label,
            //   r_type: this.a_rlabel,
            //   r_name: this.a_rname
            // })
          )
          .then(function(response) {
            console.log(response);
            alert("添加成功！");
            document.getElementById("add").style.display = "none";
            that.a_rlabel = "";
            that.a_rname = "";
            that.a_label = "";
            that.a_name = "";
            document.getElementById("graph").innerHTML = "";
            that.draw(response.data[0], response.data[1]);
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });
      },

      deletee() {
        //点击删除
        this.$confirm("此操作将删除该节点, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var that = this;
            axios
              .post(common.url3+"del_node/"+this.id
                // qs.stringify({
                //   // params: {
                //   id: this.id
                // })
              )
              .then(function(response) {
                console.log(response);
                alert("删除成功！");
                document.getElementById("graph").innerHTML = "";
                that.draw(response.data[0], response.data[1]);
              })
              .catch(function(error) {
                console.log(error);
                alert("error!");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },

      r_appear() {
        //点击添加新关系
        document.getElementById("r_add").style.display = "";
      },
      r_modify() {
        //点击修改
        this.disabledInput2 = false;
        this.oldname = this.rname;
      },
      r_save() {
        //点击保存
        var that = this;
        axios
          .post(
            common.url3+"mod_rel/"+this.rfatherid+"/"+this.rsonid+"/"+
            this.rlabel+"/"+this.oldname+"/"+this.rname
            // qs.stringify({
            //   // params: {
            //   father: this.rfatherid,
            //   son: this.rsonid,
            //   r_type: this.rlabel,
            //   r_name: this.oldname,
            //   new_name: this.rname
            // })
          )
          .then(function(response) {
            console.log(response);
            that.disabledInput2 = true;
            alert("修改成功！");
            document.getElementById("graph").innerHTML = "";
            that.draw(response.data[0], response.data[1]);
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });
      },

      r_addyes() {
        //点击确定
        var that = this;
        axios
          .post(
            common.url3+"add_rel/"+this.a_rfather+"/"+this.a_rson+"/"+this.a_rrlabel+"/"+this.a_rrname
            // qs.stringify({
            //   // params: {
            //   father: this.a_rfather,
            //   son: this.a_rson,
            //   r_type: this.a_rrlabel,
            //   r_name: this.a_rrname
            // })
          )
          .then(function(response) {
            console.log(response);
            alert("添加成功！");
            document.getElementById("r_add").style.display = "none";
            that.a_rfather = "";
            that.a_rson = "";
            that.a_rrlabel = "";
            that.a_rrname = "";
            document.getElementById("graph").innerHTML = "";
            that.draw(response.data[0], response.data[1]);
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });
      },

      r_deletee() {
        //点击删除
        this.$confirm("此操作将删除该关系, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var that = this;
            axios
              .post(
                common.url3+"del_rel/"+this.rfatherid+"/"+this.rsonid+"/"+this.rlabel+"/"+this.rname
                // qs.stringify({
                //   father: this.rfatherid,
                //   son: this.rsonid,
                //   r_type: this.rlabel,
                //   r_name: this.rname
                // })
              )
              .then(function(response) {
                console.log(response);
                alert("删除成功！");
                document.getElementById("graph").innerHTML = "";
                that.draw(response.data[0], response.data[1]);
              })
              .catch(function(error) {
                console.log(error);
                alert("error!");
              });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },

      handleSelectionChange(val) {
        //当选择项发生变化时会触发该事件
        this.multipleSelection = val;
      },
      addcompany() {
        //点击确定添加公司
        var that = this;
        console.log(common.url3+"add_enterprise/"+this.id+"/"+this.name+"/"+JSON.stringify(this.multipleSelection));
        axios
          .post(
            common.url3+"add_enterprise/"+this.id+"/"+this.name+"/"+JSON.stringify(this.multipleSelection)
            // qs.stringify({
            //   father: this.id,
            //   r_type: this.name,
            //   enterprises: JSON.stringify(this.multipleSelection)
            // })
          )
          .then(function(response) {
            console.log(response);
            alert("添加成功！");
            document.getElementById("graph").innerHTML = "";
            that.draw(response.data[0], response.data[1]);
          })
          .catch(function(error) {
            console.log(error);
            alert("error!");
          });
      }
    },
    created() {
      this.draw();
    },
    mounted() {
      axios
        .post(common.url3+"graph")
        .then(res => {
          console.log(res.data);
          this.draw(res.data[0], res.data[1]);
        });
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
       .admin-graph-background {
          background-color: #ffffff;
          border-radius: 5px;
          padding: 10px;
          box-sizing: border-box;
          margin-top: 10px;
        }
        .right {
          width: 95%;
          height: 700px;
          p {
            margin-top: 10px;
          }
          .size {
            padding-left: 10px;
            padding-right: 10px;
          }
          .title {
            float: left;
            margin-left: 20px;
            margin-bottom: 10px;
          }
          .deep > .el-input__inner {
            color: #717275;
          }
          .el-select {
            width: 100%;
          }
        }
        .left {
          height: 700px;
          margin-right: 10px;
        }
     }
   }
  }
</style>