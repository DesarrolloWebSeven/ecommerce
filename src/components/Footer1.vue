<template>
  <!-- Site footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-4">
          
          <ul class="footer-links">
            
            <li><h6><router-link to="/contacto" class="nav-link">{{lang["contact"]}}</router-link></h6>        
           
            
              
            </li>
            <li><h6><router-link to="/proyecto" class="nav-link">{{lang["proyect"]}}</router-link></h6>
              
            </li>
            <li>
              <h6><router-link to="/equipo" class="nav-link">{{lang["team"]}}</router-link></h6>
            </li>
          </ul>
        </div>
        <div class="col-12 col-md-4">
          <img class="logoGeeky" src="@/assets/geeky.png" alt="">
        </div>

        <div class="col-12 col-md-4">
          
          <ul class="footer-links">
            <li><h6><router-link to="/politicaPrivacidad" class="nav-link">{{lang["privacyPolicy"]}}</router-link></h6></li>
            <li><h6><router-link to="/cookies" class="nav-link">{{lang["cookies"]}}</router-link></h6></li>
          </ul>
          
        </div>
      </div>
      <hr />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">
            Copyfree &copy; 2021 {{lang["footerRights"]}}<router-link to="/inicio"> Geeky</router-link>.
          </p>
          
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li>
              <a class="github" href="https://github.com/DesarrolloWebSeven/ecommerce"  target="_blank"><i class="fa fa-github"></i></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { useStore } from 'vuex'
import { ref, reactive, computed } from "vue"; 
export default {
  name: "Footer",
  props: {},
  setup(){

    return {
      lang: computed(()=>useStore().getters.getLang)
    }
  }
  
};
</script>

<style lang="scss" scoped>
.site-footer {
  background-color:#0F606B;
  padding: 45px 0 20px;
  font-size: 15px;
  line-height: 24px;
  
  
}
.site-footer hr {
  border-top-color: #fff;
  opacity: 0.5;
  color: #fff;
}
.site-footer hr.small {
  margin: 20px 0;
  border-top-color: #fff;
  
}
.site-footer h6 {
  color: #fff;
  font-size: 16px;
  text-transform: uppercase;
  margin-top: 5px;
  letter-spacing: 2px;
}
.site-footer a {
  color:#fff;
  text-decoration: none;
}
.site-footer a:hover {
  color: #A7D2DD;
  text-decoration: none;
}
.footer-links {
  padding-left: 0;
  list-style: none;
}
.footer-links li {
  display: block;
}
.footer-links a {
  color: #fff;
}
.footer-links a:active,
.footer-links a:focus,
.footer-links a:hover {
  color: #A7D2DD;
  text-decoration: none;
}
.footer-links.inline li {
  display: inline-block;
}
.site-footer .social-icons {
  text-align: right;
}
.site-footer .social-icons a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin-left: 6px;
  margin-right: 0;
  border-radius: 100%;
  background-color: #A7D2DD
  
}
.copyright-text {
  margin: 0;
  color: #fff;
}
@media (max-width: 991px) {
  .site-footer [class^="col-"] {
    margin-bottom: 30px;
  }
}
@media (max-width: 767px) {
  .site-footer {
    padding-bottom: 0;
  }
  .site-footer .copyright-text,
  .site-footer .social-icons {
    text-align: center;
  }
}
.social-icons {
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}
.social-icons li {
  display: inline-block;
  margin-bottom: 4px;
}
.social-icons li.title {
  margin-right: 15px;
  text-transform: uppercase;
  color: #96a2b2;
  font-weight: 700;
  font-size: 13px;
}
.social-icons a {
  background-color: #eceeef;
  color: #818a91;
  font-size: 16px;
  display: inline-block;
  line-height: 44px;
  width: 44px;
  height: 44px;
  text-align: center;
  margin-right: 8px;
  border-radius: 100%;
  -webkit-transition: all 0.2s linear;
  -o-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.social-icons a:active,
.social-icons a:focus,
.social-icons a:hover {
  color: #fff;
  background-color: #707070;
}
.social-icons.size-sm a {
  line-height: 34px;
  height: 34px;
  width: 34px;
  font-size: 14px;
}

@media (max-width: 767px) {
  .social-icons li.title {
    display: block;
    margin-right: 0;
    font-weight: 600;
  }
}
.logoGeeky{
width: 200px;
}
</style>