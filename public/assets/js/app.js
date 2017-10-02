"use strict";

const render = (root) => {
    root.empty();
    const section = $('<div class="cont_"></div>');

    section.append(logo( _ => logo(root)));

    if(state.page == null){
      section.append(muro( _ => muro(root)));
    } else if (state.page == 1) {
      section.append(login( _ => login(root)));
    }


    root.append(section);
}

const updated = function () {
    render(root);
}

const state = {
  page: null
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

"use strict";
  const muro = (update) => {
      const cont_muro =$('<section class="globalcontainer"></section>');

      const cont_divform = $(`<div class="fb_cont_post"></div>`);
      const cont_form = $('<div class="body_cont_post"></div>');

      cont_muro.append(cont_divform);
      cont_divform.append(cont_form);

      const div_title =$(`<div class="title_login center"><div class="center cont_img"></div>
                            <span class="center">Relizar publicación</span></div>`);
      const forminput =$('<div class="form-inputs"></div>');

      cont_form.append(div_title,forminput);

      const var_user =$('<div class="form-group"></div>');
      const text_post =$('<textarea id ="postText" name="name" rows="8" cols="80"></textarea>');
      const div_btn = $('<div class="btn_cont"></div>');
      const selec_post =$('<select id="postType"></select>');
      const op_public =$('<option value="publico">Público</option>');
      const op_amigos =$('<option value="amigos">Amigos</option>');
      const btn_publicar =$('<button id="publicar">Publicar</button>');
      div_btn.append(selec_post,btn_publicar);
      selec_post.append(op_public,op_amigos);
      var_user.append(text_post,div_btn);
      forminput.append(var_user);

      const div_post =$(`<div id="posts"></div>`);
      cont_muro.append(div_post);

      var postManager = new PostManager();
      var publicarPostButton = document.getElementById('publicar');

      //Llamando al post

      btn_publicar.on('click', function(){

        var postTextarea = document.getElementById('postText').value;
        console.log(postTextarea);
        var postTypeSelect = document.getElementById('postType');
        console.log(postTypeSelect);
        var postType = postTypeSelect.options[postTypeSelect.selectedIndex].value;
        console.log(postType);
        console.log();
        postManager.addPost(postTextarea,postType);
        postManager.postsToHTML(document.getElementById('posts'));

      });

    return cont_muro;
  }

function PostManager() {
  this.posts = [];
  this.postCount = 0;

  this.addPost = function(text,type) {
    this.posts.push({
      id: this.postCount,
      text: text,
      type: type
    });
    this.postCount++;
  }

  this.postsToHTML = function(parent) {
    parent.innerHTML = "";
    this.posts.forEach(function(post) {
      parent.appendChild(this.createHTMLPost(post.text,post.id));
    },this);
  }

  this.createHTMLPost = function(text,id ,parent) {
    var array = this.posts;
    var post = document.createElement('div');
    post.setAttribute('data-id',id);

    var p = document.createElement('p');
    p.innerHTML = text;

    var editar = document.createElement('a');
    editar.setAttribute('href',"#");
    editar.setAttribute('data-edit-mode',false);
    editar.innerHTML = "Editar";
    editar.addEventListener('click',function(e) {
      e.preventDefault();
      if (e.target.getAttribute('data-edit-mode') === 'false') {
        editar.setAttribute('data-edit-mode',true);
        e.target.innerHTML = "Guardar";

        var editText = e.target.parentNode.getElementsByTagName('p')[0].innerHTML;
        var editTextarea = document.createElement('textarea');

        editTextarea.value = editText;
        e.target.parentNode.insertBefore(editTextarea,p);
        e.target.parentNode.insertBefore(document.createElement('br'),e.target);
        e.target.parentNode.removeChild(p);
      }
      else {
        console.log(e.target.parentNode);
        editar.setAttribute('data-edit-mode',false);
        var textEditada = e.target.parentNode.getElementsByTagName('textarea')[0];
        var brEditada = e.target.parentNode.getElementsByTagName('br')[0];
        var Editado = e.target.parentNode.insertBefore(document.createElement('p'),e.target);
        Editado.innerHTML = textEditada.value;
        e.target.parentNode.removeChild(textEditada);
        e.target.parentNode.removeChild(brEditada);
        e.target.innerHTML = "Editar";
        var postId = e.target.parentNode.getAttribute('data-id');
        array[postId][text] =textEditada.value;
      };

    });


    var eliminar = document.createElement('a');
    eliminar.setAttribute('href',"#");
    eliminar.innerHTML = "Eliminar"
    eliminar.addEventListener('click',function(e) {
      e.preventDefault();

      var padre = document.getElementById("posts");
      var postId = e.target.parentNode.getAttribute('data-id');
      padre.removeChild(padre.childNodes[postId]);
      array.splice(postId ,1);
    });

    post.appendChild(p);
    post.appendChild(editar);
    post.appendChild(eliminar);
    return post;
  }
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
