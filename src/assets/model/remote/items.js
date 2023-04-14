// models
import { supa } from "./supabase.js"
import { del_image } from "./file.js"

const create_item = async (item, on_successfull_transaction = null) => {
	let items = []
	const { data, error } = await supa.from("items").insert(item).select()

	items = [...data]

	//console.log("created item")
	//console.log({data, error})

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const read_items = async (id = null, on_successfull_transaction = null) => {
	let items = []
	const { data, error } = await supa.from("items").select("*")
	items = [...data]
	if (on_successfull_transaction) {
		if (id) {
			on_successfull_transaction(items.filter((item) => item.id === id))
		} else {
			on_successfull_transaction(items)
		}
	}
}

const read_items_fr_seller = async (
	seller = null,
	on_successfull_transaction = null
) => {
	let items = []
	const { data, error } = await supa.from("items").select("*")
	items = [...data]

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

const read_items_fr_seller_email = async (
	seller_email = null,
	on_successfull_transaction = null
) => {
	let items = []
	const { data, error } = await supa
		.from("items")
		.select("*, sellers(name, address)")
	items = [...data]

	if (on_successfull_transaction) {
		if (seller_email) {
			on_successfull_transaction(
				items.filter((item) => item.seller_email1 === seller_email)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const read_items_fr_category = async (
	category_id = null,
	on_successfull_transaction = null
) => {
	let items = []
	const { data, error } = await supa
		.from("items")
		.select("*, sellers(name, address)")
	items = [...data]

	if (on_successfull_transaction) {
		if (category_id) {
			on_successfull_transaction(
				items.filter((item) => item.category_id === category_id)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const read_items_fr_search = async (
	search = null,
	on_successfull_transaction = null
) => {
	let items = []
	const { data, error } = await supa
		.from("items")
		.select("*, sellers(name, address)")

	items = [...data]

	if (on_successfull_transaction) {
		if (search) {
			on_successfull_transaction(
				items.filter(
					(item) =>
						item.description
							.toUpperCase()
							.includes(search.toUpperCase()) ||
						item.specs
							.toUpperCase()
							.includes(search.toUpperCase()) ||
						item.id == search
				)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const update_item = async (item, on_successfull_transaction = null) => {
	let items = []
	const { data, error } = await supa
		.from("items")
		.update(item)
		.eq("id", item.id)
		.select()
	console.log(item.id)
	console.log(data)
	console.log(error)

	items = [...data]

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const delete_item = async (id, on_successfull_transaction = null) => {
	// delete items imagess
	read_items(id, (values) => {
		if (values.length === 1) {
			let del1 = [values[0].main_image]
			let del2 = values[0].images.replace("[", "").replace("]", "")
			del2 = `[${del2}]`
			let del = [...del1, ...JSON.parse(del2)]
			del_image(del)
		}
	})
	const { error } = await supa.from("items").delete().eq("id", id)

	if (on_successfull_transaction) {
		on_successfull_transaction(error)
	}
}

export {
	create_item,
	read_items,
	read_items_fr_seller,
	read_items_fr_seller_email,
	read_items_fr_category,
	read_items_fr_search,
	update_item,
	delete_item,
}
