"use strict";

const render = (root) => {
    root.empty();
    const section = $('<div class="cont_"></div>');

    section.append(logo( _ => logo(root)));
    section.append(login( _ => login(root)));

    root.append(section);
}

const updated = function () {
    render(root);
}

const state = {
  pagina: null
}


$(_ => {

    const root = $(".root");
    render(root);

});
