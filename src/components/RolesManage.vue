<template>
  <div>
    <el-container class="item_full_screen">
      <el-aside class="item_aside item_aside_organ_width">
        <el-row class="item_el_row_tree_title"><el-col :span="24"><el-tag type="info">应用域</el-tag></el-col></el-row>
        <el-row>
          <el-col :span="24"><el-tree :data="domainTreeData" :props="defaultProps" @node-click="handleNodeClick" :expand-on-click-node="expandNode"  class="item_el_row_tree_body"></el-tree></el-col>
        </el-row>
      </el-aside>
      <el-main class="item_main">
        <el-row class="form_div">
          <el-col :span="24">
            <el-form ref="queryRolesForm" :model="queryRolesForm" size="small" label-suffix="" label-width="100px" label-position="right" >
              <el-row type="flex" class="row-bg">
                <el-col :span="5">
                  <el-form-item label="角色名称" prop="rolesName">
                    <el-input style="width:14em" v-model="queryRolesForm.rolesName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="角色编码" prop="rolesCode">
                    <el-input style="width:14em" v-model="queryRolesForm.rolesCode"></el-input>
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
            <el-table :data="rolesTable"  height="770" border highlight-current-row  @current-change="handleCurrentChange" size="small" @row-dblclick="doModify" style="width: 100%;background-color: #eee;">
              <el-table-column prop="rolesCode" label="角色编码" width="260"></el-table-column>
              <el-table-column prop="rolesName" label="角色名称"></el-table-column>
              <el-table-column prop="outDomainId" label="所在域" :formatter="formatDomain"></el-table-column>
              <el-table-column prop="modifyDate" label="修改时间" width="180" :formatter="formatterDate"></el-table-column>
              <!--<el-table-column prop="modifyDate" label="修改时间" width="180"></el-table-column>-->
              <el-table-column prop="createDate" label="创建时间" width="180" :formatter="formatterDate"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogRolesFormVisible" width="35%">
      <el-form :model="rolesForm" :rules="rolesFormRuls" ref="rolesForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="rolesName">
          <el-input v-model="rolesForm.rolesName"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="rolesCode">
          <el-input v-model="rolesForm.rolesCode"></el-input>
        </el-form-item>
        <el-form-item label="所在域" prop="outDomainId">
          <el-select v-model="rolesForm.outDomainId" placeholder="请选择">
            <el-option v-for="item in domainOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRolesFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'RolesManage',
    data() {
      return {
        dialogTitle:'新增',
        opt:'create',
        dialogRolesFormVisible:false,
        createDateStatus:true,
        expandNode:false,
        defaultProps:{
          children: 'items',
          label: 'text'
        },
        domainTreeData:'',
        queryRolesForm:{
          rolesName:'',
          rolesCode:''
        },
        rolesTable:[

        ],
        rolesForm:{
          id:'',
          rolesName:'',
          rolesCode:'',
          outDomainId:'',
          outDomainText:'',
          status:'',
          createDate:''
        },
        rolesFormRuls:{
          rolesName:[
            { required: true, message: '请输入机构代码', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          rolesCode:[
            { required: true, message: '请输入机构代码', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          outDomainId:[
            { required: true, message: '请选择所在域', trigger: 'change' }
          ]
        },
        domainOptions:[],
        domainMap:{},
        focusRolesFormItem:'',
        focusDomainTreeItem:''
      }
    },
    created:function(){
      this.loadDomain();
      this.loadRoles();
    },
    methods:{
      doQuery:function(){},
      doReset:function(){
        this.queryRolesForm.rolesName='';
        this.queryRolesForm.rolesCode='';
      },
      doNew:function(){
        this.dialogTitle='新增';
        this.opt = 'create';
        this.dialogRolesFormVisible= true;
        this.initRolesParams({});
      },
      doModify:function(){
        if(!this.focusRolesFormItem){
          this.myMessage('warning','请选中要修改的角色');
          return;
        }
        this.dialogRolesFormVisible= true;
        this.initRolesParams(this.focusRolesFormItem);
        this.dialogTitle='修改';
        this.opt = 'modify';
      },
      doDel:function(){
        if(!this.focusRolesFormItem){
          this.myMessage('warning','请选中要修改的角色');
          return;
        }
        this.initRolesParams(this.focusRolesFormItem);
        this.rolesForm.status='0';
        let params = JSON.parse(JSON.stringify( this.rolesForm));
        params['opt'] = 'modify';
        const me = this;
        this.$http.post(process.env.API_ROOT+'saveOrUpdateSysRoles.json', params).then(result => {
          if(result.status===200){
            this.dialogRolesFormVisible= false;
            if(me.focusDomainTreeItem){
              me.loadRoles(me.focusDomainTreeItem.key);
            }else{
              me.loadRoles();
            }
          }else{
            this.myMessage('error','操作失败');
          }
        });
      },
      doSave:function(){
        debugger;
        let params = JSON.parse(JSON.stringify( this.rolesForm));
        params['opt'] = this.opt;
        const me = this;
        this.$refs['rolesForm'].validate((valid) => {
          if(valid){
            this.$http.post(process.env.API_ROOT+'saveOrUpdateSysRoles.json', params).then(result => {
              if(result.status===200){
                this.dialogRolesFormVisible= false;
                if(me.focusDomainTreeItem){
                  me.loadRoles(me.focusDomainTreeItem.key);
                }else{
                  me.loadRoles();
                }
              }else{
                this.myMessage('error','操作失败');
              }
            });
          }else{
            this.myMessage('warning','请输入必填项');
          }
        });

      },
      handleCurrentChange:function(val){
        this.focusRolesFormItem = val;
      },
      initRolesParams:function(data){
        this.rolesForm.id = data.id||'';
        this.rolesForm.rolesName = data.rolesName||'';
        this.rolesForm.rolesCode = data.rolesCode||'';
        if(data.outDomainId){
          this.rolesForm.outDomainId = data.outDomainId;
        }else{
          if(this.focusDomainTreeItem){
            this.rolesForm.outDomainId = this.focusDomainTreeItem.key;
          }else{
            this.rolesForm.outDomainId='';
          }
        }
        this.rolesForm.status = data.status||'1';
        this.rolesForm.createDate = data.createDate||'';
      },
      loadDomain:function(){
        debugger;
        let cfgs = {
          key:'',
          text:'应用域',
          root:true,
          items:[]
        };
        this.domainTreeData = [cfgs];
        let me = this;
        let domainMap = {};
        this.domainOptions = [];
        this.$http.post(process.env.API_ROOT+'querySysDomain.json', {}).then(result => {
          if(result.status===200){
            let data = result.body.data||[];
            let items=[];
            for(let i=0;i<data.length;i++){
              domainMap[data[i].id]=data[i].domainName;
              let option = {
                value:data[i].id,
                label:data[i].domainName
              }
              let el = {
                key:data[i].id,
                text:data[i].domainName,
                items:[]
              };
              items.push(el);
              me.domainOptions.push(option);
            }
            me.domainMap = domainMap;
            me.domainTreeData[0].items = items;
          }
        });
      },
      handleNodeClick:function(data){
        debugger;
        if(data.root){
          this.loadRoles();
          return;
        }
        this.loadRoles(data.key);
      },
      loadRoles:function(domainId){
        const me = this;
        let params = {};
        if(domainId){
          params['outDomainId'] = domainId;
        }
        this.$http.post(process.env.API_ROOT+'loadAllSysRoles.json', params).then(result => {
          if(result.status===200){
            let data = result.body.data||[];
            me.rolesTable = data;
          }
        });
      },
      formatDomain:function(row, column){
        let colVal = row.outDomainId;
        return this.domainMap[colVal];
      },
      formatterDate:function(row, column) {
        debugger;
        let colName = column.property;
        let colValue = row[colName];
        let dateee = new Date(colValue).toJSON();
        return  new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
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
