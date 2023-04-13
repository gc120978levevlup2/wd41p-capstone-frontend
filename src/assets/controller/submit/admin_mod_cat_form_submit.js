
export const admin_mod_cat_form_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (urlParams.get('name_2')&&urlParams.get('desc_2')&&urlParams.get('image_2')){
        on_start_saving_callback()
        const extract_data = {
               id : urlParams.get('id_2'),
             name : urlParams.get('name_2'),
             desc : urlParams.get('desc_2'),
            image : urlParams.get('image_2'),

        }
        on_form_data_successfull_callback(extract_data)
    }
}
