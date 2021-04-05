<template>
  <div class="inputForm row">
    <label class="col-6 form-control" :class="clases">{{ label }}</label>
    <input class="col-6 form-control" type="text" @keyup="comprobar" />
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "InputValidator",
  props: {
    label: {
      type: String,
      default: "X",
    },
    mask: {
      type: String,
      default: "X",
    },
    placeholder:{
      type: String,
      default: "X"
    }
  },
  setup(props) {
    let clases = ref("wrong");

    const comprobar = (e) => {
      let texto = e.target.value;
      //let exp= /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i
      let exp = new RegExp(props.mask);
      if (exp.test(texto)) {
        clases.value = "ok";
      } else {
        clases.value = "wrong";
      }
    };
    return {
      comprobar,
      clases,
    };
  },
};
</script>


<style>
.wrong {
  background-color: red;
  margin: 20px;
  padding: 10px;
  border-radius: 5px;
}
.ok {
  background-color: green;
  margin: 20px;
  padding: 10px;
}
.inputForm{
  margin: 10px;
}
</style>