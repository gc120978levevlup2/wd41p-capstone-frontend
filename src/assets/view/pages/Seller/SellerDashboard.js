import React from "react"

const SellerDashboard = () => {
	return (
		<>
			{" "}
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
						id="buyer-stores-list"></div>
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
						id="buyer-category-list"></div>
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

export default SellerDashboard
