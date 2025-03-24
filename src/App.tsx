import { useAuthenticator } from "@aws-amplify/ui-react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DoctorHome from "./DoctorHome";


function App() {
  const { signOut } = useAuthenticator();

  return (
    <div>
      {/* Navigation Bar */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
        <nav>
          <Link to="/">Home</Link> <span>|</span>
          <Link to="/about">About</Link> <span>|</span>
          <Link to="/contact">Contact</Link> <span>|</span>
          <Link to="/doctor-home">Doctor Home</Link>
        </nav>
        <button onClick={signOut}>Sign out</button>
      </header>

      {/* Page Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/doctor-home" element={<DoctorHome />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
