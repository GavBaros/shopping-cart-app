//reusable function to identify an item object
export const criteria = (obj1, obj2) =>
  obj1.id === obj2.id && obj1.size === obj2.size;

//quick way to shallow compare two objects, I would not recommend this for production
export const equalObjects = (obj1, obj2) =>
  JSON.stringify(obj1) === JSON.stringify(obj2);

//to exclude any undefined values
export const itemExists = (itemObject = {}, itemIndex) =>
  itemObject && itemIndex !== -1;

export const getLastWord = string => string.split(" ").slice(-1)[0];
