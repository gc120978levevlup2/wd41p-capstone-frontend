// models
import { supa } from "./supabase.js"
const remote_path =
	"https://naeydbqunatldbdyzylj.supabase.co/storage/v1/object/public/images/"
// save image to supabase image bucket
const save_image = async (
	avatarFile,
	on_makeid,
	on_successfull_transaction = null
) => {
	const avatarFileName = `storeItems/${on_makeid(24)}.jpg`
	const upload_options = { cacheControl: "3600", upsert: false }
	supa.storage
		.from("images")
		.upload(avatarFileName, avatarFile, upload_options)
		.then((res) => {
			if (res.data.path !== undefined) {
				if (on_successfull_transaction) {
					on_successfull_transaction(remote_path + res.data.path)
				}
			}
		})
}

const save_image2 = async (avatarFile, on_makeid) => {
	const avatarFileName = `storeItems/${on_makeid(24)}.jpg`
	const upload_options = { cacheControl: "3600", upsert: false }
	const { data, error } = await supa.storage
		.from("images")
		.upload(avatarFileName, avatarFile, upload_options)
		.then((res) => {
			if (res.data.path !== undefined) {
				return remote_path + res.data.path
			}
		})
}

// delete image to supabase image bucket
const del_image = async (file_path_array) => {
	supa.storage.from("images").remove(file_path_array)
}

export { save_image, save_image2, del_image }
