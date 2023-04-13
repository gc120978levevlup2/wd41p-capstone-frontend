const CategoriesView = ({ categories }) => {
	return (
		<>
			{categories.length > 0 ? (
				<>
					{categories.map((value, i) => (
						<div
							className="col mb-5 category-list"
							style={{ color: "gray" }}>
							<a href={`/categories?id=${value.id}`}>
								<div
									className="card mx-auto  categories-selection shadow"
									style={{ width: 250, height: 215 }}>
									<div
										className="mx-auto shadow border border-2"
										style={{
											width: "100%",
											height: 100,
											overflow: "hidden",
										}}>
										<img
											width="100%"
											style={{}}
											src={`${value.image}`}
											className="card-img-top1"
											alt="..."
										/>
									</div>
									<div className="card-body">
										<h5 className="card-title text-center">
											{value.name}
										</h5>
										<p
											className="card-text text-center"
											style={{ height: 45 }}>
											{value.desc}
										</p>
									</div>
								</div>
							</a>
						</div>
					))}
				</>
			) : (
				<>
					<br />
					<h3 className="text-black">
						[No Available Categories Registered]
					</h3>
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
			)}
		</>
	)
}

export default CategoriesView
