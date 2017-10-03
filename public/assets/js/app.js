"use strict";
const root = $(".root");
const render = (root) => {
    root.empty();
    const section = $('<div class="cont_"></div>');

    section.append(logo( _ => logo(root)));

    if(state.page == null){
      section.append(login(updated));
    } else if (state.page == 1) {
      section.append(muro(updated));
    }

    root.append(section);
}

const updated = function (){
    render(root);
}

const state = {
  page: null,
  datos:null
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
        }

      });

    return cont_login;
  }

"use strict";
  const muro = (updated) => {
      const cont_muro =$('<section class="globalcontainer"></section>');

      const cont_divform = $(`<div class="fb_cont_post"></div>`);
      const cont_form = $('<div class="body_cont_post"></div>');
      const cont_publica =$('<div class="cont_public"></div>');
      const cont_amig =$('<button type="button" class="btn_anuncios" name="button" value="amigos">Amigos</button>');
      const cont_publi =$('<button type="button" class="btn_anuncios" name="button" value="publico">Público</button>');
      cont_publica.append(cont_amig,cont_publi);
      cont_muro.append(cont_divform);

      cont_divform.append(cont_form,cont_publica);

      const div_title =$(`<div class="title_login center"><div class="center cont_img"></div>
                            <span class="center">Relizar publicación</span></div>`);
      const forminput =$('<div class="form-inputs"></div>');

      cont_form.append(div_title,forminput);

      const var_user =$('<div class="form-group"></div>');
      const text_post =$('<textarea id ="postText" name="name" rows="8"  placeholder="¿Que esta pasando?" cols="80"></textarea>');
      const div_btn = $('<div class="btn_cont"></div>');
      const selec_post =$('<select id="postType"></select>');
      const op_public =$('<option value="publico">Público</option>');
      const op_amigos =$('<option value="amigos">Amigos</option>');
      const btn_publicar =$('<button id="publicar">Publicar</button>');
      div_btn.append(selec_post,btn_publicar);
      selec_post.append(op_public,op_amigos);
      var_user.append(text_post,div_btn);
      forminput.append(var_user);

      const div_post =$(`<div id="posts" class="fb_cont_post"></div>`);
      cont_muro.append(div_post);

      var postManager = new PostManager();
      var publicarPostButton = document.getElementById('publicar');

      //Llamando al post

      postManager.postsToHTMLCreate(div_post,state.user.post);



      btn_publicar.on('click', function(){

        if(text_post.val()!=""){
          const postTextarea = $('#postText').val();
          // const postTypeSelect = $('#postType');
          // const postTextarea = document.getElementById('postText').value;
          const postTypeSelect = document.getElementById('postType');
          const postType = postTypeSelect.options[postTypeSelect.selectedIndex].value;
          postManager.addPost(postTextarea,postType);

          postManager.postsToHTML(document.getElementById('posts'));
        } else {
          alert("No hay mensaje que publicar");
        }
      });

      cont_amig.on('click', function(){
        postManager.filterType("amigos",document.getElementById('posts'));
      });

      cont_publi.on('click', function(){
        postManager.filterType("publico",document.getElementById('posts'));
      });


    return cont_muro;
  }

"use strict";

function PostManager() {
  console.log(state.user);
  this.posts = state.user.post;
  this.postCount = this.posts.length;

  this.addPost = function(text,type) {

    this.posts.push({
      id: this.postCount,
      text: text,
      type: type

    });
    addLocalStorage(this.postCount,text,type);
    this.postCount++;
  }

  this.filterType = function(type,parent){
    parent.innerHTML = "";
    array.forEach(function(e , index){
      if(e.type == type){
        parent.appendChild(this.createHTMLPost(e.text,e.id));
      }
    },this);
  }

  this.postsToHTML = function(parent) {
    parent.innerHTML = "";
    this.posts.forEach(function(post) {
      parent.appendChild(this.createHTMLPost(post.text,post.id));
    },this);
  }

  this.postsToHTMLCreate = function(parent,postC) {
    parent.innerHTML = "";
    postC.forEach(function(post) {
      parent.append(this.createHTMLPost(post.text,post.id));
    },this);
  }
  var array = this.posts;

  this.createHTMLPost = function(text,id) {

    var post = document.createElement('div');
    post.setAttribute('data-id',id);
    post.setAttribute('class','post_new');

    var p = document.createElement('textarea');
    p.setAttribute('disabled','true');
    p.setAttribute('class','disabled');
    p.innerHTML = text;

    var editar = document.createElement('a');

    editar.setAttribute('href',"#");
    editar.setAttribute('class',"editar");
    editar.setAttribute('data-edit-mode',false);
    editar.innerHTML = "Editar";
    editar.addEventListener('click',function(e) {
      e.preventDefault();

      if (e.target.getAttribute('data-edit-mode') === 'false') {
        editar.setAttribute('data-edit-mode',true);
        e.target.innerHTML = "Guardar";
        p.removeAttribute("disabled");

      }
      else {

        editar.setAttribute('data-edit-mode',false);
        var textEditada = e.target.parentNode.getElementsByTagName('textarea')[0];

        e.target.innerHTML = "Editar";
        var postId =parseInt(e.target.parentNode.getAttribute('data-id'));
        array.forEach(function(e , index){
          if(e.id == postId){
            array[index].text = textEditada.value;
            editLocalStorage(index ,textEditada.value);
            p.setAttribute('disabled','true');
          }
        });
      };

    });

    var eliminar = document.createElement('a');
    eliminar.setAttribute('href',"#");
    eliminar.setAttribute('class',"eliminar");
    eliminar.innerHTML = "Eliminar"
    eliminar.addEventListener('click',function(e) {
      e.preventDefault();
      if (confirm("Esta seguro que desea eliminar") == true){
        var padre = document.getElementById("posts");
        var postId = e.target.parentNode.getAttribute('data-id');

        array.forEach(function(e , index){
          if(e.id==postId){
            padre.removeChild(padre.childNodes[index]);
            array.splice(index ,1)
            removeLocalStorage(array,index);
          }
        });
      }
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
      validUsers.push({ email: "maia.rt.46@gmail.com", password: "12345" , id:"0", post:[]});
      validUsers.push({ email: "ana.durant@gmail.com", password: "54321", id:"1", post:[]});
      validUsers.push({ email: "jose.garcia@gmail.com",password: "78906" ,id:"2",post:[]});
      validUsers.push({ email: "carla.vasquez@gmail.com",password: "56906" ,id:"4",post:[]});
      addItemToStorage("users",validUsers);
  };

});

"use strict";

  const validarCont = (cont , error) => {
    if (cont == ""){
       return error.text('El campo de usuario no puede estar en blanco.');
    } else {
      return error.text('');
    }
  }
  const validUser = (cont, error ) => {

    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!/([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/gi.test(cont)) {
      return error.text('El email en formato incorrecto');
    };
    return error.text('');
  };



function authenticate(email,password,errorE, errorP) {

  const validUsers = getItemFromStorage("users");
    if (validUsers != null) {
        const user = validUsers.filter(function(user) {
        return user.email == email;
      })[0];

      if (user == undefined){
          return errorE.text('No existe el usuario');
      };

      if (user != null) {
        if (user.password != password){
           return errorP.text('La contraseña es incorrecta');
        };
        state.user =  user;
        return user.email == email && user.password == password;
      }
   }
    return false;
}




function addLocalStorage(id ,text,type){
  const validUsers = getItemFromStorage("users");
  const newPost = {id:id,text:text,type:type};
  const point = state.user.id;

  (validUsers[point].post).push(newPost);
  addItemToStorage("users",validUsers);
}

function removeLocalStorage(index){
  const validUsers = getItemFromStorage("users");
  const point = state.user.id;

  (validUsers[point].post).splice(index,1);
  addItemToStorage("users",validUsers);
}

function editLocalStorage(index ,editado){
  const validUsers = getItemFromStorage("users");
  const point = state.user.id;

  (validUsers[point].post)[index].text =editado;
  addItemToStorage("users",validUsers);
}
