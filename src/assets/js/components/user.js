"use strict";
//Carga todos los usuarios al local storage

$( window ).load(()=> {
  let validUsers = getItemFromStorage('users');
  if (validUsers == null) {
      validUsers = [];
      validUsers.push({ email: "maia.rt.46@gmail.com", password: "12345" , id:"0", post:[]});
      validUsers.push({ email: "ana.durant@gmail.com", password: "54321", id:"1", post:[]});
      validUsers.push({ email: "jose.garcia@gmail.com",password: "78906" ,id:"2",post:[]});
      validUsers.push({ email: "carla.vasquez@gmail.com",password: "56906" ,id:"4",post:[]});
      addItemToStorage("users",validUsers);
  };
  console.log(validUsers);

});
