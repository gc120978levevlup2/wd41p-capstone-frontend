import React from "react"
import { useState, useEffect, useRef } from "react"
import $ from "jquery"
import Carousel from "react-bootstrap/Carousel"

const Index = () => {
	const inputElement = useRef(null)
	useEffect(() => {}, [])
	return (
		<>
			<div
				className="container-fluid d-flex"
				style={{
					//backgroundColor: "rgb(23,32,23,0.65)",
					backgroundImage:
						"linear-gradient(rgba(25, 25, 25,0.8),rgba(25, 25, 25,0.8),rgba(25, 25, 25,0.8), rgba(25, 25, 25,0))",
					backdropFilter: "blur(15px)",
					zIndex: 100,
					position: "relative",
					overflow: "hidden",
					minHeight: "calc(100vh + 60px)",
				}}>
				<div className="m-auto">
					<div
						className="container "
						style={{ overflow: "hidden", height: "100%" }}>
						<div className="row">
							<div className="col-lg-7 d-flex col d-lg-none">
								<div
									className="rounded m-auto"
									style={{ overflow: "hidden" }}>
									<br />
									<br />
									<br />
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
							<div className="col-lg-5 text-white">
								<div className="mb-lg-5 h-100 d-flex align-items-center">
									<div className="row">
										<h1 className="text-center align-middle">
											<b>
												<i>
													3-Corners Community
													Cooperative Inc
												</i>
											</b>
											.
										</h1>
										<h5 className="text-center align-middle">
											We are a community cooperative that
											champions{" "}
											<b>
												<i>Animal Welfare</i>
											</b>
											, promotes healthy{" "}
											<b>
												<i>Fresh Harvest Food</i>
											</b>
											, and adheres to{" "}
											<b>
												<i>Spiritual Wellness</i>
											</b>
											.
										</h5>
										<div className="row mt-3 text-center">
											<div className="col-lg-4">
												<div className="index-button-logo">
													<a href="/paws">
														<img
															className="rounded-circle shadow"
															width="80px"
															src="/assets/module_ds/paws1.jpg"
															alt=""
														/>
														<p>
															Community Helping
															Paws
														</p>
													</a>
												</div>
											</div>
											<div className="col-lg-5">
												<div className="index-button-logo">
													<a href="/localharvest">
														<div
															className="rounded bg-white p-1 mx-auto"
															style={{
																overflow:
																	"hidden",
																maxWidth: 200,
															}}>
															<img
																className="rounded"
																width="100%"
																height="80px"
																src="/assets/module_rl/images/logo-no-background-removebg-preview.png"
																alt=""
															/>
														</div>
														<p className="mt-2">
															Local Harvest
														</p>
													</a>
												</div>
											</div>
											<div className="col-lg-3">
												<div className="index-button-logo w-100">
													<a href="/psalms">
														<img
															alt=""
															className="rounded-circle shadow"
															width="80px"
															height="80px"
															src="assets/module_jac/img/psalms-logo.jpg"
														/>
														<p>Book of Psalms</p>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
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
													We got pet friendly
													products.
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
													We also got fresh farm
													products.
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
													The word of God is the
													strongest pillar.
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
													We have straight from the
													farm products.
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
													Your paw buddy is properly
													cared here.
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

			<div
				className="container inner d-flex text-white"
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
						<div className="row">
							<div className="col-lg-3">
								<div className="mb-2 mb-lg-3 mt-sm-3">
									<div className="garry">
										<div className="row mt-3 text-center g-2">
											<div className="row-lg-12 mb-5"></div>
											<div className="row-lg-12 mb-5">
												<div className=" text-white index-button-logo3">
													<a href="/paws">
														<img
															className="rounded-circle shadow"
															width="80px"
															src="/assets/module_ds/paws1.jpg"
															alt=""
														/>
														<p className="">
															Community Helping
															Paws
														</p>
													</a>
												</div>
											</div>
											<div className="row-lg-12 mb-5">
												<div className="index-button-logo3">
													<a href="/localharvest">
														<div className="rounded bg-white p-1">
															<img
																className="rounded"
																width="140px"
																height="80px"
																src="/assets/module_rl/images/logo-no-background-removebg-preview.png"
																alt=""
															/>
														</div>
														<p className="mt-2">
															Local Harvest
														</p>
													</a>
												</div>
											</div>
											<div className="row-lg-12 mb-5">
												<div className="index-button-logo3 w-100">
													<a href="/psalms">
														<img
															className="rounded-circle shadow"
															width="80px"
															height="80px"
															src="assets/module_jac/img/psalms-logo.jpg"
															alt=""
														/>
														<p>Book of Psalms</p>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-9">
								<div className="mb-lg-5 h-100 d-flex align-items-center">
									<div className="row">
										<h1 className="text-center align-middle">
											<b>
												<i>Why we exist?</i>
											</b>
										</h1>
										<h5 className="text-center align-middle">
											We exist because we want to be able
											to help the community care for their
											pet buddies and to care for those
											unfortunate animals that nobody
											cares.
										</h5>
										<h5 className="text-center align-middle">
											We want also to raise awareness to
											the community regarding the
											importance of consuming fresh
											harvested products. We support the
											organic farmers and facilitates to
											market their fresh produce.
										</h5>
										<h5 className="text-center align-middle">
											We want also to promote the
											importance of the food for the soul
											which is the word of God. We support
											through The Book Of Psalms
											organization in spreading the word
											of the Lord.
										</h5>
										<br />
										<h1 className="text-center align-middle">
											<b>
												<i>How we operate?</i>
											</b>
										</h1>
										<h5 className="text-center align-middle">
											We facilitate in the sale of
											products that is related to our
											cause, and part of the income will
											fund the causes that we believe can
											give meaning to our existence.
										</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

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
						style={{
							overflow: "hidden",
							height: "100%",
						}}>
						<div className="row my-auto">
							<div className="col-lg-7 d-lg-none">
								<div className="mb-2 mb-lg-5 mt-sm-5 shadow rounded">
									<div>
										<img
											width="100%"
											className="rounded"
											src="/assets/view/img/join-us.webp"
											alt=""
										/>
									</div>
								</div>
							</div>
							<div className="col-lg-5">
								<div className="mb-lg-5 h-100 d-flex align-items-center">
									<div className="row">
										<h1 className="text-center align-middle">
											<b>
												<i>Our Mission</i>
											</b>
										</h1>
										<h5 className="text-center align-middle">
											We are driven to help our members to
											easily become entrepreneurs. We
											facilitate a system whereby our
											members can easily buy and sell
											products in any juncture, whether in
											a sari-sari store, meet-ups, food
											arcade etc.
										</h5>
										<div className="row mt-3 text-center">
											<div className="col-lg-12">
												<div className="index-button-logo2">
													<a href="/newseller">
														<img
															className="rounded-circle shadow"
															width="80px"
															src="/assets/view/img/favicon.jpg"
															alt=""
														/>
														<p className="text-white">
															Register Now
														</p>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-7 d-none d-lg-block">
								<div className="mb-2 mb-lg-5 mt-sm-5 shadow rounded">
									<div>
										<img
											width="100%"
											className="rounded"
											src="/assets/view/img/join-us.webp"
											alt=""
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

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
						className="container "
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
											<b>
												<i>Sell with Us!</i>
											</b>
										</h1>
										<h5 className="text-center align-middle">
											Become a certified seller of
											3-Corners Community Cooperative Inc.
											and access the buying powers of our
											member consumers
										</h5>
										<div className="row mt-3 text-center">
											<div className="col-lg-12">
												<div className="index-button-logo2">
													<a href="/newseller">
														<img
															className="rounded-circle shadow"
															width="80px"
															src="/assets/view/img/favicon.jpg"
															alt=""
														/>
														<p className="text-white">
															Become One of Us
														</p>
													</a>
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
						style={{
							overflow: "hidden",
							height: "100%",
						}}>
						<div className="row">
							<h1 className="text-center">The Management Team</h1>
						</div>
						<div className="row">
							<div className="col-lg-12">
								<div className="mb-2 mt-sm-5">
									<div className="row mt-3 text-center">
										<div className="col-lg-3 mb-5">
											<div className="index-button-logo3">
												<a
													target="_blank"
													href="/assets/view/pages/cv/jac-cv.html">
													<img
														className="rounded-circle shadow"
														width="180px"
														src="/assets/view/img/johnc-pic.jpg"
														alt=""
													/>
													<p> </p>
													<h3>
														John Arsenio
														<br /> Cabison{" "}
													</h3>
													<p />
													<hr className="d-none d-lg-block" />
													<p> </p>
													<h5> CEO</h5>
													<p />
												</a>
											</div>
										</div>
										<div className="col-lg-3 mb-5">
											<div className="index-button-logo3">
												<a
													target="_blank"
													href="/assets/view/pages/cv/dave.html">
													<img
														className="rounded-circle shadow"
														width="180px"
														src="/assets/view/img/davesaloria.jpg"
														alt=""
													/>
													<p> </p>
													<h3>
														{" "}
														Dave <br /> Saloria{" "}
													</h3>
													<p />
													<hr className="d-none d-lg-block" />
													<p> </p>
													<h5> VP for Finance</h5>
													<p />
												</a>
											</div>
										</div>
										<div className="col-lg-3 mb-5">
											<div className="index-button-logo3">
												<a
													target="_blank"
													href="/assets/view/pages/cv/rl-cv.html">
													<img
														className="rounded-circle shadow"
														width="180px"
														src="/assets/view/img/reyL.jpg"
														alt=""
													/>
													<p> </p>
													<h3>
														{" "}
														Rey <br /> Logdat{" "}
													</h3>
													<p />
													<hr className="d-none d-lg-block" />
													<p> </p>
													<h5>
														{" "}
														VP for Marketing and
														Sales{" "}
													</h5>
													<p />
												</a>
											</div>
										</div>
										<div className="col-lg-3 mb-5">
											<div className="index-button-logo3">
												<a
													target="_blank"
													href="https://www.garrymcacho.com/cv">
													<img
														className="rounded-circle shadow"
														width="180px"
														src="/assets/view/img/me3.jpg"
														alt=""
													/>
													<p> </p>
													<h3>
														{" "}
														Garry <br /> Cacho{" "}
													</h3>
													<p />
													<hr className="d-none d-lg-block" />
													<p> </p>
													<h5> VP for Operations</h5>
													<p />
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Index
