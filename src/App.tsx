import { TopBar } from "./components/TopBar/TopBar";
import "./App.css";
import { RestaurantList } from "@components/RestaurantList/RestaurantList";

const App = () => {
  return (
    <div className="app-container">
      <TopBar />
      <main className="main-content">
        <RestaurantList />
      </main>
    </div>
  );
};

export default App;
