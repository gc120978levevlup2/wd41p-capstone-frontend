import React from "react"

const Footer = () => {
	return (
		<div
			className="h-100 text-center text-white"
			style={{
				backdropFilter: "blur(15px)",
				backgroundColor: "rgba(2, 2, 2,.623)",
				position: "relative",
				zIndex: 100,
				minHeight: "50vh",
				paddingTop: "87px",
			}}>
			<footer className="text-white">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-1" />
						<div className="col-md-5">
							<h1>
								<img
									height="80px"
									src="/assets/view/img/favicon1.png"
									alt=""
									srcSet=""
									className="rounded-circle"
								/>
								<span
									className="text-warning"
									style={{
										fontWeight: "bolder",
										fontSize: "larger",
									}}>
									<b> 3CCCi </b>
								</span>
							</h1>
							<p>
								Address: 123 Main Street, Anytown, Philippines
								12345
							</p>
							<p>Phone: (123) 456-7890</p>
							<p>
								Email:
								<a href="mailto:info@3ccci.com">
									info@3ccci.com
								</a>
							</p>
						</div>
						<div className="col-md-3">
							<h4>Follow us</h4>
							<ul className="list-inline social-buttons">
								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://web.facebook.com/?_rdc=1&_rdr">
										<i
											className="fa fa-facebook fa-2x"
											aria-hidden="true"
										/>
									</a>
								</li>
								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://twitter.com/">
										<i
											className="fa fa-twitter fa-2x"
											aria-hidden="true"
										/>
									</a>
								</li>
								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://www.instagram.com/reel/CombGXNJXNe/?utm_source=ig_embed&ig_rid=35feef06-6252-4d27-b1bb-bc242803d05a">
										<i
											className="fa fa-instagram fa-2x"
											aria-hidden="true"
										/>
									</a>
								</li>
								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://www.linkedin.com/">
										<i
											className="fa fa-linkedin fa-2x"
											aria-hidden="true"
										/>
									</a>
								</li>
								<li className="list-inline-item">
									<a
										target="_blank"
										href="https://www.twitch.tv/">
										<i
											className="fa fa-twitch fa-2x"
											aria-hidden="true"
										/>
									</a>
								</li>
							</ul>
						</div>
						<div className="col-md-3">
							<h4>Links</h4>
							<ul className="list-unstyled">
								<li>
									<a href="/retpol">
										Return &amp; Refund Policy
									</a>
								</li>
								<li>
									<a href="/privpol">Privacy Policy</a>
								</li>
								<li>
									<a href="/tos">Terms of Service</a>
								</li>
								<li>
									<a href="/aboutus">About Us</a>
								</li>
							</ul>
						</div>
						<br />
						<div className="copyright text-center">
							Copyright © 2023 3CCCi. All rights reserved.
						</div>
						<br />
						<br />
					</div>
				</div>
			</footer>
		</div>
	)
}

export default Footer
