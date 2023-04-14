
export const admin_new_cat_form_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (urlParams.get('name')&&urlParams.get('desc')&&urlParams.get('image')){
        on_start_saving_callback()
        const extract_data = {
             name : urlParams.get('name'),
             desc : urlParams.get('desc'),
            image : urlParams.get('image'),

        }
        on_form_data_successfull_callback(extract_data)
    }
}
