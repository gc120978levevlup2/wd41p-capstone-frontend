import React, { useEffect, useRef, useState } from "react"
import { handleImageFileUpload, makeid } from "../../controller/misc/misc"
import {
	create_cart_items_local,
	read_cart_items_local2,
} from "../../model/local/cart_items"
import { read_user, user_is_a } from "../../model/local/login_user"
import { save_image } from "../../model/remote/file"
import { read_items, update_item } from "../../model/remote/items"
import {
	delete_cart_item,
	read_cart_items,
} from "../../model/remote/shopping_cart"
import { read_cart_status } from "../../model/remote/shopping_cart_status_history"

const DeliveryStatusView = ({ items }) => {
	return items.length > 0 ? (
		<>
			{" "}
			<div
				style={{
					borderLeft: "2px solid #333",
					paddingTop: 10,
					paddingBottom: 10,
					marginLeft: 10,
				}}>
				{items.map((value, i) => (
					<>
						<div
							className={`border p-2 mb-3 rounded card-timeline`}>
							<div
								className={
									items.length - 1 !== i ? `` : `right2`
								}></div>
							<p
								className={
									items.length - 1 !== i
										? `title-timeline`
										: `title-timeline-current right`
								}
								style={{ fontSize: 12, marginBottom: 3 }}>
								{" "}
								{value.date}
							</p>
							<span
								className={
									items.length - 1 !== i
										? `badge bg-secondary`
										: `badge bg-primary`
								}>
								{" "}
								{value.status}
							</span>
							<br />
						</div>
					</>
				))}
			</div>
		</>
	) : (
		<>
			<br />
			<h3 class="text-black">[Fresh Orders...no delivery status yet]</h3>
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

// value => individual review value
const DeliveryReviewForm = ({ item }) => {
	return (
		<>
			{/* Modal 
			<form>
				<div
					className="modal fade"
					id={`static-review-${item.id}`}
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabIndex={-1}
					aria-labelledby={`static-review-title-${item.id}`}
					aria-hidden="true">
					<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header bg-primary">
								<h6
									className="modal-title text-white"
									id={`static-review-title-${item.id}`}>
									<span
										style={{
											fontSize: 30,
										}}>
										<i className="bi bi-card-text" />
									</span>
									Review for {item.items.description}
								</h6>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								/>
							</div>
							<div className="modal-body">
								<div className="row">
									<div
										id={`image-viewer-${item.id}`}
										className="col-lg-4 p-2">
										{JSON.parse(image_file).map(
											(value, i) => (
												<>
													<div>
														<div className="mx-auto w-75">
															<img
																width="100%"
																className="img-thumbnail"
																src={`${value}`}
																alt="please select a category image"
																srcSet=""
																id="product-image"
															/>
														</div>
														<div
															className="mx-auto  mb-3"
															style={{
																width: 15,
															}}>
															<button
																type="button"
																className="btn btn-outline-danger border border-0"
																id={`xxx${i}`}
																style={{
																	padding: 0,
																}}>
																<i className="bi bi-trash" />
															</button>
														</div>
													</div>
												</>
											)
										)}
									</div>
									<div className="col-lg-8 p-2 border-start">
										<input
											type="text"
											name="item_id"
											defaultValue={`${item.items.id}`}
											className="form-control d-none1"
										/>
										<input
											type="text"
											name="user_is_a_buyer"
											defaultValue={`${global_user_buyer}`}
											className="form-control d-none1"
										/>
										<input
											type="text"
											name="user_email1"
											defaultValue={`${global_user.email1}`}
											className="form-control d-none1"
										/>
										<input
											ref={imageElementRef}
											type="text"
											name="images"
											defaultValue={`${image_file}`}
											className="form-control d-none1"
											id={`image-${item.id}`}
										/>
										<input
											type="text"
											name="date"
											defaultValue={`${new Date(
												Date.now()
											).toString()}`}
											className="form-control d-none1"
										/>
										<div className="form-floating mb-3">
											<select
												className="form-select"
												name="rating"
												aria-label="Default select example">
												<option value={1}>⭐</option>
												<option value={2}>⭐⭐</option>
												<option value={3}>
													⭐⭐⭐
												</option>
												<option value={4}>
													⭐⭐⭐⭐
												</option>
												<option value={5} selected>
													⭐⭐⭐⭐⭐
												</option>
											</select>
											<label>Rating</label>
										</div>
										<div className="form-floating mb-3">
											<input
												type="file"
												className="form-control"
												id={`review-image-${item.id}`}
												placeholder="try"
												onChange={(e) =>
													onDeliveryReviewImageChangeHandler(
														e,
														item.id
													)
												}
											/>
											<label>Upload Images</label>
										</div>
										<div className="form-floating mb-3">
											<textarea
												className="form-control"
												name="review"
												placeholder="try"
												defaultValue={""}
											/>
											<label>Review Statement</label>
										</div>
									</div>
								</div>
							</div>
							<div
								className="modal-footer"
								id={`"review-btn-${item.id}`}>
								<button
									className="btn btn-outline-primary "
									data-bs-dismiss="modal">
									Submit Review
								</button>
							</div>
						</div>
					</div>
				</div>
			</form>*/}
		</>
	)
}

const DeliveryItemsView = ({ items }) => {
	const [global_user, set_global_user] = useState(null)
	const [global_user_buyer, set_global_user_buyer] = useState(null)
	const [delivery_status, set_delivery_status] = useState([])
	const [image_file, set_image_file] = useState("[]")
	const imageElementRef = useRef()
	let image_ele = ""
	function showItemStatusUpdate(id) {
		read_cart_status(id, (status) => {
			set_delivery_status(status)
		})
	}
	function cancelPaidOrder(id) {
		read_cart_items(id, (cart_items) => {
			let item_id = cart_items[0].item_id
			read_items(item_id, (item) => {
				let x_update_item = item[0]
				x_update_item.sold--
				console.log(x_update_item)
				update_item(x_update_item, (x_items) => {
					delete_cart_item(id, () => {
						let x = read_cart_items_local2()
						let y = x.filter((a) => a.id !== id)
						console.log("y")
						console.log(y)
						create_cart_items_local(y)
						window.location.reload()
					})
				})
			})
		})
	}
	function deleteImage(id) {}
	function onDeliveryReviewImageChangeHandler(e, id) {
		handleImageFileUpload(e, 400, (resized_file) => {
			// put some loading animation message here
			read_cart_items(id, (d_item) => {
				save_image(resized_file, makeid, (file_path) => {
					let images = JSON.parse(image_file)
					images.push(file_path)
					set_image_file(JSON.stringify(images))
					//getProductImage(d_item.id)
					// remove loading animation message here
					imageElementRef.current.value = JSON.stringify(images)
					image_ele = `image-${id}`
				})
			})
		})
	}
	useEffect(() => {
		let x = document.getElementById(image_ele)
		if (x) {
			x.value = image_file
		}
	}, [image_file])
	useEffect(() => {
		read_user((user) => {
			set_global_user({ ...user })
		})

		set_global_user_buyer(user_is_a("buyer"))
	}, [])
	return items.length > 0 ? (
		<>
			{items.map((item, i) => {
				return (
					<>
						<div className="col mb-3" style={{ color: "gray" }}>
							<div
								className="card mb-3 border-1 p-0 position-relative shadow mx-auto"
								style={{ width: 250, height: 600 }}>
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
										src={`${item.items.main_image}`}
										alt="${item.items.description}"
										style={{ minHeight: 150 }}
										data-bs-toggle="modal"
										data-bs-target={`#staticBackdrop-${item.id}`}
									/>
								</div>
								<div
									className="card-body"
									align="center"
									style={{ paddingTop: 1 }}>
									<a
										className="desc-selection"
										href={`/search?search=${item.items.id}`}>
										<h4
											className="d-flex align-middle desc-selection"
											style={{
												height: 60,
												overflowY: "hidden",
												marginBottom: 1,
												fontSize: 13,
											}}>
											<span className="m-auto">
												{item.items.description}
											</span>
										</h4>
									</a>
									<p
										className="d-flex align-middle"
										style={{
											height: 45,
											overflowY: "hidden",
											marginBottom: 0,
											fontSize: 10,
										}}>
										{item.items.specs}
									</p>
									<h4
										className="text-warning"
										style={{
											height: 30,
											overflowY: "hidden",
											whiteSpace: "nowrap",
											marginBottom: 0,
										}}>
										{" "}
										<b>
											{" "}
											<i>
												{" "}
												₱{item.price.toLocaleString()}
											</i>{" "}
										</b>{" "}
									</h4>
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 30, padding: 0 }}>
										<p>{item.payment_method}</p>
									</div>
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 30, padding: 0 }}>
										<p style={{ fontSize: 10 }}>
											{item.order_date}
										</p>
									</div>
									<hr />
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 25, padding: 0 }}>
										<p
											className="text-capitalize"
											style={{ fontSize: 15 }}>
											{item.items.sellers.name}
										</p>
									</div>
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 15, padding: 0 }}>
										<p style={{ fontSize: 10 }}>
											{item.items.sellers.email1}
										</p>
									</div>
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 15, padding: 0 }}>
										<p style={{ fontSize: 10 }}>
											{item.items.sellers.contact}
										</p>
									</div>
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 45, padding: 0 }}>
										<p style={{ fontSize: 10 }}>
											{item.items.sellers.address}
										</p>
									</div>
									<hr />
									<div
										align="center"
										className="d-flex justify-content-center"
										style={{ height: 25, padding: 0 }}>
										<span
											data-bs-toggle="modal"
											data-bs-target={`#delivery-status-history-${item.id}`}
											onClick={() =>
												showItemStatusUpdate(item.id)
											}
											id={`see-mod-${item.id}`}
											className="badge bg-primary
										categories-selection"
											style={{ fontSize: 12 }}>
											{item.status_update}
										</span>
									</div>
									<br />
									<div className="row g-1">
										<div className="col-6">
											<button
												type="button"
												className="btn btn-outline-danger"
												id={`${i}`}
												data-bs-toggle="modal"
												data-bs-target={`#staticBackdrop2-${item.id}`}>
												<i className="bi bi-eraser" />
												Cancel
											</button>
										</div>
										<div className="col-6">
											<button
												type="button"
												className="btn btn-outline-secondary"
												data-bs-toggle="modal"
												data-bs-target={`#static-review-${item.id}`}>
												<i className="bi bi-pen" />
												Review
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
												{item.items.description}
											</h5>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"
											/>
										</div>
										<div className="modal-body">
											{JSON.parse(item.items.images).map(
												(file) => (
													<>
														<img
															width="100%"
															src={`${file}`}
															alt="${file}"
														/>
														<br />
														<br />
													</>
												)
											)}
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
										<div className="modal-header bg-danger">
											<h5
												className="modal-title text-white"
												id="staticBackdropLabel">
												Are you sure you want to CANCEL
												&nbsp;
												{item.items.description} ORDER?
											</h5>
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
													JSON.parse(
														item.items.images
													)[0]
												}`}
												alt="xxx"
											/>
											<br />
											<br />
										</div>
										<div
											className="modal-footer"
											id={`del-del-${item.id}`}>
											<button
												onClick={() =>
													cancelPaidOrder(item.id)
												}
												className="btn btn-outline-danger "
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
								id={`delivery-status-history-${item.id}`}
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
												Delivery Timeline
											</h5>
											<button
												type="button"
												className="btn-close"
												data-bs-dismiss="modal"
												aria-label="Close"
											/>
										</div>
										<div className="modal-body">
											<h5
												className="modal-title text-black"
												id="staticBackdropLabel">
												{item.items.description}
											</h5>

											<DeliveryStatusView
												items={delivery_status}
											/>
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
						</div>
					</>
				)
			})}
		</>
	) : (
		<>
			<br />
			<h3 class="text-black">[No Shipments]</h3>
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

export default DeliveryItemsView
