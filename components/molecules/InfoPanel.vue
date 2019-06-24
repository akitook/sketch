<template>
  <div class="InfoPanel" :class="`bg-${article.bg}`">
    <h1 class="info-title">{{ article.title }}</h1>
    <p class="info-desc">{{ article.desc }}</p>
    <time class="info-date" :datetime="article.date"
      >posted: {{ article.date }}</time
    >
    <div class="info-category">#{{ article.category }}</div>
    <div class="back-button"><nuxt-link to="/">← HOME</nuxt-link></div>
  </div>
</template>
<script>
export default {
  props: {
    article: {
      type: Object,
      default: () => ({
        bg: '',
        title: '',
        desc: '',
        date: '',
        category: ''
      })
    }
  },
  mounted() {
    window.console.log(this.article)
  }
}
</script>
<style scoped lang="scss">
.InfoPanel {
  position: absolute;
  bottom: 24px;
  left: 48px;
  max-width: 640px;
  z-index: 1;
  &.bg-white {
    color: $dark-087;
    .info-category {
      color: $dark-054;
    }
    .back-button {
      a {
        color: $dark-087;
        border-color: $dark-087;
      }
    }
  }
  &.bg-black {
    color: $light-100;
    .info-category {
      color: $light-070;
    }
    .back-button {
      a {
        color: $light-100;
        border-color: $light-100;
      }
    }
  }
}
.info-title {
  font-size: 64px;
  letter-spacing: -2px;
}
.info-category {
  font-size: 14px;
  margin-bottom: 16px;
}
.info-desc {
  font-size: 14px;
  margin-bottom: 6px;
}
.info-date {
  font-size: 14px;
  display: block;
  margin-bottom: 6px;
}
.back-button {
  z-index: 1;
  a {
    font-size: 14px;
    display: inline-block;
    padding: 4px 16px;
    text-decoration: none;
    border: 1px solid $light-100;
    border-radius: 16px;
  }
}
</style>
