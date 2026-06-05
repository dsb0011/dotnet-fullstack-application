import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
// import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Person from "./components/person/Person";
import { Toaster } from "react-hot-toast";
import Country from "./components/country/Country";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/country" element={<Country />} />
        <Route path="/person" element={<Person />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
