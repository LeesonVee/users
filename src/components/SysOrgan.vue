<template>
  <div>
    <el-container class="item_full_screen">
      <el-aside class="item_aside item_aside_organ_width">
        <el-row class="item_el_row_tree_title"><el-col :span="24"><el-tag type="info">机构科室注册</el-tag></el-col></el-row>
        <el-row>
          <el-col :span="24"><el-tree :data="organData" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="expandNode"  class="item_el_row_tree_body"></el-tree></el-col>
        </el-row>
      </el-aside>
      <el-main class="item_main">
        <el-row class="form_div">
          <el-col :span="24">
            <el-form ref="organForm" :model="organForm" size="small" label-suffix="" label-width="100px" label-position="right" >
              <el-row type="flex" class="row-bg">
                <el-col :span="5">
                  <el-form-item label="组织结构代码" prop="organizCode">
                    <el-input style="width:14em" v-model="organForm.organizCode"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="机构名称" prop="organizName">
                    <el-input style="width:14em" v-model="organForm.organizName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="13">
                  <el-button type="primary"  icon="el-icon-search" @click="doQuery" size="small">查询</el-button>
                  <el-button type="warning"  icon="el-icon-refresh" plain @click="doReset" size="small">重置</el-button>
                  <el-button type="success"  icon="el-icon-circle-plus" plain @click="doNew" size="small">新增</el-button>
                  <el-button type="success"  icon="el-icon-edit" plain @click="doModify" size="small">修改</el-button>
                  <el-button type="danger"  icon="el-icon-remove" plain @click="doDel" size="small">删除</el-button>
                </el-col>
              </el-row>
            </el-form>
          </el-col>
        </el-row>
        <el-row style="background-color: #eee;">
          <el-col :span="24">
            <el-table :data="organTableData"  height="770" border highlight-current-row  @current-change="handleCurrentChange" size="small" @row-dblclick="doModify" style="width: 100%;background-color: #eee;">
              <el-table-column prop="organizCode" label="机构代码" width="100"></el-table-column>
              <el-table-column prop="organizName" label="机构名称" width="280"></el-table-column>
              <el-table-column prop="registerNumber" label="登记号" width="100"></el-table-column>
              <el-table-column prop="organizSecondName" label="机构第二名称" width="280"></el-table-column>
              <el-table-column prop="classifyCode" label="机构分类" width="280"></el-table-column>
              <el-table-column prop="organizType" label="机构类型" width="280"></el-table-column>
              <el-table-column prop="admindivision" label="行政区划" width="280"></el-table-column>
              <el-table-column prop="address" label="地址" width="280"></el-table-column>
              <el-table-column prop="streeCode" label="乡镇街道代码" width="280"></el-table-column>
              <el-table-column prop="streeName" label="乡镇街道名称" width="280"></el-table-column>
              <el-table-column prop="hostCode" label="主办单位" width="280"></el-table-column>
              <el-table-column prop="subCode" label="隶属关系" width="280"></el-table-column>
              <el-table-column prop="zipCode" label="邮政编码" width="280"></el-table-column>
              <el-table-column prop="foundDate" label="单位成立时间" width="280"></el-table-column>
              <el-table-column prop="telphone" label="联系电话" width="280"></el-table-column>
              <el-table-column prop="email" label="电子邮箱" width="280"></el-table-column>
              <el-table-column prop="website" label="单位网站" width="280"></el-table-column>
              <el-table-column prop="legal" label="法人代表" width="280"></el-table-column>
              <el-table-column prop="director" label="负责人" width="280"></el-table-column>
              <el-table-column prop="pyCode" label="拼音助记" width="280"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogSysOrganFormVisible" width="45%">
      <el-tabs v-model="activeName" type="card" @tab-click="organOrOfficeClick">
        <el-tab-pane label="机构注册" name="organId">
          <el-row style="padding: 2px 0px 2px 10px;margin-bottom:5px;border: 1px solid #d5d6dd;">
            <el-col :span="24"><el-button type="primary"  icon="el-icon-circle-check" plain @click="doSave('organ')" size="small">保存</el-button></el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form :model="dialogSysOrganForm"  :rules="organFormRules"  ref="dialogSysOrganForm" label-width="110px" size="small">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="机构代码：" prop="organizCode">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.organizCode" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="机构名称：" prop="organizName">
                      <el-input style="width:33em" v-model="dialogSysOrganForm.organizName" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="登记号：" prop="registerNumber">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.registerNumber" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="机构第二名称：" prop="organizSecondName">
                      <el-input style="width:33em" v-model="dialogSysOrganForm.organizSecondName" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="机构分类：" prop="classifyCode">
                      <el-select  v-model="dialogSysOrganForm.classifyCode" placeholder="请选择">
                        <el-option v-for="item in classifyCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="机构类型：" prop="organizType">
                      <SelectTree :props="props" :options="organTypeData" :value="dialogSysOrganForm.organizType"  :accordion="isAccordion" @getValue="getValue($event,'organizType')" size="small" width="30.5em"/>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="行政区划：" prop="admindivision">
                      <SelectTree :props="props" :options="adminDivisionData" :value="dialogSysOrganForm.admindivision"  :accordion="isAccordion" @getValue="getValue($event,'admindivision')" size="small" width="11.5em"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="地址：" prop="address">
                      <el-input style="width:33em" v-model="dialogSysOrganForm.address" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="乡镇街道代码：" prop="streeCode">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.streeCode" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="乡镇街道名称：" prop="streeName">
                      <el-input style="width:33em" v-model="dialogSysOrganForm.streeName" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="主办单位：" prop="hostCode">
                      <el-select v-model="dialogSysOrganForm.hostCode" placeholder="请选择">
                        <el-option v-for="item in hostCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="16">
                    <el-form-item label="上级部门：" prop="parentText">
                      <el-input style="width:33em" v-model="dialogSysOrganForm.parentText" :disabled="true" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="隶属关系：" prop="subCode">
                      <el-select v-model="dialogSysOrganForm.subCode" placeholder="请选择">
                        <el-option v-for="item in subCodeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="邮政编码：" prop="zipCode">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.zipCode" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="单位成立时间：" prop="foundDate">
                      <el-date-picker v-model="dialogSysOrganForm.foundDate" type="date" placeholder="选择日期" style="width:12em"></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="联系电话：" prop="telphone">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.telphone" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="电子邮箱：" prop="email">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.email" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="单位网站：" prop="website">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.website" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="法人代表：" prop="legal">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.legal" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="负责人：" prop="director">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.director" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="拼音助记：" prop="pyCode">
                      <el-input style="width:12em" v-model="dialogSysOrganForm.pyCode" autocomplete="off" :disabled="pyCodeStatus"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>

        </el-tab-pane>
        <el-tab-pane label="科室注册" name="officeId" :disabled="officeStatus">
          <el-container>
            <el-aside class="item_aside item_aside_office_width" style="width:180px;">
              <el-tree :data="officeData" :props="defaultProps" @node-click="handleOfficeNodeClick" :expand-on-click-node="expandOfficeNode"  class="item_el_row_tree_body"></el-tree>
            </el-aside>
            <el-main class="item_main">
              <el-row style="padding: 2px 0px 2px 10px;margin-bottom:5px;border: 1px solid #d5d6dd;">
                <el-col :span="24"><el-button type="primary"  icon="el-icon-circle-check" plain @click="doSave('office')" size="small">保存</el-button><el-button type="success"  icon="el-icon-circle-plus" plain @click="doNewOffice" size="small">新增</el-button></el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form :model="dialogSysOfficeForm"  :rules="officeFormRules" ref="dialogSysOfficeForm"  label-width="110px" size="small">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="科室代码：" prop="officeCode">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.officeCode" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="科室名称：" prop="officeName">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.officeName" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="科室类型：" prop="organizType">
                          <SelectTree :props="props" :options="officeTypeData" :value="dialogSysOfficeForm.organizType"  :accordion="isAccordion" @getValue="getOfficeValue($event,'organizType')" size="small" width="15em"/>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="上级科室：" prop="parentId">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.parentText" autocomplete="off" :disabled="parentStatus"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="地址：" prop="address">
                          <el-input style="width:40em" v-model="dialogSysOfficeForm.address" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="门诊科室：" prop="outPatientClinic">
                          <el-select  v-model="dialogSysOfficeForm.outPatientClinic" placeholder="请选择" style="width:14.7em">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="医技科室：" prop="medicalLab">
                          <el-select  v-model="dialogSysOfficeForm.medicalLab" placeholder="请选择" style="width:14.7em">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="住院科室：" prop="hospitalDept">
                          <el-select  v-model="dialogSysOfficeForm.hospitalDept" placeholder="请选择" style="width:14.7em">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="住院病区：" prop="hospitalArea">
                          <el-select  v-model="dialogSysOfficeForm.hospitalArea" placeholder="请选择" style="width:14.7em">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="额定床位：" prop="ratedBed">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.ratedBed" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话：" prop="telphone">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.telphone" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="排列顺序：" prop="plsx">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.plsx" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="拼音助记：" prop="pyCode">
                          <el-input style="width:16em" v-model="dialogSysOfficeForm.pyCode" autocomplete="off"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-form>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

  </div>
</template>

<script>
  import {organTypeList,adminDivisionList,officeTypeList} from '@/assets/js/dic.js';
  import SelectTree from './treeSelect';
export default {
  name: 'SysOrgan',
  components: {
    SelectTree
  },
  data () {
    return {
      isAccordion:true,      // 可收起（可选）
      props:{                // 配置项（必选）
        value: 'id',
        label: 'name',
        children: 'children',
      },
      dialogTitle:'新增',
      dialogSysOrganFormVisible:false,
      activeName:'organId',
      organizTypeStatus:false,
      officeStatus:true,
      pyCodeStatus:true,
      parentStatus:true,
      organFormRules:{
        organizCode:[
          { required: true, message: '请输入机构代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        organizName:[
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        registerNumber:[
          { required: true, message: '请输入登记号', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        classifyCode:[
          { required: true, message: '请选择机构分类', trigger: 'change' }
        ],
        organizType:[
          { required: true, message: '请选择机构类别', trigger: 'change' }
        ],
        admindivision:[
          { required: true, message: '请选择行政区划', trigger: 'change' }
        ]
      },
      dialogSysOrganForm:{
        id:'',organizCode:'',registerNumber:'',organizSecondName:'',organizName:'',classifyCode:'',
        organizType:'',admindivision:'',address:'',streeCode:'',streeName:'',hostCode:'',
        parentId:'',parentText:'', subCode:'',zipCode:'',telphone:'',email:'',foundDate:'',legal:'',subNum:'',
        stationNum:'',pyCode:'',grade:'',institLevel:'',buildingArea:'',chemicalmedNum:'',chinesemedNum:'',
        director:'',website:'',logoff:'',createDate:''
      },
      officeFormRules:{
        officeCode:[
          { required: true, message: '请输入机构代码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
        ],
        officeName:[
          { required: true, message: '请输入机构名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 25 个字符', trigger: 'blur' }
        ],
        organizType:[
          { required: true, message: '请选择机构分类', trigger: 'change' }
        ]
      },
      dialogSysOfficeForm:{
        id:'',officeCode:'',officeName:'',organizCode:'',organizType:'',parentId:'',parentText:'',address:'',
        outPatientClinic:'',medicalLab:'',hospitalArea:'',ratedBed:'',telphone:'',email:'',
        plsx:'',pyCode:'',logoff:'1',ksxsgs:'',ksxsgsCode:'',hospitalDept:'',
      },
      expandNode:false,
      expandOfficeNode:false,
      organData:[],
      officeData:[],
      defaultProps:{
        children: 'items',
        label: 'text'
      },
      organizTypeOptions:[{value:'A',label:'医院'},{value:'B',label:'社区卫生服务中心(站)'},{value:'C',label:'卫生院'},{value:'D',label:'门诊部、诊所、医务室、村卫生室'},{value:'E',label:'急救中心(站)'},{value:'F',label:'采供血机构'},{value:'G',label:'妇幼保健院(所、站)'},{value:'H',label:'专科疾病防治院(所、站)'},
        {value:'J',label:'疾病防控制中心(防疫站)'},{value:'K',label:'卫生监督所(局)'},{value:'L',label:'卫生监督检验(监测、检测)所(站)'},{value:'M',label:'医学科学研究机构'},{value:'N',label:'医学教育机构'},{value:'O',label:'健康教育所(站、中心)'},{value:'P',label:'其他卫生机构'},{value:'Q',label:'卫生社会团体'},{value:'R',label:'市卫生局'},{value:'S',label:'区卫生局'},{value:'T',label:'省卫生厅'}],
      classifyCodeOptions:[{ value:'1',label:'非营利性医疗机构'},{value:'2',label:'营利性医疗机构'},{value:'9',label:'其他卫生机构'}],
      hostCodeOptions:[{ value:'1',label:'卫生行政部门'},{value:'2',label:'其他行政部门'},{value:'3',label:'企业'},{value:'4',label:'事业单位'},{value:'6',label:'社会团体'},{value:'7',label:'其他社会组织'}],
      subCodeOptions:[{ value:'1',label:'中央属'},{value:'2',label:'省、自治区、直辖市属'},{value:'3',label:'省辖市(地区、州、盟、直辖市区)属'},{value:'4',label:'县级市(省辖市区)属'},{value:'5',label:'县(旗)属'},{value:'6',label:'街道属'},{value:'7',label:'镇属'},{value:'8',label:'乡属'}],
      statusOptions:[{ value:'1',label:'是'},{value:'0',label:'否'}],
      organForm:{
        id:'',organizCode:'',registerNumber:'',organizSecondName:'',organizName:'',classifyCode:'',
        organizType:'',admindivision:'',address:'',streeCode:'',streeName:'',hostCode:'',
        parentId:'',parentText:'', subCode:'',zipCode:'',telphone:'',email:'',foundDate:'',legal:'',subNum:'',
        stationNum:'',pyCode:'',grade:'',institLevel:'',buildingArea:'',chemicalmedNum:'',chinesemedNum:'',
        director:'',website:'',logoff:'',createDate:''
      },
      organTableData:[],
      focusItem:'',
      focusTreeItem:'',
      focusTreeOfficeItem:''
    }
  },
  created:function(){
    this.focusItem='';
    this.focusTreeItem='';
    this.loadTreeData();
  },
  computed:{
    organTypeData(){
      let list = organTypeList();
      return this.computteData(list);
    },
    adminDivisionData(){
      let list = adminDivisionList();
      return this.computteData(list);
    },
    officeTypeData(){
      let list = officeTypeList();
      return this.computteData(list);
    }
  },
  methods:{
    getValue(value,type){
      this.dialogSysOrganForm[type] = value;
    },
    getOfficeValue(value,type){
      this.dialogSysOfficeForm[type] = value;
    },
    computteData:function(list){
      let cloneData = JSON.parse(JSON.stringify(list))      // 对源数据深度克隆
      return  cloneData.filter(father=>{                      // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child=>father.id == child.parentId);       // 返回每一项的子级数组
        branchArr.length>0 ? father.children=branchArr : ''   //给父级添加一个children属性，并赋值
        return father.parentId==0;      //返回第一层
      });
    },
    handleNodeClick:function(data){
      this.focusItem='';
      this.focusTreeItem=data;
      this.officeData = [];
      let cfg = {
        id:data.key,
        parentId:data.parentId
      };
      this.loadData(cfg);
    },
    handleOfficeNodeClick:function(data){
      debugger;
      this.focusTreeOfficeItem=data;
      if(data.root){
        // this.initOfficeParams({organizCode:data.key,parentText:data.properties.parentText});
        return;
      }
      let params = {
        id:data.key,
        logoff:'1'
      };
      const me = this;
      this.$http.post(process.env.API_ROOT+'loadOfficeByPkey.json', params).then(result => {
        debugger;
        if(result.status===200){
          let respData = result.body.data||{};
          respData['parentText']=data.properties.parentText;
          me.initOfficeParams(respData);
        }
      });
    },
    initOfficeParams:function(data){
      this.dialogSysOfficeForm.id=data.id || '';
      this.dialogSysOfficeForm.officeCode=data.officeCode || '';
      this.dialogSysOfficeForm.officeName=data.officeName || '';
      this.dialogSysOfficeForm.organizCode=data.organizCode || '';
      this.dialogSysOfficeForm.organizType=data.organizType || '';
      this.dialogSysOfficeForm.parentId=data.parentId || '';
      this.dialogSysOfficeForm.parentText=data.parentText || '';
      this.dialogSysOfficeForm.address=data.address || '';
      this.dialogSysOfficeForm.outPatientClinic=data.outPatientClinic || '';
      this.dialogSysOfficeForm.medicalLab=data.medicalLab || '';
      this.dialogSysOfficeForm.hospitalArea=data.hospitalArea || '';
      this.dialogSysOfficeForm.ratedBed=data.ratedBed || '';
      this.dialogSysOfficeForm.telphone=data.telphone || '';
      this.dialogSysOfficeForm.email=data.email || '';
      this.dialogSysOfficeForm.plsx=data.plsx || '';
      this.dialogSysOfficeForm.pyCode=data.pyCode || '';
      this.dialogSysOfficeForm.logoff=data.logoff || '1';
      this.dialogSysOfficeForm.ksxsgs=data.ksxsgs || '';
      this.dialogSysOfficeForm.ksxsgsCode=data.ksxsgsCode || '';
      this.dialogSysOfficeForm.hospitalDept=data.hospitalDept || '';
    },
    organOrOfficeClick:function(tab, event){
      if(tab.name=='officeId' && this.officeData.length==0){
        this.dialogSysOfficeForm.organizCode = this.focusTreeItem.key;
        this.loadOfficeTreeData();
      }
    },
    loadOfficeTreeData:function(){
      this.officeData = [];
      let officeTreeItem ={
        key:this.focusTreeItem.key,
        text:this.focusTreeItem.text,
        root:true,
        properties:{
          parentId:this.focusTreeItem.properties.parentId,
          parentText:this.focusTreeItem.properties.parentText
        },
        items:[]
      };
      this.officeData.push(officeTreeItem);
      const me =this;
      let params = {
        id:me.focusTreeItem.key,
        parentText:this.focusTreeItem.text
      };
      this.$http.post(process.env.API_ROOT+'loadOfficeTreeData.json', params).then(result => {
        if(result.status===200){
          let data = result.body.data||[];
          if(data.length>0){
            this.officeData[0].items=data;
          }
        }
      });
    },
    doQuery:function(){
      if(!this.focusTreeItem){
        return;
      }
      let cfg = {
        parentId:this.focusTreeItem.parentId
      };
      if(this.organForm.organizCode){
        cfg['organizCode'] =this.organForm.organizCode;
      }
      if(this.organForm.organizName){
        cfg['organizName'] =this.organForm.organizName;
      }
      this.loadData(cfg);
    },
    doReset:function(){
      this.organForm.organizCode='';
      this.organForm.organizName='';
    },
    doNew:function(){
      if(!this.focusTreeItem){
        this.myMessage('warning','请点击左侧树，确认所属上级机构');
        return;
      }
      this.activeName = 'organId';
      this.officeStatus = true;
      this.organizTypeStatus = false;
      this.dialogSysOrganFormVisible = true;
      let data = {
        parentId:this.focusTreeItem.key,
        parentText:this.focusTreeItem.text,
        opt:'create'
      };
      this.initParam(data);
    },
    doModify:function(){
      if(!this.focusItem){
        this.myMessage('warning','请选择要修改的机构！');
        return;
      }
      this.activeName = 'organId';
      this.officeStatus = false;
      this.organizTypeStatus = true;
      let data = JSON.parse(JSON.stringify(this.focusItem));
      data['parentText'] = this.focusTreeItem.properties.parentText;
      data['opt'] = 'modify';
      this.initParam(data);
      this.dialogSysOrganFormVisible = true;
    },
    doDel:function(){
      debugger;
      if(!this.focusItem){
        this.myMessage('warning','请选择要删除的机构！');
        return;
      }
      this.officeStatus = false;
      this.organizTypeStatus = true;
      let data = JSON.parse(JSON.stringify(this.focusItem));
      data['parentText'] = this.focusTreeItem.properties.parentText;
      data['opt'] = 'modify';
      this.initParam(data);
      this.dialogSysOrganForm.logoff = '0';
      this.focusItem='';
      this.focusTreeItem='';
      this.organTableData=[];
      this.doSave('organ');
    },
    doNewOffice:function(){
      if(!this.focusTreeOfficeItem){
        this.myMessage('warning','请选择科室树！');
      }
      let data = this.focusTreeOfficeItem;
      if(data.root){
        this.initOfficeParams({organizCode:data.key,parentText:data.properties.parentText});
        return;
      }
      this.initOfficeParams({organizCode:this.focusTreeItem.key,parentId:data.key,parentText:data.text});
    },
    initParam:function(data){
      this.dialogSysOrganForm.id=data.id||'';
      this.dialogSysOrganForm.organizCode=data.organizCode||'';
      this.dialogSysOrganForm.registerNumber=data.registerNumber||'';
      this.dialogSysOrganForm.organizSecondName=data.organizSecondName||'';
      this.dialogSysOrganForm.organizName=data.organizName||'';
      this.dialogSysOrganForm.classifyCode=data.classifyCode||'';
      this.dialogSysOrganForm.organizType=data.organizType||'';
      this.dialogSysOrganForm.admindivision=data.admindivision||'';
      this.dialogSysOrganForm.address=data.address||'';
      this.dialogSysOrganForm.streeCode=data.streeCode||'';
      this.dialogSysOrganForm.streeName=data.streeName||'';
      this.dialogSysOrganForm.hostCode=data.hostCode||'';
      this.dialogSysOrganForm.parentId=data.parentId||'';
      this.dialogSysOrganForm.parentText=data.parentText||'';
      this.dialogSysOrganForm.subCode=data.subCode||'';
      this.dialogSysOrganForm.zipCode=data.zipCode||'';
      this.dialogSysOrganForm.telphone=data.telphone||'';
      this.dialogSysOrganForm.email=data.email||'';
      this.dialogSysOrganForm.foundDate=data.foundDate||'';
      this.dialogSysOrganForm.legal=data.legal||'';
      this.dialogSysOrganForm.subNum=data.subNum||'';
      this.dialogSysOrganForm.stationNum=data.stationNum||'';
      this.dialogSysOrganForm.pyCode=data.pyCode||'';
      this.dialogSysOrganForm.grade=data.grade||'';
      this.dialogSysOrganForm.institLevel=data.institLevel||'';
      this.dialogSysOrganForm.buildingArea=data.buildingArea||'';
      this.dialogSysOrganForm.chemicalmedNum=data.chemicalmedNum||'';
      this.dialogSysOrganForm.chinesemedNum=data.chinesemedNum||'';
      this.dialogSysOrganForm.director=data.director||'';
      this.dialogSysOrganForm.website=data.website||'';
      this.dialogSysOrganForm.logoff=data.logoff||'1';
      this.dialogSysOrganForm.createDate=data.createDate||'';
      this.dialogSysOrganForm.opt=data.opt||'create';
    },
    loadData:function(data){
      const me = this;
      let params = data||{};
      this.$http.post(process.env.API_ROOT+'queryUserOrganByConditions.json', params).then(result => {
        if(result.status===200){
          me.organTableData = result.body.data||[];
        }
      });
    },
    loadTreeData:function(){
      const me = this;
      this.$http.post(process.env.API_ROOT+'loadOrganTreeData.json').then(result => {
        debugger;
        if(result.status===200){
          me.organData = result.body.data||[];
        }
      });
    },
    handleCurrentChange:function(val){
      this.focusItem = val;
    },
    doSave:function(type){
      debugger;
      const me = this;
      let saveData = {
        type:type,
        opt:'create'
      };
      let formName = 'dialogSysOrganForm';
      if(type=='organ'){
        saveData['data'] = this.dialogSysOrganForm;
      }else if(type=='office'){
        formName = 'dialogSysOfficeForm';
        saveData['data'] = this.dialogSysOfficeForm;
      }
      if(saveData.data.id){
        saveData.opt = 'modify';
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post(process.env.API_ROOT+'saveOrganOrOffice.json', saveData).then(result => {
            if(result.status===200){
              me.myMessage('success','保存成功');
              if(type=='organ'){
                if(me.focusTreeItem){
                  let cfg = {
                    id: me.focusTreeItem.key,
                    parentId:me.focusTreeItem.parentId
                  };
                  me.loadData(cfg);
                }
                me.initParam(result.body.data);
                me.loadTreeData();
              }else{
                me.initOfficeParams(result.body.data);
                me.loadOfficeTreeData();
              }
            }else{
              me.myMessage('error','保存失败');
            }
          });
        } else {
          me.myMessage('warning','请设置必填项');
          return false;
        }
      });

    },
    myMessage:function(type,msg){
      this.$message({
        type:type,
        message:msg
      });
    }
  }
}
</script>
<style scoped>
  .item_full_screen{
    height: 100%;
    width: 100%;
    max-width:1705px;
    position:fixed;
    border: 1px solid #c5c5c5;
  }
  .item_aside{
    border-right: 1px solid #c5c5c5;
  }
  .item_aside_organ_width{
    width: 300px;
  }
  .item_aside_office_width{
    width: 200px;
  }
  .item_main{
    padding: 0px!important;
    /*border-top: 1px solid #c5c5c5;*/
    /*border-right: 1px solid #c5c5c5;*/
    /*border-bottom: 1px solid #c5c5c5;*/
  }
  .item_el_row_tree_title{
    margin-bottom: 8px;
    border-bottom:1px solid #c5c5c5;
  }
  .item_el_row_tree_body{
    background-color: #eee;
    padding-left: 8px;
  }
  .form_div{
    padding-top: 8px;
  }
</style>
