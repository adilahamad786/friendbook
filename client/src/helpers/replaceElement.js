export const replaceElement = (arr, Item) => {
    const index = arr.findIndex(item => item._id === Item._id);
    if (index !== -1) {
        arr[index] = Item;
    }
    return arr;
}