/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react"
import { backend_site } from "../../controller/misc/misc"

const NewSeller = () => {
	const [email_error1, set_email_error1] = useState(null)
	const [xemail1, set_xemail1] = useState(null)
	const [xpassword1, set_xpassword] = useState(null)
	const [xfirstname, set_xfirstname] = useState(null)
	const [xlastname, set_xlastname] = useState(null)
	const [xcontact, set_xcontact] = useState(null)
	const [xaddress, set_xaddress] = useState(null)
	const [ximage, set_ximage] = useState(null)
	const [xemailInvalid, set_xemailInvalid] = useState(true)
	const [xpassword1Invalid, set_xpassword1Invalid] = useState(true)
	const [xpassword2Invalid, set_xpassword2Invalid] = useState(true)
	const [xnameInvalid, set_xnameInvalid] = useState(true)
	//const [xlastname, set_xlastname] = useState(false)
	const [xcontactInvalid, set_xcontactInvalid] = useState(true)
	const [xaddressInvalid, set_xaddressInvalid] = useState(true)
	const [ximgInvalid, set_ximgInvalid] = useState(true)
	const [participant_id, set_participant_id] = useState()
	const [profile_picture, set_profile_picture] = useState(
		"/assets/view/img/user.jpg"
	)
	const [image_disabled, set_image_disabled] = useState(true)
	const [image_changed, set_image_changed] = useState(false)
	// initialize the validation state
	let emailInvalid = true
	let password1Invalid = true
	let password2Invalid = true
	let nameInvalid = true
	let contactInvalid = true
	let addressInvalid = true
	let imgInvalid = true

	function makeid(length) {
		let result = ""
		let characters =
			"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_"
		let charactersLength = characters.length
		for (var i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			)
		}
		return result
	}

	function makeAlpha(length) {
		let result = ""
		let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
		let charactersLength = characters.length
		for (var i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			)
		}
		return result
	}

	function makeNumeric(length) {
		let result = ""
		let characters = "0123456789"
		let charactersLength = characters.length
		for (var i = 0; i < length; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			)
		}
		return result
	}

	// if all is valid activate button
	function validate_submit_button() {
		let ret = true
		let signup_submit = document.getElementById("signup-submit")
		if (signup_submit) {
			signup_submit.disabled = true
			ret = true
			signup_submit.classList.add("btn-secondary")
			signup_submit.classList.remove("btn-primary")
			if (
				!xemailInvalid &&
				!xpassword1Invalid &&
				!xpassword2Invalid &&
				!xnameInvalid &&
				!xaddressInvalid &&
				!xcontactInvalid //&&
				//!ximgInvalid
			) {
				signup_submit.disabled = false
				ret = false
				signup_submit.classList.add("btn-primary")
				signup_submit.classList.remove("btn-secondary")
			}
		}
		return ret
	}
	validate_submit_button()

	function validate_values_of(
		elements,
		ret_callback,
		invalid_msg,
		reg_ex_pattern = undefined
	) {
		let main_element = elements[0]
		let error_element = elements[1]
		let comp_element = elements[2]
		let validate_value = (e) => {
			let val = e.target.value
			let pass =
				reg_ex_pattern !== undefined
					? String(val).match(reg_ex_pattern)
					: comp_element.value === main_element.value
			if (pass) {
				main_element.classList.add("is-valid")
				main_element.classList.remove("is-invalid")
				error_element.innerHTML = /*html*/ `<span style="color:green">Valid</span>`
				ret_callback(false)
				validate_submit_button()
			} else {
				main_element.classList.add("is-invalid")
				main_element.classList.remove("is-valid")
				error_element.innerHTML = /*html*/ `<span style="color:red">${invalid_msg}</span>`
				ret_callback(true)
				validate_submit_button()
			}
		}
		main_element.addEventListener("change", validate_value)
		main_element.addEventListener("keyup", validate_value)
	}

	useEffect(() => {
		set_email_error1("")
	}, [])

	useEffect(() => {
		let x = validate_submit_button()
		console.log(`validate_submit_button() = ${x}`)
	}, [xemail1, xpassword1, xfirstname, xlastname, xcontact, xaddress])

	// save the for data to database
	function signup_submit_click() {
		fetch(backend_site + "/api/participants", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: xemail1,
				password: xpassword1,
				firstname: xfirstname,
				lastname: xlastname,
				contact: xcontact,
				address: xaddress,
				user_type: 1,
				id_num: makeAlpha(3) + "-" + makeNumeric(4),
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status > 0) {
					set_participant_id(response.data.id)
					console.log(response.data.id)
					alert(response.msg)
					//window.location = "/login"
					set_image_disabled(false)
				} else alert(response.msg.join("\n"))
			})
	}
	// validate email
	function validate_email(email) {
		//set_email_error1("Error")
	}
	let email_error = document.getElementById("email-error")
	let email1 = document.getElementById("email1")
	if (email1) {
		validate_values_of(
			[email1, email_error, undefined],
			(ret) => {
				set_xemailInvalid(ret)
			},
			`Error: Invalid Email`,
			/^[^\s@]+@[^\s@]+\.[^\s@]+$/
		)
	}

	// validate password1
	let password1_error = document.getElementById("password1-error")
	let password1 = document.getElementById("password1")
	if (password1) {
		validate_values_of(
			[password1, password1_error, undefined],
			(ret) => {
				set_xpassword1Invalid(ret)
			},
			`Error: Weak password. Should have min 8 chars, at least 1 up-case, 1 low-case, 1 numeric & 1 special char`,
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`|}{[\]:;/?.>,<])(?=.*[^\s]).{8,}$/
		)
	}

	// validate password1
	let password2_error = document.getElementById("password2-error")
	let password2 = document.getElementById("confirm_pwd")
	if (password2) {
		validate_values_of(
			[password2, password2_error, password1],
			(ret) => {
				set_xpassword2Invalid(ret)
			},
			`Error: Retyped password did not match ${xpassword1 ? "" : ""}`
		)
	}

	//
	// validate name
	let name_error = document.getElementById("name-error")
	let name = document.getElementById("name")
	if (name) {
		validate_values_of(
			[name, name_error, undefined],
			(ret) => {
				set_xnameInvalid(ret)
			},
			`Error: Required Name`,
			/^\s*.+\s*$/
		)
	}

	// validate address
	let address_error = document.getElementById("address-error")
	let address = document.getElementById("address")
	if (address) {
		validate_values_of(
			[address, address_error, undefined],
			(ret) => {
				set_xaddressInvalid(ret)
			},
			`Error: Required Address`,
			/^\s*.+\s*$/
		)
	}

	// validate contact
	let contact_error = document.getElementById("contact-error")
	let contact = document.getElementById("contact")
	if (contact) {
		validate_values_of(
			[contact, contact_error, undefined],
			(ret) => {
				set_xcontactInvalid(ret)
			},
			`Error: Invalid Mobile Phone Number. ex 09993423450 or +639993423450 or 00639993423450`,
			/^\(?(0|\+63|0063)\)?[ -]?(9)\d{2}[ -]?\d{3}[ -]?\d{4}$/
		)
	}

	function getBase64(file) {
		var reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = function () {
			set_ximage(reader.result.replace("data:image/jpeg;base64,", ""))
		}
		reader.onerror = function (error) {
			console.log("Error: ", error)
		}
	}

	const setImagePath = (e) => {
		let reader = new FileReader()
		reader.readAsDataURL(e.target.files[0])
		reader.onload = () => {
			set_ximage(reader.result)
		}
	}

	// images file picker
	useEffect(() => {
		if (ximage !== null && ximage !== undefined) {
			const a = {
				picturefile: ximage,
				img: `${backend_site}/img/${makeid(40)}.jpg`,
				participant_id: participant_id,
			}
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
					//console.log(response)
					//console.log(response)
					if (response.status > 0) {
						set_profile_picture(response.data.img)
						set_image_disabled(false)
						set_image_changed(false)
						alert(response.msg)
						//set_participant_id(response.data.id)
						//console.log(response.data.id)
						//alert(response.msg)
						//window.location = "/login"
					} //else alert(response.msg.join("\n"))
				})
		}
	}, [ximage])

	return (
		<>
			<div
				className="container-fluid d-flex"
				style={{
					position: "relative",
					overflow: "hidden",
					minHeight: "calc(100vh + 160px)",
				}}>
				<div className="mt-5 mx-auto">
					<br />
					<br />
					<div className="container" style={{ overflow: "hidden" }}>
						<h1>
							<b>Member Registration Form</b>
						</h1>
						<hr />
						<div className="row g-5">
							<div className="row g-5">
								<div className="col-lg-6">
									<div>
										<img
											width="100%"
											className="rounded"
											src="/assets/view/img/sell-with-us.avif"
											alt=""
										/>
									</div>
								</div>
								<div className="col-lg-6 d-flex">
									<div className="m-auto w-100">
										<div className="form-group mb-3">
											<label htmlFor="email1">
												<i
													className="fa fa-envelope-o"
													aria-hidden="true"
												/>{" "}
												Email:
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
													onKeyUp={(e) =>
														set_xemail1(
															e.target.value
														)
													}
													required
												/>
											</div>
											<label id="email-error">
												{email_error1}
											</label>
										</div>
										<div className="form-group mb-3">
											<label htmlFor="password1">
												<i
													className="fa fa-lock"
													aria-hidden="true"
												/>{" "}
												Password:
											</label>
											<input
												onKeyUp={(e) =>
													set_xpassword(
														e.target.value
													)
												}
												type="password"
												className="form-control"
												id="password1"
												placeholder="Enter password"
												name="password1"
												required
											/>
											<label id="password1-error" />
										</div>
										<div className="form-group mb-3">
											<label htmlFor="confirm-pwd">
												<i
													className="fa fa-lock"
													aria-hidden="true"
												/>{" "}
												Confirm Password:
											</label>
											<input
												type="password"
												className="form-control"
												id="confirm_pwd"
												placeholder="Confirm password"
												name="confirm_pwd"
												required
											/>
											<label id="password2-error" />
										</div>
									</div>
								</div>
								<div className="col-lg-12">
									<hr />
									<br />
								</div>

								<div className="col-lg-6">
									{" "}
									<div className="form-group mb-3">
										<label htmlFor="name">
											<i
												className="fa fa-user-o"
												aria-hidden="true"
											/>{" "}
											First Name:
										</label>
										<input
											onKeyUp={(e) =>
												set_xfirstname(e.target.value)
											}
											type="text"
											className="form-control"
											id="name"
											placeholder="Enter first name"
											name="name"
											required
										/>
										<label id="name-error" />
									</div>
									<div className="form-group mb-3">
										<label htmlFor="lastname">
											<i
												className="fa fa-user-o opacity-0"
												aria-hidden="true"
											/>{" "}
											Last Name:
										</label>
										<input
											onKeyUp={(e) =>
												set_xlastname(e.target.value)
											}
											type="text"
											className="form-control"
											id="lastname"
											placeholder="Enter last name"
											name="lastname"
											required
										/>
										<label id="lastname-error" />
									</div>
									<div className="form-group mb-3">
										<label htmlFor="contact">
											<i
												className="fa fa-phone"
												aria-hidden="true"
											/>{" "}
											Mobile Phone Number
										</label>
										<input
											onKeyUp={(e) =>
												set_xcontact(e.target.value)
											}
											type="tel"
											className="form-control"
											id="contact"
											placeholder="Enter phone number"
											name="contact"
											required
										/>
										<label id="contact-error" />
									</div>
									<div className="form-group mb-3">
										<label htmlFor="name">
											<i
												className="fa fa-map-marker"
												aria-hidden="true"
											/>{" "}
											Address
										</label>
										<input
											onKeyUp={(e) =>
												set_xaddress(e.target.value)
											}
											type="text"
											className="form-control"
											id="address"
											placeholder="Enter address"
											name="address"
											required
										/>
										<label id="address-error" />
									</div>
									<button
										onClick={() => signup_submit_click()}
										className="btn btn-primary"
										style={{
											float: "right",
											marginBottom: 20,
										}}
										id="signup-submit">
										&nbsp;&nbsp;
										<i
											className="fa fa-floppy-o fa-lg"
											aria-hidden="true"
										/>
										&nbsp; Submit &nbsp;&nbsp;
									</button>
								</div>
								<div className="col-lg-6">
									<div className="form-group mb-3">
										<label htmlFor="name">
											<i
												className="fa fa-camera-retro"
												aria-hidden="true"
											/>{" "}
											{image_changed ? (
												<span
													class="spinner-border spinner-border-sm"
													role="status"
													aria-hidden="true"></span>
											) : (
												""
											)}
											Profile Picture (Upload picture
											after submitting profile data)
										</label>
										<input
											onChange={(e) => {
												//on_profile_picture_change(e)
												//set_ximage(e.target.files[0])
												//getBase64(e.target.files[0])
												setImagePath(e)
												set_image_disabled(true)
												set_image_changed(true)
											}}
											accept=".jpg"
											type="file"
											className="form-control mb-1"
											placeholder="Enter file image"
											required
											disabled={image_disabled}
										/>
										<br />
										<div
											className="mx-auto img-thumbnail"
											style={{
												width: "95%",
											}}>
											<img
												src={`${profile_picture}`}
												alt="Please upload your profile."
												width="100%"
												id="img-view"
											/>
										</div>
										<input
											type="text"
											id="img-text"
											name="img"
											style={{ opacity: 0 }}
											readOnly
										/>
									</div>
								</div>
								<br />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default NewSeller
