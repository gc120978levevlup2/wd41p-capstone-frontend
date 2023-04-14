import React, { useEffect, useState } from "react"
import { backend_site, makeid } from "../../../controller/misc/misc"
import { read_user } from "../../../model/local/login_user"
import { search_submit } from "../../../controller/submit/search_submit"

const SellerProductsSearch = () => {
	const [save_btn_hide, set_save_btn_hide] = useState("")
	const [add_picture_hide, set_add_picture_hide] = useState("d-none")
	const [categories, set_categories] = useState([])
	const [products, set_products] = useState([])
	const [product_id, set_product_id] = useState()
	const [product_category_id, set_product_category_id] = useState()
	const [product_description, set_product_description] = useState()
	const [product_specification, set_product_specification] = useState()
	const [product_unit_price, set_product_unit_price] = useState()
	const [product_unit, set_product_unit] = useState("pcs")
	const [product_qty, set_product_qty] = useState(0)
	const [product_qty_sold, set_product_qty_sold] = useState(0)
	const [ximage, set_ximage] = useState()
	const [product_pictures, set_product_pictures] = useState([])
	function save_picture_data(item_id, picture) {
		const a = {
			picturefile: "x",
			img: `${picture.url}`,
			product_id: item_id,
		}
		let str_data = JSON.stringify(a)
		console.log(str_data)
		fetch(backend_site + "/api/product_pictures", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: str_data,
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response)
			})
	}
	function save_product_item(cat_id, item) {
		read_user((user1) => {
			fetch(backend_site + "/api/products", {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					category_id: cat_id,
					description: item.description.substring(0, 48),
					specs: item.specs.substring(0, 250),
					unit: "pcs",
					price: item.unit_price,
					onhand_qty: item.qty,
					sold_qty: item.sold,
					seller_id: user1.id,
				}),
			})
				.then((response) => response.json())
				.then((response) => {
					if (response.status > 0) {
						//set_product_id(response.data.id)
						console.log(response.data.id)
						for (let picture of item.images) {
							console.log("picture")
							console.log(picture)

							setTimeout(
								save_picture_data(response.data.id, picture),
								500
							)
						}
						//alert(response.msg)
						//window.location = "/login"
						//set_image_disabled(false)
					}
				})
		})
	}
	function display_products() {
		let user = null
		read_user((user1) => (user = user1))
		fetch(backend_site + "/api/categories", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				set_categories(response.data)
			})

		let xximages = []
		fetch(backend_site + "/api/product_pictures", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response2) => response2.json())
			.then((response2) => {
				console.log(response2.data)
				xximages = response2.data
				fetch(backend_site + "/api/products", {
					method: "GET",
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
					.then((response) => response.json())
					.then((response) => {
						let products = response.data.filter(
							(x) => x.seller_id === user.id
						)
						let search = ""
						search_submit(
							() => {},
							(search1) => (search = search1.search.toUpperCase())
						)
						products = products.filter(
							(x) =>
								x.description.toUpperCase().includes(search) ||
								x.specs.toUpperCase().includes(search)
						)
						for (let item of products) {
							let a = xximages.filter(
								(x) => x.product_id === item.id
							)
							item.images = []
							if (a.length > 0) {
								console.log("sssssssss a[0].img")
								console.log(a[0].img)
								item.main_image = a[0].img
								item.images = a
								console.log("sssssssss a[0].n")
								console.log(a)
								///set_products(response.data)
							}
						}
						set_products(products)
						console.log(response.data)
					})
			})
	}
	useEffect(() => {
		//save_bulk_products()
		// on load
		display_products()
	}, [])
	function openProductForModification(item) {
		console.log("openProductForModification")
		set_product_id(item.id)
		set_product_pictures(item.images)
		set_product_category_id(item.category_id)
		set_product_description(item.description)
		set_product_specification(item.specs)
		set_product_unit(item.unit)
		set_product_unit_price(item.price)
		set_product_qty(item.onhand_qty)
		set_product_qty_sold(item.sold_qty)
	}
	function saveModProduct() {
		let user = null
		read_user((user1) => (user = user1))
		fetch(backend_site + "/api/products/" + product_id, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				category_id: product_category_id,
				description: product_description,
				specs: product_specification,
				unit: product_unit,
				price: product_unit_price,
				onhand_qty: product_qty,
				sold_qty: product_qty_sold,
				seller_id: user.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status > 0) {
					set_product_id(response.data.id)
					console.log(response.data.id)
					alert(response.msg)
					//window.location = "/login"
					//set_image_disabled(false)
				} else alert(response.msg.join("\n"))
			})
	}
	function saveNewProduct() {
		let user = null
		read_user((user1) => (user = user1))
		set_add_picture_hide("")
		set_save_btn_hide("d-none")
		fetch(backend_site + "/api/products", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				category_id: product_category_id,
				description: product_description,
				specs: product_specification,
				unit: product_unit,
				price: product_unit_price,
				onhand_qty: product_qty,
				sold_qty: product_qty_sold,
				seller_id: user.id,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.status > 0) {
					set_product_id(response.data.id)
					console.log(response.data.id)
					alert(response.msg)
					//window.location = "/login"
					//set_image_disabled(false)
				} else alert(response.msg.join("\n"))
			})
	}

	function refreshProductPictures(source_product_id) {
		fetch(backend_site + "/api/product_pictures", {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log(response.data)
				set_product_pictures(
					response.data.filter(
						(x) => x.product_id === source_product_id
					)
				)
			})
	}
	function deleteProductBtn(item) {
		fetch(backend_site + `/api/products/${item.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				refreshProductPictures(product_id)
				alert(`Deleted product: ${item}`)
				display_products()
			})
	}
	function deleteProductPicture(picture) {
		fetch(backend_site + `/api/product_pictures/${picture.id}`, {
			method: "DELETE",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				refreshProductPictures(product_id)
				alert(`Deleted product picture: ${picture.img}`)
			})
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
				product_id: product_id,
			}
			let str_data = JSON.stringify(a)
			console.log(str_data)
			fetch(backend_site + "/api/product_pictures", {
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
						refreshProductPictures(product_id)
						//set_profile_picture(response.data.img)
						//set_image_disabled(false)
						//set_image_changed(false)
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
										&nbsp; Product Listings
									</span>{" "}
								</b>
							</h2>
							<button
								className="btn btn-outline-success float-end"
								data-bs-toggle="modal"
								data-bs-target="#exampleModal-add-item">
								<i className="bi bi-smartwatch"></i> New Product
							</button>
						</div>
						<div className="col-md-12">
							<hr />
						</div>
					</div>
					<div
						className="row row-cols-md-2 row-cols-lg-3 row-cols-xl-4 row-cols-xxl-5 g-3"
						id="buyer-stores-list">
						{products.map((item) => (
							<>
								<div
									key={item.id}
									className="col mb-3"
									style={{ color: "gray" }}>
									<div
										className="card mb-3 border-1 p-0 position-relative shadow mx-auto"
										style={{ width: 250 }}>
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
												src={`${item.main_image}`}
												alt="${item.description}"
												style={{ minHeight: 150 }}
												data-bs-toggle="modal"
												data-bs-target={`#staticBackdrop-${item.id}`}
											/>
										</div>
										<div
											className="card-body"
											align="center"
											style={{ paddingTop: 1 }}>
											<h4
												className="d-flex align-middle  card-title"
												style={{
													height: 30,
													overflowY: "hidden",
													marginBottom: 1,
												}}>
												(#{item.id}) {item.description}
											</h4>

											<p
												className="card-text"
												style={{
													height: 75,
													overflowY: "hidden",
													marginBottom: 0,
												}}>
												{item.specs}
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
														₱{" "}
														{item.price.toLocaleString()}{" "}
													</i>{" "}
												</b>{" "}
											</h4>

											<div
												align="center"
												className="d-flex flex-row justify-content-center"
												style={{
													height: 30,
													padding: 0,
												}}>
												<div className="p-1">
													{" "}
													Sold{" "}
													<span className="badge bg-success">
														{item.sold_qty}
													</span>{" "}
												</div>
												<div className="p-1">
													{" "}
													Available{" "}
													<span className="badge bg-danger">
														{item.onhand_qty -
															item.sold_qty}
													</span>{" "}
												</div>
											</div>

											<div className="row g-1">
												<div className="col-6">
													<button
														type="button"
														className="btn btn-outline-danger"
														data-bs-toggle="modal"
														data-bs-target={`#staticBackdrop2-${item.id}`}>
														<i className="bi bi-eraser" />
														<br />
														Remove Product
													</button>
												</div>
												<div className="col-6">
													<button
														onClick={() =>
															openProductForModification(
																item
															)
														}
														type="button"
														className="btn btn-outline-secondary"
														data-bs-toggle="modal"
														data-bs-target={`#exampleModal-mod-item-${item.id}`}>
														<i className="bi bi-pen" />
														<br />
														Modify Product
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* Show Images Modal */}
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
														{item.description}
													</h5>
													<button
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"
													/>
												</div>
												<div className="modal-body">
													{item.images.map(
														(file, i) => (
															<>
																<img
																	key={i}
																	width="100%"
																	src={`${file.img}`}
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
									{/* Delete Product Modal */}
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
														Are you sure you want to
														DELETE{" "}
														{item.description}{" "}
														Product?
													</h5>
													<button
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"
													/>
												</div>
												<div className="modal-body">
													{item.images[0] ? (
														<>
															<img
																width="100%"
																src={`${item.images[0].img}`}
																alt="xxx"
															/>
														</>
													) : (
														<></>
													)}

													<br />
													<br />
												</div>
												<div className="modal-footer">
													<button
														onClick={() =>
															deleteProductBtn(
																item
															)
														}
														className="btn btn-outline-danger "
														data-bs-dismiss="modal">
														YES
													</button>
												</div>
											</div>
										</div>
									</div>
									{/* Modify/Edit Products Modal */}
									<div
										className="modal fade text-black"
										id={`exampleModal-mod-item-${item.id}`}
										tabIndex={-1}
										aria-labelledby="exampleModalLabel-add-item"
										aria-hidden="true">
										<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header bg-secondary text-white">
													<h1
														className="modal-title fs-5"
														id="exampleModalLabel-add-item">
														<i className="bi bi-postcard" />{" "}
														| Modify Product
														Registry Form
													</h1>
													<button
														onClick={() =>
															display_products()
														}
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
																<div className="form-floating col-md-12">
																	<select
																		defaultValue={
																			item.category_id
																		}
																		type="text"
																		className="form-control"
																		id="category_id"
																		name="category_id"
																		placeholder="#"
																		onChange={(
																			e
																		) =>
																			set_product_category_id(
																				e
																					.target
																					.value
																			)
																		}
																		required>
																		<option>
																			Non-selected
																		</option>
																		{categories.map(
																			(
																				category
																			) => (
																				<>
																					<option
																						key={
																							category.id
																						}
																						value={
																							category.id
																						}>
																						{
																							category.name
																						}
																					</option>
																				</>
																			)
																		)}
																	</select>
																	<label htmlFor="category_id">
																		Category
																		Name
																	</label>
																</div>
																<br />
																<div className="form-floating col-md-12">
																	<input
																		defaultValue={
																			item.description
																		}
																		onChange={(
																			e
																		) =>
																			set_product_description(
																				e
																					.target
																					.value
																			)
																		}
																		type="text"
																		className="form-control"
																		id="description"
																		name="description"
																		placeholder="#"
																		required
																	/>
																	<label htmlFor="description">
																		Description/Name
																	</label>
																</div>
																<br />
																<div className="form-floating col-md-12">
																	<textarea
																		defaultValue={
																			item.specs
																		}
																		onChange={(
																			e
																		) =>
																			set_product_specification(
																				e
																					.target
																					.value
																			)
																		}
																		type="text"
																		className="form-control"
																		id="specs"
																		name="specs"
																		placeholder="#"
																		required
																	/>
																	<label htmlFor="specs">
																		Product
																		Specification
																	</label>
																</div>
																<br />
																<div className="row g-3">
																	<div className="col-sm-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.price
																				}
																				onChange={(
																					e
																				) =>
																					set_product_unit_price(
																						e
																							.target
																							.value
																					)
																				}
																				type="number"
																				className="form-control"
																				id="unit_price"
																				name="unit_price"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="unit_price">
																				Unit
																				Price
																				PhP
																			</label>
																		</div>
																	</div>
																	<div className="col-sm-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.unit
																				}
																				onChange={(
																					e
																				) =>
																					set_product_unit(
																						e
																							.target
																							.value
																					)
																				}
																				type="text"
																				className="form-control"
																				id="unit"
																				name="unit"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="discount_p">
																				Unit
																			</label>
																		</div>
																	</div>
																</div>
																<br />
																<div className="row g-3">
																	<div className="col-sm-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.onhand_qty
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
																				Actual
																				On-hand
																				Qty
																			</label>
																		</div>
																	</div>
																	<div className="col-md-6">
																		<div className="form-floating">
																			<input
																				defaultValue={
																					item.sold_qty
																				}
																				onChange={(
																					e
																				) =>
																					set_product_qty_sold(
																						e
																							.target
																							.value
																					)
																				}
																				type="number"
																				className="form-control"
																				id="sold"
																				name="sold"
																				placeholder="#"
																				required
																			/>
																			<label htmlFor="sold">
																				Sold
																				Qty
																			</label>
																		</div>
																	</div>
																</div>
															</div>
															<div
																className="col-md-4 border border-start-2 border-end-0 border-top-0 border-bottom-0"
																id="product-image-div">
																<div
																	className={`form-floating col-md-12 mb-3`}>
																	<input
																		onChange={(
																			e
																		) => {
																			setImagePath(
																				e
																			)
																		}}
																		type="file"
																		accept=".jpg"
																		className={`form-control`}
																		id="product-image-filename1"
																		placeholder="#"
																		required
																	/>
																	<label
																		htmlFor="first_name"
																		className="mb-1">
																		<i className="bi bi-camera" />
																		Add a
																		Product
																		Picture
																	</label>
																</div>
																<div id="list of pictures">
																	{product_pictures.length <
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
																				}}>
																				<button
																					type="button"
																					className="btn btn-outline-secondary border border-0"
																					style={{
																						padding: 0,
																					}}
																					disabled>
																					{" "}
																					<i className="bi bi-trash" />{" "}
																				</button>
																			</div>
																		</div>
																	) : (
																		<></>
																	)}

																	{product_pictures.map(
																		(
																			picture
																		) => (
																			<div
																				key={
																					picture.id
																				}>
																				<div className="mx-auto w-100">
																					<img
																						width="100%"
																						className="img-thumbnail"
																						src={`${picture.img}`}
																						alt="please select a product"
																						srcSet=""
																					/>
																				</div>
																				<div
																					className="mx-auto  mb-3"
																					style={{
																						width: 15,
																					}}>
																					<button
																						onClick={() =>
																							deleteProductPicture(
																								picture
																							)
																						}
																						type="button"
																						className="btn btn-outline-danger border border-0"
																						style={{
																							padding: 0,
																						}}>
																						{" "}
																						<i className="bi bi-trash" />{" "}
																					</button>
																				</div>
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
														onClick={() =>
															display_products()
														}
														type="button"
														className="btn btn-secondary"
														data-bs-dismiss="modal">
														Close
													</button>
													<button
														className={`btn btn-primary ${save_btn_hide}`}
														onClick={() =>
															saveModProduct()
														}>
														&nbsp;&nbsp;
														<i className="bi bi-database-add" />
														&nbsp; Save &nbsp;&nbsp;
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							</>
						))}
						{products.length < 1 ? (
							<>
								<br />
								<h1>
									No Products Available&nbsp;&nbsp;
									<div
										className="spinner-border"
										role="status">
										<span className="visually-hidden">
											Loading...
										</span>
									</div>
								</h1>
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
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
						) : (
							<></>
						)}
					</div>
				</div>
				{/* Add Products Modal */}
				<div
					className="modal fade text-black"
					id="exampleModal-add-item"
					tabIndex={-1}
					aria-labelledby="exampleModalLabel-add-item"
					aria-hidden="true">
					<div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
						<div className="modal-content">
							<div className="modal-header bg-success text-white">
								<h1
									className="modal-title fs-5"
									id="exampleModalLabel-add-item">
									<i className="bi bi-postcard" /> | New
									Product Registry Form
								</h1>
								<button
									onClick={() => display_products()}
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
											<div className="form-floating col-md-12">
												<select
													type="text"
													className="form-control"
													id="category_id"
													name="category_id"
													placeholder="#"
													onChange={(e) =>
														set_product_category_id(
															e.target.value
														)
													}
													required>
													<option>
														Non-selected
													</option>
													{categories.map(
														(category) => (
															<>
																<option
																	key={
																		category.id
																	}
																	value={
																		category.id
																	}>
																	{
																		category.name
																	}
																</option>
															</>
														)
													)}
												</select>
												<label htmlFor="category_id">
													Category Name
												</label>
											</div>
											<br />
											<div className="form-floating col-md-12">
												<input
													onChange={(e) =>
														set_product_description(
															e.target.value
														)
													}
													type="text"
													className="form-control"
													id="description"
													name="description"
													placeholder="#"
													required
												/>
												<label htmlFor="description">
													Description/Name
												</label>
											</div>
											<br />
											<div className="form-floating col-md-12">
												<textarea
													onChange={(e) =>
														set_product_specification(
															e.target.value
														)
													}
													type="text"
													className="form-control"
													id="specs"
													name="specs"
													placeholder="#"
													required
													defaultValue={""}
												/>
												<label htmlFor="specs">
													Product Specification
												</label>
											</div>
											<br />
											<div className="row g-3">
												<div className="col-sm-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_unit_price(
																	e.target
																		.value
																)
															}
															type="number"
															className="form-control"
															id="unit_price"
															name="unit_price"
															placeholder="#"
															required
														/>
														<label htmlFor="unit_price">
															Unit Price PhP
														</label>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_unit(
																	e.target
																		.value
																)
															}
															type="text"
															className="form-control"
															id="unit"
															name="unit"
															placeholder="#"
															defaultValue="pcs"
															required
														/>
														<label htmlFor="discount_p">
															Unit
														</label>
													</div>
												</div>
											</div>
											<br />
											<div className="row g-3">
												<div className="col-sm-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_qty(
																	e.target
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
															Actual On-hand Qty
														</label>
													</div>
												</div>
												<div className="col-md-6">
													<div className="form-floating">
														<input
															onChange={(e) =>
																set_product_qty_sold(
																	e.target
																		.value
																)
															}
															type="number"
															className="form-control"
															id="sold"
															name="sold"
															placeholder="#"
															defaultValue="0"
															required
														/>
														<label htmlFor="sold">
															Sold Qty
														</label>
													</div>
												</div>
											</div>
										</div>
										<div
											className="col-md-4 border border-start-2 border-end-0 border-top-0 border-bottom-0"
											id="product-image-div">
											<div
												className={`form-floating col-md-12 mb-3 ${add_picture_hide}`}>
												<input
													onChange={(e) => {
														setImagePath(e)
													}}
													type="file"
													accept=".jpg"
													className={`form-control`}
													id="product-image-filename1"
													placeholder="#"
													required
												/>
												<label
													htmlFor="first_name"
													className="mb-1">
													<i className="bi bi-camera" />
													Add a Product Picture
												</label>
											</div>
											<div id="list of pictures">
												{product_pictures.length < 1 ? (
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
															}}>
															<button
																type="button"
																className="btn btn-outline-secondary border border-0"
																style={{
																	padding: 0,
																}}
																disabled>
																{" "}
																<i className="bi bi-trash" />{" "}
															</button>
														</div>
													</div>
												) : (
													<></>
												)}

												{product_pictures.map(
													(picture) => (
														<div key={picture.id}>
															<div className="mx-auto w-100">
																<img
																	width="100%"
																	className="img-thumbnail"
																	src={`${picture.img}`}
																	alt="please select a product"
																	srcSet=""
																/>
															</div>
															<div
																className="mx-auto  mb-3"
																style={{
																	width: 15,
																}}>
																<button
																	onClick={() =>
																		deleteProductPicture(
																			picture
																		)
																	}
																	type="button"
																	className="btn btn-outline-danger border border-0"
																	style={{
																		padding: 0,
																	}}>
																	{" "}
																	<i className="bi bi-trash" />{" "}
																</button>
															</div>
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
									onClick={() => display_products()}
									type="button"
									className="btn btn-secondary"
									data-bs-dismiss="modal">
									Close
								</button>
								<button
									className={`btn btn-primary ${save_btn_hide}`}
									onClick={() => saveNewProduct()}>
									&nbsp;&nbsp;
									<i className="bi bi-database-add" />
									&nbsp; Save &nbsp;&nbsp;
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default SellerProductsSearch
