
export const seller_update_status_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (urlParams.get('id2')){
        on_start_saving_callback()
        const extract_data = {
                discount_p : urlParams.get('discount_p2'),
                    email1 : urlParams.get('email2'),
                        id : urlParams.get('id2'),
                   item_id : urlParams.get('item_id2'),
                   on_sale : ((urlParams.get('on_sale2') === "on") ? true : false),
                order_date : urlParams.get('order_date2'),
            payment_method : urlParams.get('payment_method2'),
                     price : urlParams.get('price2'),
             seller_email1 : urlParams.get('seller_email2'),
                      sold : urlParams.get('sold2'),
                    status : urlParams.get('status2'),
             status_update : urlParams.get('status_update2'),
                unit_price : urlParams.get('unit_price2'),
        }
        on_form_data_successfull_callback(extract_data)
    }
}
