import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "../view/components/Layout"
import BuyerCheckout from "../view/pages/Buyer/BuyerCheckout"
import BuyerDashboard from "../view/pages/Buyer/BuyerDashboard"
import Categories from "../view/pages/common/Categories"
import Search from "../view/pages/common/Search"
import Stores from "../view/pages/common/Stores"
import Login from "../view/pages/Login"
import Logout from "../view/pages/Logout"
import IndexDS from "../view/pages/module_ds/IndexDS"
import IndexJAC from "../view/pages/module_jac/IndexJAC"
import IndexRL from "../view/pages/module_rl/IndexRL"
import Signup from "../view/pages/Signup"
import NewSeller from "../view/pages/NewSeller"
import SellerProducts from "../view/pages/Seller/SellerProducts"
import SellerOrders from "../view/pages/Seller/SellerOrders"
import SellerOrderProducts from "../view/pages/Seller/SellerOrderProducts"
import SellerCustomers from "../view/pages/Seller/SellerCustomers"
import SellerOrderSearchProduct from "../view/pages/Seller/SellerOrderSearchProduct"
import SellerOrderSummary from "../view/pages/Seller/SellerOrderSummary"
import SellerSuccessCC from "../view/pages/Seller/SellerSuccessCC"
import UserInfo from "../view/pages/UserInfo"
import SellerProductsSearch from "../view/pages/Seller/SellerProductsSearch"
import Index from "../view/pages/Index"
import Retpol from "../view/pages/Others/Retpol"
import Privpol from "../view/pages/Others/Privpol"
import Tos from "../view/pages/Others/Tos"
import Aboutus from "../view/pages/Others/Aboutus"
import SellerPurchaseOrders from "../view/pages/Seller/SellerPurchaseOrders"
const ReactRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Index />} />
					<Route path="/paws" element={<IndexDS />} />
					<Route path="/psalms" element={<IndexJAC />} />
					<Route path="/localharvest" element={<IndexRL />} />
					<Route path="/login" element={<Login />} />
					<Route path="/logout" element={<Logout />} />
					<Route path="/user_info" element={<UserInfo />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/newseller" element={<NewSeller />} />
					<Route path="/stores" element={<Stores />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/search" element={<Search />} />
					<Route
						path="/seller_dashboard"
						element={<SellerOrderSummary />}
					/>
					<Route
						path="/seller_products"
						element={<SellerProducts />}
					/>
					<Route path="/seller_orders" element={<SellerOrders />} />
					<Route
						path="/seller_order_products"
						element={<SellerOrderProducts />}
					/>
					<Route
						path="/seller_order_product_search"
						element={<SellerOrderSearchProduct />}
					/>
					<Route
						path="/seller_product_search"
						element={<SellerProductsSearch />}
					/>
					<Route
						path="/seller_order_customer"
						element={<SellerCustomers />}
					/>
					<Route
						path="/seller_order_success"
						element={<SellerSuccessCC />}
					/>
					<Route
						path="/seller_order_summary"
						element={<SellerOrderSummary />}
					/>
					<Route
						path="/seller_purchase_order"
						element={<SellerPurchaseOrders />}
					/>
					<Route
						path="/buyer_dashboard"
						element={<BuyerDashboard />}
					/>
					<Route path="/buyer_checkout" element={<BuyerCheckout />} />
					<Route path="/retpol" element={<Retpol />} />
					<Route path="/privpol" element={<Privpol />} />
					<Route path="/tos" element={<Tos />} />
					<Route path="/aboutus" element={<Aboutus />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default ReactRouter
