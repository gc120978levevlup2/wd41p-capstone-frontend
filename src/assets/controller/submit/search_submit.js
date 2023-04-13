export const search_submit = (
	on_start_saving_callback,
	on_form_data_successfull_callback
) => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	if (urlParams.get("search")) {
		on_start_saving_callback()
		const extract_data = {
			search: urlParams.get("search"),
		}
		on_form_data_successfull_callback(extract_data)
	}
}
