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
  mounted() {}
}
</script>

<style scoped lang="scss">
.article-container {
  transform: matrix(0.75, 0, 0, 0.75, 0, 0);
}
@media screen and (min-width: 376px) {
  .article-container {
    transform: matrix(0.55, 0, 0, 0.55, 0, 0);
  }
}
</style>
