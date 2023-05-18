export const segments = [
  "2",
  "4",
  "2",
  "8",
  "2",
  "4",
  "2",
  "4",
  "2",
  "8",
  "2",
  "20",
  "2",
  "4",
  "2",
  "4",
  "2",
  "4",
  "2",
  "4",
  "2",
  "10",
  "2",
  "8",
  "2",
  "25",
  "2",
  "0",
  "10",
];
export const segX = ["2", "4", "8", "10", "20", "25"];
export const getcolor = (item) => {
  var def = "#000000";

  if (item == 25) {
    def = "#F71BBF";
  }
  if (item == 4) {
    def = "#FF3B19";
  }
  if (item == 10) {
    def = "#8523E8";
  }
  if (item == 20) {
    def = "#F5C218";
  }
  if (item == 8) {
    def = "#2CF501";
  }
  if (item == 2) {
    def = "#19CFFF";
  }

  return def;
};
export const getcolortext = (item) => {
  var def = "#eeeeee";

  if (item == 2) {
    def = "#eeeeee";
  }

  if (item == 8) {
    def = "#666666";
  }
  if (item == 20) {
    def = "#eeeeee";
  }
  if (item == 10) {
    def = "#eeeeee";
  }
  if (item == 0) {
    def = "#555555";
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
