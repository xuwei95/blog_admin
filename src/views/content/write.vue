<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="70px">
      <div class="left">
        <el-form-item label="文章分类">
          <el-select v-model="form.category" placeholder="选择分类">
            <div v-for="item in category_list" :key="item.id">
              <el-option :label="''+item.name" :value="''+item.name"/>
            </div>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="文章标题">
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="form.tags"/>
      </el-form-item>
      <div v-if="!is_mobile">
        <div id="markdown_editor" >
          <textarea name="content" style="display:none;"></textarea>
        </div>
      </div>
      <div v-else>
        <mavon-editor v-model="form.content" :toolbars="toolbars" :subfield="false" class="editor"/>
      </div>
      <div class="left">
        <el-form-item label="是否公开">
          <el-switch
            v-model="form.is_public"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="Add_Article">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { get_category_list } from '@/api/admin_api'
import { add_article } from '@/api/admin_api'
import { Message } from 'element-ui'
import { is_Mobile } from '@/utils/is_mobile'
import { getToken } from '@/utils/auth'
export default {
  name: 'Write',
  data() {
    return {
      form: {
        category: '',
        title: '',
        tags: '',
        content: '',
        is_public: true,
        token: ''
      },
      category_list: [],
      listLoading: true,
      is_mobile: false,
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        mark: true, // 标记
        superscript: true, // 上角标
        quote: true, // 引用
        ol: true, // 有序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        help: true, // 帮助
        code: true, // code
        subfield: true, // 是否需要分栏
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        /* 1.3.5 */
        undo: true, // 上一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true // 导航目录
      }
    }
  },
  created() {
    this.get_Category_list()
    this.is_mobile = is_Mobile()
    this.form.token = getToken()
  },
  mounted() {
    if (!this.is_mobile) {
      this.initEditor()
    }
  },
  methods: {
    initEditor() {
      window.editormd('markdown_editor', {
        width: '100%',
        height: 640,
        emoji: true,
        syncScrolling: 'single',
        path: '../static/lib/',
        codeFold: true
      })
    },
    get_Category_list() {
      this.listLoading = true
      get_category_list(this.listQuery).then(response => {
        this.category_list = response.data
        this.listLoading = false
      })
    },
    Add_Article() {
      if (!this.is_mobile) {
        this.form.content = window.$('textarea[name=content]').val()
      }
      add_article(this.form).then(response => {
        Message.success(response.msg)
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
.editor{
  z-index: 0;
}
</style>
