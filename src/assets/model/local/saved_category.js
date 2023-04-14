const create_saved_category = (category) => {
    localStorage.setItem('mystore-last-saved-category', JSON.stringify(category))
}

const read_saved_category = (on_successfull_transaction) => {
    let cat = JSON.parse(localStorage.getItem('mystore-last-saved-category'))
    on_successfull_transaction (cat)
}

export {
    create_saved_category,
    read_saved_category,
}