const flat = require("flat");
const mapObj = require("map-obj");
const filterObj = require("filter-obj");

function processScripts(scripts) {
  const flatted = flat(scripts);
  const mapped = mapObj(flatted, (key, value) => {
    if (key.endsWith(".default")) {
      const newKey = key.replace(/.default$/, "");
      return [newKey, value];
    }
    if (key.endsWith(".script")) {
      const newKey = key.replace(/.script$/, "");
      const newValue = flatted[`${newKey}.description`] || value;
      return [newKey, newValue];
    }
    return [key, value];
  });
  return filterObj(mapped, key => !key.endsWith("description"));
}

module.exports = processScripts;
