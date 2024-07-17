//libraries
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
//context
import LendingContext from "./context/LendingContext";
//layout
import PublicLayout from "./layout/PublicLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
//page
import Login from "./layout/page/Login";
import SignUp from "./layout/page/SignUp";
import Home from "./layout/page/Home";
import About from "./layout/page/About";
import Enrollment from "./layout/page/Enrollment";
import Borrowers from "./layout/page/Borrowers";
import Logout from "./layout/page/Logout";
import NotFound from "./layout/page/NotFound";
import BorrowerById from "./layout/page/BorrowerById";
import ErrorBoundary from "./errorBoundary/ErrorBoundary";

function App() {
  const { isLoggedIn } = useContext(LendingContext);

  return (
    <ErrorBoundary>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Home />} />
              <Route path="/borrowers" element={<Borrowers />} />
              <Route path="/borrowers/:borrowerId" element={<BorrowerById />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route path="/about" element={<About />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </>
        ) : (
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
