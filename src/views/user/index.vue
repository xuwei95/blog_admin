<template>
  <div class="app-container">
    <el-table
      :data="user_list"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID"
        width="50px">
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称">
      </el-table-column>
      <el-table-column
        prop="sex"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="phone_number"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="date_joined"
        label="创建日期">
      </el-table-column>
      <el-table-column
        prop="note"
        label="备注">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="listQuery.limit"
      :current-page="listQuery.page"
      layout="total, prev, pager, next, sizes, jumper"
      background
      @size-change="handleSizeChange"
      @current-change="current_change">
    </el-pagination>
  </div>
</template>

<script>
import { get_user_list } from '@/api/admin_api'
export default {
  data() {
    return {
      user_list: [],
      listLoading: true,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    handleSizeChange: function(size) {
      this.listQuery.limit = size
      this.fetchData()
    },
    current_change: function(currentPage) {
      this.listQuery.page = currentPage
      this.fetchData()
    },
    fetchData() {
      this.listLoading = true
      get_user_list(this.listQuery).then(response => {
        this.user_list = response.data
        this.total = response.count
        this.listLoading = false
      })
    }
  }
}
</script>

<style scoped>
  .app-container{
    text-align: center;
  }
</style>

