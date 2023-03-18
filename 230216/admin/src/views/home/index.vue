<script setup lang="ts">
import {ref, toRefs, onMounted, defineAsyncComponent} from 'vue'
import Typed from 'typed.js';
import {user} from '../../store/user'


// data

const routes = ref([
    {label: "Introduce", path: "/introduce"},
    {label: "Download", path: "/download"},
    {label: "Blog", path: "https://blog.csdn.net/qq_58062502"},
    {label: "Document", path: "https://github.com/Topskys"},
    {label: "Support", path: "https://github.com/Topskys"},
])
const navHeight = ref(63)
const isSticky = ref(false)
const functions = [
    {
        title: "HTTPS",
        detail: "https://blog.csdn.net/qq_580625020000000000000000000",
        poster: "https://images.unsplash.com/photo-1677184915745-03e070e63a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1558&q=80"
    }
]


// methods

onMounted(() => {
    const options = {
        strings: [
            'Hello\n',
            'World\n',
            'console.log(" Hi, Mark ! ")'
        ],
        typeSpeed: 200,
        loop: true,
    };
    new Typed('.write-text', options);
})


// 监听滚动条修改导航栏样式
const onScroll = (e) => e.target.scrollTop > navHeight.value ? (isSticky.value = true) : (isSticky.value = false)


const download = () => {
    // 文件地址
    const fileUrl = "http://127.0.0.1:3000/uploads/1675259017416.zip"
    // 创建一个隐藏隐藏 a 标签
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = fileUrl;
    a.setAttribute('download', ''); // 设置下载属性
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

const learnMore = () => window.open('https://github.com/Topskys', '_blank')

</script>


<template>
    <main @scroll="onScroll">
        <!--     header navigation     -->
        <header :class="{'sticky':isSticky}">
            <a class="logo" href="/">
                <svg t="1677746271709" class="icon" viewBox="0 0 1028 1024" version="1.1"
                     xmlns="http://www.w3.org/2000/svg" p-id="4598" id="mx_n_1677746271710" width="30" height="30">
                    <path d="M1018.319924 112.117535q4.093748 9.210934 6.652341 21.492179t2.558593 25.585928-5.117186 26.609365-16.374994 25.585928q-12.281245 12.281245-22.003898 21.492179t-16.886712 16.374994q-8.187497 8.187497-15.351557 14.32812l-191.382739-191.382739q12.281245-11.257808 29.167958-27.121083t28.144521-25.074209q14.32812-11.257808 29.679676-15.863275t30.191395-4.093748 28.656239 4.605467 24.050772 9.210934q21.492179 11.257808 47.589826 39.402329t40.425766 58.847634zM221.062416 611.554845q6.140623-6.140623 28.656239-29.167958t56.289041-56.80076l74.710909-74.710909 82.898406-82.898406 220.038979-220.038979 191.382739 192.406177-220.038979 220.038979-81.874969 82.898406q-40.937484 39.914047-73.687472 73.175753t-54.242167 54.753885-25.585928 24.562491q-10.234371 9.210934-23.539054 19.445305t-27.632802 16.374994q-14.32812 7.16406-41.960921 17.398431t-57.824197 19.957024-57.312478 16.886712-40.425766 9.210934q-27.632802 3.070311-36.843736-8.187497t-5.117186-37.867173q2.046874-14.32812 9.722653-41.449203t16.374994-56.289041 16.886712-53.730448 13.304682-33.773425q6.140623-14.32812 13.816401-26.097646t22.003898-26.097646z"
                          p-id="4599" fill="#335eea"></path>
                </svg>
                <span class="logo-text">Mark</span>
            </a>
            <div class="nav">
                <span v-for="(route,i) in routes" :key="i">
                    <router-link :to="route.path" v-if="/^\//.test(route.path)">{{ route.label }}</router-link>
                    <a :href="route.path" target="_blank" v-else>{{ route.label }}</a>
                </span>
            </div>
            <div class="user">
                <router-link to="/login">
                    <svg t="1677748862609" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="4801" width="22" height="22">
                        <path d="M858.5 763.6c-18.9-44.8-46.1-85-80.6-119.5-34.5-34.5-74.7-61.6-119.5-80.6-0.4-0.2-0.8-0.3-1.2-0.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-0.4 0.2-0.8 0.3-1.2 0.5-44.8 18.9-85 46-119.5 80.6-34.5 34.5-61.6 74.7-80.6 119.5C146.9 807.5 137 854 136 901.8c-0.1 4.5 3.5 8.2 8 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c0.1 4.4 3.6 7.8 8 7.8h60c4.5 0 8.1-3.7 8-8.2-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"
                              p-id="4802" fill="#000000"></path>
                    </svg>
                </router-link>
                <a href="https://github.com/Topskys" target="_blank">
                    <svg t="1677748931591" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="5151" width="22" height="22">
                        <path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                              p-id="5152" fill="#000000"></path>
                    </svg>
                </a>
            </div>
        </header>
        <!--     section first      -->
        <section class="setion-first">
            <div class="description">
                <div class="left">
                    <p class="big-title">Markdown documents & projects.</p>
                    <p class="small-title">Mark is a desktop application for editing markdown quickly.</p>
                </div>
                <div class="right">
                    <div class="svg-box">
                        <svg t="1677746271709" class="icon" viewBox="0 0 1028 1024" version="1.1"
                             xmlns="http://www.w3.org/2000/svg" p-id="4598" id="mx_n_1677746271710" width="200"
                             height="200">
                            <path d="M1018.319924 112.117535q4.093748 9.210934 6.652341 21.492179t2.558593 25.585928-5.117186 26.609365-16.374994 25.585928q-12.281245 12.281245-22.003898 21.492179t-16.886712 16.374994q-8.187497 8.187497-15.351557 14.32812l-191.382739-191.382739q12.281245-11.257808 29.167958-27.121083t28.144521-25.074209q14.32812-11.257808 29.679676-15.863275t30.191395-4.093748 28.656239 4.605467 24.050772 9.210934q21.492179 11.257808 47.589826 39.402329t40.425766 58.847634zM221.062416 611.554845q6.140623-6.140623 28.656239-29.167958t56.289041-56.80076l74.710909-74.710909 82.898406-82.898406 220.038979-220.038979 191.382739 192.406177-220.038979 220.038979-81.874969 82.898406q-40.937484 39.914047-73.687472 73.175753t-54.242167 54.753885-25.585928 24.562491q-10.234371 9.210934-23.539054 19.445305t-27.632802 16.374994q-14.32812 7.16406-41.960921 17.398431t-57.824197 19.957024-57.312478 16.886712-40.425766 9.210934q-27.632802 3.070311-36.843736-8.187497t-5.117186-37.867173q2.046874-14.32812 9.722653-41.449203t16.374994-56.289041 16.886712-53.730448 13.304682-33.773425q6.140623-14.32812 13.816401-26.097646t22.003898-26.097646z"
                                  p-id="4599" fill="#335eea"></path>
                        </svg>
                        <div class="mask"></div>
                    </div>
                </div>
            </div>
            <div class="btns">
                <div class="download btn" @click="download">
                    <span>Download</span>
                    <svg t="1677760737448" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="9061" width="18" height="18">
                        <path d="M792.832 485.856c-12.512-12.544-32.8-12.48-45.248-0.032L544 688.992 544 128c0-17.664-14.336-32-32-32s-32 14.336-32 32l0 563.04-234.048-235.456c-12.48-12.576-32.704-12.64-45.248-0.128-12.544 12.448-12.608 32.704-0.128 45.248l287.52 289.248c3.168 3.2 6.88 5.536 10.816 7.136C502.912 798.88 507.296 800 512 800c11.296 0 20.704-6.176 26.4-14.976l254.368-253.952C805.312 518.624 805.312 498.368 792.832 485.856z"
                              fill="#ffffff" p-id="9062"></path>
                        <path d="M864 928 160 928c-17.664 0-32-14.304-32-32s14.336-32 32-32l704 0c17.696 0 32 14.304 32 32S881.696 928 864 928z"
                              fill="#ffffff" p-id="9063"></path>
                    </svg>
                </div>
                <div class="learn-more btn" @click="learnMore">
                    <span>Learn More</span>
                    <svg t="1677760971706" class="icon" viewBox="0 0 1024 1024" version="1.1"
                         xmlns="http://www.w3.org/2000/svg" p-id="5256" width="22" height="22">
                        <path d="M874.690416 495.535003c0 5.423523-2.159176 10.632151-5.996574 14.46955l-223.00912 223.00912c-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574-7.992021-7.992021-7.992021-20.947078 0-28.939099l188.083679-188.083679-604.773963 0c-11.2973 0-20.466124-9.168824-20.466124-20.466124 0-11.307533 9.168824-20.466124 20.466124-20.466124l604.753497 0-188.073446-188.073446c-7.992021-7.992021-7.992021-20.947078 0-28.949332 7.992021-7.992021 20.957311-7.992021 28.949332 0l223.019353 223.029586C872.53124 484.902852 874.690416 490.101247 874.690416 495.535003z"
                              p-id="5257" fill="#000000"></path>
                    </svg>
                </div>
            </div>
            <div class="inset-img"></div>
        </section>
        <!--    section-second    -->
        <section class="section-second">
            <div class="try-img">
                <span class="write-text"></span>
            </div>
        </section>
        <!--   section-third    -->
        <section class="section-third">
            <center>
                <h1>Functions Introduce</h1>
                <span>Mark has many functions and features. Here are eight of the main ones. </span>
            </center>
            <ul>
                <li v-for="(fun,i) in functions" :key="i">
                    <div class="info">
                        <h2>{{ fun.title }}</h2>
                        <div>{{ fun.detail }}0000000000000000000</div>
                    </div>
                    <img :src="fun.poster" :title="fun.poster"/>
                </li>
            </ul>
        </section>
        <!--    section-last    -->
        <section class="section-last">
            <div class="contaction">

            </div>
            <footer>
                <span class="copyright">Copyright © 2023 Mark Inc. All rights reserved.</span>
            </footer>
        </section>
    </main>
</template>

<style lang="scss" scoped>
main {
  scroll-snap-type: y mandatory; // 1 滚动贴合方向方式，滚动条设置父容器此属性才生效
  scroll-padding: 63px;
  overflow-y: scroll;
  height: 100vh;
  background-color: $bg-1;

  .sticky {
    position: sticky;
    top: 0;
    z-index: 1000;
    background: rgba(255, 255, 255, .5);
    transition: 0.5s;
  }

  header {
    height: 63px;
    padding: 0 10%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //    opacity: .88;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    transition: 0.5s;

    .logo {
      display: flex;
      align-items: center;
      color: $clr-1;
      font-size: 1.3125rem;
      white-space: nowrap;
      font-weight: 400;
      transition: color 0.5s cubic-bezier(0.28, 0.11, 0.32, 1);

      .logo-text {
        padding-left: 8px;
      }
    }

    .nav {
      a {
        margin: 1em;
        font-size: .875rem;
        transition: all 0.3s;

        &:hover {
          color: $clr-2;
          text-decoration: underline;
        }
      }
    }

    .user {
      display: flex;
      align-items: center;

      svg {
        transition: 0.3s;

        &:first-child {
          margin-right: 1.25em;
        }

        &:hover, &:focus {
          transform: scale(1.1);
        }
      }
    }
  }

  section {
    height: calc(100vh - 63px);
    scroll-snap-align: start; // 2 滚动贴合的位置（start顶部）
    margin: 0 10%;
  }


  .setion-first {
    position: relative;

    .description {
      height: 50vh;
      padding-top: 5%;
      display: flex;
      justify-content: space-between;

      .left {
        .big-title {
          font-size: 4.5rem;
          margin: 0;
        }

        .small-title {
          font-size: 1.5rem;
        }
      }

      .right {
        width: 30%;
        min-width: 180px;
        height: 50vh;
        line-height: 50vh;
        padding: 5%;
        padding-bottom: 0;

        .svg-box {
          position: relative;

          width: 100%;
          height: 100%;
          border-radius: 50%;

          .mask {
            width: inherit;
            height: inherit;
            background-image: linear-gradient(80deg, rgba(255, 255, 255, 1) 0%, rgba(51, 94, 234, 1) 100%); //linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
            filter: blur(70px);
            z-index: -999;
          }

          svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 999;
          }
        }
      }
    }

    .btns {
      .download {
        margin-right: 8px;

        span {
          color: $txt-clr-7;

          &:first-child {
            padding-right: 8px;
          }
        }
      }

      .learn-more {
        background-color: white;

        span:first-child {
          padding-right: 8px;
        }
      }
    }

    .inset-img {
      width: 100%;
      height: 300px;
      min-height: 14.375rem;
      max-height: 37.5rem;
      background: center/contain no-repeat url("../../assets/image/work.png");
      //      background: center/contain no-repeat url("../../assets/image/team.svg");
      position: absolute;
      bottom: 1.25em;
      left: 50%;
      transform: translateX(-50%);
    }
  }


  .section-second {
    //  background-color: $bg-2;
    .try-img {
      width: 100%;
      height: 100%;
      //      background: center/contain no-repeat url("../../assets/image/soft@mark.png");
      display: flex;
      align-items: center;

      .write-text {
      }

      .text {
        position: relative;
        --txt-w: 1ch; // ch: character，1ch相对于数字0的大小
        width: var(--txt-w);
        white-space: nowrap;
        overflow: hidden;
        color: $txt-clr-4;
        font-size: 40px;
        letter-spacing: 2px;
        // 自定义变量，记录书写的文字数量，调用 var(--txt-count)
        --txt-count: 30;
        // 执行动画：name time step forwards，停留在最后一帧
        animation: typing 2s steps(var(--txt-count), jump-none) forwards;
        // 倒影
        //          -wekit-box-reflect: below 1px linear-gradient(transparent 3);

        &::after {
          content: "";
          width: 2px;
          height: 100%;
          position: absolute;
          top: 0;
          right: 0;
          background-color: black;
          // name time 线性的 执行无限次
          animation: cursor 1s linear infinite;
        }

        span {
          display: inline-block;
          overflow: hidden;
          width: 0ch;
        }
      }
    }
  }


  .section-third {
    background: $bg-2;
    margin: 0;
    padding: 0 10%;

    center {
      padding: 1rem 0;

      h1 {
        font-size: 3.125rem;
        margin: 20px 0;
        z-index: 10;
        background: linear-gradient(81.62deg, #2870ea 8.72%, #1b4aef 85.01%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      span {
      }
    }

    ul {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* 设置自动填充列 */
      grid-auto-flow: row; /* 设置自动换行 */
      gap: 20px;
      padding: 0;

      li {
        list-style: none;
        min-height: 12.5rem;
        max-height: 18.75rem;
        border-radius: .875em;
        background: white;
        overflow: hidden;
        //        box-shadow: 2px 4px 12px rgb(0 0 0 / 8%);
        transition: all .3s cubic-bezier(0, 0, .5, 1);

        &:hover {
          transform: scale(1.02);
        }

        .info {
          padding: 10px;

          h2 {
            font-size: 1.25rem;
            margin: 0;
            margin-bottom: 6px;
          }

          div {
            color: $txt-clr-3;
            display: -webkit-box;
            text-overflow: ellipsis;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2; //当属性值为3，表示超出3行隐藏
          }
        }


        img {
          display: block;
          background-size: cover;
          width: 100%;
          height: 150px;
          border-radius: 0 0 .875em .875em;
          //          overflow-clip-margin: content-box;
          //          overflow: clip;
          //          width: 480px;
          //          aspect-ratio: auto 1600 / 900;
          //          height: 200px;
        }
      }
    }
  }


  .section-last {
    position: relative;
    overflow: hidden;

    .contaction {

    }

    footer {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      padding: 20px 0;
      text-align: center;
      border-top: 1px solid $border-clr-1;

      .copyright {
        color: $txt-clr-3;
        font-size: .75rem;
      }
    }
  }

}


.btn {
  padding: 12px 19px;
  background-color: black;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  //  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  transition: .1s;
  font-weight: 400;
  user-select: none;
  vertical-align: middle;
  -webkit-appearance: none;
  border: 1px solid $border-clr-1;
  font-size: inherit;
  border-radius: .25em;
}


.btn:hover, .btn:focus {
  //    background-color: $bg-2;
  outline: none;
}


@keyframes typing {
  0% {
    width: 1ch;
  }
  100% {
    width: calc(var(--txt-count) * var(--txt-w))
  }
}

@keyframes cursor {
  0%, 49% {
    opacity: 0;
  }
  50%, 100% {
    opacity: 1;
  }
}
</style>