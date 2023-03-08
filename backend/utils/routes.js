const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const conn = require("./conn");

const router = express.Router();

const saltrounds = 10;

router.use(bodyParser.urlencoded({ extended: true }));

router.use(
  session({
    key: "userid",
    secret: "welcome to chitkara",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expire: 60 * 30 * 30,
    },
  })
);

conn.connect((err) => {
  if (err) console.log(err);
  else console.log("db connected");
});

router.get("/home", (req, res) => {
  let sqlquery = "select id,title,body,date,uname from blogitem;";

  conn.query(sqlquery, (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

router.get("/blog/:id", (req, res) => {
  let id = req.params.id;
  let sqlquery = "select * from blogitem where id=?";
  conn.query(sqlquery, id, (err, result) => {
    if (result) res.send(result);
  });
});

router.post("/newblog", (req, res) => {
  const { title, body, username } = req.body;

  let sqlquery = "insert into blogitem(title,body,uname) values(?,?,?)";

  conn.query(sqlquery, [title, body, username], (err, result) => {
    if (err) throw err;
    else res.send({ message: "blog created successfully" });
  });
});

router.post("/myblogs", (req, res) => {
  console.log(req.body);
  const username = req.body.username;

  let sqlquery = "select * from blogitem where uname=?";

  conn.query(sqlquery, [username], (err, result) => {
    if (err) throw err;
    else res.send(result);
  });
});

router.post("/register", (req, res) => {
  const { email, username, password, confirmpassword } = req.body;

  if (password == confirmpassword) {
    let sqlquery1 = "select * from members where uname=? or email=?";
    conn.query(sqlquery1, [username, email], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {
        res.send({ message: "user already exists" });
      } else {
        bcrypt.hash(password, saltrounds, (err, hash) => {
          if (err) throw err;
          let sqlquery =
            "insert into members(email,uname,passwd) values(?,?,?)";
          conn.query(sqlquery, [email, username, hash], (error, result) => {
            if (error) throw error;
            else res.send({ message: "user registered successfully!!" });
          });
        });
      }
    });
  } else {
    res.send({ message: "passwords do not match" });
  }
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({
      loggedIn: true,
      user: req.session.user[0].uname,
    });
  } else {
    res.send({
      loggedIn: false,
    });
  }
});

router.get("/logout", (req, res) => {
  if (req.session.user) {
    req.session.destroy();
    res.clearCookie("userid");
    res.send({ message: "logout successful" });
  }
});

router.delete("/del/:id", (req, res) => {
  const id = req.params.id;
  const sqlquery = "delete from blogitem where id=?";
  conn.query(sqlquery, id, (err, result) => {
    if (err) throw err;
    else {
      res.send({
        message: "blog deleted successfully",
      });
    }
  });
});

router.post("/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const title = req.body.title;
  const body = req.body.body;
  const sqlquery = "update blogitem set title=?,body=? where id = ?";

  conn.query(sqlquery, [title, body, id], (err, result) => {
    if (err) throw err;
    else res.send({ message: "updated successfully!" });
  });
});

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  let sqlquery = "select uname,passwd,admin from members where uname=?";

  conn.query(sqlquery, [username], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].passwd, (error, response) => {
        if (response) {
          if (result[0].admin == 1) {
            req.session.user = result;
            res.send({ result: result, admin: true });
          } else {
            req.session.user = result;
            res.send({ result: result, admin: false });
          }
        } else {
          res.send({ message: "wrong username and password!!!" });
        }
      });
    } else {
      res.send({ message: "user does not exist" });
    }
  });
});

router.delete("/deluser/:uname", (req, res) => {
  const user = req.params.uname;
  const sqlquery = "delete from members where uname=?";
  conn.query(sqlquery, user, (err, result) => {
    if (err) throw err;
    else {
      res.send({
        message: "user deleted successfully",
      });
    }
  });
});

router.delete("/deluser", (req, res) => {
  const userarray = req.body.usernames;
  console.log(req.body);
  const sqlquery = `delete from members where uname in (${userarray
    .map((uname) => `'${uname}'`)
    .join(",")})`;
  conn.query(sqlquery, (err, result) => {
    if (err) throw err;
    else {
      res.send({
        message: "user deleted successfully",
      });
    }
  });
});

router.get("/users", (req, res) => {
  let sqlquery = "select uname,email from members where admin = 0";
  conn.query(sqlquery, (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

module.exports = router;
