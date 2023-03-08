import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const MyBLogs = () => {
  const [data, setData] = useState([]);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:5000/login").then((response) => {
      if (response.data.loggedIn === true) {
        const username = response.data.user;
        axios
          .post("http://localhost:5000/myblogs", { username })
          .then((ress) => {
            setData(ress.data);
          });
      }
    });
  }, []);

  return (
    <>
      <h1 className="text-center mt-5">MyBlogs</h1>
      {data.map((item) => {
        return (
          <Card
            date={item.date.slice(0, 10) + " " + item.date.slice(11, 16)}
            user={item.uname}
            title={item.title}
            body={item.body}
            id={item.id}
            auth={true}
          />
        );
      })}
    </>
  );
};

export default MyBLogs;
