<template>
  <div class="user-edit-container">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="50%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="100px"
        size="small"
        style="
          min-width: 500px;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 60px;
        "
      >
        <el-form-item label="姓名" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="行业经验" prop="work_year" required>
          <el-input v-model="form.work_year" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="技能" prop="skill" required>
          <el-input v-model="form.skill" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="区域" prop="region">
          <el-input v-model="form.region" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone" required>
          <el-input v-model="form.phone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
            <el-option value="男" />
            <el-option value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="在职" prop="status">
          <!-- <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch> -->
          <el-input v-model="form.status" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel" size="small">取 消</el-button>
        <el-button type="primary" @click="confirm" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import eTable from "@/components/common/table";
export default {
  name: "CompanyEdit",
  components: {
    eTable,
  },
  props: {
    visible: {
      type: Boolean,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // Dialog
      title: "编辑信息",
      dialogVisible: true,
      // form
      form: {},
      rules: {},
      // upload
      dialogImageUrl: "",
      visiblePoster: false,
    };
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  watch: {
    data: {
      handler(newValue) {
        this.form = {
          ...newValue,
        };
        this.title = this.form._id ? "编辑信息" : "新增维修师傅";
      },
    },
  },
  methods: {
    // Dialog取消按钮
    cancel() {
      this.$emit("update:visible", false);
      // this.form = {};
    },
    // Dialog确认按钮
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const _id = this.form._id || "";
          try {
            const { msg } = await (_id
              ? this.$staff.update(this.form)
              : this.$staff.create(this.form));
            this.$emit("update:visible", false);
            this.$emit("confirm");
            this.form = {};
            this.$message({
              type: "success",
              message: msg,
            });
          } catch (e) {
            console.error(e.message);
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.head-operation {
  padding: 10px 0 20px;
  /* 清除子元素添加扩展按钮的float 1 */
  overflow: hidden;
  /* 清除子元素添加扩展按钮的float 2 */
  // &::after {
  //   content: "";
  //   display: block;
  //   clear: both;
  // }
}

::v-deep .el-dialog__header {
  border-bottom: 1px solid #e8e8e8;
}
</style>