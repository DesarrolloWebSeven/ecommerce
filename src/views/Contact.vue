<template>
  <div>
    <h1>Si prefieres contactar con nosotrxs a través de correo...</h1>
    <form class="section row g-3">
      <div class="col-md-6">
        <label class="form-label">Nombre</label>
        <input
          type="text"
          name="firstName"
          id="firsName"
          class="form-control"
          placeholder="Introduce tu nombre"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Apellidos</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          class="form-control"
          placeholder="Introduce tus apellidos"
        />
      </div>
      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          class="form-control"
          placeholder="Introduce tu correo"
        />
      </div>

      <div class="col-md-6">
        <label class="form-label">Tipo de consulta</label>
        <select type="consult" name="consult" id="consult" class="form-select">
          <option selected>Información general</option>
          <option>Tallas</option>
          <option>Envíos</option>
          <option>Reclamaciones</option>
        </select>
      </div>
      <div class="col">
  <label class="form-label">Escribe tu consulta detalladamente</label>
  <textarea class="form-control" id="texto" rows="3"></textarea>
</div>

      <div class="col-12">
        <button type="submit" class="btn btn-primary">Enviar</button>
      </div>
    </form>
    <div class="col-md-6">
      <h3>Nos encontramos en Madrid....</h3> 
    </div>
    
  </div>
</template>

<script>

export default {
  name: "HelpContact",
  
};
</script>

<style lang="scss" scoped>
.section{
  max-width: 80%;
  margin: 0 auto;
  margin-top:20px;
  padding:20px;
  background-color: #A7D2DD;
  
  
}
</style>