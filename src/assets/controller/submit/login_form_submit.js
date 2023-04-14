// controller
//import { showModal } from "../misc/misc.js"
//"../../controller/misc/misc.js"

export const login_form_submit = (
	on_start_saving_callback,
	on_form_data_successfull_callback,
	on_msg
) => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	if (urlParams.get("email1")) {
		on_start_saving_callback()
		const extract_data = {
			email1: urlParams.get("email1"),
			password1: window.btoa(urlParams.get("password1")),
		}
		on_form_data_successfull_callback(extract_data)
	} else if (urlParams.get("msg")) {
		//showModal("loginModal")
		on_msg(urlParams.get("msg"))
	} else {
		//showModal("loginModal")
	}
}
