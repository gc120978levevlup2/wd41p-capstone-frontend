
export const seller_mod_form_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (urlParams.get('email1') && urlParams.get('password1')){
        on_start_saving_callback()
        const extract_data = {
                    id : urlParams.get('id'),
                email1 : urlParams.get('email1'),
             password1 : window.btoa(urlParams.get('password1')),
                  name : urlParams.get('name'),
               contact : urlParams.get('contact'),
               address : urlParams.get('address'),
                   img : urlParams.get('img'),
        }
        on_form_data_successfull_callback(extract_data)
    }
}
