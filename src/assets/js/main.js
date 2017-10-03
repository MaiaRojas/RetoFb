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
  page: null
}


$(_ => {

    const root = $(".root");
    render(root);

});
