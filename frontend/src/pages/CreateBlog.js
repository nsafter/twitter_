import "./CreateBlog.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const [username, setUserName] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        setUserName(response.data.user);
      }
    });
  }, []);

  function handlesubmit() {
    axios
      .post("http://localhost:5000/newblog", { title, body, username })
      .then((response) => {
        if (response.data.message) {
          alert(response.data.message);
          navigate("/");
        }
      });
  }

  return (
    <>
      <h1 class="blogHeader">Start blogging...</h1>
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label for="exampleFormControlTextarea1">Start typing your blog</label>
        <textarea
          class="form-control"
          rows="3"
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button class="btn btn-primary" onClick={handlesubmit}>
          Create +
        </button>
      </div>
    </>
  );
};

export default CreateBlog;
