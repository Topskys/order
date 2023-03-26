<!--
 * @Author: Topskys
 * @Date: 2023-03-06 11:37:27
 * @LastEditTime: 2023-03-19 16:34:19
-->
<script setup>
import { ref, onMounted, reactive, toRefs } from "vue";
import eInput from "../../components/easy-ui/input/index.vue";
import eButton from "../../components/easy-ui/button/index.vue";
import { getUsers, edit, del } from "../../api/user";
import { InfoFilled } from "@element-plus/icons-vue";

const columns = reactive([
  { prop: "_id", label: "ID" },
  { prop: "email", label: "账户" },
  { prop: "password", label: "密码" },
  { prop: "phone", label: "手机号" },
  { prop: "status", label: "状态" },
  { prop: "createdAt", label: "创建时间" },
  { prop: "updatedAt", label: "更新时间" },
  { prop: "Opera", label: "操作" },
]);

const state = reactive({
  list: [],
  page: 1,
  pageSize: 10,
  keyword: "",
});
let { list,page,pageSize,keyword } = toRefs(state);

let currIndex = ref(null);

// 获取用户列表数据
onMounted(() =>
  getUsers({
    page: page.value,
    pageSize: pageSize.value,
    keyword: keyword.value,
  }).then(({ data }) => {
    const formatTime = (time) => new Date(time).toGMTString();
    data.forEach((x, i) => {
      data[i].createdAt = formatTime(data[i].createdAt);
      data[i].updatedAt = formatTime(data[i].updatedAt);
    });
    list.value = data;
  })
);

const confirm = (item, i) => {
  currIndex.value = null;
};

const cancel = (item, i) => {
  currIndex.value = null;
};

const editItem = (item, i) => {
  currIndex.value = i;
};

const deleteItem = (item, i) => {};

const confirmEvent = () => {
  console.log("confirm!");
};
const cancelEvent = () => {
  console.log("cancel!");
};
</script>


<template>
  <div class="search-form">
    <e-input
      v-model:value="keyword"
      type="search"
      placeholder="Search..."
    />
    <button class="e-button primary">Search</button>
  </div>
  <table>
    <thead>
      <tr>
        <th v-for="item in columns" :key="item.label">
          {{ item.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in list" :key="item._id">
        <td width="80" align="center">
          <span :title="item._id">{{ item._id }}</span>
        </td>
        <td>
          <div v-if="i === currIndex">
            <e-input
              v-model:value="item.email"
              className="inputClass"
              disabled
            />
          </div>
          <span v-else :title="item.email">{{ item.email }}</span>
        </td>
        <td>
          <div v-if="i === currIndex">
            <e-input v-model:value="item.password" className="inputClass" />
          </div>
          <span v-else :title="item.password">{{ item.password }}</span>
        </td>
        <td>
          <div v-if="i === currIndex">
            <e-input v-model:value="item.phone" className="inputClass" />
          </div>
          <span v-else :title="item.phone">{{ item.phone }}</span>
        </td>
        <td>
          <div v-if="i === currIndex">
            <e-input v-model:value="item.status" className="inputClass" />
          </div>
          <span v-else :title="item.status">{{ item.status }}</span>
        </td>
        <td>
          <span :title="item.createdAt">{{ item.createdAt }}</span>
        </td>
        <td>
          <span :title="item.updatedAt">{{ item.updatedAt }}</span>
        </td>
        <td>
          <div v-if="i === currIndex">
            <e-button
              @click="confirm(item, i)"
              class="e-button primary confirm"
              className="buttonClass"
              >确定
            </e-button>
            <e-button @click="cancel(item, i)" className="buttonClass"
              >取消</e-button
            >
          </div>
          <span v-else>
            <span @click="editItem(item, i)" class="edit">编辑</span>
            <el-popconfirm
              width="240"
              confirm-button-text="OK"
              cancel-button-text="No, Thanks"
              :icon="InfoFilled"
              icon-color="#626AEF"
              title="Are you sure to delete this?"
              @confirm="confirmEvent"
              @cancel="cancelEvent"
            >
              <template #reference>
                <span @click="deleteItem(item, i)" class="delete">删除</span>
              </template>
            </el-popconfirm>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>


<style lang="scss" scoped>
.search-form {
  padding: 15px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
}

table {
  width: 100%;
  height: 30px;
  color: #1d273b;
  background-color: white;
  border-collapse: collapse; // 合并边框
  border-spacing: 0; // 单元格间隙
  tr,
  th,
  td {
    border: 1px solid #ebeef5;
  }

  tr {
    height: 40px;
    line-height: 14px;
    font-size: 14px;
    color: #666666;
    font-weight: 400;

    &:nth-child(2n) {
      background-color: #fafafa;
    }

    & > td > span {
      padding: 0 10px;
    }
  }

  td {
    text-align: center;
  }

  thead {
    font-size: 14px;
    color: #666;
    line-height: 14px;
    font-weight: 600;

    tr {
      &:nth-child(2n + 1) {
        background-color: #fafafa;
      }

      th {
        //        font-weight: bold;
      }
    }
  }

  tbody {
    tr:nth-child(2n) {
      background-color: #fafafa;
    }

    tr:nth-child(2n + 1) {
      background-color: #ffffff;
    }
  }
}

.inputClass {
  height: 28px;
  line-height: 28px;
  border: none;
}

.buttonClass {
  font-size: 12px;
  padding: 5px 11px;
}

.edit {
  color: #206bc4;
  margin: 0px 11px;
  cursor: pointer;
}

.delete {
  color: #f56c6c;
  cursor: pointer;
}
</style>



