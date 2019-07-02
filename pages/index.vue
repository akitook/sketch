<template>
  <div class="container">
    <Firstview />
    <div class="article-container">
      <div v-for="(article, index) in articles" :key="index">
        <Article :data="article" />
      </div>
    </div>
  </div>
</template>

<script>
import articles from '~/assets/json/articles.json'

import Firstview from '~/components/molecules/Firstview.vue'
import Article from '~/components/molecules/Article.vue'

export default {
  components: {
    Firstview,
    Article
  },
  data() {
    return {
      articles
    }
  },
  mounted() {
    this.$store.dispatch('device/init')
  }
}
</script>

<style scoped lang="scss">
.article-container {
  // transorm: matrix($containerRatio, 0, 0, $containerRatio, 0, 0);
}
@media screen and (min-width: 376px) {
  .article-container {
    // transform: matrix($containerRatio__pc, 0, 0, $containerRatio__pc, 0, 0);
  }
}
</style>
