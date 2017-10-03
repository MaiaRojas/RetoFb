"use strict";
  const muro = (updated) => {
      const cont_muro =$('<section class="globalcontainer row"></section>');

      const cont_divform = $(`<div class="fb_cont_post col s10 m8 push-s1 push-m2 "></div>`);
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

      const div_post =$(`<div id="posts" class="fb_cont_post col s10 m8 push-s1 push-m2 "></div>`);
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
