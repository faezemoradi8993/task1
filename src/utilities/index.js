export  function getData(key) {
  return localStorage.getItem(key);
};
export  function storeData(key,data) {
  return localStorage.setItem(key, data);
};
export  function removeData(key) {
  return localStorage.removeItem(key);
};

