import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import HomeComponent from "../components/HomeComponent";
import Navbar from "../components/Navbar";
import Users from "../components/Users";
import "./Admin.css";

function Admin() {
  return (
    <>
      <Navbar />
      <div className="tabs-container ">
        <Tabs defaultActiveKey="Users" className="mb-3" fill>
          <Tab eventKey="Users" title="Users">
            <Users />
          </Tab>
          <Tab eventKey="Blogs" title="Blogs">
            <HomeComponent />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;
