import { useState, useRef, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

// For conveniently melding conditional styles and default styles
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Hero({ imageURI }) {
  return (
    <div>
      <img src={imageURI} />
    </div>
  );
}

function ImgTxt({ imageURI, text, title, leftToRight }) {
  return (
    <div>
      <img src={imageURI} />
      <h1>{title}</h1>
      <p>{text}</p>
      <span>{leftToRight}</span>
    </div>
  );
}

function Data({ url }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setData(JSON.stringify(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>{data}</ul>;
  }
}

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function prettyPrint(str) {
  const obj = JSON.parse(str);
  const pretty = JSON.stringify(obj, undefined, 4);

  return pretty;
}

function App() {
  const [error, setError] = useState(false);
  const [JSONStr, setJSONStr] = useState(
    prettyPrint(
      JSON.stringify([
        {
          type: "hero",
          imageURI:
            "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
        },
        {
          type: "image-text",
          imageURI:
            "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
          text: "Sunrise from the ground......",
          title: "Beach",
          leftToRight: true,
        },
        {
          type: "image-text",
          imageURI:
            "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
          text: "Sunset from the sky......",
          title: "Airplane",
          leftToRight: false,
        },
        {
          type: "data",
          url: "https://api.publicapis.org/entries",
        },
      ])
    )
  );

  const handleBlur = useCallback(
    (event) => {
      const value = event.target.value;

      if (isJsonString(value)) {
        setError(false);

        // If there's a change to the value, then update state
        value !== JSONStr && setJSONStr(prettyPrint(value));
      } else {
        setError(true);
      }
    },
    [JSONStr]
  );

  return (
    <div>
      <div
        className={classNames(
          error === false ? "bg-indigo-500" : "bg-red-500",
          "p-3"
        )}
      >
        <textarea
          cols={50}
          rows={30}
          defaultValue={JSONStr}
          onBlur={handleBlur}
        ></textarea>
        <h1>Editor</h1>
      </div>

      <div>
        <div>
          {JSON.parse(JSONStr).map((props, i) => {
            switch (props.type) {
              case "hero":
                return <Hero key={i} {...props} />;
                break;
              case "image-text":
                return <ImgTxt key={i} {...props} />;
                break;
              case "data":
                return <Data key={i} {...props} />;
                break;
              default:
                console.log(`Non standard type`);
            }
          })}
        </div>
        <h1>Marketing Landing Page</h1>
      </div>
    </div>
  );
}

export default App;
