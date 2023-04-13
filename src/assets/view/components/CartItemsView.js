import { getRating } from "../../controller/misc/misc"
import {
	create_cart_items_local,
	read_cart_items_local,
} from "../../model/local/cart_items"
import { delete_cart_item } from "../../model/remote/shopping_cart"

const CartItemsView = ({ items }) => {
	function deleteCart(id) {
		delete_cart_item(id, () => {
			read_cart_items_local((data) => {
				items = [...data.filter((x) => x.id !== id)]
				create_cart_items_local(items)
				window.location.reload()
			})
		})
	}
	return items.length > 0 ? (
		<>
			{items.map((item, i) => (
				<>
					<div className="col mb-3" style={{ color: "gray" }}>
						<div
							className="card mb-3 border-1 p-0 position-relative shadow mx-auto"
							style={{ width: 250 }}>
							{item.on_sale ? (
								<>
									<img
										height="70px"
										src="/assets/view/img/sale.png"
										alt="on sale"
										className="position-absolute top-0 start-0"
									/>
								</>
							) : (
								<></>
							)}
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
									src={`${item.items.main_image}`}
									alt={`${item.items.main_image}`}
									style={{ minHeight: 150 }}
									data-bs-toggle="modal"
									data-bs-target={`#staticBackdrop-${item.id}`}
								/>
							</div>
							<div
								className="card-body"
								align="center"
								style={{ paddingTop: 1 }}>
								<a
									className="desc-selection"
									href={`/search?search=${item.items.id}`}>
									<h4
										className="d-flex align-middle desc-selection card-title"
										style={{
											height: 30,
											overflowY: "hidden",
											marginBottom: 1,
										}}>
										{item.items.description}
									</h4>
								</a>
								<p
									className="card-text"
									style={{
										height: 75,
										overflowY: "hidden",
										marginBottom: 0,
									}}>
									{item.items.specs}
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
											₱ {item.unit_price.toLocaleString()}{" "}
										</i>{" "}
									</b>{" "}
								</h4>
								{item.on_sale ? (
									<>
										<p
											className="card-text"
											style={{
												height: 25,
												overflowY: "hidden",
												whiteSpace: "nowrap",
												marginBottom: 0,
											}}>
											<small className="text-muted">
												promo {item.discount_p}% off{" "}
												<span className="text-decoration-line-through">
													<b>
														₱{" "}
														{(
															item.unit_price /
															((100 -
																item.discount_p) /
																100)
														).toLocaleString()}
													</b>
												</span>
											</small>
										</p>
									</>
								) : (
									<>
										<p
											className="card-text text-white"
											style={{
												height: 25,
												overflowY: "hidden",
												marginBottom: 0,
											}}>
											x
										</p>
									</>
								)}
								<div
									align="center"
									className="d-flex flex-row justify-content-center"
									style={{ height: 30, padding: 0 }}>
									<div className="p-1">
										Sold
										<span className="badge bg-success">
											{item.items.sold}
										</span>
									</div>
									<div className="p-1">
										Available
										<span className="badge bg-danger">
											{item.items.qty - item.items.sold}
										</span>
									</div>
								</div>
								<div
									style={{ height: 40, overflowY: "hidden" }}>
									<span style={{ fontSize: 10 }}>
										{item.items.sellers.name}
									</span>
									<p style={{ fontSize: 10 }}>
										{item.items.sellers.address}
									</p>
								</div>
								<div
									style={{ height: 30, overflowY: "hidden" }}>
									{getRating(item.items.review_rate)}
								</div>
								<div className="row g-1">
									<div className="col-12">
										<button
											type="button"
											className="btn btn-outline-danger w-100"
											id={`${i}`}
											data-bs-toggle="modal"
											data-bs-target={`#staticBackdrop2-${item.id}`}>
											<i className="bi bi-cart-x" />
											Remove From Cart
										</button>
									</div>
								</div>
							</div>
						</div>
						{/* Modal */}
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
											{item.items.description}
										</h5>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										/>
									</div>
									<div className="modal-body">
										{JSON.parse(item.items.images).map(
											(file) => (
												<>
													<img
														width="100%"
														src={`${file}`}
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
						{/* Modal */}
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
										<h6
											className="modal-title text-white"
											id="staticBackdropLabel">
											<span style={{ fontSize: 30 }}>
												<i className="bi bi-cart" />
											</span>
											Are you sure you want{" "}
											{item.items.description} to be
											deleted from Cart?
										</h6>
										<button
											type="button"
											className="btn-close"
											data-bs-dismiss="modal"
											aria-label="Close"
										/>
									</div>
									<div className="modal-body">
										<img
											width="100%"
											src={`${
												JSON.parse(item.items.images)[0]
											}`}
											alt="xxx"
										/>
										<br />
										<br />
									</div>
									<div
										className="modal-footer"
										id={`del-cart-${item.id}`}>
										<button
											onClick={() => deleteCart(item.id)}
											className="btn btn-outline-danger "
											data-bs-dismiss="modal">
											YES
										</button>
									</div>
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
			<h3 className="text-black">[No Available Items on the Cart]</h3>
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
	)
}

export default CartItemsView
