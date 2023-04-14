// models
import { supa } from "./supabase.js"
import { del_image } from "./file.js"
import { backend_site } from "../../controller/misc/misc.js"

let users = [
	{
		email1: "gc120978levelup1@gmail.com",
		password1: "1",
		name: "Garry M. Cacho",
		contact: "0999-520-2547",
		address: "Purok Waling Waling San Nicolas Dapitan City",
		img: "/assets/view/img/users/image0001.jpg",
	},
	{
		email1: "gc120978levelup1@live.com",
		password1: "1",
		name: "James M. Cacho",
		contact: "+10999-520-2547",
		address: "Purok Waling Waling San Nicolas Dipolog City",
		img: "/assets/view/img/users/image0002.jpg",
	},
]

const read_users = async (email = null, on_successfull_transaction = null) => {
	users = []
	const data = (
		await (
			await fetch(backend_site + "/api/participants", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
		).json()
	).data

	const imgs = (
		await (
			await fetch(backend_site + "/api/participant_pictures", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
		).json()
	).data

	console.log(data)
	console.log(imgs)

	data.forEach((item) => {
		users.push(item)
	})

	if (on_successfull_transaction) {
		if (email) {
			let a = users.filter(
				(user) => user.email === email && user.user_type === 0
			)
			if (a.length === 1) {
				console.log(a[0])
				let b = imgs.filter((img) => img.participant_id === a[0].id)
				console.log(b[0])
				if (b.length > 0) {
					console.log(b[0].img)
					a[0].img = b[b.length - 1].img
				}
			}
			on_successfull_transaction(a)
		} else {
			on_successfull_transaction(
				users.filter((user) => user.user_type === 0)
			)
		}
	}
}

const create_user = async (
	user,
	on_successfull_transaction = null,
	on_failed_transaction
) => {
	read_users(user.email1, async (data2) => {
		if (data2.length === 0) {
			users = []
			const { data, error } = await supa
				.from("users")
				.insert(user)
				.select()

			//console.log(`data:`)
			//console.log(data)
			data.forEach((item) => {
				users.push(item)
			})

			if (on_successfull_transaction) {
				on_successfull_transaction(users)
			}
		} else {
			on_failed_transaction()
		}
	})
}

const update_user = async (user, on_successfull_transaction = null) => {
	users = []
	const { data, error } = await supa
		.from("users")
		.update(user)
		.eq("email1", user.email1)
		.select()
	data.forEach((item) => {
		users.push(item)
	})

	if (on_successfull_transaction) {
		on_successfull_transaction(users)
	}
}

const delete_user = async (email1, on_successfull_transaction = null) => {
	// delete user imagess
	read_users(email1, (values) => {
		if (values.length === 1) {
			let del = [values[0].img]
			del_image(del)
		}
	})
	users = []
	const { error } = await supa.from("users").delete().eq("email1", email1)
	if (on_successfull_transaction) {
		on_successfull_transaction(error)
	}
}

export { create_user, read_users, update_user, delete_user }
