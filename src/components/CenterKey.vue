<template>
  <div class="form_div">
    <el-row>
      <el-col :span="24">
        <el-form ref="centerKeyForm" :model="centerKeyForm" label-suffix=":" label-width="80px" label-position="right" size="small">
          <el-row type="flex" class="row-bg">
            <el-col :span="5">
              <el-form-item label="状态" prop="status">
                <el-select v-model="centerKeyForm.status" placeholder="请选择">
                  <el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="密钥" prop="centerKey">
                <el-input  v-model="centerKeyForm.centerKey"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="14" style="padding-left:10px;">
              <el-button type="primary"  icon="el-icon-search" @click="doQuery" size="small">查询</el-button>
              <el-button type="warning"  icon="el-icon-refresh" plain @click="doReset" size="small">重置</el-button>
              <el-button type="success"  icon="el-icon-circle-plus" plain @click="doNew" size="small">生成key</el-button>
              <el-button type="success"  icon="el-icon-open" plain @click="doModify('2')" size="small">启用</el-button>
              <el-button type="warning"  icon="el-icon-turn-off" plain @click="doModify('3')" size="small">禁用</el-button>
              <el-button type="danger"  icon="el-icon-remove" plain @click="doModify('0')" size="small">删除</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
    <el-row style="background-color: #eee;">
      <el-col :span="24">
        <el-table :data="centerKeyData"  height="770" border highlight-current-row  @current-change="handleCurrentChange" style="width: 100%;background-color: #eee;">
          <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
          <el-table-column prop="centerKey" label="密钥" width="330"></el-table-column>
          <el-table-column prop="status" label="状态" width="120" :formatter="formatterStatus"></el-table-column>
          <el-table-column prop="createDate" label="创建时间"></el-table-column>
          <el-table-column prop="modifyDate" label="修改时间"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'Domain',
        data () {
            return {
                opt:'',
                optionsStatus:[{value: '1',label: '未启用'},{value: '2',label: '启用'},{value: '3',label: '禁用'}],
                centerKeyForm:{
                    status:'',
                    centerKey:''
                },
                centerKeyData:[
                  //   {
                  //     id:'402881036f6600bc016f660692300002',
                  //     centerKey:'402881036f6600bc016f660692300002',
                  //     status:'1',
                  //     createDate:'2020年2月17日 16:56:13',
                  //     modifyDate:'2020年2月17日 16:56:13'
                  // }
                ],
                focusItem:''
            }
        },
        created:function(){
            this.loadData();
        },
        methods:{
            doQuery:function(){
                let data ={};
                if(this.centerKeyForm.status){
                    data['status'] = this.centerKeyForm.status;
                }
                if(this.centerKeyForm.centerKey){
                    data['centerKey'] = this.centerKeyForm.centerKey;
                }
                this.loadData(data);
            },
            doReset:function(){
                this.centerKeyForm.status='';
                this.centerKeyForm.centerKey='';
            },
            doNew:function(){
                this.opt = 'create';
                this.doSave();
            },
            doModify:function(type){
                let msg = '';
                let status = type;
                let opt = '';
                switch (type) {
                    case '0':
                        msg = '删除';
                        opt = 'delete';
                        break;
                    case '2':
                        msg = '启用';
                        opt = 'enable';
                        break;
                    case '3':
                        msg = '禁用';
                        opt = 'disable';
                        break;
                    default:
                        msg = '启用';
                        opt = 'enable';
                        break;
                }
                if(!this.focusItem){
                    this.myMessage('warning','请选中要'+msg+'的密钥');
                    return;
                }
                if(this.focusItem.status==type){
                    this.myMessage('warning','请勿重复'+msg);
                    return;
                }
                this.opt = opt;
                let data = JSON.parse(JSON.stringify(this.focusItem));
                data.status=status;
                this.doSave(data);
            },
            doSave:function(data){
                const me = this;
                if(!data){
                    data = {};
                }
                data['opt'] = this.opt;
                this.$http.post(process.env.API_ROOT+'saveOrUpdateUserCenterKey.json', data).then(result => {
                    if(result.status===200){
                        me.focusItem='';
                        let body = result.body;
                        if(body.data){
                            me.myMessage('success','操作成功');
                            me.loadData();
                        }else{
                            me.myMessage('error','操作失败')
                        }
                    }
                });
            },
            saveOrUpdateData:function(data){
                const me = this;
                this.$http.post(process.env.API_ROOT+'saveSysDomain.json', data).then(result => {
                    if(result.status===200){
                        let body = result.body;
                        if(body.data){
                            me.myMessage('success','操作成功');
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
                this.$http.post(process.env.API_ROOT+'loadUserCenterKeyByConditions.json', params).then(result => {
                    if(result.status===200){
                        me.centerKeyData = result.body.data||[];
                    }
                });
            },
            handleCurrentChange:function(val){
                this.focusItem = val;
            },
            formatterStatus:function(row, column){
                if(row.status=='1'){
                    return '未启用';
                }else if(row.status=='2'){
                    return '启用';
                }{
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
