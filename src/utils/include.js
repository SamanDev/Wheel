export const segments = [
  0, 2, 4, 2, 10, 2, 4, 2, 8, 2, 4, 2, 25, 2, 4, 2, 8, 2, 4, 2, 10, 2, 4, 2, 8,
  2, 4, 2, 20,
];
export const segX = ["2", "4", "8", "10", "20", "25"];
export const getcolor = (item) => {
  var def = "#000000";

  if (item == 25) {
    def = "#e57452";
  }
  if (item == 4) {
    def = "#e05b89";
  }
  if (item == 10) {
    def = "#8de29d";
  }
  if (item == 8) {
    def = "#fdf65d";
  }
  if (item == 20) {
    def = "#9277de";
  }
  if (item == 2) {
    def = "#6fc2d3";
  }

  return def;
};
export const getcolortext = (item) => {
  var def = "#ffffff";
  if (item == 8) {
    def = "#000000";
  }
  return def;
};
export const Jetton = () => {
  return (
    <lord-icon
      src="https://cdn.lordicon.com/uvpkeeul.json"
      trigger="morph"
      colors="outline:#794628,primary:#e8b730,secondary:#e8b730"
      style={{ width: 25, height: 23 }}
    ></lord-icon>
  );
};
export function groupBySingleField(data, field) {
  if (!data) return null;
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
export function groupByMultipleFields(data, ...fields) {
  if (fields.length === 0) return;
  let newData = {};
  const [field] = fields;
  newData = groupBySingleField(data, field);
  const remainingFields = fields.slice(1);
  if (remainingFields.length > 0) {
    Object.keys(newData).forEach((key) => {
      newData[key] = groupByMultipleFields(newData[key], ...remainingFields);
    });
  }
  return newData;
}
export const sumOfBet = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.bet;
    return sum + _am;
  }, 0);
};
export const sumOfWin = (array) => {
  return array.reduce((sum, currentValue) => {
    var _am = currentValue.win;
    return sum + _am;
  }, 0);
};
export function count(obj) {
  var count = 0;
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ++count;
    }
  }
  return count;
}
export const getPrize = (newPrizeNumber, pos) => {
  var num = 0;
  if (parseInt(newPrizeNumber) == parseInt(pos)) {
    num = parseInt(pos);
  }

  return num;
};
export const userBet = (wheel, username) => {
  var bets = 0;
  var net = 0;
  var userArr = wheel.wheelusers
    .filter((user) => user.username == username)
    .map((item, i) => {
      net = net + item.win;

      bets = bets + item.bet;
    });

  return [bets, net];
};
