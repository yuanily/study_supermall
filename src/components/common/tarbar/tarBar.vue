<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  components: {
  },
};
</script>
<style>
#tab-bar {
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.2);
}


</style>
