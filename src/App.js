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
          id: "hero-1",
          type: "hero",
          imageURI:
            "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
        },
        {
          id: "image-text-1",
          type: "image-text",
          imageURI:
            "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
          text: "Sunrise from the ground......",
          title: "Beach",
          leftToRight: true,
        },
        {
          id: "image-text-2",
          type: "image-text",
          imageURI:
            "https://images.unsplash.com/photo-1579963333765-b4129b3250fc",
          text: "Sunset from the sky......",
          title: "Airplane",
          leftToRight: false,
        },
        {
          id: "data-1",
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
        {JSON.parse(JSONStr).map((item) => {
          switch (item.type) {
            case "hero":
              return <Hero key={item.id} {...item} />;
            case "image-text":
              return <ImgTxt key={item.id} {...item} />;
            case "data":
              return <Data key={item.id} {...item} />;
            default:
              return <span key={item.id}>Non standard type</span>;
          }
        })}
      </div>
    </div>
  );
}

export default App;
