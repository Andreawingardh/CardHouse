import "./App.css";
import Header from "./components/Header/Header";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import CustomizationPanel from "./components/CustomizationPanel/CustomizationPanel";
import CardModel from "./components/CardModel/CardModel";
import { CardDataProvider } from "./context/CardDataContext";

function App() {
  return (
    <>
      <CardDataProvider>
        <Header />
        <main>
          <section className="hero">
            <HeroHeader />
          </section>
          <section className="customization">
            <CardModel />
            <CustomizationPanel />
          </section>
        </main>
      </CardDataProvider>
    </>
  );
}

export default App;
