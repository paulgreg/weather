import cloudLogo from "/cloud.svg";
import "./App.css";
import cities from "cities.json";

function App() {
  return (
    <div className="App">
      <img src={cloudLogo} className="logo" alt="Vite logo" />
      <h1>Weather</h1>
      <p>{cities.filter(({ country }) => country === "FR").map(({ country, name }) => `${country} ${name}`)}</p>
    </div>
  );
}

export default App;
