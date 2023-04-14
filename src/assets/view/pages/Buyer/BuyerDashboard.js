import { useState, useEffect } from "react"
import { read_saved_category } from "../../../model/local/saved_category.js"
//"/assets/model/local/saved_category.js"
import {
	user_is_logged_in,
	user_is_a,
	read_user,
} from "../../../model/local/login_user.js"
import {
	create_cart_items_local,
	read_cart_items_local,
} from "../../../model/local/cart_items.js"
import {
	save_image,
	save_image2,
	del_image,
} from "../../../model/remote/file.js"
import {
	create_category,
	read_categories,
} from "../../../model/remote/categories.js"
import {
	create_seller,
	read_sellers,
	read_sellers2,
	update_seller,
	delete_seller,
} from "../../../model/remote/sellers.js"

import {
	create_cart_item,
	read_cart_items,
	read_cart_items_fr_seller,
	read_cart_items_fr_user,
	update_cart_item,
	delete_cart_item,
} from "../../../model/remote/shopping_cart.js"

import {
	create_item,
	read_items,
	update_item,
	delete_item,
} from "../../../model/remote/items.js"

import {
	create_review,
	read_reviews,
	read_reviews_of,
	update_review,
	delete_review,
} from "../../../model/remote/product_reviews.js"

import { read_cart_status } from "../../../model/remote/shopping_cart_status_history.js"
// controller
import { buyer_product_review_submit } from "../../../controller/submit/buyer_product_review_submit.js"
//"/assets/controller/submit/buyer_product_review_submit.js"
import { seller_product_form_submit } from "../../../controller/submit/seller_product_form_submit.js"
import { admin_new_cat_form_submit } from "../../../controller/submit/admin_new_cat_form_submit.js"
import { seller_product_form_submit2 } from "../../../controller/submit/seller_product_form_submit2.js"
import {
	handleImageFileUpload,
	handleImage,
	handleImage2,
	makeid,
	showModal_with_data,
} from "../../../controller/misc/misc.js"

import StoresView from "../../components/StoresView.js"
import CategoriesView from "../../components/CategoriesView.js"
import CartItemsView from "../../components/CartItemsView.js"
import DeliveryItemsView from "../../components/DeliveryItemsView.js"
import { page_slide_submit } from "../../../controller/submit/page_slide_submit.js"

const BuyerDashboard = () => {
	const [sellers, set_sellers] = useState([])
	const [categories, set_categories] = useState([])
	const [cart_items, set_cart_items] = useState([])
	const [upcoming_shipments, set_upcoming_shipments] = useState([])
	useEffect(() => {
		console.log("BuyerDashboard")
		read_sellers(null, (xsellers) => {
			set_sellers([...xsellers])
		})
		read_categories(null, (xcategories) => {
			set_categories([...xcategories])
		})

		read_cart_items_local((items) => {
			set_cart_items([...items.filter((x) => x.status === "cart")])
			set_upcoming_shipments([
				...items.filter((x) => x.status === "order"),
			])
		})

		page_slide_submit(
			() => {},
			(data) => {
				let x = window.setTimeout(() => {
					window.location = `#${data.slideto}`
				}, 1500)
			}
		)
	}, [])
	return (
		<>
			<br />
			<div style={{ position: "relative" }}>
				<div className="container mb-3 mt-5">
					<br />
					<div className="row">
						<div className="col-md-12" style={{ height: 35 }}>
							<h2 style={{ float: "left", color: "beige" }}>
								<b>
									<span className="text-wrap">
										<i className="bi bi-shop"></i>
										&nbsp; Select a Store to find your
										product
									</span>{" "}
								</b>
							</h2>
						</div>
						<div className="col-md-12">
							<hr />
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
						id="buyer-stores-list">
						<StoresView sellers={sellers} />
					</div>
					<div className="row">
						<div className="col-md-12" style={{ height: 35 }}>
							<h2 style={{ float: "left", color: "beige" }}>
								<b>
									<span className="text-wrap">
										<i className="bi bi-x-diamond" />
										&nbsp; Select a Category to easily find
										your product
									</span>{" "}
								</b>
							</h2>
						</div>
						<div className="col-md-12">
							<hr />
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
						id="buyer-category-list">
						<CategoriesView categories={categories} />
					</div>
					<div className="row">
						<div className="col-md-12" style={{ height: 35 }}>
							<h2 style={{ float: "left", color: "beige" }}>
								<b>
									<span className="text-wrap">
										<i className="bi bi-cart3" />
										&nbsp; myCart List
									</span>{" "}
								</b>
							</h2>
						</div>
						<div className="col-md-12">
							<hr />
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
						style={{ position: "relative" }}>
						<div
							id="buyer-products-cart-list"
							class="opacity-0"
							style={{ position: "absolute", top: -160 }}>
							xxx
						</div>
						<CartItemsView items={cart_items} />
					</div>
					<div className="row">
						<div className="col-md-12" style={{ height: 35 }}>
							<h2 style={{ float: "left", color: "beige" }}>
								<b>
									<span className="text-wrap">
										<i className="bi bi-airplane" />
										&nbsp; Upcoming Shipments
									</span>{" "}
								</b>
							</h2>
						</div>
						<div className="col-md-12">
							<hr />
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
						style={{ position: "relative" }}>
						<div
							id="buyer-shipment-list"
							class="opacity-0"
							style={{ position: "absolute", top: -160 }}>
							xxx
						</div>
						<DeliveryItemsView items={upcoming_shipments} />
					</div>
				</div>
				{/* Edit Products Modal */}
				<form>
					<div
						className="modal fade"
						id="exampleModal-update-item"
						tabIndex={-1}
						aria-labelledby="exampleModalLabel-update-item"
						aria-hidden="true">
						<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
							<div className="modal-content">
								<div className="modal-header bg-success text-white">
									<h1
										className="modal-title fs-5"
										id="exampleModalLabel-update-item">
										<i className="bi bi-postcard" />| Order
										Status History
									</h1>
									<button
										type="button"
										className="btn-close"
										data-bs-dismiss="modal"
										aria-label="Close"
										onClick={() => {
											window.location.reload()
										}}
									/>
								</div>
								<div className="modal-body">
									<div className="container-fluid">
										<div className="row g-2">
											<div
												className="col-md-4 border border-end-2 border-start-0 border-top-0 border-bottom-0"
												id="product-image-div-2">
												<div className="mx-auto w-75">
													<img
														width="100%"
														className="img-thumbnail"
														src="/assets/view/img/user.jpg"
														alt="please select a category image"
														srcSet=""
														id="product-image"
													/>
												</div>
												<div
													className="mx-auto  mb-3"
													style={{ width: 15 }}>
													<button
														type="button"
														className="btn btn-outline-secondary border border-0"
														style={{ padding: 0 }}
														disabled>
														{" "}
														<i className="bi bi-trash" />{" "}
													</button>
												</div>
											</div>
											<div className="col-md-8">
												<div className="form-floating col-md-12 d-none">
													<input
														type="file"
														className="form-control"
														id="product-image-filename2"
														placeholder="#"
													/>
													<label htmlFor="product-image-filename2">
														<i className="bi bi-camera" />
														Add a Picture
													</label>
												</div>
												<input
													type="text"
													id="id2"
													name="id2"
													className="d-none"
												/>
												<input
													type="text"
													id="item_id2"
													name="item_id2"
													className="d-none"
												/>
												<input
													type="text"
													id="images2"
													name="images2"
													className="d-none"
													defaultValue="[]"
												/>
												<input
													type="text"
													id="main_image2"
													name="main_image2"
													className="d-none"
												/>
												<input
													type="text"
													id="seller_email2"
													name="seller_email2"
													className="d-none"
												/>
												<input
													type="text"
													id="email2"
													name="email2"
													className="d-none"
												/>
												<input
													type="text"
													id="order_date2"
													name="order_date2"
													className="d-none"
												/>
												<input
													type="text"
													id="payment_method2"
													name="payment_method2"
													className="d-none"
												/>
												<input
													type="text"
													id="price2"
													name="price2"
													className="d-none"
												/>
												<input
													type="text"
													id="sold2"
													name="sold2"
													className="d-none"
												/>
												<input
													type="text"
													id="status2"
													name="status2"
													className="d-none"
												/>
												<input
													type="text"
													id="unit_price2"
													name="unit_price2"
													className="d-none"
												/>
												<input
													type="text"
													id="discount_p2"
													name="discount_p2"
													className="d-none"
												/>
												<div className="form-floating col-md-12 d-none">
													<select
														type="text"
														className="form-control"
														id="status_update2"
														name="status_update2"
														placeholder="#"
														required>
														<option>
															020. Seller Prepared
															the Item
														</option>
														<option>
															030. Seller Sent the
															Item to the Courier
														</option>
														<option>
															040. The Courier
															Processed the Item
														</option>
														<option>
															050. The Item have
															arrived in the
															locality
														</option>
														<option>
															060. The Item is
															ready for local
															delivery
														</option>
													</select>
													<label htmlFor="category_id2">
														Current Status Update
													</label>
												</div>
												<h4 className="text-secondary">
													<i>Status History</i>
												</h4>
												<div
													id="status-history-list"
													className="p-2 g-2"
												/>
												<div className="form-floating col-md-12  d-none">
													<select
														type="text"
														className="form-control"
														id="category_id2"
														name="category_id2"
														placeholder="#"
														required>
														<option>
															Non-selected
														</option>
														<option>
															bd9262f3-3462-4504-a902-e22bc953da5f
														</option>
														<option>
															b62db881-ef42-47c9-9ac2-9e0725af95f2
														</option>
														<option>
															9bbfb3f1-e8f5-4350-9293-d38e325ec7d9
														</option>
													</select>
													<label htmlFor="category_id2">
														Category Name
													</label>
												</div>
												<br />
												<br />
												<div className="row g-3 d-none">
													<div className="col-md-4">
														<input
															className="form-check-input"
															type="checkbox"
															id="on_sale2"
															name="on_sale2"
														/>
														<label htmlFor="on_sale2">
															On Sale
														</label>
														<br />
														<input
															className="form-check-input"
															type="checkbox"
															id="on_stop_sell2"
															name="on_stop_sell2"
														/>
														<label htmlFor="on_stop_sell2">
															Stop Selling
														</label>
													</div>
												</div>
												<br />
												<div className="row g-3"></div>
											</div>
										</div>
									</div>
								</div>
								<div className="modal-footer">
									<button
										type="button"
										className="btn btn-secondary"
										data-bs-dismiss="modal"
										onClick={() => {
											window.location.reload()
										}}>
										Close
									</button>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	)
}

export default BuyerDashboard
