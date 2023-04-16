import React from "react"

const Tos = () => {
	return (
		<div
			className="container-fluid d-flex w-100 p-0"
			style={{
				position: "relative",
				zIndex: 10,
				overflow: "hidden",
				minHeight: "calc(100vh + 60px)",
			}}>
			<div className="w-100">
				<div
					className="container mt-5"
					style={{ overflow: "hidden", width: "100%" }}>
					<div className="row g-2 w-100 mt-5 px-3">
						<div
							className="container"
							style={{ fontSize: "larger" }}>
							<div className="row">
								<div
									className="col-sm-5 d-none d-lg-block"
									id="myScrollspy">
									<div className="list-group">
										<a
											className="list-group-item list-group-item-action"
											href="#section1">
											Terms of Service
										</a>
										<a
											className="list-group-item list-group-item-action"
											href="#section0">
											Introduction
										</a>
										<a
											className="list-group-item list-group-item-action"
											href="#section2">
											Product Descriptions
										</a>
										<a
											className="list-group-item list-group-item-action"
											href="#section3">
											Shipping and Delivery
										</a>
										<a
											className="list-group-item list-group-item-action"
											href="#section4">
											Disclaimer of Warranties
										</a>
									</div>
								</div>
								<div className="col-sm-7">
									<div id="section1">
										<br />
										<br />
										<h2 className="mb-5">
											<i>
												<b>
													<h1>Terms of Service</h1>
												</b>
											</i>
										</h2>
										<div className="row mb-5">
											<div className="col-12">
												<h2>Introduction</h2>
												<p>
													These Terms of Service
													(“Terms”) govern your use of
													<b>3CCCi</b>
													website and online store
													(collectively, the
													“Service”). By using the
													Service, you agree to be
													bound by these Terms. If you
													do not agree to these Terms,
													do not use the Service.
												</p>
												<h2>Eligibility</h2>
												<p>
													You must be at least 18
													years old to use the
													Service. By using the
													Service, you represent and
													warrant that you have the
													right, authority, and
													capacity to enter into these
													Terms and to abide by all of
													the terms and conditions set
													forth herein.
												</p>
											</div>
										</div>
									</div>
									<div id="section2">
										<br />
										<hr />
										<br />
										<h2>Product Descriptions</h2>
										<p>
											<b>3CCCi</b> attempts to be as
											accurate as possible in its product
											descriptions. However, <b>3CCCi</b>{" "}
											does not warrant that product
											descriptions or other content of the
											Service are accurate, complete,
											reliable, current, or error-free.
										</p>
										<h2>Pricing</h2>
										<p>
											All prices are shown in Philippine
											Peso. <b>3CCCi</b> reserves the
											right to change its prices at any
											time without notice.
										</p>
										<h2>Payment Terms</h2>
										<p>
											You agree to pay all fees and
											charges incurred in connection with
											your use of the Service, including
											all appliscable taxes.
											<b>3CCCi</b> accepts
											Cash-on-Delivery and Credit Card
											method of payment. If you dispute
											any charges, you must notify
											<b>3CCCi</b> within 30 days time
											frame.
										</p>
									</div>
									<div id="section3">
										<br />
										<hr />
										<br />
										<h2>Shipping and Delivery</h2>
										<p>
											<b>3CCCi</b> will use commercially
											reasonable efforts to deliver
											products purchased through the
											Service within the estimated
											delivery time indicated at the time
											of purchase, but
											<b>3CCCi</b> does not guarantee
											delivery by that date.
										</p>
										<h2>Returns and Refunds</h2>
										<p>
											<a href="retpol.html">
												Go to this Link
											</a>
										</p>
										<h2>Intellectual Property</h2>
										<p>
											The Service and its entire contents,
											features, and functionality,
											including but not limited to all
											information, software, text,
											displays, images, video, and audio,
											and the design, selection, and
											arrangement thereof, are owned by
											<b>3CCCi</b>, its licensors, or
											other providers of such material and
											are protected by United States and
											international copyright, trademark,
											patent, trade secret, and other
											intellectual property or proprietary
											rights laws.
										</p>
									</div>
									<div id="section4">
										<br />
										<hr />
										<br />
										<h2>Disclaimer of Warranties</h2>
										<p>
											The Service is provided on an “as
											is” and “as available” basis.
											<b>3CCCi</b> makes no
											representations or warranties of any
											kind, express or implied, as to the
											operation of the Service or the
											information, content, materials, or
											products included on the Service.
										</p>
										<br />
										<br />
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

export default Tos
