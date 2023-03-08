import "./Card.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";

const Card = (props) => {
  const navigate = useNavigate();

  // const [data, setData] = useState([]);
  // const [auth, setAuth] = useState(false);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setAuth(true);
  //     }
  //   });
  // });

  const handleDelete = (id) => {
    let check = window.confirm("Are you the sure for deletion?");

    if (check) {
      axios.delete(`http://localhost:5000/del/${id}`).then((response) => {
        if (response.data.message) {
          alert("blog deleted");
          window.location.reload();
        }
      });
    }
  };

  const handleEdit = (id) => {
    axios.get(`http://localhost:5000/blog/${id}`).then((response) => {
      navigate("/updateblog", { state: { result: response.data[0] } });
    });
  };

  return (
    <>
      <div class="card text-white bg-dark">
        <div class="card-header text-white bg-secondary">
          Blog dated: {props.date}
          <br />
          By: {props.user}
        </div>
        <div class="card-body">
          <h5 class="card-title">{props.title}</h5>
          <p class="card-text">{props.body}</p>
        </div>
        {props.auth === true ? (
          <div class="card-footer">
            <button
              class="btn btn-primary"
              onClick={() => handleDelete(props.id)}
            >
              Delete
            </button>
            <button
              class="btn btn-warning"
              onClick={() => handleEdit(props.id)}
            >
              Edit
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
export default Card;
