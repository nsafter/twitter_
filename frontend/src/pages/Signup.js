import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const handlesubmit = () => {
    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:5000/register", {
        email,
        username,
        password,
        confirmpassword,
      })
      .then((response) => {
        alert(response.data.message);
        if (response.data.message === "user registered successfully!!") {
          navigate("/");
        }
      });
  };

  return (
    <>
      <div class="form-group">
        <h2>Register</h2>
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <label>Confirm Password</label>
        <input
          type="password"
          class="form-control"
          placeholder="Confirm Password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button class="btn btn-info" onClick={handlesubmit}>
          Submit
        </button>
      </div>
    </>
  );
};

export default Signup;
