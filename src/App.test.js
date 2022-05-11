import renderer from "react-test-renderer";
import App from "./App";

test("renders the App", () => {
  const tree = renderer.create(<App />).toJSON();

  expect(tree).toMatchSnapshot();
});
