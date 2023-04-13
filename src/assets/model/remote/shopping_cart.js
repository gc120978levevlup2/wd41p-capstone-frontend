// models
import { supa } from "./supabase.js"
let items = []

const create_cart_item = async (item, on_successfull_transaction = null) => {
	items = []
	let xitem = {
		item_id: item.id,
		email1: item.email1,
		seller_email1: item.seller_email1,
		discount_p: item.discount_p,
		on_sale: item.on_sale,
		sold: 1,
		price: 0,
		unit_price: item.unit_price,
		status: "cart", //cart, order, del-prep, del-courier, del-hub, del-local
	}
	console.log(xitem)
	const { data, error } = await supa
		.from("shopping_cart")
		.insert(xitem)
		.select()

	data.forEach((item) => {
		items.push(item)
	})

	//console.log("created item")
	//console.log({data, error})

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const read_cart_items = async (
	id = null,
	on_successfull_transaction = null
) => {
	items = []
	const { data, error } = await supa.from("shopping_cart").select("*")
	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		if (id) {
			on_successfull_transaction(items.filter((item) => item.id === id))
		} else {
			on_successfull_transaction(items)
		}
	}
}

const read_cart_items_fr_seller = async (
	seller = null,
	on_successfull_transaction = null
) => {
	items = []
	const { data, error } = await supa
		.from("shopping_cart")
		.select("*, items(*), users(*)")
	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		if (seller) {
			on_successfull_transaction(
				items.filter((item) => item.seller_email1 === seller.email1)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const read_cart_items_fr_user = async (
	user = null,
	on_successfull_transaction = null
) => {
	items = []
	const { data, error } = await supa
		.from("shopping_cart")
		.select("*, items(*, sellers(*) )")
	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		if (user) {
			on_successfull_transaction(
				items.filter((item) => item.email1 === user.email1)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const update_cart_item = async (item, on_successfull_transaction = null) => {
	const { data, error } = await supa
		.from("shopping_cart")
		.update(item)
		.eq("id", item.id)
		.select()
	console.log(item.id)
	console.log("data")
	console.log(data)
	console.log("error")
	console.log(error)

	items = []
	data.forEach((item1) => {
		items.push(item1)
	})

	console.log("update_cart_item - items")
	console.log(items)

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const delete_cart_item = async (id, on_successfull_transaction = null) => {
	items = []
	const { error } = await supa.from("shopping_cart").delete().eq("id", id)

	if (on_successfull_transaction) {
		on_successfull_transaction(error)
	}
}

export {
	create_cart_item,
	read_cart_items,
	read_cart_items_fr_seller,
	read_cart_items_fr_user,
	update_cart_item,
	delete_cart_item,
}
