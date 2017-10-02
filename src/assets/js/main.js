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
