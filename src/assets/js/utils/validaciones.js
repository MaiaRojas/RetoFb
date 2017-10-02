"use strict";

  const validarCont = (cont , error) => {
    if (cont == ""){
       return error.text('El campo de usuario no puede estar en blanco.');
    } else {
      return error.text('')
    }
  }
  const validUser = (cont, error ) => {

    var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
    if (!/([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})/gi.test(cont)) {
      return error.text('El email introducido es incorrecto');
    };
    console.log('usuario valido');
    return error.text('');
  };

  function authenticate(email,password) {
    var validUsers = getItemFromStorage("users");
    console.log(validUsers);
    if (validUsers != null) {
      var user = validUsers.filter(function(user) {
        // if (user.email != email){
        //     showMessage("email_error","No existe este usuario");
        // };
        return user.email == email;
      })[0];
      if (user != null) {
        // if (user.password != password){
        //     showMessage("password_error","Contraseña Incorrecta");
        // };

        return user.email == email && user.password == password;
      }
    }
    return false;
}
