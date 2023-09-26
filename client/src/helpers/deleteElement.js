export const deleteElement = (arr, itemId) => {
    console.log(arr, itemId);
    const index = arr.findIndex(item => item._id === itemId);
    if (index !== -1) {
        arr.splice(index, 1);
    }
    console.log(arr);
    return arr;
}