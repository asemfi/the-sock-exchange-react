import React, { useState, useEffect } from "react";
import Sock from "./components/Sock";
import Footer from "./components/Footer";
import Search from "./components/Search";
import Promo from "./components/Promo";
import About from "./components/About";
import Featured from "./components/Featured";
import AddSock from "./components/AddSock";




import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_SOCKS_API_URL);
        if (!response.ok) {
          throw new Error('Data could not be fetched!');
        }
        const json_response = await response.json();
        setData(json_response);
      } catch (error) {
        console.error('Error fetching socks:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (sockId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SOCKS_API_URL}/${sockId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Sock could not be deleted!');
      }

      const updatedData = data.filter(sock => sock._id !== sockId);
      setData(updatedData);
    } catch (error) {
      console.error('Error deleting sock:', error);
    }
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">TSE</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addsock">Add Sock</Link>
              </li>
            </ul>
            <Search setData={setData} />
          </div>
        </div>
      </nav>

      <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
        <div className="container-fluid">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <p>Both socks and space rockets 🚀 will take you to new heights, but only one will get cold feet!</p>
                  <h5>Featured</h5>

                  <Featured/>

                  <div
                    className="card-container"
                    style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}
                  >
                    {data.map((sock) => (
                      <Sock key={sock._id} data={sock} handleDelete={handleDelete} />
                    ))}
                  </div>
                </>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/addsock" element={<AddSock/>} />
          </Routes>
        </div>
      </main>

      <Footer
        className={
          import.meta.env.VITE_ENVIRONMENT === "development"
            ? "bg-warning text-dark"
            : import.meta.env.VITE_ENVIRONMENT === "production"
            ? "bg-success text-white"
            : ""
        }
      >
        <div><strong>{import.meta.env.VITE_ENVIRONMENT?.toUpperCase()}</strong></div>
      </Footer>
    </Router>
  );
}

export default App;
