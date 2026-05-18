// For conveniently melding conditional styles and default styles
export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    // str is not valid JSON, return false
    console.debug(`Invalid JSON string: ${e.message}`);
    return false;
  }
  return true;
}

export function prettyPrint(str) {
  const obj = JSON.parse(str);
  const pretty = JSON.stringify(obj, undefined, 4);

  return pretty;
}

export function getFetchData(url) {
  return function fetchData(callback) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        callback(JSON.stringify(data, null, "\t"));
      })
      .catch((error) => {
        callback(error.toString());
      });
  };
}
