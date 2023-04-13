
export const categories_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (true){
        on_start_saving_callback()
        const extract_data = {
                    id : urlParams.get('id'),
        }
        on_form_data_successfull_callback(extract_data)
    }
}
