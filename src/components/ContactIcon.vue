<template>
  <div class="d-flex justify-content-end icon">
    <i class="fab fa-whatsapp fa-3x"></i>
  </div>
</template>

<script>
import { ref, reactive, computed } from "vue";
export default {
  name: "ContactIcon",
  props: {},
};
</script>

<style lang="scss" scoped>
.icon {
  width: auto;
  i {
    margin: 10px;
    color: #0f606b;
  }
  i:hover {
    color: #707070;
  }
}
</style>