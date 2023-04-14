// model
import { delete_user } from "../../model/local/login_user.js"

const Logout = () => {
	let reallyLogout = () => {
		delete_user()
		window.location = "/login"
	}
	return (
		<div
			className="container inner d-flex"
			style={{
				zIndex: 100,
				position: "relative",
				overflow: "hidden",
				minHeight: "calc(100vh + 60px)",
			}}>
			<div className="m-auto">
				<div
					className="container"
					style={{ overflow: "hidden", height: "100%" }}>
					<br />
					<div className="row">
						<div className="col-lg-7">
							<div className="mb-2 mb-lg-5 mt-sm-5 shadow rounded">
								<div>
									<img
										width="100%"
										className="rounded"
										src="/assets/view/img/sell-with-us.avif"
										alt=""
									/>
								</div>
							</div>
						</div>
						<div className="col-lg-5">
							<div className="mb-lg-5 h-100 d-flex align-items-center">
								<div className="row">
									<h1 className="text-center align-middle">
										<i class="bi bi-lock"></i>
									</h1>
									<h1 className="text-center align-middle">
										<b>
											<i>
												Do you really intend to Logout?
											</i>
										</b>
									</h1>
									<h5 className="text-center align-middle">
										Please confirm if you wanted to do so.
										Thank you for visiting us here. We can't
										wait to see you back soon
									</h5>
									<div className="row mt-3 text-center">
										<div className="col-lg-12">
											<div className="index-button-logo2">
												<button
													onClick={() =>
														reallyLogout()
													}
													type="submit"
													className="btn btn-danger px-5">
													<i
														className="fa fa-sign-out fa-lg"
														aria-hidden="true"
													/>
													&nbsp; Logout
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
		</div>
	)
}

export default Logout
