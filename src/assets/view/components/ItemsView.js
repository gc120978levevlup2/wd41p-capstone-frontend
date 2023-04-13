import { useEffect, useState } from "react"
import { getRating } from "../../controller/misc/misc"
import {
	create_cart_items_local,
	read_cart_items_local2,
} from "../../model/local/cart_items"
import { read_user } from "../../model/local/login_user"
import { read_items } from "../../model/remote/items"
import { read_reviews_of } from "../../model/remote/product_reviews"
import { create_cart_item } from "../../model/remote/shopping_cart.js"
const ShowImages = ({ images }) => {
	let n = 0
	let items = JSON.parse(images)
	if (items) n = items.length
	console.log(`ShowImages  items `)
	console.log(items)
	return n > 0 ? (
		<>
			<div
				className="mx-2"
				style={{ height: 100, overflowX: "auto", overflowY: "hidden" }}>
				<div style={{ height: 120, whiteSpace: "nowrap" }}>
					{items && items.length > 0 ? (
						<>
							{items.map((item) => (
								<>
									<a
										target="_blank"
										href={`${item}`}
										style={{ color: "white" }}>
										<img
											height={100}
											src={`${item}`}
											alt=""
										/>
									</a>
								</>
							))}
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</>
	) : (
		<></>
	)
}
const ReviewsOfItemView = ({ items }) => {
	return items.length > 0 ? (
		<>
			<div
				className="text-black"
				style={{
					position: "relative",
					zIndex: 10000,
					borderLeft: "2px solid #333",
					paddingTop: 10,
					paddingBottom: 10,
					marginLeft: 10,
				}}>
				{items.map((item, i) => (
					<>
						<div className="border p-2 mb-3 rounded card-timeline">
							<div className="right2"></div>
							<div className=" title-timeline2 right"></div>
							<div className="col-12 text-capitalize">
								<img
									className="rounded-circle"
									height="50px"
									width="50px"
									src={`${item.users.img}`}
									alt=""
								/>
								<span style={{ float: "right" }}>
									{getRating(item.rating)}
								</span>
								&nbsp;
								<span className="badge bg-success">
									{" "}
									{item.users.name}{" "}
								</span>
								<p style={{ fontSize: 10, margin: 2 }}>
									{" "}
									{item.date}{" "}
								</p>
							</div>
							<ShowImages images={item.images} class="mb-3" />
							<div classname="mx-2 mt-5" style={{ fontSize: 14 }}>
								{item.review}
							</div>
						</div>
					</>
				))}
			</div>
		</>
	) : (
		<>
			<br />
			<h3 class="text-black">[No Available Review yet]</h3>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	)
}
const ItemsView = ({ items }) => {
	const [reviews, set_reviews] = useState([])
	function addToCart(id) {
		read_user((user) => {
			read_items(id, (items) => {
				let xitems = [...read_cart_items_local2()]
				items[0].email1 = user.email1
				xitems.push(items[0])
				create_cart_items_local(xitems)
				create_cart_item(items[0], (xxitems) => {
					window.location.reload()
				})
			})
		})
	}

	function show_reviews(item_id) {
		read_reviews_of(item_id, (xreviews) => {
			set_reviews(xreviews)
			console.log(xreviews)
		})
	}

	return items.length > 0 ? (
		<>
			{items.map((item, i) => (
				<>
					<div className="col mb-3 d-flex" style={{ color: "gray" }}>
						<div
							className="card mb-3 border-1 p-0 position-relative shadow mx-auto"
							style={{ width: 250 }}>
							{item.on_sale ? (
								<>
									<img
										height="70px"
										src="/assets/view/img/sale.png"
										alt="on sale"
										className="position-absolute top-0 start-0"
									/>
								</>
							) : (
								<></>
							)}
							{/* Modal Trigger */}
							<div
								className="image-selection mx-auto"
								style={{
									height: 150,
									width: "100%",
									overflow: "hidden",
								}}>
								<img
									width="100%"
									src={`${item.main_image}`}
									alt="${item.description}"
									style={{ minHeight: 150 }}
									data-bs-toggle="modal"
									data-bs-target={`#staticBackdrop-${item.id}`}
								/>
							</div>
							<div
								className="card-body"
								align="center"
								style={{ paddingTop: 1 }}>
								<h4
									className="card-title"
									style={{
										height: 30,
										overflowY: "hidden",
										marginBottom: 1,
									}}>
									{item.description}
								</h4>
								<p
									className="card-text"
									style={{
										height: 75,
										overflowY: "hidden",
										marginBottom: 0,
									}}>
									{item.specs}
								</p>
								<h4
									className="text-warning"
									style={{
										height: 30,
										overflowY: "hidden",
										whiteSpace: "nowrap",
										marginBottom: 0,
									}}>
									<b>
										<i>
											${item.unit_price.toLocaleString()}
										</i>{" "}
									</b>{" "}
								</h4>
								{item.on_sale ? (
									<>
										<p
											className="card-text"
											style={{
												height: 25,
												overflowY: "hidden",
												whiteSpace: "nowrap",
												marginBottom: 0,
											}}>
											<small className="text-muted">
												promo {item.discount_p}% off{" "}
												<span className="text-decoration-line-through">
													<b>
														₱{" "}
														{(
															item.unit_price /
															((100 -
																item.discount_p) /
																100)
														).toLocaleString()}
													</b>
												</span>
											</small>
										</p>
									</>
								) : (
									<>
										<p
											className="card-text text-white"
											style={{
												height: 25,
												overflowY: "hidden",
												marginBottom: 0,
											}}>
											x
										</p>
									</>
								)}
								<div
									align="center"
									className="d-flex flex-row justify-content-center"
									style={{ height: 30, padding: 0 }}>
									<div className="p-1">
										{" "}
										Sold{" "}
										<span className="badge bg-success">
											{item.sold}
										</span>{" "}
									</div>
									<div className="p-1">
										{" "}
										Available{" "}
										<span className="badge bg-danger">
											{item.qty - item.sold}
										</span>{" "}
									</div>
								</div>
								<div
									style={{ height: 40, overflowY: "hidden" }}>
									<span style={{ fontSize: 10 }}>
										{item.sellers.name}
									</span>
									<p style={{ fontSize: 10 }}>
										{item.sellers.address}
									</p>
								</div>
								<div
									style={{ height: 30, overflowY: "hidden" }}>
									{getRating(item.review_rate)}
								</div>
								<div className="row g-1">
									<div className="col-6">
										<button
											//{item.on_stop_sell ? `disabled` : `` }
											type="button"
											className="btn btn-outline-primary w-100"
											id={`${i}`}
											data-bs-toggle="modal"
											data-bs-target={`#staticBackdrop2-${item.id}`}>
											<i className="bi bi-cart" />
											<br />
											Cart
										</button>
									</div>
									<div className="col-6">
										<button
											onClick={() => {
												show_reviews(item.id)
											}}
											type="button"
											className="btn btn-outline-warning w-100"
											id={`view-review-${item.id}`}
											data-bs-toggle="modal"
											data-bs-target={`#item-reviews-${item.id}`}>
											<i className="bi bi-chat-quote" />
											<br />
											Reviews
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* Modal */}
						<div
							className="modal fade"
							id={`staticBackdrop-${item.id}`}
							data-bs-backdrop="static"
							data-bs-keyboard="false"
							tabIndex={-1}
							aria-labelledby="staticBackdropLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
								<div className="modal-content">
									<div className="modal-header bg-primary-subtle">
										<h5
											className="modal-title"
											id="staticBackdropLabel">
											{item.description}
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										/>
									</div>
									<div className="modal-body">
										{JSON.parse(item.images).map((file) => (
											<>
												<img
													width="100%"
													src={`${file}`}
													alt={`${file}`}
												/>
												<br />
												<br />
											</>
										))}
									</div>
									<div className="modal-footer">
										<button
											className="btn btn-outline-danger "
											data-bs-dismiss="modal">
											Close
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* Modal */}
						<div
							className="modal fade"
							id={`staticBackdrop2-${item.id}`}
							data-bs-backdrop="static"
							data-bs-keyboard="false"
							tabIndex={-1}
							aria-labelledby="staticBackdropLabel"
							aria-hidden="true">
							<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
								<div className="modal-content">
									<div className="modal-header bg-primary">
										<h6
											className="modal-title text-white"
											id="staticBackdropLabel">
											<span style={{ fontSize: 30 }}>
												<i className="bi bi-cart" />
											</span>
											Are you sure you want{" "}
											{item.description} to be added to
											Cart?
										</h6>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										/>
									</div>
									<div className="modal-body">
										<img
											width="100%"
											src={`${
												JSON.parse(item.images)[0]
											}`}
											alt="xxx"
										/>
										<br />
										<br />
									</div>
									<div className="modal-footer">
										<button
											onClick={() => {
												addToCart(item.id)
											}}
											id={`add-cart-${item.id}`}
											className="btn btn-outline-primary "
											data-bs-dismiss="modal">
											YES
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* Modal */}
						<div
							className="modal fade"
							id={`item-reviews-${item.id}`}
							data-bs-backdrop="static"
							data-bs-keyboard="false"
							tabIndex={-1}
							aria-labelledby="static-review-title"
							aria-hidden="true">
							<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
								<div className="modal-content shadow">
									<div className="modal-header bg-primary">
										<h6
											className="modal-title text-white"
											id="static-review-title">
											<span style={{ fontSize: 30 }}>
												<i className="bi bi-card-text" />
											</span>
											<span id="review-title">
												{"  "}Reviews for{" "}
												{item.description}{" "}
											</span>
										</h6>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
											onclick={() => {
												window.location.reload()
											}}
										/>
									</div>
									<div
										className="modal-body"
										style={{
											zIndex: 10000,
											position: "relative",
										}}>
										<div className="row">
											<div
												className="col-12"
												id="reviews-container">
												<ReviewsOfItemView
													items={reviews}
												/>
											</div>
										</div>
									</div>
									<div
										className="modal-footer"
										id="review-btn"></div>
								</div>
							</div>
						</div>
					</div>
				</>
			))}
		</>
	) : (
		<>
			<br />
			<h3 class="text-black">[No Available Items Found]</h3>
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
			<br />
		</>
	)
}

export default ItemsView
