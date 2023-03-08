import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [userLoggedIn, setUserLoggedIn] = useState("");

  axios.defaults.withCredentials = true;

  const handlesubmit = () => {
    axios
      .post("http://localhost:5000/login", { username, password })
      .then((response) => {
        // console.log(response.data);
        if (
          response.data.result[0].uname !== "" &&
          response.data.admin === false
        ) {
          alert("login successfull!!");
          navigate("/");
        } else if (
          response.data.result[0].uname !== "" &&
          response.data.admin === true
        ) {
          alert("Welcome admin");
          navigate("/admin");
        }
      });
  };

  return (
    <>
      <div class="form-group">
        <h2>Login</h2>
        <label>Username</label>
        <input
          type="text"
          class="form-control"
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link to="/register">Already a user? Register</Link>
        <br />
        <button class="btn btn-info" onClick={handlesubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Login;
