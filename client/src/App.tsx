import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppSelector";
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Contacts from "./pages/Contacts/Contacts";
import Profile from "./pages/Profile/Profile";
import Users from "./pages/Users/Users";
import AddFilm from "./pages/AddFilm/AddFilm";
import Movies from "./pages/Movies/Movies";
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import Favorites from "./pages/Favorites/Favorites";

function App() {
	const isLogged = useAppSelector(state => state.authSlice.isLogged);

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
				<Route
					path='feedback'
					element={<Contacts />}
				></Route>
				<Route
					path='users'
					element={<Users />}
				></Route>
				<Route
					path='users/:username'
					element={<Profile />}
				></Route>
				<Route
					path='movies'
					element={<Movies />}
				></Route>
				<Route
					path='movies/add'
					element={<AddFilm />}
				></Route>
				<Route
					path='movies/:id'
					element={<MovieDetails />}
				></Route>
				<Route
					path='favorites'
					element={<Favorites />}
				></Route>
			</Route>
		</Routes>
	);
}

export default App;
