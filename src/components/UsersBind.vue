<template>
  <div>
    <el-container class="item_full_screen">
      <el-aside class="item_aside item_aside_organ_width">
        <el-row class="item_el_row_tree_title"><el-col :span="24"><el-tag type="info">所属机构科室</el-tag></el-col></el-row>
        <el-row>
          <el-col :span="24"><el-tree  :props="defaultProps" lazy @node-click="handleNodeClick" :load="loadNode" :expand-on-click-node="expandNode"  class="item_el_row_tree_body"></el-tree></el-col>
        </el-row>
      </el-aside>
      <el-main class="item_main">
        <el-row class="form_div">
          <el-col :span="24">
            <el-select style="width:10em" v-model="queryUserForm.filedName" placeholder="请选择" size="small" >
              <el-option v-for="item in usersOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-input style="width:14em" v-model="queryUserForm.filedValue" size="small"></el-input>
            <el-button type="primary"  icon="el-icon-search" @click="doQuery" size="small">查询</el-button>
            <el-button type="warning"  icon="el-icon-refresh" plain @click="doReset" size="small">重置</el-button>
            <el-button type="success"  icon="el-icon-circle-plus" plain @click="doNew" size="small">绑定用户</el-button>
            <el-button type="success"  icon="el-icon-edit" plain @click="doModify" size="small">更改绑定</el-button>
            <el-button type="danger"  icon="el-icon-remove" plain @click="doDel" size="small">删除绑定</el-button>
          </el-col>
        </el-row>
        <el-row style="background-color: #eee;">
          <el-col :span="24">
            <el-table :data="userRelationGirdData"  height="770" border highlight-current-row  @current-change="handleCurrentChange" size="small" @row-dblclick="doModify" style="width: 100%;background-color: #eee;">
              <el-table-column prop="username" label="用户名"></el-table-column>
              <el-table-column prop="localUserId" label="人员编号"></el-table-column>
              <el-table-column prop="remoteUserId" label="绑定人员编号"></el-table-column>
              <el-table-column prop="createDate" label="创建时间"></el-table-column>
              <el-table-column prop="modifyDate" label="修改时间"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogUserRelationFormVisible" width="40%">
      <el-row>
        <div class="myTitle">
          <el-col :span="24">
            <el-button type="success"  icon="el-icon-circle-plus" plain @click="doSave" size="mini">保存</el-button><el-button type="danger"  icon="el-icon-remove" plain @click="doCancelUser" size="mini">取消</el-button>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form ref="userRelationForm" :model="userRelationForm"  :rules="userRelationFormRules"  label-width="80px" size="mini">
            <el-row style="margin-top: 20px;">
              <el-col :span="8">
                <el-form-item label="密钥" prop="centerKey">
                  <el-input v-model="userRelationForm.centerKey" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="用户ID" prop="remoteUserId">
                  <el-input v-model="userRelationForm.remoteUserId" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="密码" prop="password">
                  <el-input v-model="userRelationForm.password" type="password" autocomplete="off"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row class="role_body">
        <el-col :span="24">
          <el-row class="text_title text_title_height">
            <el-col :span="24">绑定用户列表</el-col>
          </el-row>
          <el-row  style="margin-top: 5px;">
            <el-col :span="24">
              <el-table :data="baseUserGridData" height="250" style="width: 100%" border @row-click="rowClickBaseUserRoles" size="mini">
                <el-table-column type="index" label="序号" width="50"></el-table-column>
                <el-table-column prop="personName" label="用户名"></el-table-column>
                <el-table-column prop="personId" label="人员ID"></el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogDelUserRelationVisible" width="20%">
      <el-form :model="userRelationForm2" label-width="80px" label-suffix=":" size="mini">
        <el-form-item label="平台密钥" prop="centerKey">
          <el-input v-model="userRelationForm2.centerKey" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDelUserRelationVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSaveDelRelation">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
    import {hex_md5} from '@/assets/js/md5.js';
    import SelectTree from './treeSelect';
    export default {
        name: "UsersBind",
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
                userRelationForm: {
                    id:'',
                    username:'',
                    centerKey:'',
                    localUserId:'',
                    remoteUserId:'',
                    username:'',
                    createDate:'',
                    modifyDate:'',
                    password:''
                },
                userRelationForm2:{
                    centerKey:''
                },
                userRelationFormRules: {
                    remoteUserId: [
                        {required: true, message: '请输入用户id', trigger: 'blur'},
                        {min: 2, max: 32, message: '长度在 2 到 32 个字符', trigger: 'blur'}
                    ],
                    centerKey: [
                        {required: true, message: '请输入密钥', trigger: 'change'},
                        {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },
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
                usersOptions: [{
                    value: 'localUserId',
                    label: '人员编号'
                }, {
                    value: 'remoteUserId',
                    label: '绑定人员编号'
                }, {
                    value: 'username',
                    label: '用户名'
                }],
                userRelationGirdData: [],
                baseUserGridData:[],
                dialogTitle: '新增',
                dialogUserRelationFormVisible: false,
                dialogDelUserRelationVisible:false,
                focusTableRecord:'',
                focusTreeNode:'',
                focusBaseUserRecord:'',
                opt:''
            }
        },
        created: function () {
            this.loadOrganTree();
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
            handleNodeClick: function (data) {
                this.focusTreeNode = data;
                const me = this;
                let params = {
                    type:'0',
                    organId: data.key
                };
                this.$http.post(process.env.API_ROOT + 'loadBaseUserRelation.json', params).then(result => {
                    if (result.status === 200) {
                        me.userRelationGirdData = result.body.data || [];
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
                if(!this.focusTreeNode){
                    this.myMessage('warning','请先勾选机构树');
                   return;
                }
                let filedName = this.queryUserForm.filedName;
                let filedValue = this.queryUserForm.filedValue;
                let params = {
                    type:'0',
                    val:filedValue
                };
                if(filedName && filedValue){
                    if(filedName=='localUserId'){
                        params.type='1';
                    }else if(filedName=='remoteUserId'){
                        params.type='2';
                    }else if(filedName=='username'){
                        params.type='3';
                    }
                }
                const me = this;
                params['organId']=this.focusTreeNode.key;
                this.$http.post(process.env.API_ROOT + 'loadBaseUserRelation.json', params).then(result => {
                    if (result.status === 200) {
                        me.userRelationGirdData = result.body.data || [];
                    }
                });
            },
            doReset: function () {
                this.queryUserForm.filedName='';
                this.queryUserForm.filedValue='';
            },
            doNew: function () {
                debugger;
                this.dialogUserRelationFormVisible = true;
                this.dialogTitle = '新增';
                this.opt = 'create';
                this.initParams();
                this.loadPersonData({organId:this.focusTreeNode.key});
            },
            doModify: function () {
                if(!this.focusTableRecord){
                    this.myMessage('warning','请选择您要修改的条目');
                    return;
                }
                this.opt = 'modify';
                this.dialogUserRelationFormVisible = true;
                this.dialogTitle = '修改';
                this.initParams(this.focusTableRecord);
            },
            doDel: function () {
                this.userRelationForm2.centerKey = '';
                this.dialogDelUserRelationVisible=true;
            },
            loadPersonData:function(params){
                const me = this;
                this.$http.post(process.env.API_ROOT + 'loadSysPersonnelByOrganId.json',params).then(result => {
                    if (result.status === 200) {
                        if(result.body.code=='200'){
                            me.baseUserGridData = result.body.data||[];
                        }else{
                            me.myMessage('error','获取用户数据失败');
                        }
                    }else{
                       me.myMessage('error','获取用户数据失败');
                    }
                });
            },
            doSave:function(){
                debugger;
                if(!this.focusBaseUserRecord){
                    this.myMessage('error','请选择要绑定的用户');
                    return;
                }
                this.$refs['userRelationForm'].validate((valid) => {
                    let optMsg = '保存';
                    if (valid) {
                        const me = this;
                        let params = {
                            id:this.focusTableRecord.id,
                            centerKey:this.userRelationForm.centerKey,
                            localUserId:this.focusBaseUserRecord.personId,
                            pwd:hex_md5(this.userRelationForm.password),
                            organId:me.focusTreeNode.key,
                            remoteUserId:this.userRelationForm.remoteUserId,
                            username:this.focusBaseUserRecord.personName
                        };
                        if(this.opt=='modify'){
                            optMsg = '修改';
                            params['createDate']=this.focusTableRecord.createDate;
                        }
                        this.$http.post(process.env.API_ROOT + 'vaildCenterKeyAndUesrId.json',params).then(result => {
                            if (result.status === 200) {
                                if(result.body.code=='200'){
                                    if(result.body.data===0){
                                        me.myMessage('error','密钥错误');
                                        return;
                                    }
                                    if(result.body.data===2){
                                        me.myMessage('error','密码错误');
                                        return;
                                    }
                                    me.$http.post(process.env.API_ROOT + 'saveOrUpdateBaseUserRelation.json',params).then(result => {
                                        if (result.status === 200) {
                                            if(result.body.code=='200'){
                                                me.myMessage('success',optMsg+'成功');
                                                me.handleNodeClick(me.focusTreeNode);
                                                me.dialogUserRelationFormVisible = false;
                                            }else{
                                                me.myMessage('error',optMsg+'失败');
                                            }
                                        }else{
                                            me.myMessage('error',optMsg+'失败');
                                        }
                                    });
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
                this.focusBaseUserRecord='';
                data = data||{};
                this.userRelationForm.id=data.id||'';
                this.userRelationForm.username='';
                this.userRelationForm.centerKey='';
                this.userRelationForm.localUserId='';
                this.userRelationForm.remoteUserId=data.remoteUserId||'';
                this.userRelationForm.username='';
                this.userRelationForm.createDate=data.createDate||'';
                this.userRelationForm.modifyDate='';
                this.userRelationForm.password='';
            },
            handleCurrentChange: function (val) {
                this.focusTableRecord = val;
            },
            rowClickBaseUserRoles:function(data){
                this.focusBaseUserRecord=data;
            },
            doSaveDelRelation:function(){
                if(!this.userRelationForm2.centerKey){
                    this.myMessage('warning','请输入密钥!!!');
                    return;
                }
                let params = {
                    id:this.focusTableRecord.id,
                    centerKey:this.userRelationForm2.centerKey
                };
                const me = this;
                this.$http.post(process.env.API_ROOT + 'delBaseUserRelationById.json',params).then(result => {
                    if (result.status === 200) {
                        if(result.body.code=='200'){
                            me.handleNodeClick(me.focusTreeNode);
                            me.myMessage('success','删除成功');
                            me.dialogDelUserRelationVisible = false;
                        }else{
                            me.myMessage('error','删除失败');
                        }
                    }else{
                        me.myMessage('error','系统异常');
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
