import React, { useEffect, useState } from "react"
import { backend_site } from "../../../controller/misc/misc"
import { read_user } from "../../../model/local/login_user"

const SellerSuccessCC = () => {
	const [isLoading, set_isLoading] = useState(false)
	async function check_out_order(paymentmode = 0) {
		//0-cash , 1-cc
		let customer = JSON.parse(
			window.localStorage.getItem("my-app-customer")
		)
		let orders = JSON.parse(window.localStorage.getItem("my-app-orders"))
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
		set_isLoading(false)
	}
	useEffect(() => {
		set_isLoading(true)
		check_out_order(1) // 1->credit card
		setTimeout(() => {
			window.location = "/seller_orders"
		}, 60000)
	}, [])
	return (
		<div
			className="container-fluid d-flex w-100 p-0"
			style={{
				position: "relative",
				overflow: "hidden",
			}}>
			<div className="w-100">
				<div
					className="container mt-5"
					style={{ overflow: "hidden", width: "100%" }}>
					<div className="row g-2 w-100 mt-5 px-3">
						<div className="w-100">
							{isLoading ? (
								<h1>Processing payment request...</h1>
							) : (
								<h1>Successfull Payment!</h1>
							)}

							<button
								disabled={isLoading}
								onClick={() =>
									(window.location = "/seller_dashboard")
								}
								className="btn btn-primary">
								{" "}
								{isLoading ? (
									<>
										<div
											className="spinner-border"
											role="status">
											<span className="sr-only">
												Loading...
											</span>
										</div>
									</>
								) : (
									<>Navigate to Summary</>
								)}
							</button>
							<br />
							<br />
							<br />
							<br />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SellerSuccessCC
