import { useState, useCallback } from "react";
import { classNames, isJsonString, prettyPrint } from "./utils";
import Hero from "./Hero";
import ImgTxt from "./ImgTxt";
import Data from "./Data";
import "./App.css";

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
          url: "https://api.publicapis.org/random",
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
