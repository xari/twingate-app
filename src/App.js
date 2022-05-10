import { useState, useCallback, useEffect } from "react";
import "./App.css";

// For conveniently melding conditional styles and default styles
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
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

function Hero({ imageURI }) {
  return (
    <div>
      <img src={imageURI} className="object-cover h-48 w-full" />
    </div>
  );
}

function ImgTxt({ imageURI, text, title, leftToRight }) {
  const imgStyle = { backgroundImage: `url(${imageURI})` };
  const image = (
    <div
      className="h-full w-full bg-cover bg-center"
      style={imgStyle}
      title={title}
    ></div>
  );
  const textContent = (
    <div className="h-48 p-5">
      <div className="font-bold text-xl mb-2">{title}</div>
      <p>{text}</p>
    </div>
  );

  return (
    <>
      {leftToRight ? (
        <div className="grid grid-cols-2 w-full">
          {image}
          {textContent}
        </div>
      ) : (
        <div className="grid grid-cols-2 w-full text-right">
          {textContent}
          {image}
        </div>
      )}
    </>
  );
}

function getFetchData(url) {
  return function fetchData(callback) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        callback(JSON.stringify(data));
      })
      .catch((error) => {
        callback(`${error.toString()} — Will try again after 5 seconds.`);

        setTimeout(() => {
          fetchData(callback);
        }, 5000);
      });
  };
}

function Data({ url }) {
  const [content, setContent] = useState("Loading...");
  const fetchData = useCallback(getFetchData(url), [url]);

  useEffect(() => {
    fetchData(setContent);
  }, [fetchData]);

  return <div className="p-5 truncate break-words">{content} </div>;
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
    <div className="grid grid-cols-2">
      <div className="">
        {error && (
          <span>It looks like something is not right with your JSON.</span>
        )}
        <textarea
          className={classNames(
            error === false ? "bg-neutral-50" : "bg-red-50",
            "h-screen w-full block"
          )}
          cols={50}
          rows={30}
          defaultValue={JSONStr}
          onBlur={handleBlur}
          style={{ resize: "none" }}
        ></textarea>
      </div>
      <div className="">
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
              return <span>Non standard type</span>;
          }
        })}
      </div>
    </div>
  );
}

export default App;
