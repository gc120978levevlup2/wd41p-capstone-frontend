// models
import { supa } from "./supabase.js"

let items = []

const create_cart_status = async (item, on_successfull_transaction = null) => {
	items = []
	const { data, error } = await supa
		.from("shopping_cart_status_history")
		.insert(item)
		.select()

	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const read_cart_status = async (
	id = null,
	on_successfull_transaction = null
) => {
	items = []
	const { data, error } = await supa
		.from("shopping_cart_status_history")
		.select("*")
	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		if (id) {
			on_successfull_transaction(
				items.filter((item) => item.cart_id === id)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const update_cart_status = async (item, on_successfull_transaction = null) => {
	items = []
	const { data, error } = await supa
		.from("shopping_cart_status_history")
		.update(item)
		.eq("id", item.id)
		.select()

	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const delete_cart_status = async (id, on_successfull_transaction = null) => {
	items = []
	const { error } = await supa
		.from("shopping_cart_status_history")
		.delete()
		.eq("id", id)

	if (on_successfull_transaction) {
		on_successfull_transaction(error)
	}
}

export {
	create_cart_status,
	read_cart_status,
	update_cart_status,
	delete_cart_status,
}
