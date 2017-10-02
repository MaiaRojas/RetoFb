"use strict";

const render = (root) => {
    root.empty();
    const section = $('<div class="cont_"></div>');

    section.append(logo( _ => logo(root)));
    section.append(login( _ => login(root)));

    root.append(section);
}

const updated = function () {
    render(root);
}

const state = {
  pagina: null
}


$(_ => {

    const root = $(".root");
    render(root);

});

const logo = (update)=>{

const header =$(`<div class="cont_logo ">
                  <div class="body_logo row">
                    <div class="col m2">
                      <img src="assets/img/logo.png" alt="logo" class="">
                    </div>
                  </div>
                </div>`);
return header;
}

"use strict";
  const login = (update) => {
      const cont_login =$('<section class="globalcontainer"></section>');

      const cont_divform=$(`<div class="fb_cont"></div>`);
      const cont_form = $('<div class="body_cont"></div>');
      cont_login.append(cont_divform);
      cont_divform.append(cont_form);

      const div_title =$(`<div class="title_login center"><div class="center cont_img"><img src="assets/img/icono.png" alt="logo" class="img-responsive"></div>
                            <span class="center">Iniciar Sesión</span></div>`);
      const form =$('<form  class="form_login" id="new_user"></form>');

      cont_form.append(div_title,form);
      const forminput =$('<div class="form-inputs"></div>');
      form.append(forminput);

      const var_user =$('<div class="form-group"></div>');
      const label_user =$('<label class="" for="user_code">Email:</label>');
      const input_user =$('<input class="inputtext" autofocus="autofocus" type="text"  id="user_code">');
      const error_user =$(`<span class="error"></span>`);
      forminput.append(var_user);
      var_user.append(label_user ,input_user , error_user);

      const var_pasw = $('<div class="form-group"></div>');
      const label_pasw = $('<label class="" for="user_password">Password :</label>');
      const input_pasw = $('<input class="inputtext" autofocus="autofocus"  type="password"  id="user_password">');
      const error_pasw =$(`<span class="error"></span>`);

      forminput.append(var_pasw);
      var_pasw.append(label_pasw ,input_pasw , error_pasw);

      const div_btn =$('<div class="form-actions center"></div>');
      const btn_enviar =$('<input type="submit" name="commit" value="Login" class="btn primary">');
      forminput.append(div_btn);
      div_btn.append(btn_enviar);

      //La validacionde contenido se encuentra en el archivo Validaciones.js
      if (input_user.val()== "" && input_pasw.val()== ""){
        error_user.text('El campo de usuario no puede estar en blanco.');
        error_pasw.text('El campo de usuario no puede estar en blanco.');
      };

      input_user.keypress(function() {
        validarCont(input_user.val(),error_user);
      });
      input_pasw.keypress(function() {
        validarCont(input_pasw.val(),error_pasw);
      });

      btn_enviar.on('click', function(){
        validUser(input_user.val(),error_user);

        if (authenticate(input_user.val(),input_pasw.val())) {
            console.log("Ir a pagina 2");
        }

      });

    return cont_login;
  }

function addItemToStorage(key,value) {

  if (typeof(Storage) != "undefined") {
    localStorage.setItem(key,JSON.stringify(value)); 
  } else {
    console.log("No soporta local storage");
  }
}

function getItemFromStorage(key,value) {
  if (typeof(Storage) != "undefined") {
    return JSON.parse(localStorage.getItem(key));
  } else {
    console.log("No soporta local storage");
  }
  return null;
}

"use strict";
//Carga todos los usuarios al local storage

$( window ).load(()=> {
  let validUsers = getItemFromStorage('users');
  if (validUsers == null) {
    validUsers = [];
    validUsers.push({ email: "maia.rt.46@gmail.com", password: "12345"});
    validUsers.push({ email: "ana.durant@gmail.com", password: "54321"});
    validUsers.push({ email: "jose.garcia@gmail.com",password: "78906"});
    validUsers.push({ email: "carla.vasquez@gmail.com",password: "56906"});
    addItemToStorage("users",validUsers);
  };
});

"use strict";

  const validarCont = (cont , error) => {
    if (cont == ""){
       return error.text('El campo de usuario no puede estar en blanco.');
    } else {
      return error.text('')
    }
  }
  const validUser = (cont, error ) => {

    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!/([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/gi.test(cont)) {
      return error.text('El email introducido es incorrecto');
    };
    console.log('usuario valido');
    return error.text('');
  };

  function authenticate(email,password) {
    var validUsers = getItemFromStorage("users");
    console.log(validUsers);
    if (validUsers != null) {
      var user = validUsers.filter(function(user) {
        // if (user.email != email){
        //     showMessage("email_error","No existe este usuario");
        // };
        return user.email == email;
      })[0];
      if (user != null) {
        // if (user.password != password){
        //     showMessage("password_error","Contraseña Incorrecta");
        // };

        return user.email == email && user.password == password;
      }
    }
    return false;
}
