<template>
  <swiper ref="swiper" :options="swiperOption" class="swiper">
    <swiper-slide v-for="item in banners" :key="item">
      <img :src="item" alt="404" class="swiper-img" />
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        loop: true,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
        },
      },
      banners: [
        "https://img02.mockplus.cn/image/2023-01-11/67535c40-91c3-11ed-afc2-bf12165875cc.jpg",
        "https://img02.mockplus.cn/image/2023-01-11/fd559cd0-91c3-11ed-a4cc-656736d7bf63.png",
        "https://img02.mockplus.cn/image/2023-01-11/6adb7190-91c3-11ed-a4cc-656736d7bf63.jpg",
      ],
    };
  },
  mounted() {
    // this.swiper;
  },
  methods: {
    // swiper() {
    //     return this.$refs.swiper.$swiper;
    //   new Swiper(".swiper-container", {
    //     autoplay: true,
    //   });
    // },
  },
};
</script>

<style lang='scss' scoped>
.swiper {
  height: 12.5rem;
  overflow: hidden;

  .swiper-img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 50% 50%
  }
}
::v-deep .swiper-pagination-bullet {
  background: rgb(163, 163, 163);
}
::v-deep .swiper-pagination-bullet-active {
  background: #ffffff !important;
}
</style>
