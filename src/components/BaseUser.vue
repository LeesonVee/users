<template>
  <div>
    <el-container class="item_full_screen">
      <el-aside class="item_aside item_aside_organ_width">
        <el-row class="item_el_row_tree_title"><el-col :span="24"><el-tag type="info">人员注册</el-tag></el-col></el-row>
        <el-row>
          <el-col :span="24"><el-tree :data="organData" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="expandNode"  class="item_el_row_tree_body"></el-tree></el-col>
        </el-row>
      </el-aside>
      <el-main class="item_main">
        <el-row class="form_div">
          <el-col :span="24">
            <el-select style="width:10em" v-model="queryUserForm.filedName" placeholder="请选择" size="small" >
              <el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            |
            <el-input style="width:14em" v-model="queryUserForm.filedValue" size="small"></el-input>
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
            <el-table :data="userTableData"  height="770" border highlight-current-row  @current-change="handleCurrentChange" size="small" @row-dblclick="doModify" style="width: 100%;background-color: #eee;">
              <el-table-column prop="personId" label="人员编号" width="100"></el-table-column>
              <el-table-column prop="personName" label="人员姓名"></el-table-column>
              <el-table-column prop="cardNum" label="证件号码"></el-table-column>
              <el-table-column prop="status" label="用户状态" width="100">
                <template slot-scope="scope">
                  <div v-if="scope.row.status=='1'">正常</div>
                  <div v-else>禁用</div>
                </template>
              </el-table-column>
              <el-table-column prop="gender" label="性别" :formatter="transferGender" width="100"></el-table-column>
              <el-table-column prop="mobile" label="手机号码"></el-table-column>
              <el-table-column prop="pyCode" label="拼音助记"></el-table-column>
              <el-table-column prop="createDt" label="创建时间"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogUserFormVisible" width="45%" class="abow_dialog" >
      <el-row>
        <div class="myTitle">
          <el-col :span="24">
            <el-button type="success"  icon="el-icon-circle-plus" plain @click="doSave" size="mini">保存</el-button><el-button type="danger"  icon="el-icon-remove" plain @click="doCancelUser" size="mini">取消</el-button>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form :model="userForm"  :rules="userFormRules"  ref="userForm" label-width="110px" size="mini">
            <el-row style="margin-top: 10px;">
              <el-col :span="16">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="人员编号" prop="personId">
                      <el-input v-model="userForm.personId" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="人员姓名">
                      <el-input v-model="userForm.personName" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="证件号码" prop="cardNum">
                      <el-input placeholder="请输入内容" v-model="userForm.cardNum" class="input-with-select" :disabled="cardNumStatus">
                        <el-button slot="append" icon="el-icon-circle-close" title="移除" @click="cardNumClick('remove')" :disabled="clickStatus"></el-button>
                        <el-button slot="append" icon="el-icon-search"  title="搜索"  @click="cardNumClick('add')" :disabled="clickStatus"></el-button>
                      </el-input>
                      <!--<el-select v-model="userForm.cardNum" placeholder="请选择"  style="width: 31.5em;">-->
                        <!--<el-option v-for="item in userOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                      <!--</el-select>-->
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="登录密码" prop="password">
                      <el-input v-model="userForm.password" show-password></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="用户状态">
                      <el-select v-model="userForm.status" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="性别">
                      <el-select v-model="userForm.gender" placeholder="请选择" :disabled="true">
                        <el-option v-for="item in genderOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="拼音助记">
                      <el-input v-model="userForm.pyCode"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-form-item label="人员照片">
                  <div class="demo-image__error">
                    <div class="block">
                      <el-image :src="img"></el-image>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="role_body">
        <el-col :span="24">
          <el-row class="text_title text_title_height">
            <el-col :span="24">用户角色关系</el-col>
          </el-row>
          <el-row>
            <div class="myTitle">
              <el-col :span="24">
                <el-button type="success"  icon="el-icon-circle-plus" plain @click="doRelation4New" size="mini">新增</el-button>
                <el-button type="success"  icon="el-icon-edit" plain @click="doRelation4Modify" size="mini">修改</el-button>
                <el-button type="danger"  icon="el-icon-remove" plain @click="doDelBaseUserRoles" size="mini">注销</el-button>
              </el-col>
            </div>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table :data="roleTableData" height="250" style="width: 100%" border @row-click="rowClickBaseUserRoles">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="domainName" label="所属域"></el-table-column>
                <el-table-column prop="roleName" label="职位"></el-table-column>
                <el-table-column prop="organName" label="所属部门"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-dialog width="40%" title="选择人员" :visible.sync="personnelVisible" append-to-body>
        <el-table :data="personnelData" height="250" border @row-dblclick="rowDbClick">
          <el-table-column property="personId" label="人员编号"></el-table-column>
          <el-table-column property="gh" label="工号"></el-table-column>
          <el-table-column property="personName" label="姓名"></el-table-column>
          <el-table-column property="cardNum" label="证件号码"  width="170"></el-table-column>
          <el-table-column property="gender" label="性别" width="100" :formatter="formatterGender"></el-table-column>
          <!--<el-table-column property="pyCode" label="拼音助记" width="100"></el-table-column>-->
        </el-table>
      </el-dialog>

    </el-dialog>
    <el-dialog width="20%" title="用户与角色关系" :visible.sync="userWithRoleVisible">
      <el-form :model="userWithRoleForm" label-width="110px">
        <el-form-item label="所属域">
          <el-select v-model="userWithRoleForm.domainName" placeholder="请选择" @change="userWithRoleDomainChange">
            <el-option v-for="item in dmomainOption" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-select v-model="userWithRoleForm.roleName" placeholder="请选择" @change="userWithRoleRoleIdChange">
            <el-option v-for="item in rolesOption" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="userWithRoleForm.organName" placeholder="请选择" @change="userWithRoleOrganIdChange">
            <el-option v-for="item in organOption" :key="item.value" :label="item.label" :value="item"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRoleData('save')">保存</el-button>
        <el-button @click="addRoleData('cancel')">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getGenderOptions,getStatusOptions} from '@/assets/js/dic.js';
  import SelectTree from './treeSelect';
  export default {
    name: "BaseUser",
    components: {
      SelectTree
    },
    data() {
      return {
        cardNumStatus:true,
        personnelVisible:false,
        userWithRoleVisible:false,
        personnelData:[{personId:'123',gh:'123',personName:'123',cardNum:'362202198908130246',gender:'1'}],
        isAccordion: true,
        props: {
          value: 'id',
          label: 'name',
          children: 'children',
        },
        organData:[],
        userForm: {
          id:'',
          personId: '',
          personName: '',
          cardNum:'',
          gender:'',
          password:'',
          status:'1',
          createdt:'',
        },
        userFormRules: {
          personId: [
            {required: true, message: '请输入人员编号', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ],
          cardNum:[
            { required: true, message: '请选择所属机构', trigger: 'change' }
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur'}
          ]
        },
        userWithRoleForm:{
          domainId:'',
          domainName:'',
          roleId:'',
          roleName:'',
          organId:'',
          organName:'',
        },
        roleOpt:'',
        defaultProps: {
          children: 'items',
          label: 'text',
          isLeaf: 'leaf'
        },
        expandNode: false,
        queryUserForm: {
          filedName: '',
          filedValue: ''
        },
        userOptions: [{value: 'personId',label: '人员编号'},{value: 'personName',label: '人员姓名'}, { value: 'cardNum',label: '证件号码'}],
        userTableData: [],
        dialogTitle: '新增',
        dialogUserFormVisible: false,
        focusTableRecord:'',
        focusTreeNode:'',
        genderMap:{},
        roleTableData:[],
        img:require('@/assets/img/default.png'),
        statusOptions:[],
        genderOptions:[],
        clickStatus:false,
        focusBaseUserRoleItem:'',
        organData4Option:[],
        dmomainData4Option:[],
        rolesMap:'',
        rolesOption:[],
        opt:''
      }
    },
    created: function () {
      this.loadDic();
      this.loadOrganTree();
      this.loadOrganAndRolesAndDomain();
    },
    computed: {
      organOption(){
        return this.computedOptions(this.organData4Option,'id','organizName');
      },
      dmomainOption(){
        return this.computedOptions(this.dmomainData4Option,'id','domainName');
      }
    },
    methods: {
      loadOrganTree:function(){
        const me = this;
        this.$http.post(process.env.API_ROOT + 'loadOrganTreeData.json').then(result => {
          if (result.status === 200) {
            me.organData = result.body.data || [];
          }
        });
      },
      loadDic: function () {
        let list = getGenderOptions();
        let map = {};
        list.forEach(item=>{
          map[item.value] = item.label;
        });
        this.genderMap=map;
        this.genderOptions = list;
        this.statusOptions = getStatusOptions();
      },
      loadOrganAndRolesAndDomain:function(){
        const me = this;
        this.$http.post(process.env.API_ROOT + 'loadDomainAndRolesAndOrgan.json').then(result => {
          if (result.status === 200) {
            if(result.body.code=='200' && result.body.data){
              me.organData4Option=result.body.data.organData||[];
              me.dmomainData4Option=result.body.data.domainData||[];
              me.computedRoles(result.body.data.rolesData||[]);
              // me.rolesData4Option=result.body.data.rolesData||[];
            }
          }
        });
      },
      computedOptions:function(datas,filedName1,filedName2){
        let optionData = [];
        datas.forEach(item=>{
          let cfgs = {
            value:item[filedName1],
            label:item[filedName2]
          }
          optionData.push(cfgs);
        });
        return optionData;
      },
      computedRoles:function(data){
        debugger;
        let rolesMap = '';
        data.forEach(item=>{
          debugger;
          let cfgs = {
            value:item.id,
            label:item.rolesName
          }
          if(rolesMap){
            let equals = true;
            for(let p in rolesMap){
              if(p==item.outDomainId){
                equals = false;
                rolesMap[p].push(cfgs);
                break;
              }
            }
            if(equals){
              rolesMap[item.outDomainId]=[cfgs];
            }
          }else{
            rolesMap={};
            rolesMap[item.outDomainId]=[cfgs];
          }
        });
        this.rolesMap = rolesMap;
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
        let params = {
          organId: data.key
        };
        this.loadUserData(params);
      },
      loadUserData:function(params){
        const me = this;
        this.$http.post(process.env.API_ROOT + 'loadBaseUserMixPersonnels.json', params).then(result => {
          if (result.status === 200) {
            me.userTableData = result.body.data || [];
          }
        });
      },
      doQuery: function () {
        let filedName = this.queryUserForm.filedName;
        let filedValue = this.queryUserForm.filedValue;
        let node = this.focusTreeNode;
        if(!node){
          return;
        }
        const me = this;
        let params = {
          organId: node.key
        };
        if(filedName && filedValue){
          params['filedName'] = filedName;
          params['filedValue'] = filedValue;
        }
        this.$http.post(process.env.API_ROOT + 'loadBaseUserMixPersonnels.json',params).then(result => {
          if (result.status === 200) {
            if(result.body.code=='200'){
              me.userTableData = result.body.data || [];
            }else{
              me.myMessage('error','系统异常');
            }
          }else{
            me.myMessage('error','系统异常');
          }
        });
      },
      doReset: function () {
        this.queryUserForm.filedName='';
        this.queryUserForm.filedValue='';
      },
      doNew: function () {
        this.dialogUserFormVisible = true;
        this.dialogTitle = '新增';
        this.clickStatus=false;
        this.opt = 'create';
        this.initUserForm({});
      },
      doModify: function () {
        debugger;
        if(!this.focusTableRecord){
          this.myMessage('warning','请选择您要修改的条目');
          return;
        }
        this.clickStatus=true;
        this.opt = 'modify';
        this.dialogUserFormVisible = true;
        this.dialogTitle = '修改';
        this.initUserForm(this.focusTableRecord);
        this.loadRoles(this.focusTableRecord);
      },
      loadRoles:function(data){
        const me=this;
        let params = {
          userId:data.id||''
        }
        this.$http.post(process.env.API_ROOT + 'loadBaseUserRolesByUserId.json',params).then(result => {
          if(result.status===200){
            if(result.body.code=='200'){
              me.roleTableData=result.body.data||[];
            }else{
              this.myMessage('error','加载角色数据异常');
            }
          }else{
            this.myMessage('error','加载角色数据异常');
          }

        });
      },
      doDel: function () {
        if(!this.focusTableRecord){
          this.myMessage('warning','请选择您要注销的人员');
          return;
        }
        this.opt = 'modify';
        this.focusTableRecord.logOff = '0';
        this.initParams(this.focusTableRecord);
      },
      doRelation4New:function(){
        this.roleOpt = 'create';
        this.userWithRoleForm.domainId = '';
        this.userWithRoleForm.domainName = '';
        this.userWithRoleForm.roleId = '';
        this.userWithRoleForm.roleName = '';
        this.userWithRoleForm.organId = '';
        this.userWithRoleForm.organName = '';
        this.userWithRoleVisible= true;
      },
      doRelation4Modify:function(){
        if(!this.focusBaseUserRoleItem){
          return;
        }
        this.roleOpt = 'modify';
        this.rolesOption = this.rolesMap[this.focusBaseUserRoleItem.domain];
        this.userWithRoleForm.domainId = this.focusBaseUserRoleItem.domain;
        this.userWithRoleForm.domainName = this.focusBaseUserRoleItem.domainName;
        this.userWithRoleForm.roleId = this.focusBaseUserRoleItem.roleId;
        this.userWithRoleForm.roleName = this.focusBaseUserRoleItem.roleName;
        this.userWithRoleForm.organId = this.focusBaseUserRoleItem.organId;
        this.userWithRoleForm.organName = this.focusBaseUserRoleItem.organName;
        this.userWithRoleVisible= true;
      },
      doDelBaseUserRoles:function(){
        let baseUserRolesList = this.roleTableData||[];
        if(baseUserRolesList.length==0){
          this.myMessage('warning','您没有选中需要修改的数据');
        }
      },
      doSave:function(){
        let optMsg = '保存';
        if(this.opt=='modify'){
          optMsg = '修改';
        }
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            let baseUser = {
              id:this.userForm.id,
              name:this.userForm.personName,
              password:this.userForm.password,
              status:this.userForm.status,
              createdt:this.userForm.createdt||null,
              personId:this.userForm.personId
            };
            let baseUserRoles=[];
            this.roleTableData.forEach(item=>{
              debugger;
              let cfgs = {
                id:item.id,
                userId:this.userForm.id,
                roleId:item.roleId,
                domain:item.domainId,
                organId:item.organId,
                logoff:'1',
                lastLoginTime:item.lastLoginTime||null,
                lastIpAddress:item.lastIpAddress||'',
                createTime:item.createTime||null
              };
              baseUserRoles.push(cfgs);
            });
            const me = this;
            let params = {
              baseUser:baseUser,
              baseUserRoles:baseUserRoles,
            };
            this.$http.post(process.env.API_ROOT + 'saveOrUpdateUserInfo.json',params).then(result => {
              if (result.status === 200) {
                if(result.body.code=='200'){
                  me.myMessage('success',optMsg+'成功');
                  me.loadUserData({organId: me.focusTreeNode.key});
                  me.dialogUserFormVisible = false;
                }else{
                  me.myMessage('error',optMsg+'失败');
                }
              }else{
                me.myMessage('error',optMsg+'异常');
              }
            });
          }else{
            this.myMessage('error','请设置必填项!!!');
          }
        });
      },
      doCancelUser:function(){
        this.dialogUserFormVisible = true;
      },
      initParams:function(data){
        data = data||{};
        this.userForm.id=data.id|| '';
        this.userForm.personId=data.personId|| '';
        this.userForm.name=data.personName|| '';
        this.userForm.password = data.password||'';
        this.userForm.status=data.status||'1';
        this.userForm.createdt=data.createdt||'';
        this.userForm.rId = data.rId||'';
        this.userForm.roleId = data.roleId;
        this.userForm.domain = data.domain;
        this.userForm.organId = data.organId;
        this.userForm.logoff = data.logoff;
        this.userForm.lastLoginTime = data.lastLoginTime||'';
        this.userForm.lastIpAddress = data.lastIpAddress||'';
        this.userForm.createTime = data.createTime||'';
      },
      handleCurrentChange: function (val) {
        this.focusTableRecord = val;
      },
      transferGender:function(row,column){
        let colVal = row.gender;
        return this.genderMap[colVal];
      },
      cardNumClick:function(type){
        if(type=='remove'){
          this.initUserForm({});
        }else if(type=='add'){
          this.personnelVisible = true;
          const me = this;
          let params = {
            type:'1',
            id: this.focusTreeNode.key
          };
          this.$http.post(process.env.API_ROOT + 'loadSysPersonsByOrganIdOrOfficeId.json',params).then(result => {
            debugger;
            if(result.status===200){
              if(result.body.code == '200'){
                me.personnelData = result.body.data||[];
              }else{
                me.myMessage('error','服务器异常，请联系管理员');
              }
            }else{
              me.myMessage('error','服务器异常，请联系管理员');
            }
          });
          // loadSysPersonsByOrganIdOrOfficeId
        }
      },
      rowClickBaseUserRoles:function(row, column, event){
        this.focusBaseUserRoleItem = row;
      },
      rowDbClick:function(row, column, event){
        this.personnelVisible = false;
        this.initUserForm(row);
      },
      initUserForm:function(data){
        this.userForm.personId= data.personId||'';
        this.userForm.personName= data.personName||'';
        this.userForm.cardNum= data.cardNum||'';
        this.userForm.gender= data.gender||'';
        this.userForm.password=data.password||'';
        this.userForm.status=data.status||'1';
      },
      formatterGender:function(row,column){
        let val = row.gender;
        return this.genderMap[val];
      },
      userWithRoleDomainChange:function(item){
        this.userWithRoleForm.roleId = '';
        this.userWithRoleForm.roleName = '';
        this.userWithRoleForm.domainId = item.value;
        this.userWithRoleForm.domainName = item.label;
        if(!this.rolesMap){
          return;
        }
        this.rolesOption = this.rolesMap[item.value];
      },
      userWithRoleRoleIdChange:function(item){
        this.userWithRoleForm.roleId = item.value;
        this.userWithRoleForm.roleName = item.label;
      },
      userWithRoleOrganIdChange:function(item){
        this.userWithRoleForm.organId = item.value;
        this.userWithRoleForm.organName = item.label;
      },
      addRoleData:function(type){
        if(type=='save'){
          if(this.roleOpt=='create'){
            if(!this.existRoleData()){
              this.userWithRoleVisible = false;
              let data = JSON.parse(JSON.stringify(this.userWithRoleForm));
              this.roleTableData.push(data);
            }else{
              this.myMessage('error','已经存在，不能多次添加');
              return;
            }
          }else if(this.roleOpt=='modify'){
            debugger;
            for(let p in this.userWithRoleForm){
              this.focusBaseUserRoleItem[p] = this.userWithRoleForm[p];
            }
            let datas = this.roleTableData;
            let index;
            for(let i=0;i<datas.length;i++){
              if(datas[i].id == this.focusBaseUserRoleItem.id){
                index = i;
                break;
              }
            }
            if(typeof index!=undefined){
              this.roleTableData[index]=this.focusBaseUserRoleItem;
              this.userWithRoleVisible = false;
            }else{
              this.myMessage('error','修改失败');
            }
          }
        }else{
          this.userWithRoleVisible = false;
        }
      },
      existRoleData:function(){
        let exist = false;
        let datas = this.roleTableData;
        let formItem = this.userWithRoleForm;
        datas.forEach(item=>{
          if(item.domainId==formItem.domainId && item.roleId==formItem.roleId && item.organId==formItem.organId){
            exist = true;
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
  .myTitle{
    height: 40px;
    line-height: 40px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .role_body{
    border: 1px solid #d5d6dd;
  }
  .text_title{
    color: #333;
    font-weight: bold;
    font-size: 11px;
    font-family: tahoma,arial,verdana,sans-serif;
    border-color: #d0d0d0;
    background-image: url(../assets/img/white-top-bottom.gif);
  }
  .text_title_height{
    height: 30px;
    line-height: 30px;
  }
</style>
