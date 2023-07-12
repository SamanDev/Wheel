const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: [
    "https://wheelofpersia.com",
    "http://wheelofpersia.com",
    "http://localhost:3000",
  ],
};
const serverDB2 =
  process.env.NODE_ENV === "production"
    ? "mongodb+srv://salar:42101365@wheel.1pavbxp.mongodb.net/Wheelofnew"
    : "mongodb+srv://salar:42101365@wheel.1pavbxp.mongodb.net/Wheelofnew";
const serverDB =
  process.env.NODE_ENV === "production"
    ? "mongodb://localhost:27017/Wheelofnew"
    : "mongodb://localhost:27017/Wheelofnew";
const serverPort = process.env.NODE_ENV === "production" ? 2083 : 8085;
const soocketPort = process.env.NODE_ENV === "production" ? 2087 : 8484;
app.use(cors(corsOptions));
const { authJwt } = require("./app/middlewares");
// parse requests of content-type - application/json
app.use(express.json());

const db = require("./app/models");
const Role = db.role;
const User = db.user;
const Wheel = db.Wheel;
const Tokens = db.token;
function groupBySingleField(data, field) {
  return data.reduce((acc, val) => {
    const rest = Object.keys(val).reduce((newObj, key) => {
      if (key !== field) {
        newObj[key] = val[key];
      }
      return newObj;
    }, {});
    if (acc[val[field]]) {
      acc[val[field]].push(rest);
    } else {
      acc[val[field]] = [rest];
    }
    return acc;
  }, {});
}
db.mongoose
  .connect(serverDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route

// routes

var userswinLisr = "";
const segments = [
  0, 2, 4, 2, 10, 2, 4, 2, 8, 2, 4, 2, 25, 2, 4, 2, 8, 2, 4, 2, 10, 2, 4, 2, 8,
  2, 4, 2, 20,
];

const d = new Date();
var wheel = {
  status: "Done",
  startNum: 0,
  wheelusers: [],
  number: 0,
  total: 0,
  net: 0,
  avex: 0,
  aveBetx: 0,
  serverCode: Math.floor(Math.random() * 9999),
  serverSec: 0,
  date: d,
};
var wheelusers = [];
const { Server } = require("socket.io");
const io = new Server(soocketPort, {
  cors: { corsOptions },
  pingInterval: 1000,
  pingTimeout: 1000,
  maxPayload: 10000,
});

const wheelNamespacePub = io.of("/wheelpub");
wheelNamespacePub.on("connection", (socket) => {
  socket.emit("msg", {
    command: "update",
    data: wheel,
  });
  socket.emit("msg", { command: "users", data: wheelusers });
  wheelNamespacePub.emit("msg", {
    command: "online",
    data: wheelNamespacePub.sockets.size,
  });
});
const wheelNamespace = io.of("/wheel");
wheelNamespace.use(async (socket, next) => {
  const user = socket.handshake.auth;

  if (socket.userdata) {
    next();
  } else {
    await User.findById(user.id).then((res) => {
      if (res?.username) {
        wheelNamespace.in(user.id).disconnectSockets(true);
        socket.userdata = res;
        socket.join(user.id);

        next();
      } else {
        socket.disconnect();
      }
    });
  }
});
wheelNamespace.on("disconnect", (reason) => {
  if (reason === "io server disconnect") {
    // the disconnection was initiated by the server, you need to reconnect manually
    //wheelNamespace.connect();
  }
  console.log(reason); // else the socket will automatically try to reconnect
});

wheelNamespace.on("connection", (socket) => {
  socket.emit("msg", { command: "setuser", data: socket.userdata });

  // getLast(socket);
});
app.get("/lastlist", async (req, res) => {
  if (req.query.l == "users") {
    res.json(wheelusers);
  } else if (req.query.l == "leaders") {
    if (userswinLisr == "") {
      const userswin = await User.find(
        {},
        { username: 1, image: 1, balance2: 1 }
      )

        .limit(10)
        .sort({ balance2: -1 });
      userswinLisr = userswin;
    }

    res.json(userswinLisr);
  } else if (req.query.l == "wheelid") {
    const userswin = await Wheel.findById(req.query.id).populate("wheelusers");
    res.json(userswin);
  } else {
    var sortig = { date: -1, total: -1 };
    if (req.query.l != "myList") {
      if (req.query.l == "winList") {
        sortig = { net: -1 };
      }
      var users2 = await Wheel.find(
        { status: "Done" },
        { number: 1, total: 1, net: 1, status: 1 }
      )
        .limit(10)
        .sort(sortig);
    } else {
      var udata = [];
      const userswin = await db.userWheel
        .find({ username: req.query.u }, { pid: 1 })
        .limit(10)
        .sort({ win: -1 });

      var userlist = groupBySingleField(userswin, "pid");

      Object.keys(userlist).forEach((key) => {
        udata.push({ _id: key });
      });

      var users2 = await Wheel.find({ $or: udata }).sort({ net: -1 });
    }
    res.json(users2);
  }
});
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

app.get("/gettokens", (req, res) => {
  Tokens.findByIdAndDelete(req.query.id, function (err, docs) {
    if (err) {
      console.log(err);
      res.json("no access");
    } else {
      if (docs?.rid) {
        User.findOneAndUpdate(
          { _id: docs.rid, balance2: { $lt: 5000 } },

          {
            $inc: { balance2: 5000 },
            $pull: { tokens: req.query.id },
          },

          function (err, resp) {
            if (err) {
              console.log(err);
              res.json("no access");
            } else {
              var _d = resp;
              _d.balance2 = _d.balance2 + 5000;
              _d.tokens = removeItemOnce(_d.tokens, req.query.id);

              res.json(_d);
            }
          }
        );
      } else {
        User.find(
          { tokens: req.query.id, balance2: { $lt: 5000 } },

          function (err, resp) {
            if (err) {
              console.log(err);
              res.json("no access");
            } else {
              var _d = resp;

              if (_d?.username) {
                _d.tokens = removeItemOnce(_d.tokens, req.query.id);

                res.json(_d);
              } else {
                res.json("no access");
              }
            }
          }
        );
      }
    }
  });
});
const decuser = (req, res, data) => {
  User.findByIdAndUpdate(req.userId, {
    $inc: { balance2: data.bet * -1 },
  }).then((user) => {
    data.win = -1;
    data.username = user.username;
    data.image = user.image;
    data.id = req.userId;
    wheel.total = wheel.total + data.bet;

    let fu = wheelusers.filter(
      (user) => user.username == data.username && user.position == data.position
    );
    if (fu.length > 0) {
      const newProjects = wheelusers.map((user) =>
        user.username == data.username && user.position == data.position
          ? { ...user, bet: user.bet + data.bet }
          : user
      );

      wheelusers = newProjects;
    } else {
      wheelusers.push(data);
    }
    wheelNamespacePub.emit("msg", { command: "users", data: wheelusers });
    res.json(user.balance2);
  });
};
app.get("/getchip", [authJwt.verifyToken], (req, res) => {
  var newuserinc = User.findOneAndUpdate(
    { _id: req.userId, balance2: { $lt: 1000 } },
    {
      $inc: { balance2: 1000 },
    }
  ).then((resp) => {
    if (resp?.username) {
      var _d = resp;
      _d.balance2 = _d.balance2 + 1000;

      res.json(_d);
    } else {
      res.json("no access");
    }
  });
});
app.post("/addbet", [authJwt.verifyToken], (req, res) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    var data = req.body;
    if (user.balance2 < data.bet) {
      res.json("no access");
      return;
    }

    decuser(req, res, data);
  });
});
app.post("/addchat", [authJwt.verifyToken], (req, res) => {
  wheelNamespacePub.emit("msg", { command: "chat", data: req.body });
  res.json("done");
});

const createWheel = (startNum) => {
  const d = new Date();
  let seconds = d.getSeconds();
  return Wheel.create({
    status: "Pending",
    number: 0,
    total: 0,
    net: 0,
    avex: 0,
    aveBetx: 0,
    serverCode: Math.floor(Math.random() * 9999),
    serverSec: seconds,
    startNum: startNum,
    wheelusers: [],
    date: d,
  }).then((wheel) => {
    return wheel;
  });
};

const initial = async () => {
  console.log("initial");

  var defwheel = null;
  try {
    defwheel = await Wheel.findOne().sort({ date: -1 });
  } catch (error) {
    //createWheelData();
  }

  if (defwheel == null) {
    createWheelData();
  } else if (defwheel?.status == "Done") {
    wheel = defwheel;
    createWheelData();
  } else if (defwheel?.status == "Pending") {
    wheel = defwheel;

    spin();
  } else if (defwheel?.status == "Spin") {
    wheel = defwheel;
    setTimeout(() => {
      spinstop();
    }, 1000);
  } else if (defwheel?.status == "Spining") {
    wheel = defwheel;
    doneWheel();
  }

  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};
const createWheelData = async () => {
  var wheelnew = await createWheel(wheel?.number);
  wheel = wheelnew;
  console.log("createWheelData:" + wheel?.startNum + " id:" + wheel?._id);
  if (wheelusers.length > 0) {
    wheelusers = [];
    wheelNamespacePub.emit("msg", { command: "resetusers" });
  }
  wheelNamespacePub.emit("msg", {
    command: "update",
    data: wheel,
  });

  setTimeout(() => {
    spin();
  }, 15000);
};
const spin = () => {
  const d = new Date();
  let seconds = (wheel?.serverSec + 30) % 60;

  wheel.serverSec = seconds;
  let newPrizeNumbern = getPrizePos(wheel);
  wheel.number = newPrizeNumbern;
  wheel.status = "Spin";

  Wheel.findByIdAndUpdate(wheel._id, {
    status: "Spin",
    serverSec: seconds,
    number: newPrizeNumbern,
  }).then(() => {
    wheelNamespacePub.emit("msg", {
      command: "update",
      data: wheel,
    });
    setTimeout(() => {
      spinstop();
    }, 27000);
  });
};
const spinstop = () => {
  var _time = 2000;
  wheel.status = "Spining";
  var _tot = 0;
  var _net = 0;
  if (wheelusers.length > 0) {
    wheelusers.forEach((item) => {
      item.win = item.bet * getPrize(segments[wheel.number], item.position);
      _tot = _tot + item.bet;
      _net = _net + item.win;
      item.pid = wheel._id;
      createUser(wheel._id, item);
    });
  }
  Wheel.findByIdAndUpdate(wheel._id, {
    status: "Spining",
    total: _tot,
    net: _net,
  }).then(() => {
    wheel.total = _tot;
    wheel.net = _net;
    wheelNamespacePub.emit("msg", {
      command: "update",
      data: wheel,
    });
    if (wheelusers.length > 0) {
      wheelNamespacePub.emit("msg", { command: "users", data: wheelusers });
      _time = 4000;
      inc(wheelusers);
    }
    setTimeout(() => {
      doneWheel();
    }, _time);
  });
};
const doneWheel = () => {
  Wheel.findByIdAndUpdate(wheel._id, { status: "Done" }).then((resp) => {
    userswinLisr = "";

    wheel.status = "Done";
    wheelNamespacePub.emit("msg", {
      command: "update",
      data: wheel,
    });
    setTimeout(() => {
      createWheelData();
    }, 2500);
  });
};
const getPrize = (newPrizeNumber, pos) => {
  var num = 0;
  if (parseInt(newPrizeNumber) == parseInt(pos)) {
    num = parseInt(pos);
  }

  return num;
};

const getPrizePos = (users) => {
  var newPrizeNumber = users?.serverCode * users?.startNum;

  newPrizeNumber = newPrizeNumber + users?.serverCode * users?.serverSec;
  newPrizeNumber = newPrizeNumber % segments.length;

  return newPrizeNumber;
};

const sumOfBet = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.bet;
    return sum + _am;
  }, 0);
};
const sumOfWin = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.win;
    return sum + _am;
  }, 0);
};
const dec = async () => {
  var newData = groupBySingleField(wheelusers, "username");

  for (const property in newData) {
    var newuser = await User.findOneAndUpdate(
      { username: property },
      { $inc: { balance2: sumOfBet(newData[property]) * -1 } }
    ).then((res) => {
      if (res?.username) {
        var _d = res;
        _d.balance2 = _d.balance2 - sumOfBet(newData[property]);

        wheelNamespace.in(res.username).emit("msg", {
          command: "user",
          data: _d,
        });
      }
    });
  }
  // if (blnupdate) wheelNamespace.emit("msg", { command: "update", data: wheel });
};
const inc = async (wheelusers) => {
  var newDatainc = groupBySingleField(wheelusers, "username");

  for (const property in newDatainc) {
    var _ic = sumOfWin(newDatainc[property]);
    if (_ic > 0) {
      var _id = newDatainc[property][0].id;
      var newuserinc = await User.findOneAndUpdate(
        { _id: _id, username: property },
        { $inc: { balance2: _ic } }
      ).then((res) => {
        if (res?.username) {
          var _d = res;
          _d.balance2 = _d.balance2 + _ic;

          wheelNamespace.in(_id).emit("msg", {
            command: "setuser",
            data: _d,
          });
        }
      });
    }
  }
};

const createUser = function (wheelId, comment) {
  return db.userWheel.create(comment).then((docComment) => {
    return db.Wheel.findByIdAndUpdate(
      wheelId,
      { $push: { wheelusers: docComment._id } },
      { new: true, useFindAndModify: false }
    );
  });
};
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

app.listen(serverPort, () => {
  console.log(`Server is running on port ${serverPort}.`);
});
