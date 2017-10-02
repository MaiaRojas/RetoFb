"use strict";
  const login = (updated) => {
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

      btn_enviar.on('click', function(e){
        e.preventDefault();
        validUser(input_user.val(),error_user);

        if (authenticate(input_user.val(),input_pasw.val(),error_user ,error_pasw) == true) {
            state.page = 1;
            updated();
            console.log("Ir a pagina 2");
        }

      });

    return cont_login;
  }
