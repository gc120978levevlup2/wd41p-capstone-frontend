// model
import {
	read_user,
	user_is_logged_in,
	user_is_a,
} from "../../model/local/login_user.js"
import {
	create_cart_items_local,
	read_cart_items_local2,
} from "../../model/local/cart_items.js"
import { read_cart_items_fr_user } from "../../model/remote/shopping_cart.js"
import { useEffect, useState } from "react"
import { useLayoutEffect } from "react"

const MenuView = ({ active_page, included_options, element_to_connect }) => {
	const [selection, set_selection] = useState({
		home: "",
		login: "",
		seller_signup: "",
		logout: "",
		seller_dashboard: "",
		seller_reg_item: "",
		seller_ord_item: "",
		seller_fnd_item: "",
		seller_add_categ: "",
		buyer_signup: "",
		buyer_dashboard: "",
		buyer_checkout: "",
	})
	const [hide_sel, set_hide_sel] = useState({
		home: "d-none",
		login: "d-none",
		seller_signup: "d-none",
		logout: "d-none",
		seller_dashboard: "d-none",
		seller_reg_item: "d-none",
		seller_ord_item: "d-none",
		seller_fnd_item: "d-none",
		seller_add_categ: "d-none",
		buyer_signup: "d-none",
		buyer_dashboard: "d-none",
		buyer_checkout: "d-none",
	})
	const [search_form_active_path, set_search_form_active_path] = useState()
	const [res_data_path, set_res_data_path] = useState(
		"/assets/view/img/user.jpg"
	)
	const [image1, set_image1] = useState("d-lg-block")
	const [image2, set_image2] = useState("")
	const [image3, set_image3] = useState("")
	let nitems = 0
	let xitems = read_cart_items_local2()
	if (xitems) {
		let cart = [...xitems.filter((x) => x.status === "cart")]
		nitems = cart.length
	}
	const [nos_in_cart, set_nos_in_cart] = useState(nitems)
	const [nos_incoming, set_nos_incoming] = useState(0)
	//useEffect(() =>
	useLayoutEffect(() => {
		read_user((user) => {
			console.log("MenuView")
			read_cart_items_fr_user(user, (items) => {
				console.log(`Mainenu`)
				let cart = [...items.filter((x) => x.status === "cart")]
				let delv = [...items.filter((x) => x.status === "order")]
				set_nos_in_cart(cart.length)
				set_nos_incoming(delv.length)
				create_cart_items_local(items)
			})
		})
		if (user_is_logged_in()) {
			read_user((user) => {
				set_res_data_path(user.img)
			})
			if (user_is_a("seller")) {
				set_image3("d-none")
			}
		} else {
			set_nos_in_cart(0)
			set_nos_incoming(0)
			set_image1("")
			set_image2("d-none")
		}

		// determine search path
		if (window.location.pathname.includes("/seller_order_customer")) {
			set_search_form_active_path("/seller_order_customer")
		} else if (
			window.location.pathname.includes("/seller_order_products")
		) {
			set_search_form_active_path("/seller_order_product_search")
		} else if (
			window.location.pathname.includes("/seller_order_products")
		) {
			set_search_form_active_path("/seller_order_product_search")
		} else if (
			window.location.pathname.includes("/seller_order_product_search")
		) {
			set_search_form_active_path("/seller_order_product_search")
		} else if (window.location.pathname.includes("/seller_dashboard")) {
			set_search_form_active_path("/seller_order_product_search")
		} else if (window.location.pathname.includes("/seller_products")) {
			set_search_form_active_path("/seller_product_search")
		} else if (
			window.location.pathname.includes("/seller_product_search")
		) {
			set_search_form_active_path("/seller_product_search")
		} else if (window.location.pathname.includes("/seller_orders")) {
			set_search_form_active_path("/seller_order_product_search")
		} else if (window.location.pathname.includes("/psalms")) {
			set_search_form_active_path("/psalms")
		} else {
			set_search_form_active_path("/seller_order_product_search")
		}

		// determine active path and update nav indicator
		if (window.location.pathname === "/") {
			let newsel = { ...selection }
			newsel["home"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/login") {
			let newsel = { ...selection }
			newsel["login"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/logout") {
			let newsel = { ...selection }
			newsel["logout"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/signup") {
			let newsel = { ...selection }
			newsel["buyer_signup"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/newseller") {
			let newsel = { ...selection }
			newsel["seller_signup"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/seller_dashboard") {
			let newsel = { ...selection }
			newsel["seller_dashboard"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/seller_products") {
			let newsel = { ...selection }
			newsel["seller_reg_item"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/seller_orders") {
			let newsel = { ...selection }
			newsel["seller_ord_item"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/buyer_dashboard") {
			let newsel = { ...selection }
			newsel["buyer_dashboard"] = "text-white fw-bold disabled"
			set_selection(newsel)
		} else if (window.location.pathname === "/buyer_checkout") {
			let newsel = { ...selection }
			newsel["buyer_checkout"] = "text-white fw-bold disabled"
			set_selection(newsel)
		}

		// determine menu options
		if (!user_is_logged_in()) {
			let newhidesel = { ...hide_sel }
			newhidesel["home"] = ""
			newhidesel["login"] = ""
			newhidesel["buyer_signup"] = "d-none"
			newhidesel["seller_signup"] = ""
			set_hide_sel(newhidesel)
		} else if (user_is_a("buyer")) {
			let newhidesel = { ...hide_sel }
			newhidesel["home"] = ""
			newhidesel["buyer_dashboard"] = ""
			newhidesel["buyer_checkout"] = ""
			newhidesel["logout"] = ""
			set_hide_sel(newhidesel)
		} else if (user_is_a("seller")) {
			let newhidesel = { ...hide_sel }
			newhidesel["home"] = ""
			newhidesel["seller_dashboard"] = ""
			newhidesel["seller_reg_item"] = ""
			newhidesel["seller_ord_item"] = ""
			newhidesel["logout"] = ""
			set_hide_sel(newhidesel)
		}
	}, [])
	return (
		<>
			<div className="container-fluid w-100">
				<nav
					className="navbar navbar-expand-lg fixed-top navbar-dark px-2"
					style={{
						backgroundColor: "rgb(23,32,23,0.65)",
						backdropFilter: "blur(15px)",
					}}>
					<a className="navbar-brand" href="/">
						<img
							height="40px"
							src="/assets/view/img/favicon1.png"
							alt=""
							srcSet=""
							className="rounded-circle"
							id="main-icon"
						/>
						<span
							className="text-warning"
							style={{
								fontWeight: "bolder",
								fontSize: "larger",
							}}>
							{" "}
							<b> 3CCCi </b>
						</span>
					</a>
					<div className="btn-group">
						<button
							type="button"
							className={`btn ${image2} ${image3} text-white`}
							onClick={() => {
								window.location.href =
									"/buyer_dashboard?slideto=buyer-products-cart-list"
							}}
							style={{ position: "relative" }}>
							<h1>
								<i className="bi bi-cart3"></i>
							</h1>
							<span
								className="badge bg-primary rounded-circle border border-3"
								style={{
									fontSize: 9,
									position: "absolute",
									top: "0%",
									right: "0%",
								}}>
								{nos_in_cart}
							</span>
						</button>

						<a
							className="navbar-toggler border border-0 me-2"
							style={{ width: 50 }}
							href="/user_info">
							<img
								height="40px"
								width="40px"
								src={`${res_data_path}`}
								alt=""
								srcSet=""
								className={`rounded-circle  border border-3 border-primary-subtle ${image2}`}
								id="user-icon2"
							/>
						</a>
						<button
							className="navbar-toggler border border-0 p-0"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarCollapse"
							aria-controls="navbarCollapse"
							aria-expanded="false"
							aria-label="Toggle navigation">
							<span className="navbar-toggler-icon" />
						</button>
					</div>
					<div
						className="collapse navbar-collapse navbar-expand-xl px-3"
						id="navbarCollapse">
						<ul className="navbar-nav me-auto mb-2 mb-md-0">
							<li className={`nav-item ${hide_sel["home"]}`}>
								<a
									className={`nav-link ${selection["home"]}`}
									href="/">
									Home
								</a>
							</li>
							<li className={`nav-item ${hide_sel["login"]}`}>
								<a
									className={`nav-link ${selection["login"]}`}
									href="/login">
									Login
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["buyer_signup"]}`}>
								<a
									className={`nav-link ${selection["buyer_signup"]}`}
									href="/signup">
									Sign Up
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["seller_signup"]}`}>
								<a
									className={`nav-link ${selection["seller_signup"]}`}
									href="/newseller">
									Signup
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["buyer_dashboard"]}`}>
								<a
									className={`nav-link ${selection["buyer_dashboard"]}`}
									href="/buyer_dashboard">
									Dashboard
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["buyer_checkout"]}`}>
								<a
									className={`nav-link ${selection["buyer_checkout"]}`}
									href="/buyer_checkout">
									Checkout
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["seller_dashboard"]}`}>
								<a
									className={`nav-link ${selection["seller_dashboard"]}`}
									href="/seller_dashboard">
									Summary
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["seller_reg_item"]}`}>
								<a
									className={`nav-link ${selection["seller_reg_item"]}`}
									href="/seller_products">
									Products
								</a>
							</li>
							<li
								className={`nav-item ${hide_sel["seller_ord_item"]}`}>
								<a
									className={`nav-link ${selection["seller_ord_item"]}`}
									href="/seller_orders">
									Orders
								</a>
							</li>
							<li className={`nav-item ${hide_sel["logout"]}`}>
								<a
									className={`nav-link ${selection["logout"]}`}
									href="/logout">
									Logout
								</a>
							</li>
						</ul>
						<hr />
						<form
							className="d-flex me-2"
							role="search"
							action={search_form_active_path}>
							<div
								className="input-group rounded-pill overflow-hidden border-end border-2"
								role="group">
								<span className="input-group-text bg-primary text-white border border-primary">
									<i
										className="fa fa-search"
										aria-hidden="true"
									/>
								</span>
								<input
									className="form-control border-3"
									type="search"
									name="search"
									placeholder="Enter a search term"
								/>
								<button
									className="btn btn-light border-3"
									style={{ borderLeft: "1px solid #CED4DA" }}
									type="submit">
									Search
								</button>
							</div>
						</form>
						<br />
						<div className={`d-none ${image1}`}>
							<a style={{ width: 50 }} href="/user_info">
								<img
									height="40px"
									width="40px"
									src={`${res_data_path}`}
									alt={""}
									srcSet=""
									className="rounded-circle  border border-3 border-primary-subtle"
									id="user-icon1"
								/>
							</a>
						</div>
					</div>
				</nav>
			</div>
		</>
	)
}

export default MenuView
