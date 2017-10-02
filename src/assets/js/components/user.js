"use strict";
//Carga todos los usuarios al local storage

$( window ).load(()=> {
  let validUsers = getItemFromStorage('users');
  if (validUsers == null) {
      validUsers = [];
      validUsers.push({ email: "maia.rt.46@gmail.com", password: "12345"});
      validUsers.push({ email: "ana.durant@gmail.com", password: "54321"});
      validUsers.push({ email: "jose.garcia@gmail.com",password: "78906"});
      validUsers.push({ email: "carla.vasquez@gmail.com",password: "56906"});
      addItemToStorage("users",validUsers);
  };
});
