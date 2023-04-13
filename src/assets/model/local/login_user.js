const create_user_a_seller = () => {
    localStorage.setItem('mystore-user-type', 'seller')
}

const create_user_a_buyer = () => {
    localStorage.setItem('mystore-user-type', 'buyer')
}

const create_user_admin = () => {
    localStorage.setItem('mystore-user-type', 'admin')
}

const create_user = (user) => {
    localStorage.setItem('mystore-user', JSON.stringify(user))
}

const read_user = (on_successfull_transaction) => {
    let user = localStorage.getItem('mystore-user')
    if (user)
        on_successfull_transaction(JSON.parse(user))
}

const delete_user = () => {
    localStorage.setItem('mystore-user', '')
}

const user_is_logged_in = () => {
    let user = localStorage.getItem('mystore-user')
    if (user == 'undefined') {
        return false
    }else
    if (user == null) {
        return false
    }else
    if (user == ''){
        return false
    }else{
        if (user != 'undefined'){
            let json = JSON.parse(user)
            if (json){
                return true
            }
        }
    }
    return false
}

const user_is_a = (user_type) => {
    let ret = localStorage.getItem('mystore-user-type')
    if (ret === user_type){
        return true
    }else{
        return false
    }
}

export {
    create_user_a_seller,
    create_user_a_buyer,
    create_user_admin,
    create_user,
    read_user,
    delete_user,
    user_is_logged_in,
    user_is_a,
}
