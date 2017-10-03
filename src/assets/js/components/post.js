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
        parent.append(this.createHTMLPost(e.text,e.id));
      }
    },this);
  }

  this.postsToHTML = function(parent) {
    parent.html = "";
    // parent.innerHTML = "";
    this.posts.forEach(function(post) {
      // parent.appendChild(this.createHTMLPost(post.text,post.id));
      parent.append(this.createHTMLPost(post.text,post.id));
    },this);
  }

  this.postsToHTMLCreate = function(parent,postC) {
    parent.html = "";
    // parent.innerHTML = "";
    postC.forEach(function(post) {
      parent.append(this.createHTMLPost(post.text,post.id));
    },this);
  }
  var array = this.posts;

  this.createHTMLPost = function(text,id) {

    // const post = document.createElement('div');
    const post = $('<div class="post_new" data-id="${id}"></div>');
    // post.setAttribute('data-id',id);
    // post.setAttribute('class','post_new');

    // var p = document.createElement('textarea');
    // p.setAttribute('disabled','true');
    // p.setAttribute('class','disabled');
    // p.innerHTML = text;
    const p = $('<textarea name="name" class="disabled"  disabled ></textarea>');
    p.html = text;

    // var editar = document.createElement('a');
    // editar.setAttribute('href',"#");
    // editar.setAttribute('class',"editar");
    // editar.setAttribute('data-edit-mode',false);
    // editar.innerHTML = "Editar";
    const editar = $('<a href="#" class="editar" data-edit-mode=false>Editar</a>');
    // editar.html="Editar";

    editar.on('click',function(e) {
      e.preventDefault();

      // if (e.target.getAttribute('data-edit-mode') === 'false') {
      if (e.target.attr('data-edit-mode') === 'false') {
        // editar.setAttribute('data-edit-mode',true);
        // e.target.innerHTML = "Guardar";
        // p.removeAttribute("disabled");
        editar.attr('data-edit-mode',true);
        e.target.html = "Guardar";
        p.removeAttr("disabled");
      }
      else {

        // editar.setAttribute('data-edit-mode',false);
        // var textEditada = e.target.parentNode.getElementsByTagName('textarea')[0];
        //
        // e.target.innerHTML = "Editar";
        // var postId =parseInt(e.target.parentNode.getAttribute('data-id'));
        // array.forEach(function(e , index){
        //   if(e.id == postId){
        //     array[index].text = textEditada.value;
        //     editLocalStorage(index ,textEditada.value);
        //     p.setAttribute('disabled','true');

        editar.attr('data-edit-mode',false);
        const textEditada = e.target.parent().$('textarea')[0];

        e.target.html = "Editar";
        const postId =parseInt(e.target.parent(post).attr('data-id'));
        array.forEach(function(e , index){
          if(e.id == postId){
            array[index].text = textEditada.value;
            editLocalStorage(index ,textEditada.value);
            p.attr('disabled','true');
          }
        });
      };

    });

    // var eliminar = document.createElement('a');
    // eliminar.setAttribute('href',"#");
    // eliminar.setAttribute('class',"eliminar");
    // eliminar.innerHTML = "Eliminar"
    // eliminar.addEventListener('click',function(e) {
    //   e.preventDefault();
    //   if (confirm("Esta seguro que desea eliminar") == true){
    //     var padre = document.getElementById("posts");
    //     var postId = e.target.parentNode.getAttribute('data-id');
    //
    //     array.forEach(function(e , index){
    //       if(e.id==postId){
    //         padre.removeChild(padre.childNodes[index]);
    //         array.splice(index ,1)
    //         removeLocalStorage(array,index);
    var eliminar = $('<a href="#" class="eliminar" >Eliminar</a>');;

    eliminar.on('click',function(e) {
      e.preventDefault();
      if (confirm("Esta seguro que desea eliminar") == true){
        const padre = $('#posts');
        const postId = e.target.parent(padre).attr('data-id');

        array.forEach(function(e , index){
          if(e.id==postId){
            padre.removeChild(padre.childNodes[index]);
            array.splice(index ,1)
            removeLocalStorage(array,index);
          }
        });
      }
    });

    post.append(p);
    post.append(editar);
    post.append(eliminar);
    return post;
  }
}
