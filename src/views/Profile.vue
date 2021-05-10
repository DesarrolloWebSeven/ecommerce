<template>
  <main class="main-content">
    <section class="profile-page">
      <div class="profile-menu">
        <i class="fas fa-user-circle"></i>
        <h1>¡Bienvenid@!</h1>
        <p v-if="user.info">{{user.info.firstname}}</p>
        <button @click="updateData">Modificar datos</button>
        <button @click="deleteAccount">Darme de baja</button>
        <button @click="editPassword">Cambiar contraseña</button>
      </div>
      <form v-if="status.update" class="profile-info" @submit.prevent="saveUser">
        <label>Nombre</label>
        <input type="text" v-model="user.info.firstname" name="firstName" placeholder="Introduce tu nombre"/>
        <label>Apellidos</label>
        <input type="text" v-model="user.info.lastname" name="lastName" placeholder="Introduce tus apellidos"/>
        <label>Email</label>
        <input type="email" v-model="user.info.email" name="email" placeholder="Introduce tu correo" readonly/>
        <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
        <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        <button type="submit">Guardar cambios</button>
      </form>
      <form v-if="status.inactive" class="profile-delete">
        <label>¿Estás segur@ que quieres dar de baja esta cuenta?</label>
        <input type="email" v-model="user.info.email" name="email" placeholder="Introduce tu correo" readonly/>
        <div v-if="success" class="alert alert-success text-center" role="alert"> {{ success }} </div>
        <div v-if="error" class="alert alert-danger text-center" role="alert"> {{ error }} </div>
        <button @click="cancelAccount"> Sí, estoy segur@</button>
      </form>
    </section>
  </main>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import axios from 'axios';
export default {
  name: "Profile",
  props: {},
  setup() {
    const router = useRouter()
    const store = useStore()
    const success = ref('')
    const error = ref('')
    const user = reactive({})
    let status = reactive({
      update: true,
      inactive: false,
    })

    // Getting UserId
    const userAuth = async () => {
      
      try {
        const res = await axios.get("usuario/permiso", {
          headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
        });
        if (res.data.message === "success") {
          fetch(`http://localhost:8081/usuario/perfil/${res.data.decodedToken.id}`)
            .then(res => res.json())
            .then(data => user.info = data )
            .catch(err => console.log(err))
        }
      } catch (err) {
        console.log(err);
      }
      
    };
    userAuth();

    // Profile Buttons
    const updateData = () => {
      status.update = true
      status.inactive = false
      success.value = ""
      error.value = ""
    }    
    const deleteAccount = () => {
      status.inactive = true
      status.update = false
      success.value = ""
      error.value = ""
    }
    const editPassword = () => router.push(`/password/${(JSON.parse(id)).id}`)

    // Modify User Info
    const saveUser = async () => {
      const res = await axios.put('usuario/perfil/update', user)
      if(res) success.value = 'Datos actualizados correctamente' 
      else error.value = 'Ha habido un problema, inténtalo más tarde'
    }

    // Inactive User account
    const cancelAccount = async () => {
      const res = await axios.put('usuario/perfil/baja', user)
      if(res) {
        localStorage.removeItem('jwt')
        localStorage.removeItem('cart') 
        store.dispatch('setLogin', null)
        store.commit("setEmptyCart")
        router.push('/')
      }
      else error.value = 'Ha habido un problema, inténtalo más tarde'
    }

    return {
      user, 
      success, 
      error, 
      status, 
      saveUser, 
      editPassword, 
      deleteAccount, 
      updateData, 
      cancelAccount,
    }
  }
}

</script>


<style lang="scss" scoped>
.main-content {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-page {
  margin: 120px auto 90px;
  width: 80%;
  max-width: 800px;
  color: rgb(99, 98, 98);
  display: flex;
  justify-content: space-between;
}

.profile-menu {
  width: 28%;
  min-height: 300px;
  border: 1px solid rgb(189, 189, 189);
  border-radius: 10px;
  box-shadow: 3px 3px 10px rgb(197, 197, 197);
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 25px 0;

  i {
    font-size: 4rem;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 1.5rem;
  }

  button {
  width: 80%;
  align-self: center;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  margin: 10px 0;
  color: white;
  background-color: #22B573;
  }

  button:hover {
    opacity: 60%;
  }

  button:focus {
    outline: none;
  }
}

.profile-info, .profile-delete {
  width: 68%;
  min-height: 300px;
  padding: 35px;
  border-radius: 10px;
  background-color: rgb(240, 239, 239);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;

  button {
  width: 80%;
  align-self: center;
  border: none;
  border-radius: 5px;
  padding: 5px 0;
  color: white;
  background-color: #22B573;
  }

  button:hover {
    opacity: 60%;
  }

  button:focus {
    outline: none;
  }
}

.profile-delete {
  justify-content: center;
  text-align: center;

  input, label {
    margin-bottom: 40px;
  }

  input {
    padding-left: 15px;
  }
}

@media (max-width: 800px) {
  .profile-menu, .profile-info, .profile-delete {
    width: 100%;
  }
}


</style>