import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../components/Card";

const HomeComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/home").then((response) => {
      setData(response.data);
    });
  }, []);

  const [q, setQ] = useState("");

  const [searchParam] = useState(["uname", "date"]);

  function search() {
    // filter the data on the basis of input by user in search box
    return data.filter((item) => {
      // here some function returns a new array fulfilling the search criterai
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        );
      });
    });
  }

  return (
    <>
      <center>
        <input
          type="search"
          placeholder="enter username or date(yyyy-mm-dd) "
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
      })}
    </>
  );
};

export default HomeComponent;
