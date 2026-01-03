const fs = require("fs/promises");
const { EOL } = require("os");

//TODO: Read menu.csv
const readMenu = (filepath) => {
  return fs.readFile(filepath, "utf-8");
};

//TODO: parseMenu (.split)
const parseMenu = (bigStr) => {
  //split rows by line
  const rows = bigStr.trim().split(EOL);

  //split each row by comma and remove $ sign from price
  return rows.map((row) => {
    const [mealType, name, quantity, priceStr] = row.split(",");
    const price = parseFloat(priceStr.replace("$", ""));
    return { mealType, name, quantity, price };
  });
};

//TODO: Group the data [Lunch][Dinner][Dessert]
const groupData = (rows) => {
  const groupings = {};

  rows.forEach((item) => {
    const mealTypeExists = groupings[item.mealType]
    if (!mealTypeExists) {
      groupings[item.mealType] = [];
    }
    groupings[item.mealType].push(item);
  });

  Object.keys(groupings).forEach((key) => {
    groupings[key].sort((a, b) => a.name.localeCompare(b.name));
  });
  return groupings;
};

//buildPrettyStr (use +=)
const buildPrettyMenuStr = (groupings) => {
  let result = "";

  for (const [mealType, items] of Object.entries(groupings)) {
    result += `* ${
      mealType.charAt(0).toUpperCase() + mealType.slice(1)
    } Items *${EOL}`;

    items.forEach((item) => {
      const priceWithCharge = (item.price * 1.8).toFixed(2);
      result += `$${priceWithCharge}\t${item.name}, ${item.quantity} ${EOL}`;
    });

    result += `${EOL}`; //blank line between meal types
  }

  return result;
};

//TODO: write menu.txt: fs.writeFile("menu.txt")
const writeMenu = (prettyMenuStr) => {
  return fs.writeFile("menu.txt", prettyMenuStr);
};

//TODO
readMenu("menu.csv")
  .then((bigStr) => {
    const rows = parseMenu(bigStr);
    const groupings = groupData(rows);
    const prettyMenuStr = buildPrettyMenuStr(groupings);
    return writeMenu(prettyMenuStr);
  })
  .then(() => console.log("Program is finished"))
  .catch((err) => console.log(err));