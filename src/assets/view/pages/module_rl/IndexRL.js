import React from "react"
import "./style.css"

const IndexRL = () => {
	return (
		<>
			<div
				id="main-body"
				style={{
					color: "black",
					overflow: "hidden",
					backgroundColor: "rgba(234, 229, 208, 0.51)",
					padding: "10",
				}}>
				<div id="contents">
					<div className="container">
						<header
							className="d-flex justify-content-sm-between"
							style={{ backgroundColor: "rgb(255, 252, 240)" }}>
							<div className="d-flex flex-wrap justify-content-center p-3">
								<img
									className="rounded p-2"
									height="80px"
									src="/assets/module_rl/images/logo-no-background-removebg-preview.png"
									alt="sdfsf"
								/>
								&nbsp;&nbsp;
								<h1 className="text-success m-auto">
									Local Harvest
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

						<div>
							<section id="banner">
								<div className="container">
									<div className="row">
										<div className="col-md-6">
											<p className="promo-title">
												Your Online Fresh Market
											</p>
											<p>
												Local Harvest is an online
												farmers market that provides
												customers with a selection of
												fresh, locally grown produce. We
												offer a variety of organic and
												conventional fruits and
												vegetables that can be ordered
												online and delivered right to
												your door. It is also a
												delicious and healthy choice of
												fruits and vegetables. With a
												variety of flavors and textures,
												you can find something to
												satisfy everyone's tastebuds.
												Enjoy the sweet and juice taste
												of nature's best with local
												harvest.
											</p>
											<a href="#">
												<img
													src="/assets/module_rl/images/play.png"
													className="play-btn"
												/>
												Watch Reviews
											</a>
										</div>
										<div className="col-md-6 text-center">
											<img
												src="/assets/module_rl/images/home2.png"
												className="img-fluid"
											/>
										</div>
									</div>
								</div>
							</section>
							<br />
							<br />
							{/*----------------------Products-------------------------*/}
							<section id="products">
								<br />
								<br />
								<br />
								<div className="container text-center">
									<div className="row">
										<div className="col-12 textcenter pb-5">
											<a href="/assets/module_rl/merchandise.html">
												<h2 className="section-title">
													OUR PRODUCTS
												</h2>
											</a>
											<p className="section-subtitle">
												Locally grown fruits and
												vegetables are very important
												for people to consume. They are
												fresher and more nutritious
												because they are picked at the
												peak of ripeness and don't have
												to travel long distances to get
												to market.
											</p>
										</div>
										<div className="col-sm-6 col-lg-4 mb-4">
											<a
												href="images/lemon.png"
												data-lightbox="image"
												data-title="Lemon">
												<img
													src="/assets/module_rl/images/lemon.png"
													className="img-fluid rounded-3"
												/>
											</a>
										</div>
										<div className="col-sm-6 col-lg-4 mb-4">
											<a
												href="images/corn.png"
												data-lightbox="image"
												data-title="Corn">
												<img
													src="/assets/module_rl/images/corn.png"
													className="img-fluid rounded-3"
												/>
											</a>
										</div>
										<div className="col-sm-6 col-lg-4 mb-4">
											<a
												href="images/cabbage.png"
												data-lightbox="image"
												data-title="Cabbage">
												<img
													src="/assets/module_rl/images/cabbage.png"
													className="img-fluid rounded-3"
												/>
											</a>
										</div>
										<div className="col-sm-6 col-lg-4 mb-4">
											<a
												href="images/tomatoes.png"
												data-lightbox="image"
												data-title="Tomatoes">
												<img
													src="/assets/module_rl/images/tomatoes.png"
													className="img-fluid rounded-3"
												/>
											</a>
										</div>
										<div className="col-sm-6 col-lg-4 mb-4">
											<a
												href="images/eggplant.png"
												data-lightbox="image"
												data-title="Eggplant">
												<img
													src="/assets/module_rl/images/eggplant.png"
													className="img-fluid rounded-3"
												/>
											</a>
										</div>
										<div className="col-sm-6 col-lg-4 mb-4">
											<a
												href="images/potatoes.png"
												data-lightbox="image"
												data-title="Potatoes">
												<img
													src="/assets/module_rl/images/potatoes.png"
													className="img-fluid rounded-3"
												/>
											</a>
										</div>
									</div>
								</div>
							</section>
							{/*--------------Services Section-----------------*/}
							<section id="services">
								<br />
								<div className="container text-center">
									<h1 className="title">WHAT WE DO?</h1>
									<div className="row text-center">
										<div className="col-md-4 services">
											<img
												src="/assets/module_rl/images/services1.png"
												className="services-img"
											/>
											<h4>
												Online Shopping by mobile phone
											</h4>
											<p>
												Online shopping by mobile phone
												is a convenient and simple way
												to purchase items from any store
												or website. With a mobile phone,
												users can access a store or
												website, browse products, make
												purchases and pay for them
												securely. The process of online
												shopping by mobile phone is
												typically the same as that of a
												regular online shopping
												experience, but with the
												additional convenience of being
												able to access the store or
												website from anywhere with a
												mobile phone. This means that
												users can shop while they are on
												the go, whether they are at home
												or travelling.
											</p>
										</div>
										<div className="col-md-4 services">
											<img
												src="/assets/module_rl/images/payment1.png"
												className="services-img"
											/>
											<h4>Payment Processing</h4>
											<p>
												Secure payment processing for
												customers and sellers. Payment
												processing varieties include
												credit cards, debit cards,
												e-wallets, bank transfers, and
												cash on delivery.
											</p>
										</div>
										<div className="col-md-4 services">
											<img
												src="/assets/module_rl/images/shipping1.png"
												className="services-img"
											/>
											<h4>Shipping &amp; Delivery</h4>
											<p>
												Our Shipping and Delivery Policy
												is designed to provide the best
												possible experience for our
												customers. We use a variety of
												methods to ensure that your
												orders arrive as quickly and
												safely as possible right at your
												doorstep.
											</p>
										</div>
									</div>
									<button
										type="button"
										className="btn btn-primary">
										All Services
									</button>
								</div>
							</section>
							{/*-----------------About Us-------------*/}
							<section id="about-us">
								<br />
								<br />
								<br />
								<div className="container">
									<h1 className="title text-center">
										WHY CHOOSE US?
									</h1>
									<div className="row">
										<div className="col-md-6 about-us">
											<div className="col-md-6" />
											<p className="about-title">
												Why we're different
											</p>
											<ul>
												<li>
													<b>Convenience:</b> Shopping
													for vegetables and fruits
													online is much more
													convenient than going to a
													store. You can shop from the
													comfort of your own home,
													without having to worry
													about traffic or crowds.
												</li>
												<li>
													<b>Variety:</b> Online
													marketplaces usually have a
													much wider selection of
													fruits and vegetables than
													any physical store. You can
													find rare and exotic
													varieties that you likely
													wouldn't find in a regular
													grocery store.
												</li>
												<li>
													<b>Quality:</b> Online
													marketplaces often have
													better quality produce than
													what you'd find in stores.
													This is because they have
													more stringent quality
													control practices in place
												</li>
												<li>
													<b>Price:</b> Online
													marketplaces tend to have
													lower prices than
													traditional stores, due to
													their lack of overhead costs
													such as rent, utilities, and
													staffing.
												</li>
												<li>
													<b>Delivery:</b> Many online
													marketplaces offer delivery
													services, so you don't even
													have to leave your house to
													get fresh produce.
												</li>
											</ul>
										</div>
									</div>
								</div>
							</section>
							{/*----------------Testimonials---------------------------*/}
							<section id="testimonials">
								<br />
								<br />
								<br />
								<div className="container">
									<h1 className="title text-center">
										WHAT CLIENTS SAY?
									</h1>
									<div clas="row offset-1">
										<div className="col-md-5 testimonials">
											<p>
												As a small business owner, I
												appreciate the low prices and
												wide selection of fresh fruits
												and vegetables offered by this
												business. Their quality is
												always top-notch and their
												customer service is friendly and
												attentive.!
											</p>
											<img src="/assets/module_rl/images/user2.jpg" />
											<p className="user-details">
												<b>Jeca</b>
												<br />
												President of CHRV
											</p>
										</div>
										<div className="col-md-5 testimonials">
											<p>
												The vegetable and fruits
												marketplace has the freshest
												produce around. I'm so impressed
												with the selection and quality!
											</p>
											<img src="/assets/module_rl/images/user1.jpg" />
											<p className="user-details">
												<b>Mark Angelo</b>
												<br />
												Local buyer
											</p>
										</div>
										<div className="col-md-5 testimonials">
											<p>
												I've been a customer of this
												business for over 5 months and I
												can confidently say that their
												fruits and vegetables are always
												fresh and of the highest
												quality. They have a wide
												variety of products and the
												staff is always helpful and
												friendly. Highly recommend!
											</p>
											<img src="/assets/module_rl/images/user3.jpg" />
											<p className="user-details">
												<b>Kenneth Joe Tham</b>
												<br />
												CEO of XYZ
											</p>
										</div>
										<div className="col-md-5 testimonials">
											<p>
												I'm always impressed with the
												selection of fresh fruits and
												vegetables this business offers.
												They have the best prices in
												town and the quality of their
												produce is unmatched. I'm a
												regular customer and I highly
												recommend their services!
											</p>
											<img src="/assets/module_rl/images/user4.jpg" />
											<p className="user-details">
												<b>Jigs Jordison</b>
												<br />
												Director of MV marketing
											</p>
										</div>
									</div>
								</div>
							</section>
							{/*---------Social Media section----------*/}
							<section id="social-media">
								<div className="container text-center">
									<p>FIND US ON SOCIAL MEDIA</p>
									<div className="social-icons">
										<a href="#">
											<img src="/assets/module_rl/images/facebook-icon.png" />
										</a>
										<a href="#">
											<img src="/assets/module_rl/images/instagram-icon.png" />
										</a>
										<a href="#">
											<img src="/assets/module_rl/images/twitter-icon.png" />
										</a>
										<a href="#">
											<img src="/assets/module_rl/images/whatsapp-icon.png" />
										</a>
									</div>
								</div>
							</section>
							{/*------------footer section-------------*/}
							<section id="footer1">
								<br />
								<br />
								<br />
								<div className="container">
									<div className="row">
										<div className="col-md-4 footer-box">
											<img src="/assets/module_rl/images/logo-no-background-removebg-preview.png" />
											<p>
												Local Harvest is an online
												farmers market that provides
												customers with a selection of
												fresh, locally grown produce. We
												offer a variety of organic and
												conventional fruits and
												vegetables that can be ordered
												online and delivered right to
												your door.
											</p>
										</div>
										<div className="col-md-4 footer-box">
											<p>
												<b>Contact Us</b>
											</p>
											<p>
												<i className="fa fa-map-marker" />
												Langkaan II Dasmarinas, Cavite,
												41140
											</p>
											<p>
												<i className="fa fa-phone" />
												+046 440 5023
											</p>
											<p>
												<i className="fa fa-envelope-o" />
												localharvest@gmail.com
											</p>
										</div>
										<div className="col-md-4 footer-box">
											<p>
												<b>Get Updated</b>
											</p>
											<div className="container">
												<div className="row">
													<form action="#">
														<div className="email">
															<div className="text">
																Email *
															</div>
															<input
																type="email"
																required
															/>
														</div>
														<div className="msg">
															<div className="text">
																Message *
															</div>
															<textarea
																rows={2}
																cols={25}
																required
																defaultValue={
																	""
																}
															/>
														</div>
														<div className="form-submit-btn">
															<button className="btn btn-outline-success">
																Send
															</button>
														</div>
													</form>
												</div>
											</div>
										</div>
										<hr />
										<p className="copyright">
											Created By rslogdat | © 2023 All
											rights reserved
										</p>
									</div>
								</div>
							</section>
						</div>

						{/* Put more html content here between */}
					</div>
				</div>
			</div>
		</>
	)
}

export default IndexRL
