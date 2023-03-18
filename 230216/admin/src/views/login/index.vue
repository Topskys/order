<script setup lang="ts">
import {ref, reactive} from "vue";
import {useRouter} from 'vue-router';
import {FormInstance} from "element-plus";
import {storeToRefs} from 'pinia'
//import {user} from '../../store/user.ts'


const router = useRouter()
//const store = user()


//const {login} = store; // 获取actions函数
//let {token, userInfo, getToken} = storeToRefs(store); // 解构Pinia数据或getters函数，使得数据保持响应式

//console.log("Pinia API",getToken)

let admin = reactive({
    email: "admin",
    password: "123456"
})

const form = ref<FormInstance>()
let shake = ref("")


const onSubmit = (el: FormInstance | undefined) => {
    if (!el) return;
    el.validate(valid => {
        if (valid) {
//            login(admin).then(() => {
//                router.push("/")
//            }).catch(err => {
//                console.log(err)
//            })
            shake.value = ""
        } else {
            shake.value = "shake"
            setTimeout(() => {
                shake.value = ""
            }, 800)
            return false
        }
    })
}

</script>


<template>
    <div class="login">
        <el-form ref="form" :model="admin" class="login-form slide-left" size="large"
                 label-width="120px" label-position="top"
                 hide-required-asterisk>
            <div class="welcome">
                <div class="title">Sign in</div>
                <p>Welcome Back</p>
            </div>
            <el-form-item label="Email" prop="email" required :rules="[{require:true,trigger:'blur'}]">
                <el-input v-model="admin.email" placeholder="Please enter your email"/>
            </el-form-item>
            <el-form-item label="Password" prop="password" required
                          :rules="[{require:true,min:6,message:'Password must contain at least 8 characters',trigger:'blur'}]">
                <el-input v-model="admin.password" placeholder="Please enter your password" show-password/>
            </el-form-item>
            <el-form-item>
                <el-button ref='btn' type="primary" @click="onSubmit(form)" class="form-btn" :class="{shake}">Sign in
                </el-button>
            </el-form-item>
        </el-form>
        <!--        <div class="robot"></div>-->
    </div>
</template>


<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  //  background-color: $bg-1;


  .login-form {
    width: 430px;
    padding: 40px;
    border-radius: 1em;
    //    background-color: $bg-2;
    border: 1px solid $border-clr-2;
    background: rgba(255, 255, 255, .7);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);

    .welcome {
      margin-bottom: 40px;

      .title {
        font-size: 1.875rem;
        font-weight: 600;
        letter-spacing: 1px;
      }

      p {
        color: $txt-clr-3;
        font-size: .875rem;
      }
    }

    .form-btn {
      width: 100%;
      margin-top: 50px;
      letter-spacing: 1px;
      background-color: $bg-4;
    }

    //    ::v-deep.el-input {
    //      --el-input-focus-border-color: $clr-2;
    //    }
  }
}


</style>

