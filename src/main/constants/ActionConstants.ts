function keymirror<T>(obj: T): { [P in keyof T]: P };
function keymirror(obj: any) {
  let keys: any = {};
  Object.keys(obj).forEach(key => {
    keys[key] = key;
  });
  Object.freeze(keys);
  return keys;
}

const actionTypes = keymirror({
  ADD_TODO: null,
  LIST_TODO: null,
  DELETE_TODO: null,
});

export default actionTypes;

export interface Action<T> {
  actionType: T;
}