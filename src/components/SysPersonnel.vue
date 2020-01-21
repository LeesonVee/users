<template>
  <div>
    <el-container class="item_full_screen">
      <el-aside class="item_aside item_aside_organ_width">
        <el-row class="item_el_row_tree_title"><el-col :span="24"><el-tag type="info">人员注册</el-tag></el-col></el-row>
        <el-row>
          <el-col :span="24"><el-tree  :props="defaultProps" lazy @node-click="handleNodeClick" :load="loadNode" :expand-on-click-node="expandNode"  class="item_el_row_tree_body"></el-tree></el-col>
          <!--<el-col :span="24"><el-tree :props="props" :load="loadNode1" lazy show-checkbox>-->
          <!--</el-tree></el-col>-->
        </el-row>
      </el-aside>
      <el-main class="item_main">
        <el-row class="form_div">
            <el-col :span="24">
              <el-select style="width:10em" v-model="queryPersonnelForm.filedName" placeholder="请选择" size="small" >
                <el-option v-for="item in personnelOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
              |
              <el-input style="width:14em" v-model="queryPersonnelForm.filedValue" size="small"></el-input>
              &nbsp;&nbsp;
              <el-button type="primary"  icon="el-icon-search" @click="doQuery" size="small">查询</el-button>
              <el-button type="warning"  icon="el-icon-refresh" plain @click="doReset" size="small">重置</el-button>
              <el-button type="success"  icon="el-icon-circle-plus" plain @click="doNew" size="small">新增</el-button>
              <el-button type="success"  icon="el-icon-edit" plain @click="doModify" size="small">修改</el-button>
              <el-button type="danger"  icon="el-icon-remove" plain @click="doDel" size="small">注销</el-button>
            </el-col>
        </el-row>
        <el-row style="background-color: #eee;">
          <el-col :span="24">
            <el-table :data="personnelTableData"  height="770" border highlight-current-row  @current-change="handleCurrentChange" size="small" @row-dblclick="doModify" style="width: 100%;background-color: #eee;">
              <el-table-column prop="personId" label="人员编号" width="100"></el-table-column>
              <el-table-column prop="gh" label="工号" width="280"></el-table-column>
              <el-table-column prop="personName" label="人员姓名" width="100"></el-table-column>
              <el-table-column prop="cardType" label="身份证件类型" width="280"></el-table-column>
              <el-table-column prop="cardNum" label="身份证件号码" width="280"></el-table-column>
              <el-table-column prop="birthday" label="出生日期" width="280"></el-table-column>
              <el-table-column prop="gender" label="性别" width="280"></el-table-column>
              <el-table-column prop="ethnic" label="民族" width="280"></el-table-column>
              <el-table-column prop="hometown" label="籍贯" width="280"></el-table-column>
              <el-table-column prop="joininWork" label="参加工作时间" width="280"></el-table-column>
              <el-table-column prop="certificateNum" label="执业证书编码" width="280"></el-table-column>
              <el-table-column prop="jobPost" label="行政职务" width="280"></el-table-column>
              <el-table-column prop="education" label="最高学历" width="280"></el-table-column>
              <el-table-column prop="educationBackground" label="学位" width="280"></el-table-column>
              <el-table-column prop="majorName" label="所学专业" width="280"></el-table-column>
              <el-table-column prop="majorQualify" label="专业技术资格" width="280"></el-table-column>
              <el-table-column prop="majorJob" label="专业技术职务" width="280"></el-table-column>
              <el-table-column prop="majorType" label="专业类别" width="280"></el-table-column>
              <el-table-column prop="operationType" label="医师执业类别" width="280"></el-table-column>
              <el-table-column prop="operationScope" label="医师执业范围" width="280"></el-table-column>
              <el-table-column prop="email" label="电子邮箱" width="280"></el-table-column>
              <el-table-column prop="mobile" label="手机号码" width="280"></el-table-column>
              <el-table-column prop="antibioticLevel" label="抗生素等级" width="280"></el-table-column>
              <el-table-column prop="zybh" label="职业编号" width="280"></el-table-column>
              <el-table-column prop="organizCode" label="所在机构" width="280"></el-table-column>
              <el-table-column prop="lastModifyDate" label="最好修改日期" width="280"></el-table-column>
              <el-table-column prop="pyCode" label="拼音助记" width="280"></el-table-column>
              <el-table-column prop="wbCode" label="五笔码" width="280"></el-table-column>
              <el-table-column prop="jxCode" label="角型码" width="280"></el-table-column>
              <el-table-column prop="remark" label="医生简介" width="280"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogSysPersonnelFormVisible" width="45%" class="abow_dialog" >
      <el-form :model="personnelForm"  :rules="personnelFormRules"  ref="personnelForm" label-width="110px" size="mini">
        <el-row style="margin-bottom: 10px;padding:5px 0px;background-color: aliceblue;">
          <el-col :span="1">&nbsp;</el-col>
          <el-col :span="23">
            <el-button type="primary" size="mini" @click="doSave">保存</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row>
              <el-col :span="24">
                <el-form-item label="人员编号" prop="personId">
                  <el-input v-model="personnelForm.personId"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="人员姓名" prop="personName">
                  <el-input v-model="personnelForm.personName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="身份证件号">
                  <el-input v-model="personnelForm.cardNum"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="性别">
                  <el-select v-model="personnelForm.gender" placeholder="请选择">
                    <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row>
              <el-col :span="24">
                <el-form-item label="工号" prop="gh">
                  <el-input v-model="personnelForm.gh"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="身份证件类型">
                  <el-select v-model="personnelForm.cardType" placeholder="请选择">
                    <el-option v-for="item in cardTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="出生日期">
                  <el-date-picker v-model="personnelForm.birthday" type="date" placeholder="选择日期" style="width: 13.5em;"></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <el-form-item label="民族">
                  <el-select v-model="personnelForm.ethnic" placeholder="请选择">
                    <el-option v-for="item in ethnicOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-form-item label="人员照片">
              <div class="demo-image__error">
                <div class="block">
                  <el-image>
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </div>
              <!--<el-input v-model="personnelForm.photo"></el-input>-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="籍贯">
              <el-input v-model="personnelForm.hometown"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="参加工作时间">
              <el-date-picker v-model="personnelForm.joininWork" type="date" placeholder="选择日期" style="width: 13.5em;"></el-date-picker>
              <!--<el-input v-model="personnelForm.joininWork"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="执业证书编码">
              <el-input v-model="personnelForm.certificateNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="行政职务">
              <el-select v-model="personnelForm.jobPost" placeholder="请选择">
                <el-option v-for="item in jobPostOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="最高学历">
              <SelectTree :props="props" :options="educationOptions" :value="personnelForm.education"  :accordion="isAccordion" @getValue="getValue($event,'education')" size="small" width="11.5em"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="学位">
              <el-select v-model="personnelForm.educationBackground" placeholder="请选择">
                <el-option v-for="item in educationBackgroundOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所学专业">
              <el-select v-model="personnelForm.majorName" placeholder="请选择">
                <el-option v-for="item in majorNameOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业技术资格">
              <SelectTree :props="props" :options="majorQualifyOptions" :value="personnelForm.majorQualify"  :accordion="isAccordion" @getValue="getValue($event,'majorQualify')" size="small" width="11.5em"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专业技术职务">
              <el-select v-model="personnelForm.majorJob" placeholder="请选择">
                <el-option v-for="item in majorJobOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="专业类别">
              <el-select v-model="personnelForm.majorType" placeholder="请选择">
                <el-option v-for="item in majorTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医师执业类别">
              <el-select v-model="personnelForm.operationType" placeholder="请选择">
                <el-option v-for="item in operationTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医师执业范围">
              <SelectTree :props="props" :options="operationScopeOptions" :value="personnelForm.operationScope"  :accordion="isAccordion" @getValue="getValue($event,'operationScope')" size="small" width="11.5em"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="GP角色">
              <el-select v-model="personnelForm.gpRole" placeholder="请选择">
                <el-option v-for="item in gpOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专家判别">
              <el-select v-model="personnelForm.isExpert" placeholder="请选择">
                <el-option v-for="item in yesOrNoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="专家费用">
              <el-input v-model="personnelForm.expertCost"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="开处方权">
              <el-select v-model="personnelForm.prescribeRight" placeholder="请选择">
                <el-option v-for="item in yesOrNoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="麻醉药权">
              <el-select v-model="personnelForm.narcoticRight" placeholder="请选择">
                <el-option v-for="item in yesOrNoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="精神药权">
              <el-select v-model="personnelForm.psychotropicRight" placeholder="请选择">
                <el-option v-for="item in yesOrNoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="抗生素权">
              <el-select v-model="personnelForm.antibioticRight" placeholder="请选择">
                <el-option v-for="item in yesOrNoOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="电子邮箱">
              <el-input v-model="personnelForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="手机号码">
              <el-input v-model="personnelForm.mobile"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="抗生素等级">
              <el-checkbox-group v-model="personnelForm.antibioticLevel">
                <el-checkbox v-for="item in antibioticLevelOptions" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="职业编号">
              <el-input v-model="personnelForm.zybh"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="所在机构" prop="organizCode">
              <SelectTree :props="props" :options="organizCodeOptions" :value="personnelForm.organizCode"  :accordion="isAccordion" @getValue="getValue($event,'organizCode')" size="small" width="11.5em"/>
              <!--<el-input v-model="personnelForm.organizCode"></el-input>-->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="所在科室">
              <SelectTree :props="props" :options="officeCodeOptions" :value="personnelForm.officeCode"  :accordion="isAccordion" @getValue="getValue($event,'officeCode')" size="small" width="11.5em"/>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="拼音助记">
              <el-input v-model="personnelForm.pyCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="五笔码">
              <el-input v-model="personnelForm.wbCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="角型码">
              <el-input v-model="personnelForm.jxCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="医生简介">
              <el-input v-model="personnelForm.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import {getCardTypeOptions,getGenderOptions,getEthnicOptions,getJobPostOptions,getEducationOptions,getEducationBackgroundOptions,getMajorNameOptions,getMajorqualifyOptions,getMajorJobOptions,getMajorTypeOptions,getOperationTypeOptions,getOperationScopeOptions,getGpOptions,getYesOrNoOptions,getAntibioticLevelOptions} from '@/assets/js/dic.js';
  import SelectTree from './treeSelect';
  export default {
    name: "SysPersonnel",
    components: {
      SelectTree
    },
    data() {
      return {
        isAccordion: true,
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },
        personnelForm: {
          personId: '',
          personName: '',
          cardType: '',
          cardNum: '',
          gender: '',
          gh: '',
          birthday: '',
          ethnic: '',
          photo: '',
          hometown: '',
          joininWork: '',
          certificateNum: '',
          jobPost: '',
          education: '',
          educationBackground: '',
          majorName: '',
          majorQualify: '',
          majorJob: '',
          majorType: '',
          operationType: '',
          operationScope: '',
          gpRole: '',
          isCancel:0,
          isExpert: '0',
          expertCost: '',
          prescribeRight: '0',
          narcoticRight: '0',
          psychotropicRight: '0',
          antibioticRight: '0',
          email: '',
          mobile: '',
          antibioticLevel: [],
          zybh: '',
          organizCode: '',
          officeCode: '',
          pyCode: '',
          wbCode: '',
          jxCode: '',
          remark: '',
          logOff:1
        },
        personnelFormRules: {
          personId: [
            {required: true, message: '请输入人员编号', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          gh: [
            {required: true, message: '请输入人员编号', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          personName: [
            {required: true, message: '请输入人员编号', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          organizCode:[
            { required: true, message: '请选择所属机构', trigger: 'change' }
          ]
        },
        organTreeData: [
          {
            key: 'aa',
            text: '测试',
            leaf: true,
            properties: {
              parentId: '',
              parentText: '',
            },
            items: []
          }
        ],
        defaultProps: {
          children: 'items',
          label: 'text',
          isLeaf: 'leaf'
        },
        expandNode: false,
        queryPersonnelForm: {
          filedName: '',
          filedValue: ''
        },
        personnelOptions: [{
          value: 'personId',
          label: '人员编号'
        }, {
          value: 'gh',
          label: '工号'
        }, {
          value: 'personName',
          label: '人员姓名'
        }, {
          value: 'cardNum',
          label: '身份证号码'
        }, {
          value: 'mobile',
          label: '手机号'
        }],
        personnelTableData: [],
        cardTypeOptions: [],
        genderOptions: [],
        ethnicOptions: [],
        jobPostOptions: [],
        educationBackgroundOptions:[],
        majorNameOptions:[],
        majorJobOptions:[],
        majorTypeOptions:[],
        operationTypeOptions:[],
        gpOptions:[],
        yesOrNoOptions:[],
        antibioticLevelOptions:[],
        organizList:[],
        organizCodeOptions:[],
        officeCodeOptions:[],
        dialogTitle: '新增',
        dialogSysPersonnelFormVisible: false,
        focusTableRecord:'',
        focusTreeNode:'',
        opt:''
      }
    },
    created: function () {
      debugger;
      this.loadDic();
      this.loadOrganTree();
    },
    computed: {
      educationOptions() {
        let list = getEducationOptions();
        return this.computteData(list);
      },
      majorQualifyOptions(){
        let list = getMajorqualifyOptions();
        return this.computteData(list);
      },
      operationScopeOptions(){
        let list = getOperationScopeOptions();
        return this.computteData(list);
      }
    },
    methods: {
      loadOrganTree:function(){
        const me = this;
        this.$http.post(process.env.API_ROOT + 'loadOrganTreeDataDic.json').then(result => {
          if (result.status === 200) {
            me.organizList = result.body.data || [];
            me.organizCodeOptions = me.computteData(result.body.data || [],1);
          }
        });
      },
      loadDic: function () {
        this.cardTypeOptions = getCardTypeOptions();
        this.genderOptions = getGenderOptions();
        this.ethnicOptions = getEthnicOptions();
        this.jobPostOptions = getJobPostOptions();
        this.educationBackgroundOptions = getEducationBackgroundOptions();
        this.majorNameOptions = getMajorNameOptions();
        this.majorJobOptions = getMajorJobOptions();
        this.majorTypeOptions = getMajorTypeOptions();
        this.operationTypeOptions = getOperationTypeOptions();
        this.gpOptions = getGpOptions();
        this.yesOrNoOptions = getYesOrNoOptions();
        this.antibioticLevelOptions = getAntibioticLevelOptions();
      },
      computteData: function (list,fileType) {
        let cloneData = JSON.parse(JSON.stringify(list))      // 对源数据深度克隆
        return cloneData.filter(father => {                      // 循环所有项，并添加children属性
          let branchArr = cloneData.filter(child => father.id == child.parentId);       // 返回每一项的子级数组
          branchArr.length > 0 ? father.children = branchArr : ''   //给父级添加一个children属性，并赋值
          return father.parentId == (fileType?null:0);      //返回第一层
        });
      },
      handleNodeClick: function (data) {
        this.focusTreeNode = data;
        const me = this;
        let params = {
          id: data.key,
          type: data.properties.type
        };
        this.$http.post(process.env.API_ROOT + 'loadSysPersonsByOrganIdOrOfficeId.json', params).then(result => {
          if (result.status === 200) {
            me.personnelTableData = result.body.data || [];
          }
        });
      },
      loadNode: function (node, resolve) {
        let params = {type: '1'};
        if (node.level == 0) {
          this.$http.post(process.env.API_ROOT + 'loadOrganOfficeTreeData.json', params).then(result => {
            if (result.status === 200) {
              let respData = result.body.data || [];
              return resolve(respData);
            }
          });
        }
        let data = node.data;
        if (node.level > 0) {
          let type = data.properties.type;
          params.type = type;
          params['parentId'] = data.key;
          params['parentText'] = data.text;
          this.$http.post(process.env.API_ROOT + 'loadOrganOfficeTreeData.json', params).then(result => {
            if (result.status === 200) {
              let respData = result.body.data || [];
              return resolve(respData);
            }
          });
        }
      },
      doQuery: function () {
        let filedName = this.queryPersonnelForm.filedName;
        let filedValue = this.queryPersonnelForm.filedValue;
        if(!filedName || !filedValue){
          return;
        }

          let params = {
          type:'0',
          val:filedValue
        };
          if(filedName=='personId'){
            params.type='1';
          }else if(filedName=='gh'){
            params.type='2';
          }else if(filedName=='personName'){
            params.type='3';
          }else if(filedName=='cardNum'){
            params.type='4';
          }else if(filedName=='mobile'){
            params.type='5';
          }
      },
      doReset: function () {
        this.queryPersonnelForm.filedName='';
        this.queryPersonnelForm.filedValue='';
      },
      doNew: function () {
        this.dialogSysPersonnelFormVisible = true;
        this.dialogTitle = '新增';
        this.opt = 'create';
        this.initParams();
      },
      doModify: function () {
        debugger;
        if(!this.focusTableRecord){
          this.myMessage('warning','请选择您要修改的条目');
          return;
        }
        this.opt = 'modify';
        this.dialogSysPersonnelFormVisible = true;
        this.dialogTitle = '修改';
        this.initParams(this.focusTableRecord);
      },
      doDel: function () {
        debugger;
        if(!this.focusTableRecord){
          this.myMessage('warning','请选择您要注销的人员');
          return;
        }
        this.opt = 'modify';
        this.focusTableRecord.logOff = '0';
        this.initParams(this.focusTableRecord);
        const me = this;
        let params = JSON.parse(JSON.stringify(this.personnelForm));
        params['opt'] = this.opt;
        this.$http.post(process.env.API_ROOT + 'saveOrUpdateSysPersonnel.json',params).then(result => {
          debugger;
          if (result.status === 200) {
            if(result.body.code=='200'){
              debugger;
              let respData = result.body.data||{};
              me.myMessage('success','注销成功');
              if(respData){
                let params = {
                  key: respData.organizCode,
                  properties:{
                    type:'1'
                  }
                };
                me.handleNodeClick(params);
              }
              me.dialogSysPersonnelFormVisible = false;
            }else{
              me.myMessage('error','注销失败');
            }
          }else{
            me.myMessage('error','系统异常');
          }
        });
      },
      doSave:function(){
        let optMsg = '保存';
        if(this.opt=='modify'){
          optMsg = '修改';
        }
        this.$refs['personnelForm'].validate((valid) => {
          if (valid) {
            const me = this;
            let params = JSON.parse(JSON.stringify(this.personnelForm));
            params['opt'] = this.opt;
            this.$http.post(process.env.API_ROOT + 'saveOrUpdateSysPersonnel.json',params).then(result => {
              debugger;
              if (result.status === 200) {
                if(result.body.code=='200'){
                  debugger;
                  let respData = result.body.data||{};
                  me.myMessage('success',optMsg+'成功');
                  if(respData){
                    let params = {
                      key: respData.organizCode,
                      properties:{
                        type:'1'
                      }
                    };
                    me.handleNodeClick(params);
                  }
                  me.dialogSysPersonnelFormVisible = false;
                }else{
                  me.myMessage('error',optMsg+'失败');
                }
              }else{
                me.myMessage('error',optMsg+'失败');
              }
            });
          }else{
            this.myMessage('error','请设置必填项!!!');
          }
        });
      },
      initParams:function(data){
        debugger;
        data = data||{};
        this.personnelForm.id=data.id|| '';
        this.personnelForm.personId=data.personId|| '';
        this.personnelForm.personName=data.personName|| '';
        this.personnelForm.cardType=data.cardType|| '';
        this.personnelForm.cardNum=data.cardNum|| '';
        this.personnelForm.gender=data.gender|| '';
        this.personnelForm.gh=data.gh|| '';
        this.personnelForm.birthday=data.birthday|| '';
        this.personnelForm.ethnic=data.ethnic|| '';
        this.personnelForm.photo=data.photo|| '';
        this.personnelForm.hometown=data.hometown|| '';
        this.personnelForm.joininWork=data.joininWork|| '';
        this.personnelForm.certificateNum=data.certificateNum|| '';
        this.personnelForm.jobPost=data.jobPost|| '';
        this.personnelForm.education=data.education|| '';
        this.personnelForm.educationBackground=data.educationBackground|| '';
        this.personnelForm.majorName=data.majorName|| '';
        this.personnelForm.majorQualify=data.majorQualify|| '';
        this.personnelForm.majorJob=data.majorJob|| '';
        this.personnelForm.majorType=data.majorType|| '';
        this.personnelForm.operationType=data.operationType|| '';
        this.personnelForm.operationScope=data.operationScope|| '';
        this.personnelForm.gpRole=data.gpRole|| '';
        this.personnelForm.isExpert=data.isExpert|| '0';
        this.personnelForm.isCancel=data.isCancel|| 0;
        this.personnelForm.expertCost=data.expertCost|| '';
        this.personnelForm.prescribeRight=data.prescribeRight|| '0';
        this.personnelForm.narcoticRight=data.narcoticRight|| '0';
        this.personnelForm.psychotropicRight=data.psychotropicRight|| '0';
        this.personnelForm.antibioticRight=data.antibioticRight|| '0';
        this.personnelForm.email=data.email|| '';
        this.personnelForm.mobile=data.mobile|| '';
        this.personnelForm.antibioticLevel=data.antibioticLevel&&data.antibioticLevel.length>0?JSON.parse(data.antibioticLevel): [];
        this.personnelForm.zybh=data.zybh|| '';
        this.personnelForm.organizCode=data.organizCode|| '';
        this.personnelForm.officeCode=data.officeCode|| '';
        this.personnelForm.pyCode=data.pyCode|| '';
        this.personnelForm.wbCode=data.wbCode|| '';
        this.personnelForm.jxCode=data.jxCode|| '';
        this.personnelForm.remark=data.remark|| '';
        this.personnelForm.logOff=data.logOff||'1';
      },
      handleCurrentChange: function (val) {
        this.focusTableRecord = val;
      },
      getValue(value, type) {
        this.personnelForm[type] = value;
        if(type=='organizCode'){
          this.personnelForm.officeCode='';
          const me = this;
          let params = {
            organId:value
          }
          this.$http.post(process.env.API_ROOT + 'loadOfficeTreeDataDic.json',params).then(result => {
            if (result.status === 200) {
              me.officeCodeOptions = me.computteData(result.body.data || [],1);
            }
          });
        }
      },
      myMessage:function(type,msg){
        this.$message({
          type:type,
          message:msg
        });
      }
    }
  };
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
    padding: 8px;
  }

  .abow_dialog {
    display: flex;
    justify-content: center;
    align-items: Center;
    overflow: hidden;
  }
  .el-dialog {
    margin: 0 auto !important;
    height: 90%;
    overflow: hidden;
  }
  .el-dialog__body {
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0;
    padding: 0;
    z-index: 1;
    overflow: hidden;
    overflow-y: auto;
  }
</style>
