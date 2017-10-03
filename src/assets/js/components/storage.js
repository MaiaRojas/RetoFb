function addItemToStorage(key,value) {

  if (typeof(Storage) != "undefined") {
    localStorage.setItem(key,JSON.stringify(value));
  } else {
    console.log("No soporta local storage");
  }
}


function getItemFromStorage(key,value) {
  if (typeof(Storage) != "undefined") {
    return JSON.parse(localStorage.getItem(key));
  } else {
    console.log("No soporta local storage");
  }
  return null;
}
