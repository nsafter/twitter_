import HomeComponent from "../components/HomeComponent";
import Navbar from "../components/Navbar";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import Card from "../components/Card";

const Home = () => {
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:5000/home").then((response) => {
  //     setData(response.data);
  //   });
  // }, []);

  // const [q, setQ] = useState("");

  // const [searchParam] = useState(["uname"]);

  // function search() {
  //   // filter the data on the basis of input by user in search box
  //   return data.filter((item) => {
  //     // here some function returns a new array fulfilling the search criterai
  //     return searchParam.some((newItem) => {
  //       return (
  //         item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
  //       );
  //     });
  //   });
  // }

  return (
    <>
      <Navbar />
      <HomeComponent />
      {/* <center>
        <input
          type="search"
          placeholder="Search"
          className="search-bar"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </center>
      {search(data).map((item) => {
        return (
          <Card
            date={item.date.slice(0, 10) + " " + item.date.slice(11, 16)}
            user={item.uname}
            title={item.title}
            body={item.body}
            id={item.id}
          />
        );
      })} */}
    </>
  );
};

export default Home;
