<template>
  <article class="Article" @click="accessDetail">
    <div class="date">{{ data.date }}</div>
    <div class="video-container">
      <video class="video" autoplay loop muted :poster="imgUrl">
        <source :src="videoUrl" type="video/mp4" />
      </video>
    </div>
    <h1>{{ data.title }}</h1>
    <p>{{ data.desc }}</p>
  </article>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      width: 0,
      height: 0
    }
  },
  computed: {
    ...mapGetters({
      containerWidth: 'device/getContainerWidth'
    }),
    videoUrl() {
      return require(`~/assets/sketch/${this.data.id}/assets/thumb.mp4`)
    },
    imgUrl() {
      return require(`~/assets/sketch/${this.data.id}/assets/thumb.jpg`)
    }
  },
  methods: {
    accessDetail() {
      const url = `/${this.data.category}/${this.data.id}`
      this.$router.push(url)
    }
  }
}
</script>
<style scoped lang="scss">
.Article {
  position: relative;
  width: 80vw;
  height: calc(80vw / 1.618);
  margin: 0 auto 100px;
  box-shadow: 0 0 100px $dark-005;
  font-family: $font-sans;
  &:hover {
    cursor: pointer;
  }
}
h1 {
  font-size: 14px;
  font-weight: 400;
}
p {
  font-size: 12px;
  font-weight: 300;
}
.date {
  position: absolute;
  top: 32px;
  left: -52px;
  transform: rotate(90deg);
}
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 4px;
}
.video {
  position: absolute;
  top: 0;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  max-width: inherit;
  transform: translateX(-50%);
  filter: opacity(85%);
}

@media screen and (min-width: 768px) {
  .Article {
    width: 50vw;
    height: calc(50vw / 1.618);
    max-width: 800px;
    margin: 0 auto 200px;
  }
  h1 {
    font-size: 1.5rem;
  }
  p {
    font-size: 1rem;
  }
}
</style>
