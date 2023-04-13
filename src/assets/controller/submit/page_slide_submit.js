export const page_slide_submit = (
	on_start_saving_callback,
	on_form_data_successfull_callback
) => {
	const queryString = window.location.search
	const urlParams = new URLSearchParams(queryString)
	if (urlParams.get("slideto")) {
		on_start_saving_callback()
		const extract_data = {
			slideto: urlParams.get("slideto"),
		}
		on_form_data_successfull_callback(extract_data)
	}
}
