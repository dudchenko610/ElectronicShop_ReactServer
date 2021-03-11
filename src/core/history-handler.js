

export const pushToExisting = (props, modelsToBeAdded) => {

    const match = props.match
    const history = props.history

    for (const [key, value] of Object.entries(match.params)) {
        console.log(`${key}: ${value}`);
      }
    
}

export const pushRemovingExisting = (history, modelsToBeAdded) => {

}