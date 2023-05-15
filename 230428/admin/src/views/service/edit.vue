<!--
 * @Author: Topskys
 * @Date: 2023-03-29 16:57:07
 * @LastEditTime: 2023-04-03 11:08:45
-->
<template>
  <div class="company-edit-container">
    <el-dialog
      :title="title"
      :visible.sync="visible"
      width="60%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        size="small"
        style="
          min-width: 500px;
          max-width: 800px;
          margin: 0 auto;
          padding: 0 60px;
        "
      >
        <el-form-item label="企业名称" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="企业描述" prop="description" required>
          <el-input
            type="textarea"
            v-model="form.description"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item label="企业电话" prop="telephone" required>
          <el-input v-model="form.telephone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="企业地址" prop="address" required>
          <el-input v-model="form.address" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="厂区地址" prop="position">
          <el-input v-model="form.position" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="企业网址" prop="website">
          <el-input v-model="form.website" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="企业图片" prop="poster">
          <el-upload
            action="http://localhost:3000/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="visiblePoster" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
      form: {
        address: "福建省福州市晋安区福马路998号石鼓琴湾47座",
        description:
          "福州三龙喷码科技有限公司是集研究、开发、制造和销售为一体的工贸型企业，公司主要从事喷码机、套标机、金属检测机的研发、生产、销售及工业自动化设备的规划、设计、输出。公司创建于2000年，喜诞福建闽侯生态创业园，规划占地四十八亩，建筑面积两万平方米及天津生态创业园，规划占地四十亩，建筑面积两万平方米。 “仁、义、理、智、信”是三龙人立身立事之根本。更全心全意为客户服务，公司拥有一批认真负责、高度敬业的销售和售后服务工程师，为省内外众多知名企业提供产品和服务，如“中石化集团、中石油集团、中国海螺集团、河北华龙面业集团、福建亚通新材料科技、福建振云塑业、飞毛腿（福建）电子、福建东南正道、四川利万布森水泥等。 公司要继续做强中国喷码标识系统，为新老顾客提供更善更美的服务，着眼二次创业，开拓未来！同时我们也深切期盼待各行各业的朋友，汇聚武夷山下共赏武夷神韵！根据公司的未来市场战略布局需要，现面向全国各地重金诚聘各路精英，公司将提供全面完整的培训体系、极富竞争力的薪资福利和具有长远发展空间的激励机制，以促进员工的发展。 一经录用需要持有上家单位的推荐信或正常离开职报告。",
        name: "福州YY科技有限公司",
        position: "",
        poster: "http://localhost:3000/uploads/202343/1680489200890.png",
        super: "64181c6f069d0c1cf7c7a4d9",
        telephone: "",
        website: "",
      },
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
        this.form = { ...newValue, super: this.userInfo._id };
        this.title = this.form?._id ? "编辑企业" : "新增企业";
      },
    },
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.poster = "";
    },
    handlePictureCardPreview(file) {
      console.log(file);
      this.dialogImageUrl = file.url;
      this.visiblePoster = true;
    },
    handleSuccess(response, file) {
      // https://pic3.zhimg.com/v2-cb43eb256a42552eafa6030c6ad17de6_b.jpg
      this.form.poster = response.url;
    },

    // Dialog取消按钮
    cancel() {
      this.$emit("update:visible", false);
      this.form = {};
    },
    // Dialog确认按钮
    confirm() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          try {
            const { code, msg } = await this.$company.addOrEdit(this.form);
            this.$emit("update:visible", false);
            this.$emit("confirm")
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