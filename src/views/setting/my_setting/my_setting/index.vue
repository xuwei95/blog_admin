<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="60px">
      <el-form-item label="用户名">
        <el-input v-model="form.username" :disabled="true"/>
        不可修改。一般用于后台登入名
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="form.nickname"/>
      </el-form-item>
      <el-form-item label="手机">
        <el-input v-model="form.phone_number"/>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email"/>
      </el-form-item>
      <div class="left">
        <el-form-item label="性别">
          <el-select v-model="form.sex" placeholder="选择性别">
            <el-option label="男" value="男"/>
            <el-option label="女" value="女"/>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="备注">
        <el-input v-model="form.note" type="textarea"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get_my_info } from '@/api/admin_api'
import { set_my_info } from '@/api/admin_api'
import { Message } from 'element-ui'
export default {
  data() {
    return {
      form: {
        username: '',
        nickname: '',
        phone_number: '',
        email: '',
        sex: '',
        note: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      get_my_info().then(response => {
        if (response.data.length !== 0) {
          this.form = response.data
        }
        this.listLoading = false
      })
    },
    onSubmit() {
      set_my_info(this.form).then(response => {
        Message.success(response.msg)
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.app-container{
    text-align: center;
  }
.left{
  text-align: left;
}
</style>

