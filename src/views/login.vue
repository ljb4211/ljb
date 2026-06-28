<template>
  <div class="container">
    <div class="title">
      <div class="back-home">
        <el-icon>
          <Back />
        </el-icon>
        <span>返回首页</span>
      </div>
    </div>
    <div class="title-text">
      <h2>登录您的账户</h2>
      <p>请输入您的登录信息</p>
    </div>
    <div class="form-container">
      <el-form ref="ruleFormRef" :model="formData" :rules="rules" label-position="top">
        <el-form-item label="用户名和邮箱" prop="username">
          <el-input v-model="formData.username" size="large" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formData.password" size="large" placeholder="请输入密码" type="password" show-password />
        </el-form-item>
        <el-form-item>
          <el-button class="btn" size="large" type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="footer">
        <p>还没有账户？<router-link to="/auth/register">去注册</router-link></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { login } from '@/api/admin'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const ruleFormRef = ref()

const formData = reactive({
  username: '',
  password: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ]
})

const submitForm = async (formEl) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('formData:', formData)
      login(formData).then(data => {
        console.log('login response:', data)
        //判断tokens是否存在
        if (!data || !data.token) {
          return ElMessage.error('登录失败，用户名或密码错误')
        }
        localStorage.setItem('token', data.token)
        localStorage.setItem('userInfo', JSON.stringify(data.userInfo))
        ElMessage.success('登录成功')
        // 根据用户角色决定跳转的路径
        if (data.userInfo.userType === 2) {
          router.push('/back/dashboard')
        } else {
          router.push('/')
        }
      }).catch(error => {
        console.error('login error:', error)
        ElMessage.error('登录失败，请稍后重试')
      })
    }
  })
}
</script>

<style scoped lang="scss">
.container {
  width: 384px;
  margin: 0 auto;

  .title {
    .back-home {
      margin-bottom: 60px;
    }
  }

  .title-text {
    text-align: center;

    h2 {
      font-size: 36px;
      margin-bottom: 10px;
    }

    p {
      font-size: 20px;
    }
  }

  .form-container {
    margin-top: 30px;

    .btn {
      margin-top: 40px;
      width: 100%;
    }
  }

  .footer {
    padding: 30px;
    text-align: center;
  }
}
</style>