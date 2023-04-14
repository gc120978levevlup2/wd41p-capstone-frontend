import { categories_submit } from "../../../controller/submit/categories_submit"
//"/assets/controller/submit/categories_submit.js"
import { showModal_with_data } from "../../../controller/misc/misc.js"
import {
	read_items_fr_category,
	read_items,
} from "../../../model/remote/items.js"
import { create_cart_item } from "../../..//model/remote/shopping_cart.js"
import {
	user_is_logged_in,
	user_is_a,
	read_user,
} from "../../../model/local/login_user.js"
import { read_categories2 } from "../../../model/remote/categories.js"
import {
	create_review,
	read_reviews,
	read_reviews_of,
	update_review,
	delete_review,
} from "../../../model/remote/product_reviews.js"
import { useEffect, useState } from "react"
import ItemsView from "../../components/ItemsView.js"

const Categories = () => {
	const [category_name, set_category_name] = useState(null)
	const [category_items, set_category_items] = useState([])
	useEffect(() => {
		categories_submit(
			() => {},
			(cat_obj) => {
				//console.log(cat_obj)
				read_categories2(cat_obj.id, (categories) => {
					set_category_name(categories[0].name)
				})
				read_items_fr_category(cat_obj.id, async (items) => {
					set_category_items([...items])
				})
			}
		)
	})
	return (
		<>
			<div
				class="text-white"
				style={{ marginTop: 65, position: "relative" }}>
				<br />
				<div className="container mb-3">
					<div className="row">
						<div className="col-md-12 m-3">
							<div className="row">
								<div className="col-sm-4">
									<h2 style={{ float: "left" }}>
										<b>
											<span id="category_name">
												{category_name ? (
													<>{category_name}</>
												) : (
													<>Category Products</>
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
						<ItemsView items={category_items} />
					</div>
				</div>
				{/* Modal */}
				<div
					className="modal fade"
					id="static-view-reviews"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabIndex={-1}
					aria-labelledby="static-review-title"
					aria-hidden="true">
					<div className="modal-dialog modal-md modal-dialog-centered  modal-dialog-scrollable">
						<div className="modal-content shadow">
							<div className="modal-header bg-primary">
								<h6
									className="modal-title text-white"
									id="static-review-title">
									<span style={{ fontSize: 30 }}>
										<i className="bi bi-card-text" />
									</span>
									<span id="review-title">Reviews for</span>
								</h6>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
									onclick="window.location.reload()"
								/>
							</div>
							<div className="modal-body">
								<div className="row">
									<div
										className="col-12"
										id="reviews-container"></div>
								</div>
							</div>
							<div className="modal-footer" id="review-btn"></div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Categories
