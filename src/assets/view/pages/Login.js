import Carousel from "react-bootstrap/Carousel"
// model
import { read_sellers } from "../../model/remote/sellers.js"
import { read_users } from "../../model/remote/users.js"
import {
	create_user,
	create_user_a_seller,
	create_user_a_buyer,
	user_is_a,
} from "../../model/local/login_user.js"

// controller
//import { showModal } from "../../controller/misc/misc.js"
import { login_form_submit } from "../../controller/submit/login_form_submit.js"
import React, { useRef, useState } from "react"
import { useEffect } from "react"

const Login = () => {
	const openmodal = useRef()
	const [msg, set_msg] = useState("")
	function peakPassword() {
		let password = document.getElementById("exampleInputPassword1")
		const type = "text"
		document.getElementById("togglePassword").className = "bi bi-eye"
		password.setAttribute("type", type)
	}

	function unpeakPassword() {
		let password = document.getElementById("exampleInputPassword1")
		const type = "password"
		document.getElementById("togglePassword").className = "bi bi-eye-slash"
		password.setAttribute("type", type)
	}

	useEffect(() => {
		// on load
		login_form_submit(
			() => {},
			(data) => {
				read_sellers(data.email1, (sellers) => {
					if (sellers.length === 1) {
						// user is found
						if (
							window.btoa(sellers[0].password) === data.password1
						) {
							create_user(sellers[0])
							create_user_a_seller()
							window.location.href = "/seller_dashboard"
						} else {
							window.location.href = `/login?msg=${"Error: password does not match"}`
						}
					} else {
						read_users(data.email1, (users) => {
							if (users.length === 1) {
								// user is found
								if (
									window.btoa(users[0].password) ===
									data.password1
								) {
									create_user(users[0])
									create_user_a_buyer()
									window.location.href = "/buyer_dashboard"
								} else {
									window.location.href = `/login?msg=${"Error: password does not match"}`
								}
							} else {
								window.location.href = `/login?msg=${"Error: user account does not exist"}`
							}
						})
					}
				})
			},
			(msg1) => {
				//showModal("msg-modal-dialog")
				//$("#msg-span").html(msg)
				set_msg(msg1)
			}
		)
		if (msg !== "") openmodal.current.click()
	}, [msg])
	return (
		<>
			<div
				className="container-fluid d-flex"
				style={{
					zIndex: 100,
					position: "relative",
					overflow: "hidden",
					minHeight: "calc(100vh + 60px)",
				}}>
				<div className="m-auto">
					<div className="container" style={{ overflow: "hidden" }}>
						<div className="row g-5">
							<div className="col-lg-7 d-none d-lg-flex">
								<div
									className="w-100 shadow rounded m-auto"
									style={{ overflow: "hidden" }}>
									<Carousel fade className="w-100 shadow">
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/4m12.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>The Management Team</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel"
												height="100%"
												src="/assets/view/img/femp1.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We strive to build a happy
													working environment.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/fdog-care.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We provide quality user
													interface for orders entry
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/fveg-harvest1.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We deliver an easy and
													convenient user experience
													in our app.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/fword1.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We provide better security
													and ease of payment system
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/fveg-harvest2.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													Our system is free to use.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/fdog-care2.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													Trust is the tallest pillar
													in our organization.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="hero-carousel rounded"
												height="100%"
												src="/assets/view/img/fword2.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													Trust us that we will not
													use our user data for
													malicious purposes.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
									</Carousel>
								</div>
							</div>
							<div className="col-lg-5 text-white">
								<div className="mb-lg-5 h-100 d-flex align-items-center mt-5 mt-lg-0">
									<div className="row">
										<h1 className="text-center align-middle">
											<i className="bi bi-lock"></i>
										</h1>
										<h1 className="text-center align-middle">
											<b>
												<i>
													3-Corners Community
													Cooperative Inc. login
												</i>
											</b>
											.
										</h1>
										<h5 className="text-center align-middle text-white">
											We strive to secure the premise of
											our assets in order to best serve
											our member consumers and traders
											alike and optimize their experience.
										</h5>
										<hr />
										<div className="row mt-1 mb-3">
											<div className="col-lg-1"></div>
											<div className="col-lg-10">
												<form>
													<div className="mb-3">
														<label htmlFor="email1">
															<i
																className="fa fa-envelope-o"
																aria-hidden="true"
															/>
															&nbsp; Email:
														</label>
														<div className="input-group has-validation">
															<span
																className="input-group-text"
																id="inputGroupPrepend3"
																style={{
																	border: "2px solid rgb(198, 198, 198)",
																}}>
																@
															</span>
															<input
																type="email"
																className="form-control"
																id="email1"
																placeholder="Enter email"
																name="email1"
																required
															/>
														</div>
														<div
															id="emailHelp"
															className="form-text  text-white">
															We'll never share
															your email with
															anyone else.
														</div>
													</div>
													<div className="mb-3">
														<label
															htmlFor="exampleInputPassword1"
															className="form-label">
															<i
																className="fa fa-lock"
																aria-hidden="true"
															/>
															&nbsp; Password
														</label>
														<div className="input-group has-validation">
															<input
																type="password"
																name="password1"
																className="form-control"
																placeholder="Enter a strong password"
																id="exampleInputPassword1"
															/>
															<span
																role="button"
																onMouseDown={() => {
																	peakPassword()
																}}
																onMouseUp={() => {
																	unpeakPassword()
																}}
																className="input-group-text"
																id="inputGroupPrepend4">
																<i
																	className="bi bi-eye-slash"
																	id="togglePassword"
																/>
															</span>
														</div>
													</div>
													<a
														href="/signup"
														className="d-none">
														<span
															style={{
																textDecoration:
																	"underline",
																color: "white",
															}}>
															<i>Sign Up?</i>
														</span>
													</a>
													&nbsp;&nbsp;&nbsp;
													<a href="/newseller">
														<span
															style={{
																textDecoration:
																	"underline",
																color: "white",
															}}>
															<i>Signup?</i>
														</span>
													</a>
													<button
														type="submit"
														className="btn btn-primary px-2"
														style={{
															float: "right",
														}}>
														<i
															className="fa fa-sign-in fa-lg"
															aria-hidden="true"
														/>
														&nbsp; Sign in
													</button>
												</form>
												<button
													data-bs-toggle="modal"
													data-bs-target={`#exampleModal-msg`}
													ref={openmodal}
													className="btn btn-primary px-2 d-none"
													style={{
														float: "right",
													}}>
													<i
														className="fa fa-sign-in fa-lg"
														aria-hidden="true"
													/>
													&nbsp; openmodal
												</button>
											</div>
											<div className="col-lg-1"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-7 d-flex col d-lg-none">
								<div
									className="rounded m-auto"
									style={{ overflow: "hidden" }}>
									<Carousel fade className="shadow bg-dark">
										<Carousel.Item>
											<img
												className="w-100 rounded"
												src="/assets/view/img/4m12.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>The Management Team</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/femp1.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We strive to build a happy
													working environment.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/fdog-care.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We got pet friendly
													products.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/fveg-harvest1.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We also got fresh farm
													products.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/fword1.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													The word of God is the
													strongest pillar.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/fveg-harvest2.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We have straight from the
													farm products.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/fdog-care2.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													Your paw buddy is properly
													cared here.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
										<Carousel.Item>
											<img
												className="w-100  rounded"
												src="/assets/view/img/fword2.jpg"
												alt=""
												srcSet=""
											/>
											<Carousel.Caption
												style={{
													backgroundColor:
														"rgb(20, 88, 100)",
													opacity: "0.7",
													padding: 10,
												}}>
												<h3>
													We help propagate the Word.
												</h3>
											</Carousel.Caption>
										</Carousel.Item>
									</Carousel>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Modify an Order to a Products Modal */}
			<div
				className="modal fade text-black"
				id={`exampleModal-msg`}
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
								Login Error
							</h1>
							<button
								type="button"
								className="btn-close"
								data-bs-dismiss="modal"
								aria-label="Close"
							/>
						</div>
						<div className="modal-body">{msg}</div>
						<div className="modal-footer">
							<button
								onClick={() => (window.location = "/login")}
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

export default Login
