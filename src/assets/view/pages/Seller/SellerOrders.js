import React, { useEffect, useState, useRef } from "react"
import { backend_site } from "../../../controller/misc/misc"
import { read_user } from "../../../model/local/login_user"
import { loadStripe } from "@stripe/stripe-js"
import { msg_submit } from "../../../controller/submit/msg_submit"
const SellerOrders = () => {
	const [tstate, set_tstate] = useState(false)
	const [orders, set_orders] = useState([])
	const [save_btn_hide, set_save_btn_hide] = useState("")
	const [product_qty, set_product_qty] = useState(0)
	const [product_pictures, set_product_pictures] = useState([])
	const [product_unit_price, set_product_unit_price] = useState()
	const [product_id, set_product_id] = useState()
	const [product_specification, set_product_specification] = useState()
	const [product_qty_sold, set_product_qty_sold] = useState(0)
	const [product_unit, set_product_unit] = useState()
	const [product_category_id, set_product_category_id] = useState()
	const [product_description, set_product_description] = useState()
	const [sub_total, set_sub_total] = useState(0)
	const [total_taxes, set_total_taxes] = useState(0)
	const [grand_total, set_grand_total] = useState(0)
	const [customer, set_customer] = useState()
	const [prod_id, set_prod_id] = useState("")
	const [prod_desc, set_prod_desc] = useState(" ")
	const [prod_price, set_prod_price] = useState(" ")
	const [prod_qty, set_prod_qty] = useState("")
	const [prod_unit, set_prod_unit] = useState(" ")
	const focus_prod_id = useRef()
	const focus_qty = useRef()
	const focus_enter = useRef()
	const showmodal = useRef()
	const checkout_btn = useRef()
	const checkout_close_btn = useRef()
	const [amount_receive, set_amount_receive] = useState(0)
	const [checkout_started, set_checkout_started] = useState(false)
	const [checkout_started_cc, set_checkout_started_cc] = useState(false)
	const [msg1, set_msg1] = useState("")
	const [stripe_id, set_stripe_id] = useState("")
	const [stripe_prod_id, set_stripe_prod_id] = useState("")

	let stripe_promise
	function get_stripe() {
		if (!stripe_promise) {
			stripe_promise = loadStripe(stripe_id)
		}
		return stripe_promise
	}

	const redirectToCheckout = async (qty = 1) => {
		const stripe = await get_stripe()
		const { error } = await stripe.redirectToCheckout({
			lineItems: [
				{
					price: stripe_prod_id,
					quantity: qty,
				},
			],
			mode: "payment",
			successUrl: `${window.location.origin}/seller_order_success`,
			cancelUrl: `${window.location.origin}/seller_orders?msg=You cancelled the payment.`,
		})
		if (error) {
			alert("There was an error redirecting to checkout", error)
		}
	}

	function saveModProduct2() {
		read_user((user) => {
			fetch(backend_site + "/api/order_details", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cashier_id: user.id,
					order_id: -1000,
					product_id: prod_id,
					qty: prod_qty,
					price: prod_price,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status > 0) {
						set_product_id(response.data.id)
						console.log(response.data.id)
						getOrders()
						get_customer_on_cashier()
						focus_prod_id.current.focus()
					}
				})
		})
	}
	function get_customer_on_cashier() {
		set_customer(JSON.parse(window.localStorage.getItem("my-app-customer")))
	}
	function openProductForModification(item) {
		console.log("openProductForModification")
		set_product_id(item.product.id)
		set_product_pictures(item.images)
		set_product_category_id(item.category_id)
		set_product_description(item.description)
		set_product_specification(item.specs)
		set_product_unit(item.unit)
		set_product_unit_price(item.price)
		set_product_qty(item.qty)
		set_product_qty_sold(item.sold_qty)
	}
	function saveModProduct(item_id) {
		read_user((user) => {
			fetch(backend_site + "/api/order_details/" + item_id, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					cashier_id: user.id,
					order_id: -1000,
					product_id: product_id,
					qty: product_qty,
					price: product_unit_price,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status > 0) {
						set_product_id(response.data.id)
						console.log(response.data.id)
						alert(response.msg)
						getOrders()
						//window.location = "/login"
						//set_image_disabled(false)
					} else alert(response.msg.join("\n"))
				})
		})
	}
	function delete_order_item(item_id) {
		fetch(backend_site + "/api/order_details/" + item_id, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				alert(response.msg)
				getOrders()
			})
	}
	async function getOrders() {
		let xorders1 = (
			await (
				await fetch(backend_site + "/api/order_details", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data
		console.log("xorders1")
		console.log(xorders1)
		let xproducts = (
			await (
				await fetch(backend_site + "/api/products", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data
		let xproduct_pictures = (
			await (
				await fetch(backend_site + "/api/product_pictures", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data
		console.log(xproducts)
		console.log(xproduct_pictures)
		for (let product of xproducts) {
			product.img = []
			//console.log(product.id)
			for (let picture of xproduct_pictures) {
				//console.log(picture.product_id)
				if (picture.product_id === product.id) {
					//console.log("found picture")
					product.img.push(picture.img)
				}
			}
		}

		let xorders = []
		read_user((user) => {
			set_stripe_id(user.stripe_api)
			set_stripe_prod_id(user.stripe_prod_id)
			xorders = xorders1.filter(
				(x) => x.cashier_id === user.id && x.order_id === -1000
			)
		})

		let x_grand_total = 0
		for (let order of xorders) {
			x_grand_total += order.qty * order.price
			for (let product of xproducts) {
				if (order.product_id === product.id) {
					order.product = product
				}
			}
		}
		set_grand_total(x_grand_total)
		set_total_taxes(x_grand_total * 0.12)
		set_sub_total(x_grand_total * 0.88)

		console.log(xorders)
		set_orders(xorders)
		window.localStorage.setItem("my-app-orders", JSON.stringify(xorders))
	}
	async function cancel_order_transaction() {
		window.localStorage.setItem("my-app-customer", JSON.parse(null)) // remove customer
		for (let order of orders) {
			let x = await await fetch(
				backend_site + "/api/order_details/" + order.id,
				{
					method: "DELETE",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				}
			)
		}
		getOrders()
		get_customer_on_cashier()
	}
	async function check_out_order(paymentmode = 0) {
		//0-cash , 1-cc
		let prods = (
			await (
				await fetch(backend_site + "/api/products", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data

		let user1 = null
		read_user((user) => {
			user1 = user
		})

		let sum_amount = 0
		for (let order of orders) {
			sum_amount += order.qty * order.price
		}

		let new_order = (
			await (
				await fetch(backend_site + "/api/orders", {
					method: "POST",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						cashier_id: user1.id,
						customer_id: customer.id,
						status: paymentmode,
						paid_amount: sum_amount,
						shiftend: 0,
					}),
				})
			).json()
		).data

		for (let order of orders) {
			await fetch(backend_site + "/api/order_details/" + order.id, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					//cashier_id: user1.id,
					order_id: new_order.id,
					//product_id: order.product_id,
					//qty: order.qty,
					//price: order.price,
				}),
			})

			// search for the previous sold quantity
			let prev_sold_qty = 0
			for (let prod of prods) {
				if (prod.id === order.product_id) {
					prev_sold_qty = prod.sold_qty
					break
				}
			}

			await fetch(backend_site + "/api/products/" + order.product_id, {
				method: "PUT",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					sold_qty: prev_sold_qty + order.qty,
				}),
			})
		}

		window.localStorage.setItem("my-app-customer", JSON.parse(null)) // remove customer
		getOrders()
		get_customer_on_cashier()
		checkout_close_btn.current.click()
	}
	useEffect(() => {
		getOrders()
		get_customer_on_cashier()
	}, [])

	useEffect(() => {
		if (customer)
			msg_submit(
				() => {},
				async (msg) => {
					if (msg.msg === "success") {
						checkout_btn.current.click()
						await check_out_order(1)
					} else {
						set_msg1(msg.msg)
						showmodal.current.click()
					}
				}
			)
		//on page load
	}, [customer])
	async function get_searched_prod_by_id() {
		let user = null
		read_user((user1) => (user = user1))
		let prods = (
			await (
				await fetch(backend_site + "/api/products", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data

		let found_prods = prods.filter(
			(x) => x.id == prod_id && x.seller_id === user.id
		)
		console.log("found_prods")
		console.log(found_prods)
		if (found_prods.length > 0) {
			set_prod_desc(found_prods[0].description)
			set_prod_price(found_prods[0].price)
			set_prod_unit(found_prods[0].unit)
		} else {
			set_prod_desc("------------")
			set_prod_price("------------")
			set_prod_unit("------------")
		}
	}
	useEffect(() => {
		// on change of prod_id
		get_searched_prod_by_id()
	}, [prod_id])
	return (
		<>
			{" "}
			<br />
			<div style={{ position: "relative" }}>
				<div className="container mb-3 mt-5">
					<br />

					<div className="row">
						<div className="col-lg-9">
							<div className="row">
								<div className="col-md-3">
									<h4
										style={{
											float: "left",
											color: "beige",
										}}>
										<b>
											<span className="text-wrap">
												<i className="bi bi-x-diamond" />
												&nbsp; Order Transaction
											</span>{" "}
										</b>
									</h4>
								</div>
								<div className="col-md-2">
									<button
										className="btn btn-outline-success float-start d-none"
										onClick={() => {
											window.location =
												"/seller_order_summary"
										}}>
										<i className="bi bi-card-list"></i>
										<br /> Summary
									</button>
								</div>
								<div className="col-md-3"></div>
								<div className="col-md-4">
									<div className="d-flex flex-row">
										<div className="ms-auto">
											<button
												onClick={() =>
													(window.location =
														"/seller_order_products")
												}
												className="btn btn-outline-success">
												<i className="bi bi-smartwatch"></i>
												<br />
												myProducts
											</button>
										</div>
										<div className="ms-3">
											<button
												onClick={() =>
													(window.location =
														"/seller_order_customer")
												}
												className="btn btn-outline-success">
												<i className="bi bi-people-fill"></i>
												<br /> Customers
											</button>
										</div>
									</div>
								</div>
							</div>
							<br />
							<div
								className="row p-0 mb-3 mt-1"
								style={{ height: 4, position: "relative" }}>
								<hr />
								<span
									className="badge bg-success rounded-pill"
									style={{
										border: "2px solid white",
										position: "absolute",
										top: -10,
										left: 15,
										width: 100,
									}}>
									Select
								</span>
							</div>
							<div className="row g-2">
								<div className="col-lg-1">
									<div className="form-floating col-lg-12 text-black">
										<input
											ref={focus_prod_id}
											onChange={(e) => {
												set_prod_id(e.target.value)
											}}
											onKeyUp={(e) => {
												if (e.keyCode === 13) {
													focus_qty.current.focus()
													focus_qty.current.value = ""
													set_prod_qty(1)
												}
											}}
											type="text"
											className="form-control"
											id="description"
											name="description"
											placeholder="#"
											required
											autoFocus
										/>
										<label htmlFor="description">ID</label>
									</div>
								</div>
								<div className="col-lg-4">
									<div className="form-floating col-lg-12 text-black">
										<input
											value={prod_desc}
											type="text"
											className="form-control"
											id="description"
											name="description"
											placeholder="#"
											readOnly
										/>
										<label htmlFor="description">
											Description
										</label>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="form-floating col-lg-12 text-black">
										<input
											value={prod_price}
											type="text"
											className="form-control"
											id="description"
											name="description"
											placeholder="#"
											readOnly
										/>
										<label htmlFor="description">
											Price
										</label>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="form-floating col-lg-12 text-black">
										<input
											onChange={(e) =>
												set_prod_qty(e.target.value)
											}
											ref={focus_qty}
											onKeyUp={(e) => {
												if (e.keyCode === 13) {
													focus_enter.current.focus()
													focus_enter.current.click()
												}
											}}
											type="number"
											className="form-control"
											id="description"
											name="description"
											placeholder="#"
											required
										/>
										<label htmlFor="description">Qty</label>
									</div>
								</div>
								<div className="col-lg-1">
									<div className="form-floating col-lg-12 text-black">
										<input
											//defaultValue={`item.description`}
											value={prod_unit}
											type="text"
											className="form-control"
											id="description"
											name="description"
											placeholder="#"
											readOnly
										/>
										<label htmlFor="description">
											Unit
										</label>
									</div>
								</div>
								<div className="col-lg-2">
									<div className="form-floating col-lg-12 text-black h-100">
										<button
											className="btn btn-outline-primary w-100 h-100"
											ref={focus_enter}
											onClick={() => {
												focus_prod_id.current.focus()
												focus_prod_id.current.value = ""
												saveModProduct2()
											}}
											/*
											onKeyUp={(e) => {
												if (e.keyCode === 13) {
													focus_prod_id.current.focus()
													focus_prod_id.current.value =
														""
													saveModProduct2()
												}
											}}
                                            */
										>
											<i className="bi bi-cart3"></i>
											<br />
											Add
										</button>
									</div>
								</div>
							</div>
							<br />
							<hr />
							<div
								className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
								style={{ position: "relative" }}>
								<span
									className="badge bg-primary rounded-pill"
									style={{
										border: "2px solid white",
										position: "absolute",
										top: -28,
										left: 12,
										width: 100,
									}}>
									Lists
								</span>
								{orders.length > 0 ? (
									<>
										{" "}
										{orders.map((item, i) => (
											<>
												<div
													key={item.id}
													className="card-container p-2 text-black">
													<div
														className="card"
														style={{
															width: "100%",
															height: 250,
															overflow: "hidden",
														}}>
														<div
															className="w-100"
															style={{
																height: 150,
																overflow:
																	"hidden",
															}}>
															<img
																src={`${item.product.img[0]}`}
																className="card-img-top"
																alt="..."
															/>
														</div>

														<div className="card-body">
															<h6 className="card-title">
																<b>
																	{
																		item
																			.product
																			.description
																	}
																</b>
															</h6>
															<h6
																className="card-subtitle mb-2 text-muted "
																style={{
																	fontSize: 10,
																}}>
																{item.qty}{" "}
																{
																	item.product
																		.unit
																}{" "}
																x PhP{" "}
																{item.price} ={" "}
																<b>
																	PhP{" "}
																	{(
																		item.qty *
																		item.price
																	).toLocaleString(
																		"php"
																	)}
																</b>
															</h6>
															<div className="row g-2">
																<div className="col-6">
																	<button
																		onClick={() =>
																			delete_order_item(
																				item.id
																			)
																		}
																		className="btn btn-outline-danger w-100">
																		<span
																			style={{
																				fontSize: 12,
																			}}>
																			Cancel
																		</span>
																	</button>
																</div>
																<div className="col-6">
																	<button
																		onClick={() =>
																			openProductForModification(
																				item
																			)
																		}
																		data-bs-toggle="modal"
																		data-bs-target={`#exampleModal-mod-item-${item.id}`}
																		//data-bs-target={`#staticBackdrop2sss`}
																		className="btn
																btn-outline-warning
																w-100">
																		<span
																			style={{
																				fontSize: 12,
																			}}>
																			Change
																		</span>
																	</button>
																</div>
															</div>
														</div>
													</div>
												</div>
												{/* Modify an Order to a Products Modal */}
												<div
													className="modal fade text-black"
													id={`exampleModal-mod-item-${item.id}`}
													tabIndex={-1}
													aria-labelledby="exampleModalLabel-add-item"
													aria-hidden="true">
													<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
														<div className="modal-content">
															<div className="modal-header bg-warning text-white">
																<h1
																	className="modal-title fs-5"
																	id="exampleModalLabel-add-item">
																	<i className="bi bi-postcard" />{" "}
																	| Modify
																	this Order
																</h1>
																<button
																	type="button"
																	className="btn-close"
																	data-bs-dismiss="modal"
																	aria-label="Close"
																/>
															</div>
															<div className="modal-body">
																<div className="container-fluid">
																	<div className="row g-2">
																		<div className="col-md-8">
																			<h4>
																				<b>
																					{
																						item
																							.product
																							.description
																					}
																				</b>
																			</h4>
																			<hr />
																			<h6>
																				{
																					item
																						.product
																						.specs
																				}
																			</h6>

																			<h4>
																				<b>
																					PhP{" "}
																					{
																						item.price
																					}{" "}
																					<h6>
																						(
																						Available:{" "}
																						<span className="badge bg-danger rounded-circle">
																							{item
																								.product
																								.onhand_qty -
																								item
																									.product
																									.sold_qty}
																						</span>{" "}
																						{
																							item
																								.product
																								.unit
																						}

																						)
																					</h6>
																				</b>
																			</h4>

																			<div className="row g-3">
																				<div className="col-sm-6">
																					<div className="form-floating">
																						<input
																							defaultValue={
																								item.qty
																							}
																							onChange={(
																								e
																							) =>
																								set_product_qty(
																									e
																										.target
																										.value
																								)
																							}
																							type="number"
																							className="form-control"
																							id="qty"
																							name="qty"
																							placeholder="#"
																							required
																						/>
																						<label htmlFor="qty">
																							Quantity
																							to
																							Order
																							in{" "}
																							{
																								item
																									.product
																									.unit
																							}
																						</label>
																					</div>
																				</div>
																				<div className="col-sm-6 d-flex">
																					<button
																						data-bs-dismiss="modal"
																						className={`btn btn-outline-warning my-auto ${save_btn_hide}`}
																						onClick={
																							() =>
																								saveModProduct(
																									item.id
																								)
																							//let a = 1
																						}>
																						&nbsp;&nbsp;
																						<i className="bi bi-cart3" />
																						&nbsp;
																						Save
																						Changes
																						&nbsp;&nbsp;
																					</button>
																				</div>
																			</div>
																		</div>
																		<div
																			className="col-md-4 border border-start-2 border-end-0 border-top-0 border-bottom-0"
																			id="product-image-div">
																			<div id="list of pictures">
																				{item
																					.product
																					.img
																					.length <
																				1 ? (
																					<div>
																						<div className="mx-auto w-100">
																							<img
																								width="100%"
																								className="img-thumbnail"
																								src="/assets/view/img/user.jpg"
																								alt="please select a category"
																								srcSet=""
																								id="product-image"
																							/>
																						</div>
																						<div
																							className="mx-auto  mb-3"
																							style={{
																								width: 15,
																							}}></div>
																					</div>
																				) : (
																					<>

																					</>
																				)}

																				{item.product.img.map(
																					(
																						picture,
																						i
																					) => (
																						<div
																							key={
																								100 *
																								i
																							}>
																							<div className="mx-auto w-100">
																								<img
																									width="100%"
																									className="img-thumbnail"
																									src={`${picture}`}
																									alt="please select a product"
																									srcSet=""
																								/>
																							</div>
																							<div
																								className="mx-auto  mb-3"
																								style={{
																									width: 15,
																								}}></div>
																						</div>
																					)
																				)}
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div className="modal-footer">
																<button
																	type="button"
																	className="btn btn-secondary"
																	data-bs-dismiss="modal">
																	Close
																</button>
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
										<h3>
											Please select a product to order
										</h3>
										<br />
										<br />
										<br />
										<br />
										<br />
									</>
								)}
							</div>
							<hr />
						</div>
						<div className="col-lg-3">
							{customer ? (
								<>
									<div
										id="customer-card"
										className="card"
										style={{
											width: "100%",
											position: "relative",
											border: "2px solid white",
										}}>
										<span
											className="badge bg-warning rounded-pill"
											style={{
												border: "2px solid white",
												position: "absolute",
												top: -12,
												left: 5,
											}}>
											Customer
										</span>
										<div
											style={{
												width: "100%",
												height: 150,
												overflow: "hidden",
											}}>
											{" "}
											<img
												src={`${customer.main_img}`}
												className="card-img-top"
												alt="..."
											/>
										</div>
										<div className="card-body text-secondary">
											<h5 className="card-title text-capitalize">
												{customer.firstname}{" "}
												{customer.lastname} ( #
												{customer.id})
											</h5>
											<h6 className="card-subtitle mb-2 text-muted ">
												{customer.id_num}
											</h6>
											<h6 className="card-subtitle mb-2 text-muted ">
												{customer.email}
											</h6>
										</div>
									</div>
								</>
							) : (
								<>
									<button
										className="btn btn-outline-warning"
										onClick={() =>
											(window.location =
												"/seller_order_customer")
										}>
										<h3>Please Assign a Customer</h3>
									</button>
								</>
							)}

							<div
								id="grand-total-card"
								className="card mt-3"
								style={{ width: "100%" }}>
								<div className="card-body text-secondary">
									<h5 className="card-title">
										<b>Order Total</b>
									</h5>
									<hr />
									<div id="Sub-Total" className="row">
										<div className="col-4">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 12,
													float: "left",
												}}>
												Sub Total
											</span>
										</div>
										<div className="col-3">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 12,
													float: "right",
												}}>
												PhP
											</span>
										</div>
										<div className="col-5 text-black">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 12,
													float: "right",
												}}>
												{sub_total.toLocaleString(
													undefined,
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													}
												)}
											</span>
										</div>
									</div>
									<div id="Taxes" className="row">
										<div className="col-4">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 12,
													float: "left",
												}}>
												Taxes
											</span>
										</div>
										<div className="col-3">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 12,
													float: "right",
												}}>
												PhP
											</span>
										</div>
										<div className="col-5 text-black">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 12,
													float: "right",
												}}>
												{total_taxes.toLocaleString(
													undefined,
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													}
												)}
											</span>
										</div>
									</div>
									<hr />
									<div id="Grand-Total" className="row">
										<div className="col-4">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 13,
													float: "left",
												}}>
												<b>Grand Total</b>
											</span>
										</div>
										<div className="col-3">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 13,
													float: "right",
												}}>
												<b>PhP</b>
											</span>
										</div>
										<div className="col-5 text-black">
											<span
												className="card-subtitle mb-2 text-muted "
												style={{
													fontSize: 13,
													float: "right",
												}}>
												<b>
													{" "}
													{grand_total.toLocaleString(
														undefined,
														{
															minimumFractionDigits: 2,
															maximumFractionDigits: 2,
														}
													)}
												</b>
											</span>
										</div>
									</div>
									<div id="CTA" className="row g-2">
										<div className="col-5">
											<button
												type="button"
												data-bs-toggle="modal"
												data-bs-target="#cancel-modal"
												className="btn btn-outline-danger w-100 h-100">
												Cancel
											</button>
											{/* Cancel Modal */}
											<div
												className="modal fade"
												id="cancel-modal"
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
																Cancel
																Transaction?
															</h5>
															<button
																type="button"
																className="btn-close"
																data-bs-dismiss="modal"
																aria-label="Close"
															/>
														</div>
														<div className="modal-body">
															<h5>
																Are you sure you
																want to CANCEL
																this
																transaction?
															</h5>
														</div>
														<div className="modal-footer">
															<button
																onClick={() =>
																	cancel_order_transaction()
																}
																className="btn btn-outline-danger "
																data-bs-dismiss="modal">
																YES
															</button>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div className="col-7">
											<button
												ref={checkout_btn}
												data-bs-toggle="modal"
												data-bs-target="#checkout-modal"
												className="btn btn-outline-primary w-100 h-100">
												Checkout
											</button>
											{/* Checkout Modal */}
											<div
												className="modal fade"
												id="checkout-modal"
												data-bs-backdrop="static"
												data-bs-keyboard="false"
												tabIndex={-1}
												aria-labelledby="staticBackdropLabel"
												aria-hidden="true">
												<div className="modal-dialog modal-sm modal-dialog-centered  modal-dialog-scrollable">
													<div className="modal-content">
														<div className="modal-header bg-primary">
															<h5
																className="modal-title text-white"
																id="staticBackdropLabel">
																Checkout
															</h5>
															<button
																ref={
																	checkout_close_btn
																}
																onClick={() =>
																	set_checkout_started(
																		false
																	)
																}
																type="button"
																className="btn-close"
																data-bs-dismiss="modal"
																aria-label="Close"
															/>
														</div>
														<div className="modal-body">
															{(orders &&
																orders.length >
																	0 &&
																customer) ||
															checkout_started ? (
																<>
																	<h5>
																		Amount
																		Due: PhP{" "}
																		<input
																			value={grand_total.toLocaleString(
																				undefined,
																				{
																					minimumFractionDigits: 2,
																					maximumFractionDigits: 2,
																				}
																			)}
																			type="text"
																			className="form-control fs-3 fw-bolder bg-primary text-white"></input>
																	</h5>
																	<br />
																	<h5>
																		Amount
																		Received:
																		PhP
																		<input
																			autoFocus
																			onKeyUp={(
																				e
																			) =>
																				set_amount_receive(
																					e
																						.target
																						.value
																				)
																			}
																			type="number"
																			className="form-control fs-3 fw-bolder bg-success text-white"
																		/>
																	</h5>
																	{-grand_total +
																		parseFloat(
																			amount_receive
																		) >
																	0 ? (
																		<>
																			<br />
																			<h4>
																				Change:{" "}
																				<b className="badge bg-warning fs-3 w-100">
																					PhP{" "}
																					{(
																						-grand_total +
																						parseFloat(
																							amount_receive
																						)
																					).toLocaleString(
																						undefined,
																						{
																							minimumFractionDigits: 2,
																							maximumFractionDigits: 2,
																						}
																					)}
																				</b>
																			</h4>
																		</>
																	) : (
																		<></>
																	)}
																</>
															) : (
																<>
																	<h2 className="text-danger">
																		<b>
																			Checkout
																			Error:
																		</b>
																		There
																		are no
																		ordered
																		products
																		or no
																		assigned
																		customer
																		in the
																		order.
																	</h2>
																</>
															)}
														</div>
														<div className="modal-footer">
															{orders &&
															orders.length > 0 &&
															customer ? (
																<>
																	{" "}
																	<button
																		onClick={() => {
																			set_checkout_started(
																				true
																			)
																			check_out_order()
																		}}
																		className="btn btn-outline-danger w-100">
																		{checkout_started ? (
																			<>
																				<div
																					className="spinner-border"
																					role="status">
																					<span className="visually-hidden">
																						Loading...
																					</span>
																				</div>{" "}
																			</>
																		) : (
																			<>

																			</>
																		)}
																		Pay In
																		Cash
																	</button>
																	{stripe_id !==
																		"" &&
																	stripe_id !==
																		null &&
																	stripe_prod_id !==
																		"" &&
																	stripe_prod_id !==
																		null ? (
																		<>
																			<button
																				onClick={() => {
																					set_checkout_started_cc(
																						true
																					)
																					//check_out_order()
																					redirectToCheckout(
																						grand_total
																					)
																				}}
																				className="btn btn-outline-danger w-100 mt-2">
																				{checkout_started_cc ? (
																					<>
																						<div
																							className="spinner-border"
																							role="status">
																							<span className="visually-hidden">
																								Loading...
																							</span>
																						</div>{" "}
																					</>
																				) : (
																					<>

																					</>
																				)}
																				Pay
																				By
																				Credit
																				Card
																			</button>
																		</>
																	) : (
																		<></>
																	)}
																</>
															) : (
																<></>
															)}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Payment Error Modal */}
			<button
				data-bs-toggle="modal"
				data-bs-target={`#exampleModal-showmodal`}
				ref={showmodal}
				type="button"
				className="d-none"></button>
			<div
				className="modal fade text-black"
				id={`exampleModal-showmodal`}
				tabIndex={-1}
				aria-labelledby="exampleModalLabel-add-item"
				aria-hidden="true">
				<div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
					<div className="modal-content">
						<div className="modal-header bg-danger text-white">
							<h1
								className="modal-title fs-5"
								id="exampleModalLabel-add-item">
								<i className="bi bi-person-fill-slash" /> |
								Payment Error
							</h1>
							<button
								onClick={() =>
									(window.location = "/seller_orders")
								}
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">{msg1}</div>
						<div className="modal-footer">
							<button
								onClick={() =>
									(window.location = "/seller_orders")
								}
								type="button"
								className="btn btn-secondary"
								data-bs-dismiss="modal">
								Close
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SellerOrders
