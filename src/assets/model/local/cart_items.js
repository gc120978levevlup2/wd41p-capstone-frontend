const create_cart_items_local = (items) => {
	localStorage.setItem("mystore-cart-items", JSON.stringify(items))
}

const read_cart_items_local = (on_successfull_transaction) => {
	let items = JSON.parse(localStorage.getItem("mystore-cart-items"))
	on_successfull_transaction(items)
}

const read_cart_items_local2 = () => {
	let items = JSON.parse(localStorage.getItem("mystore-cart-items"))
	return items
}

export {
	create_cart_items_local,
	read_cart_items_local,
	read_cart_items_local2,
}
