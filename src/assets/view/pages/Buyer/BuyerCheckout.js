import React, { useEffect, useState } from "react"
import {
	create_cart_items_local,
	read_cart_items_local,
} from "../../../model/local/cart_items"
import { read_user } from "../../../model/local/login_user"
import { update_item } from "../../../model/remote/items"
import { update_cart_item } from "../../../model/remote/shopping_cart"
import CartItemsView from "../../components/CartItemsView"

const BuyerCheckout = () => {
	const [cart_items, set_cart_items] = useState([])
	const [user, set_user] = useState({
		name: "",
		contact: "",
		email1: "",
		address: "",
	})
	const [voucher_code, set_voucher_code] = useState("")
	const [sub_total, set_sub_total] = useState("")
	const [shipping_cost, set_shipping_cost] = useState("")
	const [shipping_cost_discount, set_shipping_cost_discount] = useState("")
	const [voucher_discount, set_voucher_discount] = useState("")
	const [cause_fund, set_cause_fund] = useState("")
	const [grand_total, set_grand_total] = useState("")
	function onPlaceOrderCheckout(e) {
		read_cart_items_local((items) => {
			let cart_items = [...items.filter((x) => x.status === "cart")]
			let remaining_items = [...items.filter((x) => x.status !== "cart")]
			let vd = -0.1 // voucher discount
			if (voucher_code.value === "") vd = 0.0
			let cart_list = cart_items
			for (let item of cart_list) {
				item.order_date = new Date(Date.now()).toString()
				let payment_method = ""
				if (document.getElementById("payByCOD").checked)
					payment_method = "Cash On Delivery"
				if (document.getElementById("payByCC").checked)
					payment_method = "Pay Using Credit Card"
				item.payment_method = payment_method
				let sub_total = item.items.unit_price
				let shipping_cost = Math.round(0.012 * sub_total)
				let shipping_cost_discount = Math.round(-0.3 * shipping_cost)
				let voucher_discount = Math.round(vd * sub_total)
				let cause_fund = Math.round(0.02 * sub_total)
				let grand_total =
					sub_total +
					shipping_cost +
					shipping_cost_discount +
					voucher_discount +
					cause_fund
				item.price = grand_total
				item.status = "order"
				let t_item = JSON.parse(JSON.stringify(item))
				remaining_items.push(t_item)
				console.log("t_item1")
				console.log(t_item)
				let x_update_item = item.items
				x_update_item.sold++
				delete x_update_item.sellers
				console.log("t_item2")
				console.log(t_item)
				console.log(x_update_item)
				update_item(x_update_item, (x_items) => {
					delete item.items // inorder to safely save data to supabase
					// upcoming_deliveries.push(item); // p code
					update_cart_item(item, (items) => {
						console.log("deliveries")
						console.log(items[0])
					})
				})
			}
			create_cart_items_local(remaining_items)
		})
	}
	function process_checkout(cart_items) {
		let vd = -0.1 // voucher discount
		if (voucher_code === "") vd = 0.0
		let cart_list = cart_items
		let xsub_total = 0
		for (let item of cart_list) {
			xsub_total += item.items.unit_price
		}
		let xshipping_cost = Math.round(0.012 * xsub_total)
		let xshipping_cost_discount = Math.round(-0.3 * xshipping_cost)
		let xvoucher_discount = Math.round(vd * xsub_total)
		let xcause_fund = Math.round(0.02 * xsub_total)
		let xgrand_total =
			xsub_total +
			xshipping_cost +
			xshipping_cost_discount +
			xvoucher_discount +
			xcause_fund

		set_sub_total(
			xsub_total.toLocaleString("en-PH", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		)
		set_shipping_cost(
			xshipping_cost.toLocaleString("en-PH", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		)
		set_shipping_cost_discount(
			xshipping_cost_discount.toLocaleString("en-PH", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		)

		set_voucher_discount(
			xvoucher_discount.toLocaleString("en-PH", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		)
		set_cause_fund(
			xcause_fund.toLocaleString("en-PH", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		)
		set_grand_total(
			xgrand_total.toLocaleString("en-PH", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			})
		)
	}
	useEffect(() => {
		read_cart_items_local((items) => {
			let cart_items = [...items.filter((x) => x.status === "cart")]
			set_cart_items(cart_items)
			process_checkout(cart_items)
		})
		read_user((found_user) => {
			console.log("found_user")
			console.log(found_user)
			set_user(found_user)
		})
	}, [])
	return (
		<>
			<main
				class="text-white"
				style={{
					position: "relative",
					marginTop: "55px",
				}}>
				<br />
				<br />
				<section id="checkout">
					<div className="container">
						<div className="row">
							<div className="col-md-6 col-lg-7 col-xl-8">
								<div className="container">
									<h2 className="mb-3">
										<i>
											<b>Checkout Details</b>
										</i>
									</h2>
									<hr />
									<div
										className="accordion mb-5"
										id="accordionPanelsStayOpenExample">
										<div className="accordion-item">
											<h2
												className="accordion-header"
												id="panelsStayOpen-headingOne">
												<button
													className="accordion-button"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#panelsStayOpen-collapseOne"
													aria-expanded="true"
													aria-controls="panelsStayOpen-collapseOne">
													<i
														className="fa fa-user fa-2x text-danger"
														aria-hidden="true"
													/>
													Your Identity
												</button>
											</h2>
											<div
												id="panelsStayOpen-collapseOne"
												className="accordion-collapse collapse show"
												aria-labelledby="panelsStayOpen-headingOne">
												<div className="accordion-body text-capitalize">
													<strong id="user-name">
														{user.name}
													</strong>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2
												className="accordion-header"
												id="panelsStayOpen-headingTwo">
												<button
													className="accordion-button"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#panelsStayOpen-collapseTwo"
													aria-expanded="true"
													aria-controls="panelsStayOpen-collapseTwo">
													Contact Information
												</button>
											</h2>
											<div
												id="panelsStayOpen-collapseTwo"
												className="accordion-collapse collapse show"
												aria-labelledby="panelsStayOpen-headingTwo">
												<div className="accordion-body">
													<span className="badge rounded-pill bg-success">
														Phone
													</span>
													<strong id="user-contact-info">
														&nbsp;{user.contact}
													</strong>
													<br />
													<span className="badge rounded-pill bg-primary">
														Email&nbsp;
													</span>
													<strong id="user-email-info">
														&nbsp;{user.email1}
													</strong>
												</div>
											</div>
										</div>
										<div className="accordion-item">
											<h2
												className="accordion-header"
												id="panelsStayOpen-headingThree">
												<button
													className="accordion-button text-capitalize"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target="#panelsStayOpen-collapseThree"
													aria-expanded="true"
													aria-controls="panelsStayOpen-collapseThree">
													&nbsp;Shipping Address
												</button>
											</h2>
											<div
												id="panelsStayOpen-collapseThree"
												className="accordion-collapse collapse show"
												aria-labelledby="panelsStayOpen-headingThree">
												<div className="accordion-body">
													<span className="badge rounded-pill bg-warning text-dark">
														Home
													</span>
													<strong id="user-shipping-address">
														&nbsp;{user.address}
													</strong>
												</div>
											</div>
										</div>
									</div>
									<h2 className="mb-3">
										<span className="text-primary position-relative">
											<i
												className="fa fa-shopping-cart fa-lg"
												aria-hidden="true"
											/>
										</span>
										<i>
											<b>Shopping Cart Items</b>
										</i>
									</h2>
									<hr />
									<div
										className="row row-cols-md-1 row-cols-lg-2 row-cols-xl-3"
										id="shopping-cart-list">
										<CartItemsView items={cart_items} />
									</div>
								</div>
							</div>
							<div className="col-md-6 col-lg-5 col-xl-4">
								<div
									className="bd-checkout"
									style={{
										backgroundColor: "beige",
										color: "grey",
									}}>
									<div className="mb-3">
										<h4>Payent Method</h4>
									</div>
									<div className="form-check mb-3">
										<input
											className="form-check-input"
											type="radio"
											name="payment_method"
											id="payByCC"
										/>
										<label
											className="form-check-label"
											htmlFor="payByCC">
											Pay by Credit/Debit Card
										</label>
										<div className="mb-3">
											<label
												htmlFor="cardNumber"
												className="form-label">
												Card Number
											</label>
											<input
												type="text"
												className="form-control"
												id="cardNumber"
												name="cardNumber"
												placeholder="input credit card number"
											/>
										</div>
										<div className="mb-3">
											<label
												htmlFor="cardMonthYear"
												className="form-label">
												Validity Month/Year
											</label>
											<input
												type="text"
												className="form-control"
												id="cardMonthYear"
												name="cardMonthYear"
												placeholder="input month/year"
											/>
										</div>
										<div className="mb-3">
											<label
												htmlFor="cardCVV"
												className="form-label">
												CVV
											</label>
											<input
												type="text"
												className="form-control"
												id="cardCVV"
												name="cardCVV"
												placeholder="input CVV"
											/>
										</div>
									</div>
									<div className="form-check mb-3">
										<input
											className="form-check-input"
											type="radio"
											name="payment_method"
											id="payByCOD"
											defaultChecked
										/>
										<label
											className="form-check-label"
											htmlFor="payByCOD">
											Cash On Delivery
										</label>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlInput1"
											className="form-label">
											Voucher
										</label>
										<input
											onKeyUp={(e) => {
												set_voucher_code(e.target.value)

												process_checkout(cart_items)
											}}
											type="text"
											className="form-control"
											id="voucher-code-input"
											name="voucher-code-input"
											placeholder="Enter Voucher Code"
										/>
									</div>
									<div className="mb-3">
										<label
											htmlFor="exampleFormControlTextarea1"
											className="form-label">
											Additional Instructions
										</label>
										<textarea
											className="form-control"
											id="exampleFormControlTextarea1"
											rows={3}
											defaultValue={""}
										/>
									</div>
									<div className="mb-3">
										<br />
										<h4>Order Summary</h4>
										<div>
											<div className="row mb-3">
												<div className="col-7">
													<label className="form-label">
														Sub Total
													</label>
												</div>
												<div className="col-1">
													<h6>₱</h6>
												</div>
												<div className="col-4">
													<h6
														style={{
															float: "right",
														}}
														id="checkout-sub-total">
														{sub_total}
													</h6>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col-7">
													<label className="form-label">
														Shipping Fee
													</label>
												</div>
												<div className="col-1">
													<h6>₱</h6>
												</div>
												<div className="col-4">
													<h6
														style={{
															float: "right",
														}}
														id="checkout-shipping-fee">
														{shipping_cost}
													</h6>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col-7">
													<label className="form-label">
														Shipping Fee Discount
													</label>
												</div>
												<div className="col-1">
													<h6>₱</h6>
												</div>
												<div className="col-4">
													<h6
														style={{
															float: "right",
														}}
														id="checkout-shipping-fee-discount">
														{shipping_cost_discount}
													</h6>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col-7">
													<label className="form-label">
														Voucher Discount
													</label>
												</div>
												<div className="col-1">
													<h6>₱</h6>
												</div>
												<div className="col-4">
													<h6
														style={{
															float: "right",
														}}
														id="voucher-discount">
														{voucher_discount}
													</h6>
												</div>
											</div>
											<div className="row mb-3">
												<div className="col-7">
													<label className="form-label">
														Cause Fund Allot.
													</label>
												</div>
												<div className="col-1">
													<h6>₱</h6>
												</div>
												<div className="col-4">
													<h6
														style={{
															float: "right",
														}}
														id="cause-fund">
														{cause_fund}
													</h6>
												</div>
											</div>
											<hr />
											<div className="row mb-3">
												<div className="col-6">
													<label className="form-label">
														Grand Total
													</label>
												</div>
												<div className="col-1">
													<h4>₱</h4>
												</div>
												<div className="col-5 text-warning">
													<h4
														style={{
															float: "right",
														}}
														id="checkout-grand-total">
														{grand_total}
													</h4>
												</div>
											</div>
										</div>
										<br />
										<button
											onClick={onPlaceOrderCheckout}
											type="submit"
											className="btn btn-danger"
											style={{ width: "100%" }}
											id="place-order-btn"
											data-bs-toggle="modal"
											data-bs-target="#success-added-order">
											<h5>Place Order</h5>
										</button>
										{/* Modal */}
										<div
											className="modal fade"
											id="success-added-order"
											data-bs-backdrop="static"
											data-bs-keyboard="false"
											tabIndex={-1}
											aria-labelledby="staticBackdropLabel"
											aria-hidden="true">
											<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
												<div className="modal-content">
													<div className="modal-header">
														<h5
															className="modal-title"
															id="staticBackdropLabel">
															Order Status
														</h5>
														<button
															type="button"
															className="btn-close"
															data-bs-dismiss="modal"
															aria-label="Close"
															oonClick={() => {
																window.location =
																	"/buyer_dashboard?slideto=buyer-shipment-list"
															}}
														/>
													</div>
													<div className="modal-body">
														<h2 className="text-success">
															<i
																className="fa fa-check-circle fa-lg"
																aria-hidden="true"
															/>
															Successfully placed
															order!
														</h2>
													</div>
													<div className="modal-footer">
														<button
															type="button"
															className="btn btn-danger"
															data-bs-dismiss="modal"
															onClick={() => {
																window.location =
																	"/buyer_dashboard?slideto=buyer-shipment-list"
															}}>
															Close
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	)
}

export default BuyerCheckout
