
export function insertAt(array, index, ...elements) {
    array.splice(index, 0, ...elements);
}

export function removeAt(array, index) {
    array.splice(index, 1)
}

export function removeByValue(arr, val) {
    var ind = null

    arr.map((value, index, array) => {
                
        if (value === val) {
            ind = index
        }
    }) 

    arr.splice(ind, 1)
}


export const replaceMapElementToTop = (map, element, keyElement) => {
    map.delete(keyElement)
    const keyValueArray = Array.from(map)

    map.clear()
    map.set(keyElement, element)

    keyValueArray.map(([key, value], index, array) => {
        map.set(key, value)
    })

}