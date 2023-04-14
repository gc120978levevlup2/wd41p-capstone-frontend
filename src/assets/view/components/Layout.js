import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import MenuView from "./MenuView"

const Layout = () => {
	return (
		<>
			<div className="text-white">
				<MenuView />
			</div>
			<div
				className="text-white fixed-top"
				style={{
					paddingTop: "87px",
					backgroundImage: "url(/assets/img/bg1.jpg)",
					backgroundRepeat: "repeat",
					backgroundSize: "100vw 100vh",
					minHeight: "100vh",
					zIndex: "0",
				}}></div>
			<div
				className="text-white fixed-top"
				style={{
					paddingTop: "87px",
					backdropFilter: "blur(15px)",
					backgroundImage:
						"linear-gradient(rgba(25, 25, 25,1), rgba(5, 5, 5,0.1))",
					minHeight: "100vh",
					zIndex: "0",
				}}></div>
			<div className="container-fluid grid-container">
				<div style={{ overflowX: "hidden" }} id="main-body-container">
					<Outlet />
				</div>
				<div>
					<Footer />
				</div>
			</div>
		</>
	)
}

export default Layout
