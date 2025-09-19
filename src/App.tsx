import "./App.css";
import Header from "./components/Header/Header";
import HeroHeader from "./components/HeroHeader/HeroHeader";
import CustomizationPanel from "./components/CustomizationPanel/CustomizationPanel";

function App() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <HeroHeader />
        </section>
        <section className="customization">
          <div className="cardModelStandIn">
            {/* Stand in div to replace with Card Model once it is done */}
          </div>
          <CustomizationPanel />
        </section>
      </main>
    </>
  );
}

export default App;
