import TopBar from "./component/TopBar";
import MainGrid from "./component/MainGrid";
import "./App.css";

function App() {
  return (
    <>
      {/* This is the horizontal bar on top with the text */}
      <TopBar />
      {/* This houses everything else on the screen:
      MainBox, StatusBar, BasicTextField */}
      <MainGrid />
    </>
  );
}

export default App;
