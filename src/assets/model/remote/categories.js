// models
import { supa } from "./supabase.js"
import { del_image } from "./file.js"
let categories = [
	{
		id: 95723454,
		name: "Mobile Phones",
		desc: "/mobiles.html",
		image: "/assets/view/img/categories/mobiles.jpg",
	},
	{
		id: 23454976,
		name: "Phone Accessories",
		desc: "/mobile_accessories.html",
		image: "/assets/view/img/categories/mobile_accessories.jpg",
	},
]

const read_categories = async (
	name = null,
	on_successfull_transaction = null
) => {
	categories = []
	const { data, error } = await supa.from("categories").select("*")
	data.forEach((item) => {
		categories.push(item)
	})

	if (on_successfull_transaction) {
		if (name) {
			on_successfull_transaction(
				categories.filter((category) => category.name === name)
			)
		} else {
			on_successfull_transaction(categories)
		}
	}
}

const read_categories2 = async (
	id = null,
	on_successfull_transaction = null
) => {
	categories = []
	const { data, error } = await supa.from("categories").select("*")
	data.forEach((item) => {
		categories.push(item)
	})

	if (on_successfull_transaction) {
		if (id) {
			on_successfull_transaction(
				categories.filter((category) => category.id === id)
			)
		} else {
			on_successfull_transaction(categories)
		}
	}
}

const create_category = (
	category,
	on_successfull_transaction = null,
	on_failed_transaction
) => {
	read_categories(category.name, async (cats) => {
		if (cats.length === 0) {
			categories = []
			const { data, error } = await supa
				.from("categories")
				.insert(category)
				.select()
			data.forEach((item) => {
				categories.push(item)
			})

			if (on_successfull_transaction) {
				on_successfull_transaction(categories)
			}
		} else {
			on_failed_transaction()
		}
	})
}

const update_category = async (category, on_successfull_transaction = null) => {
	categories = []
	const { data, error } = await supa
		.from("categories")
		.update(category)
		.eq("id", category.id)
		.select()
	data.forEach((item) => {
		categories.push(item)
	})

	if (on_successfull_transaction) {
		on_successfull_transaction(categories)
	}
}

const delete_category = async (id, on_successfull_transaction = null) => {
	// delete category imagess
	read_categories2(id, (categories) => {
		if (categories.length === 1) {
			let del = [categories[0].image]
			del_image(del)
		}
	})
	categories = []
	const { error } = await supa.from("categories").delete().eq("id", id)
	if (on_successfull_transaction) {
		on_successfull_transaction(error)
	}
}

export {
	create_category,
	read_categories,
	read_categories2,
	update_category,
	delete_category,
}
