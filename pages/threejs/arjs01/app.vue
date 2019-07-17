<template>
  <div class="wrapper">
    <a-scene embedded arjs>
      <a-marker preset="hiro">
        <a-box position="0 0.5 0" material="color: yellow;"></a-box>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  </div>
</template>

<script>
export default {
  head() {
    return {}
  },
  data() {
    return {}
  },
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style scoped lang="scss">
@media screen and (min-width: 768px) {
}
</style>
