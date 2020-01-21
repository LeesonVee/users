<template>
  <div class="form_div">
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="23">
        <el-form ref="domainForm" :model="domainForm" label-suffix="" label-width="80px" label-position="right" >
          <el-row type="flex" class="row-bg">
            <el-col :span="5">
              <el-form-item label="域名" prop="domainCode">
                <el-input style="width:16em" v-model="domainForm.domainCode"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="中文别名" prop="domainName">
                <el-input style="width:16em" v-model="domainForm.domainName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14">
              <el-button type="primary"  icon="el-icon-search" @click="doQuery">查询</el-button>
              <el-button type="warning"  icon="el-icon-refresh" plain @click="doReset">重置</el-button>
              <el-button type="success"  icon="el-icon-circle-plus" plain @click="doNew">新增</el-button>
              <el-button type="success"  icon="el-icon-edit" plain @click="doModify">修改</el-button>
              <el-button type="danger"  icon="el-icon-remove" plain @click="doDel">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="background-color: #eee;">
      <el-col :span="24">
        <el-table :data="domainData"  height="770" border highlight-current-row  @current-change="handleCurrentChange" @row-dblclick="doModify" style="width: 100%;background-color: #eee;">
          <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
          <el-table-column prop="domainCode" label="域名" width="280"></el-table-column>
          <el-table-column prop="domainName" label="中文别名" width="280"></el-table-column>
          <el-table-column prop="status" label="状态" width="180" :formatter="formatterStatus"></el-table-column>
          <el-table-column prop="domainUrl" label="应用地址" width="380"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
      <el-dialog :title="dialogTitle" :visible.sync="dialogDomainFormVisible" width="30%">
        <el-form :model="dialogDomainForm"  :rules="rules"  label-width="80px">
          <el-form-item label="域名" prop="domainCode">
            <el-input style="width:26em" v-model="dialogDomainForm.domainCode" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="中文别名" prop="domainName">
            <el-input style="width:26em" v-model="dialogDomainForm.domainName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="应用地址" prop="domainCode">
            <el-input style="width:26em" v-model="dialogDomainForm.domainUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input type="textarea" style="width:26em" v-model="dialogDomainForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDomainFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="doSave">确 定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Domain',
  data () {
    return {
      dialogTitle:'新增',
      dialogOpt:'',
      dialogDomainFormVisible:false,
      formLabelWidth:180,
      domainForm:{
        id:'',
        domainName:'',
        domainCode:'',
        status:'1',
        statusText:'启用',
        domainUrl:'',
        remark:''
      },
      dialogDomainForm:{
        id:'',
        domainName:'',
        domainCode:'',
        status:'',
        statusText:'',
        domainUrl:'',
        remark:''
      },
      rules:{
        domainName: [
          { required: true, message: '请输入域名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        domainCode: [
          { required: true, message: '请输入域名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 30 个字符', trigger: 'blur' }
        ],
        domainUrl: [
          { required: true, message: '请输入域名', trigger: 'blur' },
          { min: 10, max: 50, message: '长度在 10 到 50 个字符', trigger: 'blur' }
        ],
        remark: [
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
        ]
      },
      domainData:[{
        id:'402881036f6600bc016f660692300002',
        domainName:'hcms',
        domainCode:'省市综管',
        status:'1',
        statusText:'启用',
        domainUrl:'http://10.8.3.180:8940/hcms/manage.html',
        remark:'Test'
      }],
      focusItem:''
    }
  },
  created:function(){
    this.loadData();
  },
  // mounted:function(){
  //
  // },
  methods:{
    doQuery:function(){
      let data ={};
      if(this.domainForm.domainCode){
        data['domainCode'] = this.domainForm.domainCode;
      }
      if(this.domainForm.domainName){
        data['domainName'] = this.domainForm.domainName;
      }
      this.loadData(data);
    },
    doReset:function(){
      this.domainForm.domainCode='';
      this.domainForm.domainName='';
    },
    doNew:function(){
      this.initDialogForm();
      this.dialogDomainFormVisible = true;
    },
    doModify:function(){
      if(!this.focusItem){
        this.myMessage('warning','请选择要修改的域！');
        return;
      }
      this.initDialogForm(true);
      this.dialogDomainFormVisible = true;
    },
    doSave:function(){
      let data = JSON.parse(JSON.stringify(this.dialogDomainForm));
      data['opt'] = this.dialogOpt;
      this.saveOrUpdateData(data);
    },
    doDel:function(){
      debugger;
      if(!this.focusItem){
        this.myMessage('warning','请选择要删除的域！');
        return;
      }
      this.initDialogForm(true);
      this.dialogDomainForm.status = '0';
      this.doSave();
    },
    initDialogForm:function(status){
      this.dialogTitle = status?'修改':'新增';
      this.dialogOpt = status?'modify':'create';
      this.dialogDomainForm.id=status?this.focusItem.id:'';
      this.dialogDomainForm.domainName=status?this.focusItem.domainName:'';
      this.dialogDomainForm.domainCode=status?this.focusItem.domainCode:'';
      this.dialogDomainForm.status=status?this.focusItem.status:'1';
      this.dialogDomainForm.statusText=status?this.focusItem.statusText:'';
      this.dialogDomainForm.domainUrl=status?this.focusItem.domainUrl:'';
      this.dialogDomainForm.remark=status?this.focusItem.remark:'';
    },
    saveOrUpdateData:function(data){
      const me = this;
      this.$http.post(process.env.API_ROOT+'saveSysDomain.json', data).then(result => {
        if(result.status===200){
          let body = result.body;
          if(body.data){
            me.myMessage('success','操作成功');
            me.dialogDomainFormVisible = false;
            me.loadData();
          }else{
            me.myMessage('error','操作失败')
          }
        }
      });
    },
    loadData:function(data){
      const me = this;
      let params = data||{};
      this.$http.post(process.env.API_ROOT+'querySysDomainByConditions.json', params).then(result => {
        if(result.status===200){
          me.domainData = result.body.data||[];
        }
      });
    },
    handleCurrentChange:function(val){
      debugger;
      this.focusItem = val;
    },
    formatterStatus:function(row, column){
      if(row.status=='1'){
        return '启用';
      }else{
        return '禁用';
      }
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
<style>
  .form_div{
    padding-top: 8px;
    /*height:120px;*/
  }
</style>
