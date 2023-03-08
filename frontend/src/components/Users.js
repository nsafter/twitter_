import axios from "axios";
import { useState, useEffect } from "react";

const Users = () => {
  const [data, setData] = useState([]);

  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/users").then((response) => {
      setData(response.data);
    });
  }, []);

  const handleDelete = (user) => {
    let check = window.confirm("Are you the sure for deletion?");

    if (check) {
      axios.delete(`http://localhost:5000/deluser/${user}`).then((response) => {
        if (response.data.message) {
          alert("blog deleted");
          window.location.reload();
        }
      });
    }
  };

  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, user.uname]);
    } else {
      setSelectedUsers(selectedUsers.filter((uname) => uname !== user.uname));
    }
    console.log(selectedUsers);
  };

  const handleDeleteSelected = () => {
    axios
      .delete("http://localhost:5000/deluser", {
        data: { usernames: selectedUsers },
      })
      .then((res) => {
        setData(data.filter((user) => !selectedUsers.includes(user.id)));
        setSelectedUsers([]);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div class="text-center">
        <button onClick={handleDeleteSelected} class="btn btn-danger mb-3 ">
          Delete Selected Users
        </button>
      </div>
      <table class="table table-striped table-dark table-hover text-center">
        <thead>
          <tr>
            <th class="p-3">Username</th>
            <th class="p-3">Email</th>
            <th class="p-3">Delete</th>
            <th class="p-3">Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => {
            return (
              <tr>
                <td>{item.uname}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    class="btn btn-danger"
                    onClick={() => handleDelete(item.uname)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={(event) => handleCheckboxChange(event, item)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Users;
