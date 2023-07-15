import { useEffect, useState } from "react";

import EventBus from "../common/EventBus";

import { groupByMultipleFields, sumOfBet } from "../utils/include";
export const useUser = () => {
  const [loginToken, setLoginToken] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  useEffect(() => {
    EventBus.on("setuser", (data) => {
      if (data) {
        try {
          if (data?.accessToken) {
            var _user = data;

            _user._id = data.id;

            localStorage.setItem("user", JSON.stringify(_user));
            setLoginToken(_user);
          } else {
            const userOld = JSON.parse(localStorage.getItem("user"));
            if (userOld) {
              var _user = data;
              _user.accessToken = userOld.accessToken;
              _user.id = userOld.id;
              _user._id = userOld.id;
              localStorage.setItem("user", JSON.stringify(_user));
              setLoginToken(_user);
            } else {
              localStorage.removeItem("user");
              localStorage.removeItem("guser");
            }
          }
        } catch (error) {
          localStorage.removeItem("guser");
        }
      }
    });
    EventBus.on("disconnect", (data) => {
      setLoginToken({});
      localStorage.removeItem("guser");
    });
    EventBus.on("logout", (data) => {
      setLoginToken({});
      localStorage.removeItem("guser");
      //localStorage.removeItem("user");
    });
    return () => {
      EventBus.remove("setuser");
      EventBus.remove("logout");
      EventBus.remove("disconnect");
    };
  }, []);

  return [loginToken];
};
export const useWheel = () => {
  /* const [wheel, setWheel] = useState(
    localStorage.getItem("wheel")
      ? JSON.parse(localStorage.getItem("wheel"))
      : {}
  ); */
  const [wheel, setWheel] = useState({});

  useEffect(() => {
    EventBus.on("wheel", (data) => {
      if (data?.status) {
        localStorage.setItem("wheel", JSON.stringify(data));
        setWheel(data);
      }
    });
    return () => {
      EventBus.remove("wheel");
      //localStorage.removeItem("wheel");
    };
  }, []);

  return [wheel];
};
export const useBets = () => {
  const [bets, setBets] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    EventBus.on("users", (data) => {
      if (list.length == 0) {
        setBets(data);
      }
    });
    EventBus.on("mybets", (data) => {
      if (data != []) {
        setBets((current) => [...current, data]);
      }
    });
    EventBus.on("bets", (data) => {
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : {};

      if (data?.username != user?.username) {
        setBets((current) => [...current, data]);
      }
    });
    EventBus.on("resetusers", (data) => {
      setBets([]);
    });
    return () => {
      EventBus.remove("users");
      EventBus.remove("mybets");
      EventBus.remove("bets");
      EventBus.remove("resetusers");
    };
  }, []);
  useEffect(() => {
    var stat = [];

    if (bets?.length > 0) {
      var _gmode = groupByMultipleFields(bets, "username", "position");
      for (const property in _gmode) {
        for (const pos in _gmode[property]) {
          stat.push({
            bet: sumOfBet(_gmode[property][pos]),
            position: parseInt(pos),
            username: property,
            image: _gmode[property][pos][0].image,
          });
        }
      }
    }

    setList(stat);
  }, [bets]);

  return [bets, list];
};
