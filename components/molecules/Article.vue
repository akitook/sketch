<template>
  <article class="Article" @click="accessDetail">
    <h1>{{ data.title }}</h1>
    <p>{{ data.desc }}</p>
  </article>
</template>
<script>
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
  computed: {},
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
  width: 100vw;
  height: 100vh;
  margin: 0 auto 400px;
  border: 1px solid #222;
}
</style>
