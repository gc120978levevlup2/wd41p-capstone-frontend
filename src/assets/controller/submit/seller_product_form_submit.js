
export const seller_product_form_submit = (on_start_saving_callback, on_form_data_successfull_callback) => {
    const queryString = window.location.search;
    const urlParams   = new URLSearchParams(queryString);
    if (urlParams.get('category_id')&&urlParams.get('description')&&urlParams.get('discount_p')){
        on_start_saving_callback()
        const extract_data = {
            category_id : urlParams.get('category_id'),
                on_sale : ((urlParams.get('on_sale') === "on") ? true : false),
            description : urlParams.get('description'),
                  specs : urlParams.get('specs'),
             unit_price : parseFloat(urlParams.get('unit_price')),
             discount_p : parseFloat(urlParams.get('discount_p')),
                    qty : parseFloat(urlParams.get('qty')),
                   sold : parseFloat(urlParams.get('sold')),
            review_rate : 5,
             main_image : urlParams.get('main_image'),
                 images : urlParams.get('images'),
          seller_email1 : urlParams.get('seller_email1'),
                min_qty : parseFloat(urlParams.get('min_qty')),
           on_stop_sell : ((urlParams.get('on_stop_sell') === "on") ? true : false),
        }
        //console.log('seller_product_form_get_submit_data')
        //console.log(extract_data)
        on_form_data_successfull_callback(extract_data)
    }
}

/*
images = %5B%22storeItems%2FUOkMe8nULHVsCLQctkAtwDxL.jpg
       %22%2C%22storeItems%2FQxOx0sYZzZfUDEqmF28mmDzH.jpg
       %22%2C%22storeItems%2FUBCHHlefp1t3JONNJEojIO7S.jpg
       %22%2C%22storeItems%2Fo0T8GxevMvi2QPhVyr9KFgjU.jpg
       %22%2C%22storeItems%2FXXPSjp5RmCD53N_BlfXdfULA.jpg
       %22%2C%22storeItems%2FS62eyqqfFPvw2EQdRy4jt5eO.jpg
       %22%5D&
main_image    = storeItems%2FUOkMe8nULHVsCLQctkAtwDxL.jpg&
seller_email1 = gc120978levelup2%40gmail.com&
category_id   = b62db881-ef42-47c9-9ac2-9e0725af95f2&
description   = 323234r&
specs         = 2342423424&
unit_price    = 232&
discount_p    = 2&
on_stop_sell  = on&
min_qty       = 3&
qty           = 00&
sold          = 0
*/