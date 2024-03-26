import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

function App() {
	const isLogged = useSelector(state => state.authSlice.isLogged);

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
					element={!isLogged ? <Login /> : <Navigate to='/' />}
					path='login'
				/>
				<Route
					element={!isLogged ? <Register /> : <Navigate to='/' />}
					path='register'
				/>
			</Route>
		</Routes>
	);
}

export default App;
