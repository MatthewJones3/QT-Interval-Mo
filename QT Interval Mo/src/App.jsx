import { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import QTAssessment from "./QTAssessment";
import CardioOncInfo from "./CardioOncInfo";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <QTAssessment />
        <CardioOncInfo />
      </main>
      <Footer />
    </div>
  );
}

export default App;
