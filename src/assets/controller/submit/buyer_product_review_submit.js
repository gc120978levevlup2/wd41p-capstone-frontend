
export const buyer_product_review_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (urlParams.get('item_id') && urlParams.get('user_email1') && urlParams.get('review')){
        on_start_saving_callback()
        const extract_data = {
                    item_id : urlParams.get('item_id'),
            user_is_a_buyer : ((urlParams.get('user_is_a_buyer') === "true") ? true : false),
                user_email1 : urlParams.get('user_email1'),
                     images : urlParams.get('images'),
                     rating : parseInt(urlParams.get('rating')),
                     review : urlParams.get('review'),
                       date : urlParams.get('date'),
        }
        on_form_data_successfull_callback(extract_data)
    }
}

