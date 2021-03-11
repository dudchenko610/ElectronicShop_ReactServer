

export const getListFromStorage = (key) => {
    const listJson = localStorage.getItem(key)
    let list = JSON.parse(listJson)

    if (list == null) {
        list = []
    }

    return list
}

export const saveObjectToStorage  = (key, object) => {
    const stringified = JSON.stringify(object)
    localStorage.setItem(key, stringified)
}