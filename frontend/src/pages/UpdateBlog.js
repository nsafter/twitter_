import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();

  //   console.log(location.state.result);

  const [title, setTitle] = useState(location.state.result.title);
  const [body, setBody] = useState(location.state.result.body);
  const [id, setId] = useState(location.state.result.id);

  const handleUpdate = (id) => {
    const check = window.confirm("Are you sure to update?");
    if (check) {
      axios
        .post(`http://localhost:5000/update/${id}`, { title, body })
        .then((response) => {
          if (response.data.message) {
            alert("blog updated successfully");
            navigate("/myblogs");
          }
        });
    }
  };

  return (
    <>
      <h1 class="blogHeader">Update BLog!!</h1>
      <div class="form-group">
        <label for="exampleFormControlInput1">Title</label>
        <input
          type="text"
          class="form-control"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label for="exampleFormControlTextarea1">Start typing your blog</label>
        <textarea
          class="form-control"
          rows="3"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button class="btn btn-primary" onClick={() => handleUpdate(id)}>
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateBlog;
