import React from "react"

const IndexDS = () => {
	return (
		<>
			<div
				id="main-body"
				style={{
					position: "relative",
					zIndex: 100,
					overflow: "hidden",
					backgroundColor: "rgba(234, 229, 208, 0.51)",
					padding: "50,10,10,10",
				}}>
				<br />
				<br />
				<div id="contents" className="mt-2">
					<div className="container">
						<header
							className="d-flex justify-content-sm-between"
							style={{ backgroundColor: "rgb(255, 252, 240)" }}>
							<div className="d-flex flex-wrap justify-content-center p-3">
								<img
									className="rounded-circle shadow"
									width="80px"
									height="80px"
									src="/assets/module_ds/paws1.jpg"
									alt="sdfsf"
								/>
								&nbsp;&nbsp;
								<h1 className="text-success m-auto">
									Community Helping Paws
								</h1>
							</div>
							<div className="width:1250px" />
							<div className="d-flex">
								<div className="m-auto">
									<ul className="nav nav-pills">
										<li className="nav-item">
											<a
												href="programs.html"
												className="nav-link text-black fs-5 fw-bolder">
												Programs
											</a>
										</li>
										<li className="nav-item">
											<a
												href="articles.html"
												className="nav-link text-black fs-5 fw-bolder">
												Articles
											</a>
										</li>
									</ul>
								</div>
							</div>
						</header>
						<br />

						{/* Put more html content here in between */}

						<div
							id="myCarousel"
							className="carousel slide rounded-3 shadow"
							data-bs-ride="carousel">
							<div className="carousel-indicators">
								<button
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide-to={0}
									className="active"
									aria-label="Slide 1"
									aria-current="true"
								/>
								<button
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide-to={1}
									aria-label="Slide 2"
									className
								/>
								<button
									type="button"
									data-bs-target="#myCarousel"
									data-bs-slide-to={2}
									aria-label="Slide 3"
									className
								/>
							</div>
							<div className="carousel-inner">
								<div className="carousel-item active">
									<img
										src="/assets/module_ds/whitey.png"
										className="d-block w-100 h-100"
									/>
									<div className="container">
										<div className="carousel-caption text-start">
											<div className="d-sm-none d-md-block">
												<h1>Ways To Help</h1>
												<p>
													We Have Plenty Of Ways For
													You To Help And Get Involve!
												</p>
											</div>
											<p>
												<a
													className="btn btn-lg btn-success"
													href="/assets/view/pages/buyer_signup.html">
													Sign up today
												</a>
											</p>
										</div>
									</div>
								</div>
								<div className="carousel-item">
									<img
										src="/assets/module_ds/dobbie4.png"
										className="d-block w-100 h-100"
									/>
									<div className="container">
										<div className="carousel-caption">
											<div className="d-sm-none d-md-block">
												<h1>
													Shelter, Safety, Second
													Chances
												</h1>
												<p>
													Every dog deserves a second
													chance...of life, hope,
													happiness, and most of all,
													love.
												</p>
											</div>
											<p>
												<a
													className="btn btn-lg btn-success"
													href="#aboutus">
													Learn more of our story!
												</a>
											</p>
										</div>
									</div>
								</div>
								<div className="carousel-item">
									<img
										src="/assets/module_ds/choco1.png"
										className="d-block w-100 h-100"
									/>
									<div className="container">
										<div className="carousel-caption text-start">
											<div className="d-sm-none d-md-block">
												<h1>
													One more for good measure.
												</h1>
												<p>
													Help us give love, hope and
													second chance to dogs in
													need.
												</p>
											</div>
											<p>
												<a
													className="btn btn-lg btn-success"
													href="programs.html">
													Browse Programs
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>
							<button
								className="carousel-control-prev"
								type="button"
								data-bs-target="#myCarousel"
								data-bs-slide="prev">
								<span
									className="carousel-control-prev-icon"
									aria-hidden="true"
								/>
								<span className="visually-hidden">
									Previous
								</span>
							</button>
							<button
								className="carousel-control-next"
								type="button"
								data-bs-target="#myCarousel"
								data-bs-slide="next">
								<span
									className="carousel-control-next-icon"
									aria-hidden="true"
								/>
								<span className="visually-hidden">Next</span>
							</button>
						</div>

						<div id="aboutus">
							<div className="container-fluid px-4 my-0">
								<h2 className="pb-2 border-bottom" />
								<div className="row flex-lg-row-reverse align-items-center g-5 py-5">
									<div className="col-10 col-sm-8 col-lg-6">
										<img
											src="/assets/module_ds/go.png"
											className="d-block mx-lg-auto img-fluid rounded-3 shadow"
											alt="Bootstrap Themes"
											width={700}
											height={500}
											loading="lazy"
										/>
									</div>
									<div className="col-lg-6">
										<h1 className="display-5 fw-bold lh-1 mb-3">
											Bring me home, I'm your best Paw!
										</h1>
										<p className="lead">
											The Community Helping Paws is a team
											of volunteers that build
											relationships within the community
											to bring hope and care for dogs that
											needs a loving family. We are also
											connecting with dog lovers who do
											not have access to key services and
											won't receive them without
											intervention. Providing dog food,
											pet care, bath and additional
											services that our outreach team
											brings. By working together, we can
											make a difference in the lives of
											animals in need.
										</p>
										<div className="d-grid gap-2 d-md-flex justify-content-md-start">
											<p>
												<a
													className="btn btn-lg btn-success"
													href="contactus.html">
													Message Us
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Put more html content here between */}
					</div>
				</div>
			</div>
		</>
	)
}

export default IndexDS
