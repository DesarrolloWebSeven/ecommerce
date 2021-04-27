<template>
  <section class="cookies" id="cookie">
    <h2 class="cookies-titulo">¿Aceptas nuestras Cookies?</h2> 
    <p class="cookies-texto">Utilizamos cookies propias para mejorar nuestros servicios y mostrarte publicidad relacionada con tus preferencias. Puedes obtener más información en nuestra Política de Cookies. Pulsa el botón Aceptar para confirmar que has leído y aceptado la información presentada. Después de aceptar, no volveremos a mostrarte este mensaje.</p>
    <div class="cookies-botones">
      <router-link to="/cookies" class="cookies-boton">Saber más</router-link>
      <button class="cookies-boton" @click="setCookie">Aceptar Cookies</button>
    </div>
  </section>
</template>

<script>
export default {
  name:'AlertCookies',
  setup(){
    const cookieName = new Date().getTime()

    const setCookie = () => {
      localStorage.setItem("geeky", cookieName);
      cookie.classList.add('hide')
    }

    return{
      setCookie,
    }
  }
}  
</script>

<style lang="scss" scoped>

.cookies {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;
  background: rgba(0, 0, 0, 0.938);
  color: white;
  font-size: 0.9rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 70px;
}

h2.cookies-titulo {
  color: white;
}

.cookies-botones {
  width: 80%;
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
}

.cookies-boton {
  width: 25%;
  background-color: rgba(0, 0, 0, 0);
  color: white;
  border: 2px solid white;
  border-radius: 15px;
  padding: 5px 10px;
  margin: 0 10px;
  font-size: 1rem;
  text-align: center;
}

.cookies-boton:hover {
  background-color: white;
  color: black;
  font-weight: 600;
}

.hide {
  display: none;
}

@media (max-width: 900px) {
  .cookies {
    padding: 30px ;
  }

  .cookies-boton {
    width: 45%;
  }
}

</style>