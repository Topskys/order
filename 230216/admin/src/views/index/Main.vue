<template>
  <main>
    <div class="main-warp">
      <h1>Mark & Project</h1>
      <p class="description">
        Mark is a desktop application for editing markdown quickly. Create
        beautiful and normative document using Mark for free.
        Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input, cultivates autonomous freedom to produce incredible imagery, empowers billions of people to create stunning art within seconds.

Create beautiful art using stable diffusion ONLINE for free.
      </p>
      <div class="download-start">
        <a class="download">Download for Windows</a>
        <a class="start">Get Started for Free</a>
      </div>
    </div>
  </main>
</template>

<script>
export default {};
</script>

<style lang='scss' scoped>
@import "@/styles/var.scss";

main {
  height: calc(100vh - 63px);
  padding: 0 10%;
    // display: flex;
    // align-items: center;
    // justify-content: center;
  .main-warp {
    padding-top: 6rem;
    h1 {
      margin: 20px 0;
      // color: rgb(15 23 42/1);
      text-align: center;
      // background-image: linear-gradient(90deg, #00a5b2, #335eea 33%, #2832d4);
      background-image: linear-gradient(90deg, #00a5b2, #335eea 60%, #2832d4);
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      font-weight: 600;
      font-size: 4.5rem;
      z-index: 100;
    }
    .description{
      width: 70%;
      margin: 0 auto;
      line-height: 2;
      letter-spacing: 1px;
    }
    .download-start {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 50px;
      a{
        padding: 10px 18px;
        font-size: .875rem;
        font-weight: 500;
        border-radius: 1.3125rem;
        border: 1px solid #ccc;
        transition: all 0.3s;
        text-decoration: none;
      }
      .download {
        margin-right: 30px;
        background-color: #1d273b;
        color: white ;
        &:hover{
          background-color:  #2e3b55;
        }
      }
      .start:hover{
        border-color: #bfbbbb;
      }
    }
  }
}
</style>