import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Landingpage from "./pages/Landingpage";

function App() {
  return (
   
    <>
    
      <Navbar />
      <Routes>
         {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}



        <Route path="/" element={<Landingpage />} />
        {/* Add more routes here later, e.g.:
        <Route path="/about" element={<AboutPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        */}
      </Routes>

    // </>
  );
}

export default App;