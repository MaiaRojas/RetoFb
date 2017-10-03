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

  console.log(point);
  (validUsers[point].post).push(newPost);
  addItemToStorage("users",validUsers);
}
