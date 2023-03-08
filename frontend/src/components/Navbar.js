import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Navbar.css";

const Navbar = () => {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoggedUser(response.data.user);
      }
    });
  }, []);

  const handlelogout = () => {
    axios.get("http://localhost:5000/logout").then((response) => {
      alert(response.data.message);
      window.location.reload();
    });
  };

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarTogglerDemo03"
        aria-controls="navbarTogglerDemo03"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <Link class="navbar-brand" to="/">
        <h2>BlogSitio</h2>
      </Link>

      <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
          {loggedUser !== "" ? (
            <>
              <li class="nav-item dropdown">
                <Link
                  class="nav-link nav-class dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Hello!! {loggedUser}
                </Link>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <Link class="dropdown-item" to="/createblog">
                    Create Blog
                  </Link>
                  <Link class="dropdown-item" to="/myblogs">
                    My Blogs
                  </Link>
                </div>
              </li>
            </>
          ) : (
            ""
          )}
        </ul>
        {loggedUser !== "" ? (
          <button class="btn btn-danger my-sm-0" type="submit">
            <Link class="nav-link nav-class" onClick={handlelogout}>
              Logout
            </Link>
          </button>
        ) : (
          <button class="btn btn-danger my-2 my-sm-0" type="submit">
            <Link class="nav-link nav-class" to="/login">
              Login
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
