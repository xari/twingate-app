import { useState, useCallback, useEffect } from "react";
import { getFetchData } from "./utils";

export default function Data({ url }) {
  const [content, setContent] = useState("Loading...");
  const fetchData = useCallback(getFetchData(url), [url]);

  useEffect(() => {
    fetchData(setContent);
  }, [fetchData]);

  return (
    <div className="grid grid-cols-5 gap-4 h-48 p-1 overflow-hidden">
      <div className="col-span-1">
        <button
          type="button"
          onClick={() => fetchData(setContent)}
          className="items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Refresh
        </button>
      </div>
      <pre className="">{content}</pre>
    </div>
  );
}
