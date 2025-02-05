//Crud Helper functions

export function getMaxIdInList(list) {
  let maxId = 0;
  if (list?.length > 0) {
    maxId = list.reduce((a, b) => (a.id > b.id ? a : b), { id: 0 }).id;
  }
  return maxId;
}
