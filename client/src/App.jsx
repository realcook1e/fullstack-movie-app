import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
	return (
		<Routes>
			<Route
				path='/'
				element={<Layout />}
			>
				<Route
					index
					element={<Home />}
				/>
				<Route
					element={<Login />}
					path='login'
				/>
				<Route
					element={<Register />}
					path='register'
				/>
			</Route>
		</Routes>
	);
}

export default App;
