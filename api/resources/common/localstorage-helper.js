export function loadCollection(collectionName) {
  try {
    return JSON.parse(localStorage.getItem(collectionName));
  } catch (error) {
    return [];
  }
}

export function hasCollection(collectionName) {
  return localStorage.getItem(collectionName);
}

export function saveCollection(collectionName, collection) {
  try {
    localStorage.setItem(collectionName, JSON.stringify(collection));
  } catch (error) {}
}
