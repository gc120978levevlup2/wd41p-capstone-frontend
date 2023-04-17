import React, { useEffect, useState } from "react"
import { read_user } from "../../../model/local/login_user"
import { backend_site } from "../../../controller/misc/misc"

const SellerPurchaseOrders = () => {
	const [total_order_details, set_total_order_details] = useState([])
	const [total_shift_order_amount, set_total_shift_order_amount] = useState(0)
	const [xtime, set_xtime] = useState("")
	const [orders, set_orders] = useState([])
	const [state1, set_state1] = useState(false)
	const [cashier, set_cashier] = useState({
		img: "",
		firstname: "",
		lastname: "",
	})
	setInterval(() => {
		set_xtime(
			new Date(Date.now()).toLocaleString("en-US", {
				timeZone: "Asia/Manila",
			})
		)
	}, 1000)
	function setCashierOrderAmount(orders) {
		let amount = 0
		for (let xorder of orders) {
			if (xorder.shiftend === 1) break // 1 false 0 true
			amount += xorder.paid_amount
		}
		set_total_shift_order_amount(amount)
	}
	function contract_view_for_orders(order) {
		order.order_details = null
		set_state1(!state1)
	}
	async function expand_view_for_orders(order) {
		console.log("expand_view_for_orders(order)")
		let products = (
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
		let product_pictures = (
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
		let xorder_details = (
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
		let this_order_details = xorder_details.filter(
			(x) => x.order_id === order.id
		)
		order.order_details = this_order_details
		for (let detail of order.order_details) {
			for (let product of products) {
				if (detail.product_id === product.id) {
					console.log("ok ang product")
					detail.product = product
					break
				}
			}
			for (let picture of product_pictures) {
				if (detail.product_id === picture.product_id) {
					console.log("ok ang product picture")
					detail.product.img = picture.img
					break
				}
			}
		}
		set_state1(!state1)
	}
	async function expand_view_for_orders_summary() {
		console.log("expand_view_for_orders_summary(order) ")
		let products = (
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
		let product_pictures = (
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
		let xorder_details = (
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

		let order_details_temp = []
		let order_details = []
		for (let order of orders) {
			for (let detail of xorder_details) {
				if (detail.order_id === order.id) {
					order_details_temp.push(detail)
				}
			}
		}

		// find all sold products for the shift
		while (order_details_temp.length > 0) {
			let pivot_prod = order_details_temp.pop()
			for (let product of products) {
				if (product.id === pivot_prod.product_id) {
					pivot_prod.product = product
					for (let picture of product_pictures) {
						if (picture.product_id === product.id) {
							pivot_prod.product.img = picture.img
						}
					}
				}
			}
			order_details.push(pivot_prod)
			for (let i = 0; i < order_details_temp.length; i++) {
				if (
					pivot_prod.product_id === order_details_temp[i].product_id
				) {
					let id = order_details_temp[i].id
					pivot_prod.qty += order_details_temp[i].qty
					order_details_temp = order_details_temp.filter(
						(p) => p.id !== id
					)
					i--
				}
			}
		}
		set_total_order_details(order_details)
		console.log(order_details)
	}

	async function on_page_load() {
		let user = null
		read_user((user1) => {
			user = user1
			set_cashier(user)
		})
		let xorders = (
			await (
				await fetch(backend_site + "/api/orders", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data
		let participants = (
			await (
				await fetch(backend_site + "/api/participants", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data
		let participant_pictures = (
			await (
				await fetch(backend_site + "/api/participant_pictures", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
			).json()
		).data
		let customers = participants // assume customers variable as sellers
		let order_by_cashier = xorders.filter((x) => x.customer_id === user.id) // assume cashier is the purchaser/customer
		// incorporate customers to order_by_cashier

		for (let order of order_by_cashier) {
			for (let customer of customers) {
				console.log("found")
				if (order.cashier_id === customer.id) {
					// see the seller identity
					console.log("found")
					order.customer = customer
					break
				}
			}
			if (order.customer) {
				for (let picture of participant_pictures) {
					if (order.cashier_id === picture.participant_id) {
						// get also the picture of the seller
						console.log("found")
						order.customer.img = picture.img
					}
				}
			}
		}

		// find latest transaction before shift ends
		let order_by_shiftend = []
		for (let xxorder of order_by_cashier) {
			// order by customer
			if (xxorder.shiftend === 1) break
			order_by_shiftend.push(xxorder)
		}

		console.log(order_by_shiftend)
		console.log(order_by_cashier)
		set_orders(order_by_shiftend)
		setCashierOrderAmount(order_by_shiftend)
	}
	useEffect(() => {
		// on load
		read_user((user1) => {
			set_cashier(user1)
			console.log(user1)
		})
		on_page_load()
	}, [])

	return (
		<>
			<div
				className="container-fluid d-flex w-100 p-0"
				style={{
					position: "relative",
					overflow: "hidden",
					minHeight: "calc(100vh + 60px)",
				}}>
				<div className="w-100">
					<div
						className="container mt-5"
						style={{ overflow: "hidden", width: "100%" }}>
						<br />
						<br />
						<div className="row g-2 w-100 border-start border-primary border-5 px-5">
							<div className="col-lg-12">
								<h2 className="float-start">
									<i className="bi bi-clipboard2-data"></i>{" "}
									Purchases Summary Timeline
								</h2>
								<button
									onClick={() =>
										(window.location = "/seller_dashboard")
									}
									className="btn btn-outline-success float-end">
									<i className="bi bi-smartwatch"></i> Back to
									Orders Summary
								</button>
							</div>
							<br></br>
							<hr />
							{(typeof cashier != "undefined") !== undefined ? (
								<>
									{" "}
									<div
										className="border border-white border-2 rounded-3 mx-5 mb-3 p-3 ps-5 bg-success shadow"
										style={{ position: "relative" }}>
										<div
											style={{
												left: -25,
												position: "absolute",
												width: 0,
												height: 0,
												borderTop:
													"15px solid transparent",
												borderRight: "25px solid #fff",
												borderBottom:
													"15px solid transparent",
											}}></div>
										<div
											style={{
												left: -21,
												position: "absolute",
												width: 0,
												height: 0,
												borderTop:
													"15px solid transparent",
												borderRight:
													"25px solid #198754",
												borderBottom:
													"15px solid transparent",
											}}></div>
										<div
											className="border-white"
											style={{
												top: 25,
												left: -108,
												position: "absolute",
												width: 30,
												height: 0,
												borderTop: "3px solid",
											}}></div>
										<div
											className="border-white"
											style={{
												top: 5,
												left: -78,
												position: "absolute",
												width: 50,
												height: 50,
												border: "3px solid",
												borderRadius: "100%",
												overflow: "hidden",
											}}>
											<img
												width={"100%"}
												height={"100%"}
												alt={"xxx"}
												src={`${cashier.img}`}></img>
										</div>
										<div
											className="border-white"
											style={{
												backgroundColor: "green",
												top: 19,
												left: -108,
												position: "absolute",
												width: 8,
												height: 8,
												border: "8px solid",
												borderRadius: "100%",
												overflow: "hidden",
											}}></div>
										<div
											className="border-warning"
											style={{
												top: 23,
												left: -104,
												position: "absolute",
												width: 4,
												height: 4,
												border: "4px solid",
												borderRadius: "100%",
												overflow: "hidden",
											}}></div>
										<div className="row">
											<div className="col-lg-3 border-start">
												<span style={{ fontSize: 11 }}>
													{xtime}
												</span>

												<br />
												<h6 className="text-capitalize mt-1">
													<b>
														{" "}
														{cashier.lastname},{" "}
														{cashier.firstname}
													</b>
												</h6>
												<h6> {cashier.id_num}</h6>
											</div>

											<div className="col-lg-2 border-start">
												<span style={{ fontSize: 10 }}>
													Total Purchases Amount
												</span>
												<h5 className="text-capitalize">
													PhP&nbsp;
													<b>
														{total_shift_order_amount.toLocaleString()}
													</b>
												</h5>
												<span style={{ fontSize: 12 }}>
													{"order.status" === 0 ? (
														<>Paid In Cash</>
													) : (
														<>
															{"order.status" ===
															1 ? (
																<>
																	{" "}
																	Paid By
																	Credit Card
																</>
															) : (
																<>
																	{"order.status" ===
																	1 ? (
																		<>
																			Paid
																			by
																			other
																			means
																		</>
																	) : (
																		<></>
																	)}
																</>
															)}
														</>
													)}
												</span>
											</div>
											<div className="col-lg-7 border-start">
												<button
													className="btn btn-primary"
													onClick={() =>
														expand_view_for_orders_summary()
													}>
													<i className="bi bi-chevron-bar-expand"></i>
												</button>{" "}
												&nbsp;&nbsp;
												<button
													className="btn btn-primary"
													onClick={() =>
														set_total_order_details(
															[]
														)
													}>
													<i className="bi bi-chevron-bar-contract"></i>
												</button>
												<br />
												<br />
												<div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3">
													{total_order_details ? (
														<>
															{total_order_details.map(
																(item) => (
																	<>
																		<div
																			key={
																				item.id
																			}
																			className="card-container p-2 text-black">
																			<div
																				className="card"
																				style={{
																					width: "100%",
																					height: 250,
																					overflow:
																						"hidden",
																				}}>
																				<div
																					className="w-100"
																					style={{
																						height: 150,
																						overflow:
																							"hidden",
																					}}>
																					<img
																						src={`${item.product.img}`}
																						className="card-img-top"
																						alt="..."
																					/>
																				</div>

																				<div className="card-body">
																					<a
																						href={`/seller_product_search?search=${item.product.description}`}>
																						<h6 className="card-title">
																							<b>
																								{
																									item
																										.product
																										.description
																								}
																							</b>
																						</h6>
																					</a>
																					<h6
																						className="card-subtitle mb-2 text-muted "
																						style={{
																							fontSize: 10,
																						}}>
																						{
																							item.qty
																						}{" "}
																						{
																							item
																								.product
																								.unit
																						}{" "}
																						x
																						PhP{" "}
																						{
																							item.price
																						}{" "}
																						={" "}
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
																				</div>
																			</div>
																		</div>
																	</>
																)
															)}
														</>
													) : (
														<></>
													)}
												</div>
											</div>
										</div>
									</div>
								</>
							) : (
								<></>
							)}

							{orders.map((order, i) => (
								<>
									<div
										className={`border border-secondary border-2 rounded-3 mx-5 mb-3 p-3 ps-5 shadow ${
											i % 2 ? "darker-bg" : "dark-bg"
										}`}
										style={{ position: "relative" }}>
										<div
											style={{
												left: -25,
												position: "absolute",
												width: 0,
												height: 0,
												borderTop:
													"15px solid transparent",
												borderRight: "25px solid #777",
												borderBottom:
													"15px solid transparent",
											}}></div>

										<div
											style={{
												left: -21,
												position: "absolute",
												width: 0,
												height: 0,
												borderTop:
													"15px solid transparent",
												borderRight: `25px solid ${
													i % 2 ? "#000" : "#222"
												}`,
												borderBottom:
													"15px solid transparent",
											}}></div>

										<div
											className="border-primary"
											style={{
												top: 25,
												left: -108,
												position: "absolute",
												width: 30,
												height: 0,
												borderTop: "3px solid",
											}}></div>
										<div
											className="border-primary"
											style={{
												top: 5,
												left: -78,
												position: "absolute",
												width: 50,
												height: 50,
												border: "3px solid",
												borderRadius: "100%",
												overflow: "hidden",
											}}>
											<img
												width={"100%"}
												height={"100%"}
												alt={"xxx"}
												src={`${order.customer.img}`}></img>
										</div>
										<div
											className="border-primary"
											style={{
												backgroundColor: "green",
												top: 19,
												left: -108,
												position: "absolute",
												width: 8,
												height: 8,
												border: "8px solid",
												borderRadius: "100%",
												overflow: "hidden",
											}}></div>
										<div
											className="border-warning"
											style={{
												top: 23,
												left: -104,
												position: "absolute",
												width: 4,
												height: 4,
												border: "4px solid",
												borderRadius: "100%",
												overflow: "hidden",
											}}></div>
										<div className="row">
											<div className="col-lg-3 border-start">
												<span style={{ fontSize: 11 }}>
													{new Date(
														order.created_at.toString()
													).toLocaleString("en-US", {
														timeZone: "Asia/Manila",
													})}
												</span>
												<br />
												<span className="badge bg-primary border border-warning shadow  mt-2">
													Seller in-Charge
												</span>
												<br />
												<br />
												<h6 className="text-capitalize">
													<b>
														{
															order.customer
																.lastname
														}
														,{" "}
														{
															order.customer
																.firstname
														}
													</b>
												</h6>
												<h6>{order.customer.id_num}</h6>
											</div>
											<div className="col-lg-2 border-start">
												<span style={{ fontSize: 10 }}>
													Amount of Purchase
												</span>
												<h6 className="text-capitalize">
													PhP&nbsp;
													<b>
														{order.paid_amount.toLocaleString()}
													</b>
												</h6>
												<span style={{ fontSize: 12 }}>
													{order.status === 0 ? (
														<>Paid In Cash</>
													) : (
														<>
															{order.status ===
															1 ? (
																<>
																	{" "}
																	Paid By
																	Credit Card
																</>
															) : (
																<>
																	{order.status ===
																	1 ? (
																		<>
																			Paid
																			by
																			other
																			means
																		</>
																	) : (
																		<></>
																	)}
																</>
															)}
														</>
													)}
												</span>
											</div>
											<div className="col-lg-7 border-start">
												<button
													className="btn btn-outline-primary"
													onClick={() =>
														expand_view_for_orders(
															order
														)
													}>
													<i className="bi bi-chevron-bar-expand"></i>
												</button>{" "}
												&nbsp;&nbsp;
												<button
													className="btn btn-outline-primary"
													onClick={() =>
														contract_view_for_orders(
															order
														)
													}>
													<i className="bi bi-chevron-bar-contract"></i>
												</button>
												<br />
												<br />
												<div className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3">
													{order.order_details ? (
														<>
															{order.order_details.map(
																(item) => (
																	<>
																		<div
																			key={
																				item.id
																			}
																			className="card-container p-2 text-black">
																			<div
																				className="card"
																				style={{
																					width: "100%",
																					height: 250,
																					overflow:
																						"hidden",
																				}}>
																				<div
																					className="w-100"
																					style={{
																						height: 150,
																						overflow:
																							"hidden",
																					}}>
																					<img
																						src={`${item.product.img}`}
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
																						{
																							item.qty
																						}{" "}
																						{
																							item
																								.product
																								.unit
																						}{" "}
																						x
																						PhP{" "}
																						{
																							item.price
																						}{" "}
																						={" "}
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
																				</div>
																			</div>
																		</div>
																	</>
																)
															)}
														</>
													) : (
														<></>
													)}
												</div>
											</div>
										</div>
									</div>
								</>
							))}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SellerPurchaseOrders
