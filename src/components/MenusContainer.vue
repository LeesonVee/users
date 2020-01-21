<template>
  <div>
    <el-container>
      <el-header>
        <el-form ref="queryMenuForm" :model="queryMenuForm" label-width="80px" size="mini">
          <el-row type="flex" class="row-bg form_row_top">
            <el-col :span="4">
              <el-form-item label="名称">
                <el-input v-model="queryMenuForm.menuName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="编码">
                <el-input v-model="queryMenuForm.menuCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="角色">
                <el-select v-model="queryMenuForm.outRoleId" placeholder="请选择">
                  <el-option v-for="item in rolesOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="1">&nbsp;</el-col>
            <el-col :span="11">
              <el-button type="primary"  icon="el-icon-search" @click="doQuery" size="small">查询</el-button>
              <el-button type="warning"  icon="el-icon-refresh" plain @click="doReset" size="small">重置</el-button>
              <el-button type="success"  icon="el-icon-circle-plus" plain @click="doNew" size="small">新增</el-button>
              <el-button type="success"  icon="el-icon-edit" plain @click="doModify" size="small">修改</el-button>
              <el-button type="danger"  icon="el-icon-remove" plain @click="doDel" size="small">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="menuData" style="width: 100%;margin-bottom: 20px;" row-key="id" border lazy :load="treeLoadClick" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column prop="menuName" label="菜单名称" sortable></el-table-column>
          <el-table-column prop="menuCode" label="编码" width="180"></el-table-column>
          <el-table-column prop="menuPath" label="路径"></el-table-column>
          <el-table-column prop="outRoleId" label="角色"  width="180" :formatter="formatterRoles"></el-table-column>
          <el-table-column prop="modifyDate" label="修改时间" sortable  width="180" :formatter="formatterDate"></el-table-column>
          <el-table-column prop="createDate" label="创建时间" sortable  width="180" :formatter="formatterDate"></el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-dialog :title="dialogTitle" :visible.sync="dialogMenuFormVisible" width="35%">
      <el-form :model="menuForm" :rules="menuRoles" ref="menuForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuForm.menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单编码" prop="menuCode">
          <el-input v-model="menuForm.menuCode"></el-input>
        </el-form-item>
        <el-form-item label="顶级菜单">
          <el-switch active-text="开" inactive-text="关" v-model="menuForm.rootMenu" @change="switchRootMenu" :disabled="switchStatus"></el-switch>
        </el-form-item>
        <el-form-item label="角色" prop="outRoleId" >
          <el-select v-model="menuForm.outRoleId" placeholder="请选择" :disabled="selectDisabled">
            <el-option v-for="item in rolesOptions" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路径" prop="menuPath">
          <el-input type="textarea" v-model="menuForm.menuPath"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogMenuFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doSave">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'MenusContainer',
    data() {
      return {
        dialogTitle:'新增',
        dialogMenuFormVisible:false,
        selectDisabled:false,
        switchStatus:false,
        menuForm:{
          id:'',
          menuName:'',
          menuCode:'',
          menuLevel:'',
          menuPath:'',
          menuParentId:'',
          outRoleId:'',
          subMenuStatus:'',
          status:'',
          rootMenu:false,
          createDate:''
        },
        menuRoles:{
          menuName:[
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          menuCode:[
            { required: true, message: '请输入菜单编码', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 50 个字符', trigger: 'blur' }
          ],
          menuPath:[
            { required: true, message: '请输入菜单路径', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 300 个字符', trigger: 'blur' }
          ],
          outRoleId:[
            { required: true, message: '请选择所在域', trigger: 'change' }
          ]
        },
        queryMenuForm:{
          menuName:'',
          menuCode:'',
          outRoleId:''
        },
        menuData:[],
        rolesOptions:[],
        rolesMap:{},
        focusTableRecord:''
      }
    },
    created:function(){
      this.loadRoles();
    },
    mounted:function(){
      this.loadMenus();
    },
    methods:{
      loadRoles:function(){
        const me = this;
        this.rolesOptions=[];
        this.$http.post(process.env.API_ROOT+'loadAllSysRoles.json', {}).then(result => {
          if(result.status===200){
            let rolesOptions = result.body.data||[];
            if(rolesOptions.length>0){
              rolesOptions.forEach(option=>{
                let cfg = {
                  key:option.id,
                  value:option.id,
                  label:option.rolesName
                };
                me.rolesMap[option.id]=option.rolesName;
                me.rolesOptions.push(cfg);
              });
            }
          }
        });
      },
      loadMenus:function(data){
        let params = {};
        if(data){
          params = JSON.parse(JSON.stringify(data));
        }
        params['status'] = '1';
        this.countParams(params);
        const me = this;
        this.$http.post(process.env.API_ROOT+'queryMemusByPage.json', params).then(result => {
          if(result.status===200){
            me.menuData = result.body.data||[];
          }
        });
      },
      countParams:function(data){
        if(data.menuName && data.menuCode && data.outRoleId){
          data['countParams'] = 8;
        }
        if(!data.menuName && data.menuCode && data.outRoleId){
          data['countParams'] = 7;
        }
        if(data.menuName && !data.menuCode && data.outRoleId){
          data['countParams'] = 6;
        }
        if(data.menuName && data.menuCode && !data.outRoleId){
          data['countParams'] = 5;
        }
        if(!data.menuName && !data.menuCode && data.outRoleId){
          data['countParams'] = 4;
        }
        if(!data.menuName && data.menuCode && !data.outRoleId){
          data['countParams'] = 3;
        }
        if(data.menuName && !data.menuCode && !data.outRoleId){
          data['countParams'] = 2;
        }
        if(!data.menuName && !data.menuCode && !data.outRoleId){
          data['countParams'] = 1;
        }
      },
      doQuery:function(){
        let data ={};
        if(this.queryMenuForm.menuName){
          data['menuName'] = this.queryMenuForm.menuName;
        }
        if(this.queryMenuForm.menuCode){
          data['menuCode'] = this.queryMenuForm.menuCode;
        }
        if(this.queryMenuForm.outRoleId){
          data['outRoleId'] = this.queryMenuForm.outRoleId;
        }
        this.loadMenus(data);
      },
      doReset:function(){
        this.queryMenuForm.menuName='';
        this.queryMenuForm.menuCode='';
        this.queryMenuForm.outRoleId='';
      },
      doNew:function(){
        debugger;
        let data = {
          status:'1',
          rootMenu:true,
          menuLevel:1
        };
        this.switchStatus = false;
        this.dialogTitle='新增';
        this.opt = 'create';
        this.dialogMenuFormVisible= true;
        if(this.focusTableRecord){
          this.selectDisabled=true;
          data['outRoleId'] = this.focusTableRecord.outRoleId;
          data['menuParentId'] = this.focusTableRecord.id;
          data.rootMenu=false;
          data.menuLevel = this.focusTableRecord.menuLevel+1;
        }
        this.initParams(data);
      },
      doModify:function(){
        debugger;
        if(!this.focusTableRecord){
          this.myMessage('warning','请选中您要修改的数据');
          return;
        }
        let data = JSON.parse(JSON.stringify(this.focusTableRecord));
        data.status = '1';
        data.rootMenu = false;
        this.dialogTitle='修改';
        this.opt = 'modify';
        this.dialogMenuFormVisible= true;
        this.selectDisabled=true;
        this.switchStatus = true;
        this.initParams(data);
      },
      doDel:function(){
        this.opt = 'modify';
        let data = JSON.parse(JSON.stringify(this.focusTableRecord));
        data.status = '0';
        this.initParams(data);
        this.doSave();
        this.focusTableRecord='';
      },
      doSave:function(){
        const me = this;
        console.info(JSON.stringify(this.menuForm));
        let params = this.menuForm;
        params['opt'] = this.opt;
        this.$http.post(process.env.API_ROOT+'saveOrUpdateSysMenu.json', params).then(result => {
          if(result.status===200){
            this.focusTableRecord = result.body.data;
            me.loadMenus();
          }
        });
      },
      initParams:function(data){
        this.menuForm.id=data.id||'';
        this.menuForm.menuName=data.menuName||'';
        this.menuForm.menuCode=data.menuCode||'';
        this.menuForm.outRoleId=data.outRoleId||'';
        this.menuForm.menuLevel = data.menuLevel||'';
        this.menuForm.menuParentId = data.menuParentId||'';
        this.menuForm.subMenuStatus = data.subMenuStatus||'';
        this.menuForm.menuPath=data.menuPath||'';
        this.menuForm.rootMenu=data.rootMenu||false;
        this.menuForm.status = data.status||'';
        this.menuForm.createDate=data.createDate||'';
      },
      switchRootMenu:function(val){
        debugger;
        let data = JSON.parse(JSON.stringify(this.menuForm));
        if(val){
          this.selectDisabled=false;
          data.menuLevel='1';
          data.rootMenu=true;
          data.menuParentId='';
        }else{
          this.selectDisabled=true;
          data['rootMenu']=false;
          if(this.focusTableRecord){
            data['outRoleId'] = this.focusTableRecord.outRoleId;
            data['menuParentId'] = this.focusTableRecord.menuParentId;
          }
        }
        this.initParams(data);
      },
      handleCurrentChange:function(val){
        this.focusTableRecord = val;
      },
      treeLoadClick:function(tree, treeNode, resolve){
        debugger;
        let params ={
          menuParentId:tree.id
        };
        this.$http.post(process.env.API_ROOT+'loadMemusByParentId.json', params).then(result => {
          if(result.status===200){
            let data = result.body.data||[];
            resolve(data);
          }
        });
      },
      formatterRoles:function(row,column){
        let outRoleIdValue = row.outRoleId;
        return this.rolesMap[outRoleIdValue];
      },
      formatterDate:function(row, column) {
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
  .form_row_top{
    margin-top: 10px;
  }
</style>
