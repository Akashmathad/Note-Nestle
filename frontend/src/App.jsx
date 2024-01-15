import Homepage from "./pages/Homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Teacherpage from "./pages/Teacherpage";
import Adminpage from "./pages/Adminpage";
import AboutUspage from "./pages/AboutUspage";
import PageNotFoundpage from "./pages/PageNotFoundpage";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route index element={<Homepage />} />
				<Route path="teacher" element={<Teacherpage />} />
				<Route path="admin" element={<Adminpage />} />
				<Route path="aboutus" element={<AboutUspage />} />
				<Route path="*" element={<PageNotFoundpage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
