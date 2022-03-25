import { useState, useCallback, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

// For conveniently melding conditional styles and default styles
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Hero({ imageURI }) {
  return (
    <div>
      <img src={imageURI} className="object-cover h-48 w-96 mx-auto" />
    </div>
  );
}

function ImgTxt({ imageURI, text, title, leftToRight }) {
  const imgStyle = { backgroundImage: `url(${imageURI})` };
  const image = (
    <div
      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
      style={imgStyle}
      title={title}
    ></div>
  );
  const content = (
    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{text}</p>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:max-w-full lg:flex">
      {leftToRight ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
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
    return <div className="container truncate break-words">{data}</div>;
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
    <div className="h-full flex">
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
        <div className="flex items-center justify-between bg-gray-50 border-b border-gray-200 px-4 py-1.5">
          <textarea
            className={classNames(
              error === false ? "bg-neutral-50" : "bg-red-50",
              "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            )}
            cols={50}
            rows={30}
            defaultValue={JSONStr}
            onBlur={handleBlur}
          ></textarea>
        </div>

        <h1>Editor</h1>
      </div>

      <div className="flex-1 relative z-0 flex overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
          {/* Start main area*/}
          <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
            <div className="h-full border-2 border-gray-200 border-dashed rounded-lg">
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
          {/* End main area */}
        </main>
      </div>
    </div>
  );
}

export default App;
