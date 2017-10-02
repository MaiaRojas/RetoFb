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

        const postTextarea = document.getElementById('postText').value;
        console.log(postTextarea);
        const postTypeSelect = document.getElementById('postType');
        console.log(postTypeSelect);
        const postType = postTypeSelect.options[postTypeSelect.selectedIndex].value;
        console.log(postType);
        console.log();
        postManager.addPost(postTextarea,postType);
        postManager.postsToHTML(document.getElementById('posts'));

      });

    return cont_muro;
  }
