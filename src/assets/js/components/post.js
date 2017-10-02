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
  var array = this.posts;
  console.log(array);
  this.createHTMLPost = function(text,id ,parent) {

    var post = document.createElement('div');
    post.setAttribute('data-id',id);

    var p = document.createElement('textarea');
    p.setAttribute('disabled','true');

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
        p.removeAttribute("disabled");

      }
      else {

        editar.setAttribute('data-edit-mode',false);
        var textEditada = e.target.parentNode.getElementsByTagName('textarea')[0];

        e.target.innerHTML = "Editar";
        var postId =parseInt(e.target.parentNode.getAttribute('data-id'));
        array.forEach(function(e , index){
          if(e.id==postId){
          array[index].text = textEditada.value;
            p.setAttribute('disabled','true');
          }
        });
      };

    });


    var eliminar = document.createElement('a');
    eliminar.setAttribute('href',"#");
    eliminar.innerHTML = "Eliminar"
    eliminar.addEventListener('click',function(e) {
      e.preventDefault();

      var padre = document.getElementById("posts");
      var postId = e.target.parentNode.getAttribute('data-id');
      console.log(postId);
      console.log(array);

      array.forEach(function(e , index){
        if(e.id==postId){
          padre.removeChild(padre.childNodes[index]);
          array.splice(index ,1)
        }
      });
    });

    post.appendChild(p);
    post.appendChild(editar);
    post.appendChild(eliminar);
    return post;
  }
}
