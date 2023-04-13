const StoresView = ({ sellers }) => {
	return (
		<>
			{sellers.length > 0 ? (
				<>
					{sellers.map((value, i) => (
						<div
							className="col mb-5 category-list"
							style={{ color: "gray" }}
							key="{i}">
							<a href={`/stores?id=${value.email1}`}>
								<div
									className="card mx-auto  categories-selection shadow"
									style={{
										width: 250,
										height: 315,
									}}>
									<div
										className="mx-auto shadow border border-2"
										style={{
											width: "100%",
											height: 250,
											overflow: "hidden",
										}}>
										<img
											width="100%"
											style={{}}
											src={`${value.img}`}
											className="card-img-top1"
											alt="..."
										/>
									</div>
									<div className="card-body">
										<h5 className="card-title text-center">
											{value.name}
										</h5>
										<p className="card-text text-center mb-1">
											{value.email1}
										</p>
										<p
											className="card-text text-center mb-1"
											style={{
												fontSize: 10,
											}}>
											{value.address}
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
						[No Available Store Registered]
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

export default StoresView
