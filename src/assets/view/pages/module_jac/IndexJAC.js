import React, { useEffect, useState } from "react"
import { psalm } from "../../../model/zdata.js"
import { psalm_search_submit } from "../../../controller/submit/psalm_search_submit.js"

function stripHtml(html) {
	let tmp = document.createElement("DIV")
	tmp.innerHTML = html
	let ret = tmp.textContent || tmp.innerText || ""
	return ret.replace(/[^a-zA-Z ]/g, "").replaceAll(/\s/g, "")
}

const IndexJAC = () => {
	const [psalm_search, set_psalm_search] = useState(psalm)
	const [xsearch, set_search] = useState("")
	useEffect(() => {
		psalm_search_submit(
			() => {},
			(out) => {
				if (out.search) {
					let search = stripHtml(out.search.toUpperCase())
					set_search(search)
					let a = psalm.filter((x) =>
						stripHtml(x.content.toUpperCase()).includes(search)
					)
					set_psalm_search(a)
				}
			}
		)
	}, [xsearch])
	return (
		<>
			<div
				id="main-body"
				style={{
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
									className="rounded-circle shadow"
									width="80px"
									height="80px"
									src="/assets/module_jac/img/psalms-logo.jpg"
									alt="sdfsf"
								/>
								&nbsp;&nbsp;
								<h1 className="text-success m-auto">
									Book of Psalms
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
							className="row row-cols-md-9 row-cols-lg-10 row-cols-xl-12 row-cols-xxl-12 text-black"
							id="psalm-buttons">
							{psalm_search.map((book, i) => (
								<div className="col p-2 d-flex" key={i}>
									<button
										type="button"
										className="btn btn-success p-3 m-auto"
										style={{ width: "160px" }}
										id={`psalm-${book.number}`}
										data-bs-toggle="modal"
										data-bs-target={`#staticBackdrop2-${book.number}`}>
										Psalm {book.number}
									</button>

									<div
										className="modal fade"
										id={`staticBackdrop2-${book.number}`}
										data-bs-backdrop="static"
										data-bs-keyboard="false"
										tabIndex="-1"
										aria-labelledby={`#staticBackdropLabel-${book.number}`}
										aria-hidden="true">
										<div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
											<div className="modal-content">
												<div className="modal-header bg-primary-subtle">
													<h5
														className="modal-title"
														id={`staticBackdropLabel-${book.number}`}>
														Psalm {book.number}
													</h5>
													<button
														type="button"
														className="btn-close"
														data-bs-dismiss="modal"
														aria-label="Close"></button>
												</div>
												<div className="modal-body">
													{
														<div
															dangerouslySetInnerHTML={{
																__html: book.content,
															}}
														/>
													}
												</div>
												<div className="modal-footer">
													<button
														className="btn btn-outline-primary"
														style={{
															float: "left",
															width: 130,
														}}
														data-bs-dismiss="modal"
														data-bs-toggle="modal"
														data-bs-target={`#staticBackdrop2-${
															book.number - 1
														}`}>
														<i className="bi bi-arrow-bar-left" />
														Previous
													</button>

													<button
														className="btn btn-outline-primary"
														style={{
															float: "left",
															width: 130,
														}}
														data-bs-dismiss="modal"
														data-bs-toggle="modal"
														data-bs-target={`#staticBackdrop2-${
															book.number + 1
														}`}>
														<i className="bi bi-arrow-bar-right" />
														Next
													</button>

													<button
														className="btn btn-outline-danger "
														data-bs-dismiss="modal">
														Close
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
						{/* Put more html content here between */}
					</div>
				</div>
			</div>
		</>
	)
}

export default IndexJAC
