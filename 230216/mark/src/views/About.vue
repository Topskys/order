<!--
 * @Author: Topskys
 * @Date: 2023-02-25 11:02:21
 * @LastEditTime: 2023-04-23 10:27:43
 *
-->
<template>
  <div class="container slide-left">
    <div class="mark">
      <svg-icon icon="mark" style="font-size: 80px" />
      <div class="version">version 0.1.0</div>
      <div class="description">
        Mark is a desktop application for editing markdown.
      </div>
    </div>
    <!-- about-list -->
    <ul class="about-list">
      <li>
        <div class="left">
          <svg-icon icon="info" style="font-size: 32px" />
          <div class="title">Mark is free over a long period of time</div>
        </div>
        <!-- <span title="复制版本" @click="handler(0)"
          ><svg-icon icon="info" style="font-size: 20px; cursor: pointer"
        /></span> -->
      </li>
      <li>
        <div class="left">
          <svg-icon icon="documentAbout" style="font-size: 32px" />
          <div class="title">Document</div>
        </div>
        <span title="查看文档" @click="handler(1)"
          ><svg-icon icon="check" style="font-size: 20px; cursor: pointer"
        /></span>
      </li>
      <li>
        <div class="left">
          <svg-icon icon="support" style="font-size: 32px" />
          <div class="title">Sponsor on Github</div>
        </div>
        <span @click="handler(2)"
          ><svg-icon icon="link" style="font-size: 20px; cursor: pointer"
        /></span>
      </li>

      <li>
        <div class="left">
          <svg-icon icon="github" style="font-size: 32px" />
          <div class="title">Github repository</div>
        </div>
        <span @click="handler(3)"
          ><svg-icon icon="link" style="font-size: 20px; cursor: pointer"
        /></span>
      </li>
      <li>
        <div class="left">
          <svg-icon icon="feedback" style="font-size: 32px" />
          <div class="title">FeedBack</div>
        </div>
        <span @click="handler(4)"
          ><svg-icon icon="link" style="font-size: 20px; cursor: pointer"
        /></span>
      </li>

      <li>
        <div class="left">
          <svg-icon icon="thank" style="font-size: 32px" />
          <div class="title">Thank</div>
        </div>
        <span @click="handler(5)"
          ><svg-icon icon="link" style="font-size: 20px; cursor: pointer"
        /></span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      about: [
        {
          left: "",
          label: "About",
          right: "",
        },
      ],
    };
  },
  methods: {
    handler(data) {
      console.log(data);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;

  .mark {
    margin: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .version {
      margin: 15px 0 8px 0;
      font-size: $fs12;
      color: $text-clr-3;
    }
    .description {
      font-size: $fs16;
      color: $text-clr-4;
    }
  }
  .about-list {
    margin: 0;
    padding: 0;
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin-bottom: 10px;
      border: 1px solid $border-clr-2;
      border-radius: 10px;
      transition: all 0.3s ease-out;

      .left {
        display: inherit;
        align-items: center;
        .title {
          color: $text-clr-4;
          margin-left: 10px;
        }
      }
      &:hover {
        background-color: $bg-2;
      }
    }
  }
}
</style>