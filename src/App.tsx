import "./App.css";
import Header from "./components/Header/Header";
import HeroHeader from "./components/HeroHeader/HeroHeader";

function App() {
  return (
    <>
      <Header />
      <section className="hero">
        <HeroHeader />
      </section>
      <section className="customization"></section>
    </>
  );
}

export default App;
