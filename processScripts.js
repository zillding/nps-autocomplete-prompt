const flat = require("flat");

function processScripts(scripts) {
  const flatted = flat(scripts);

  const mapped = {};
  Object.keys(flatted).forEach(key => {
    let finalKey = key;
    let finalValue = flatted[key];
    if (key.endsWith(".default")) {
      finalKey = key.replace(/.default$/, "");
    }
    if (key.endsWith(".script")) {
      finalKey = key.replace(/.script$/, "");
      const description = flatted[`${finalKey}.description`];
      finalValue = description ? [description, flatted[key]] : flatted[key];
    }
    mapped[finalKey] = finalValue;
  });

  const result = {};
  Object.keys(mapped)
    .filter(key => !key.endsWith("description"))
    .forEach(key => {
      result[key] = mapped[key];
    });
  return result;
}

module.exports = processScripts;
