// models
import { supa } from "./supabase.js"
import { del_image } from "./file.js"
import { read_items } from "./items.js"

let items = []

const create_review = async (item, on_successfull_transaction = null) => {
	items = []
	console.log("created review")
	console.log(item)
	const { data, error } = await supa
		.from("product_reviews")
		.insert(item)
		.select()

	console.log("created review")
	console.log({ error })

	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const read_reviews = async (id = null, on_successfull_transaction = null) => {
	items = []
	const { data, error } = await supa.from("product_reviews").select("*")
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

const read_reviews_of = async (
	item_id = null,
	on_successfull_transaction = null
) => {
	items = []
	const { data, error } = await supa
		.from("product_reviews")
		.select("*, items(*), users(*)")
	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		if (item_id) {
			on_successfull_transaction(
				items.filter((item) => item.item_id === item_id)
			)
		} else {
			on_successfull_transaction(items)
		}
	}
}

const update_review = async (item, on_successfull_transaction = null) => {
	items = []
	const { data, error } = await supa
		.from("product_reviews")
		.update(item)
		.eq("id", item.id)
		.select()
	//console.log(item.id)
	//console.log(data)
	//console.log(error)

	data.forEach((item) => {
		items.push(item)
	})

	if (on_successfull_transaction) {
		on_successfull_transaction(items)
	}
}

const delete_review = async (id, on_successfull_transaction = null) => {
	// delete items imagess
	read_items(id, (values) => {
		if (values.length === 1) {
			let del2 = values[0].images.replace("[", "").replace("]", "")
			del2 = `[${del2}]`
			let del = [...JSON.parse(del2)]
			del_image(del)
		}
	})
	items = []
	const { error } = await supa.from("product_reviews").delete().eq("id", id)

	if (on_successfull_transaction) {
		on_successfull_transaction(error)
	}
}

export {
	create_review,
	read_reviews,
	read_reviews_of,
	update_review,
	delete_review,
}
