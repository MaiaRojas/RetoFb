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
