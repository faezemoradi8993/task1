export  function getData(key) {
  return localStorage.getItem(key);
};
export  function storeData(key,data) {
  return localStorage.setItem(key, data);
};

