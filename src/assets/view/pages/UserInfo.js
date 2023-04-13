import React, { useEffect, useState } from "react"
import { create_user, read_user } from "../../model/local/login_user"
import { backend_site, makeid } from "../../controller/misc/misc"

const UserInfo = () => {
	const [is_password_error, set_is_password_error] = useState(true)
	const [is_loading, set_is_loading] = useState(false)
	const [tuser, set_tuser] = useState(false)
	const [tpassword, set_tpassword] = useState(false)
	const [user, set_user] = useState({
		address: "",
		contact: "",
		created_at: "2023-04-09T08:26:12.000000Z",
		email: "",
		email_verified_at: null,
		firstname: "",
		id: -1,
		id_num: "",
		img: "",
		lastname: "",
		password: "",
		remember_token: null,
		stripe_api: null,
		stripe_prod_id: null,
		updated_at: "2023-04-09T08:26:12.000000Z",
		user_type: -1,
	})
	const [ximage, set_ximage] = useState()
	function new_state() {
		set_tuser(!tuser)
	}
	function new_password() {
		set_tpassword(!tpassword)
	}
	const setImagePath = (e) => {
		let reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
		reader.onload = () => {
			set_ximage(reader.result)
			console.log(reader.result)
		}
	}

	//
	function save_name() {
		set_is_loading(true)
		fetch(backend_site + "/api/participants/" + user.id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				firstname: user.firstname,
				lastname: user.lastname,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				create_user(user)
				new_state()
				alert(response.msg)
				window.location = "/user_info"
			})
	}
	//
	function save_contact() {
		set_is_loading(true)
		fetch(backend_site + "/api/participants/" + user.id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contact: user.contact,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				create_user(user)
				new_state()
				alert(response.msg)
				window.location = "/user_info"
			})
	}
	//
	function save_address() {
		set_is_loading(true)
		fetch(backend_site + "/api/participants/" + user.id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contact: user.address,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				create_user(user)
				new_state()
				alert(response.msg)
				window.location = "/user_info"
			})
	}
	function save_stripe() {
		set_is_loading(true)
		fetch(backend_site + "/api/participants/" + user.id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				stripe_api: user.stripe_api,
				stripe_prod_id: user.stripe_prod_id,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				create_user(user)
				new_state()
				alert(response.msg)
				window.location = "/user_info"
			})
	}
	function save_password() {
		set_is_loading(true)
		fetch(backend_site + "/api/participants/" + user.id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				password: user.password,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				create_user(user)
				new_state()
				alert(response.msg)
				window.location = "/user_info"
			})
	}
	// images file picker
	useEffect(() => {
		if (ximage !== null && ximage !== undefined) {
			const a = {
				picturefile: ximage,
				img: `${backend_site}/img/${makeid(40)}.jpg`,
				participant_id: user.id,
			}
			console.log(ximage)
			let str_data = JSON.stringify(a)
			console.log(str_data)
			fetch(backend_site + "/api/participant_pictures", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: str_data,
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status > 0) {
						user.img = a.img
						create_user(user)
						new_state()
						alert(response.msg)
						window.location = "/user_info"
					}
				})
		}
	}, [ximage])
	useEffect(() => {
		//on load
		read_user((user1) => {
			set_user(user1)
			console.log(user1)
		})
	}, [tuser])
	//evaluate new password entry
	useEffect(() => {
		read_user((user1) => {
			set_user(user1)
			//on password changed (8 chars 1 caps 1 low 1 num 1 special char)
			let passw1 = String(user1.password).match(
				/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;/?.>,<])(?=.*[^\s]).{8,}$/
			)
			let passw2 = user.password === user.password2
			let passw3 = user.password !== null
			set_is_password_error(!passw1 || !passw2 || !passw3)
		})
	}, [tpassword])
	return (
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
					<div className="row g-2 w-100 mt-5 px-3">
						<div className="w-100">
							<h2 className="mb-3">
								<i>
									<b>myProfile</b>
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
											/>{" "}
											Picture
										</button>
									</h2>
									<div
										id="panelsStayOpen-collapseOne"
										className="accordion-collapse collapse show"
										aria-labelledby="panelsStayOpen-headingOne">
										<div className="accordion-body text-capitalize d-flex">
											<div
												className="mx-auto ms-sm-1"
												style={{ height: 200 }}>
												<img
													height={"100%"}
													src={user.img}
													className="rounded"
													alt="..."
												/>
											</div>
											<div>
												<button
													data-bs-toggle="modal"
													data-bs-target="#exampleModal-edit-picture"
													className="btn
													btn-outline-primary
													float-end">
													<i className="bi bi-pencil-square" />
												</button>
											</div>
										</div>
									</div>
								</div>
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
											<div>
												<button
													data-bs-toggle="modal"
													data-bs-target="#exampleModal-edit-name"
													className="btn
													btn-outline-primary
													float-end">
													<i className="bi bi-pencil-square" />
												</button>
											</div>
											<strong id="user-name">
												{user.lastname},{" "}
												{user.firstname}
											</strong>
											<h3>
												<b style={{ fontSize: 15 }}>
													ID No. -{" "}
												</b>
												<b className="badge bg-primary rounded-pill">
													{user.id_num}
												</b>
											</h3>
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
											<div>
												<button
													data-bs-toggle="modal"
													data-bs-target="#exampleModal-edit-contact"
													className="btn
													btn-outline-primary
													float-end">
													<i className="bi bi-pencil-square" />
												</button>
											</div>
											<span className="badge rounded-pill bg-success">
												Phone
											</span>
											<strong id="user-contact-info">
												&nbsp;{user.contact}
											</strong>
											<br />
											<br />
											<div>
												<button
													data-bs-toggle="modal"
													data-bs-target="#exampleModal-edit-password"
													className="btn
													btn-outline-primary
													float-end">
													<i className="bi bi-pencil-square" />
												</button>
											</div>

											<span className="badge rounded-pill bg-primary">
												Email&nbsp;
											</span>
											<strong id="user-email-info">
												&nbsp;{user.email}
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
											<div>
												<button
													data-bs-toggle="modal"
													data-bs-target="#exampleModal-edit-address"
													className="btn
													btn-outline-primary
													float-end">
													<i className="bi bi-pencil-square" />
												</button>
											</div>
											<span className="badge rounded-pill bg-warning text-dark">
												Home
											</span>
											<strong id="user-shipping-address">
												&nbsp;{user.address}
											</strong>
										</div>
									</div>
								</div>
								<div className="accordion-item">
									<h2
										className="accordion-header"
										id="panelsStayOpen-headingFour">
										<button
											className="accordion-button text-capitalize"
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#panelsStayOpen-collapseFour"
											aria-expanded="true"
											aria-controls="panelsStayOpen-collapseFour">
											&nbsp;Stripe E-Commerce Data
										</button>
									</h2>
									<div
										id="panelsStayOpen-collapseFour"
										className="accordion-collapse collapse show"
										aria-labelledby="panelsStayOpen-headingFour">
										<div className="accordion-body">
											<div>
												<button
													data-bs-toggle="modal"
													data-bs-target="#exampleModal-edit-stripe"
													className="btn
													btn-outline-primary
													float-end">
													<i className="bi bi-pencil-square" />
												</button>
											</div>

											<span className="badge rounded-pill bg-danger text-white">
												<a
													rel="noreferrer"
													href="https://dashboard.stripe.com/test/apikeys"
													target="_blank">
													Publishable key
												</a>
											</span>
											<strong
												id="user-shipping-address"
												style={{
													fontSize: 11,
													wordWrap: "break-word",
												}}>
												&nbsp;{user.stripe_api}
											</strong>
											<br />
											<span className="badge rounded-pill bg-primary text-dark">
												<a
													rel="noreferrer"
													href="https://dashboard.stripe.com/test/products?active=true"
													target="_blank">
													Product ID
												</a>
											</span>
											<strong
												id="user-shipping-address"
												style={{
													fontSize: 11,
													wordWrap: "break-word",
												}}>
												&nbsp;{user.stripe_prod_id}
											</strong>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Modals */}
			{/* Edit Picture Modal */}
			<div
				className="modal fade"
				id="exampleModal-edit-picture"
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
								<i className="bi bi-person-circle" /> Change
								Picture
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<input
								onChange={(e) => {
									setImagePath(e)
								}}
								accept="image/*"
								type="file"
								className="form-control"
							/>
						</div>
						<div className="modal-footer"></div>
					</div>
				</div>
			</div>
			{/* Edit Name Modal */}
			<div
				className="modal fade"
				id="exampleModal-edit-name"
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
								<i className="bi bi-person-circle" /> Change
								Name
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.firstname = e.target.value
										create_user(user)
										new_state()
									}}
									defaultValue={user.firstname}
									type="text"
									className="form-control"
									placeholder="#"
									required
								/>
								<label htmlFor="description">First Name</label>
							</div>
							<div className="form-floating col-lg-12 text-black mt-2">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.lastname = e.target.value
										create_user(user)
										new_state()
									}}
									defaultValue={user.lastname}
									type="text"
									className="form-control"
									placeholder="#"
									required
								/>
								<label htmlFor="description">Last Name</label>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => save_name()}
								disabled={is_loading}
								className="btn btn-outline-success w-100">
								{is_loading ? (
									<>
										<div
											className="spinner-border"
											role="status">
											<span className="sr-only">
												Loading...
											</span>
										</div>
										<span style={{ fontSize: 15 }}>
											{" "}
											Saving...
										</span>
									</>
								) : (
									<>
										<h3>
											<i className="bi bi-database-fill-check" />
											<span style={{ fontSize: 15 }}>
												{" "}
												Save
											</span>
										</h3>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Edit Contact Modal */}
			<div
				className="modal fade"
				id="exampleModal-edit-contact"
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
								<i className="bi bi-person-circle" /> Change
								Contact
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.contact = e.target.value
										create_user(user)
										new_state()
									}}
									defaultValue={user.contact}
									type="text"
									className="form-control"
									placeholder="#"
									required
								/>
								<label htmlFor="description">Contact</label>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => save_contact()}
								disabled={is_loading}
								className="btn btn-outline-success w-100">
								{is_loading ? (
									<>
										<div
											className="spinner-border"
											role="status">
											<span className="sr-only">
												Loading...
											</span>
										</div>
										<span style={{ fontSize: 15 }}>
											{" "}
											Saving...
										</span>
									</>
								) : (
									<>
										<h3>
											<i className="bi bi-database-fill-check" />
											<span style={{ fontSize: 15 }}>
												{" "}
												Save
											</span>
										</h3>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Edit password Modal */}
			<div
				className="modal fade"
				id="exampleModal-edit-password"
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
								<i className="bi bi-person-circle" /> Change
								Password
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.password = e.target.value
										create_user(user)
										new_password()
									}}
									defaultValue={user.password}
									type="password"
									className="form-control"
									placeholder="#"
									required
								/>
								<label htmlFor="description">
									New Password
								</label>
							</div>
							<br />
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.password2 = e.target.value
										create_user(user)
										new_password()
									}}
									defaultValue={user.password2}
									type="password"
									className="form-control"
									placeholder="#"
									required
								/>
								<label htmlFor="description">
									Re-type Password
								</label>
							</div>
						</div>

						<div className="modal-footer">
							<button
								onClick={() => save_password()}
								disabled={is_loading || is_password_error}
								className="btn btn-outline-success w-100">
								{is_loading ? (
									<>
										<div
											className="spinner-border"
											role="status">
											<span className="sr-only">
												Loading...
											</span>
										</div>
										<span style={{ fontSize: 15 }}>
											{" "}
											Saving...
										</span>
									</>
								) : (
									<>
										<h3>
											<i className="bi bi-database-fill-check" />
											<span style={{ fontSize: 15 }}>
												{" "}
												Save
											</span>
										</h3>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Edit Address Modal */}
			<div
				className="modal fade"
				id="exampleModal-edit-address"
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
								<i className="bi bi-person-circle" /> Change
								Address
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.address = e.target.value
										create_user(user)
										new_state()
									}}
									defaultValue={user.address}
									type="text"
									className="form-control"
									placeholder="#"
									required
								/>
								<label htmlFor="description">Contact</label>
							</div>
						</div>
						<div className="modal-footer">
							<button
								onClick={() => save_address()}
								disabled={is_loading}
								className="btn btn-outline-success w-100">
								{is_loading ? (
									<>
										<div
											className="spinner-border"
											role="status">
											<span className="sr-only">
												Loading...
											</span>
										</div>
										<span style={{ fontSize: 15 }}>
											{" "}
											Saving...
										</span>
									</>
								) : (
									<>
										<h3>
											<i className="bi bi-database-fill-check" />
											<span style={{ fontSize: 15 }}>
												{" "}
												Save
											</span>
										</h3>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
			{/* Edit stripe Modal */}
			<div
				className="modal fade"
				id="exampleModal-edit-stripe"
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
								<i className="bi bi-person-circle" /> Change
								Stripe Data
							</h5>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.stripe_api = e.target.value
										create_user(user)
										new_state()
									}}
									defaultValue={user.stripe_api}
									type="text"
									className="form-control"
									placeholder="#"
								/>
								<label htmlFor="description">API ID</label>
							</div>
							<br />
							<div className="form-floating col-lg-12 text-black">
								<input
									disabled={is_loading}
									onChange={(e) => {
										user.stripe_prod_id = e.target.value
										create_user(user)
										new_state()
									}}
									defaultValue={user.stripe_prod_id}
									type="text"
									className="form-control"
									placeholder="#"
								/>
								<label htmlFor="description">Product ID</label>
							</div>
						</div>
						<br />
						<div className="modal-footer">
							<button
								onClick={() => save_stripe()}
								disabled={is_loading}
								className="btn btn-outline-success w-100">
								{is_loading ? (
									<>
										<div
											className="spinner-border"
											role="status">
											<span className="sr-only">
												Loading...
											</span>
										</div>
										<span style={{ fontSize: 15 }}>
											{" "}
											Saving...
										</span>
									</>
								) : (
									<>
										<h3>
											<i className="bi bi-database-fill-check" />
											<span style={{ fontSize: 15 }}>
												{" "}
												Save
											</span>
										</h3>
									</>
								)}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserInfo
