import { categories_submit } from "../../../controller/submit/categories_submit.js"

import {
	getRating,
	showModal_with_data,
} from "../../../controller/misc/misc.js"
import {
	read_items_fr_seller_email,
	read_items_fr_category,
	read_items,
} from "../../../model/remote/items.js"
import { create_cart_item } from "../../../model/remote/shopping_cart.js"
import {
	user_is_logged_in,
	user_is_a,
	read_user,
} from "../../../model/local/login_user.js"
import { read_sellers } from "../../../model/remote/sellers.js"
import {
	create_review,
	read_reviews,
	read_reviews_of,
	update_review,
	delete_review,
} from "../../../model/remote/product_reviews.js"
import { useEffect, useState } from "react"
import {
	create_cart_items_local,
	read_cart_items_local2,
} from "../../../model/local/cart_items.js"
import ItemsView from "../../components/ItemsView.js"

const Stores = () => {
	const [category_name, set_category_name] = useState("")
	const [item_of_seller, set_item_of_seller] = useState([])
	useEffect(() => {
		categories_submit(
			() => {},
			(cat_obj) => {
				console.log(cat_obj)
				read_sellers(cat_obj.id, (categories) => {
					set_category_name(categories[0].name)
				})
				read_items_fr_seller_email(cat_obj.id, async (items) => {
					set_item_of_seller(items)
				})
			}
		)
	}, [])
	return (
		<>
			<div
				class="text-white"
				style={{ marginTop: 65, position: "relative" }}>
				<br />
				<div className="container mb-3">
					<div className="row">
						<div className="col-md-12 m-1">
							<div className="row">
								<div className="col-sm-4">
									<h2 style={{ float: "left" }}>
										<b>
											<span id="category_name">
												{category_name ? (
													<>{`${category_name}`}</>
												) : (
													<>Store Products</>
												)}
											</span>
										</b>
									</h2>
								</div>
								<hr />
							</div>
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5"
						id="user-search-list">
						<ItemsView items={item_of_seller} />
					</div>
				</div>
			</div>
		</>
	)
}

export default Stores
