import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import ChiSiamo from "@/pages/ChiSiamo";
import Introduzione from "@/pages/Introduzione";
import Avvenimenti from "@/pages/Avvenimenti";
import Personaggi from "@/pages/Personaggi";
import Luoghi from "@/pages/Luoghi";
import Arte from "@/pages/Arte";
import VitaQuotidiana from "@/pages/VitaQuotidiana";
import ArmiArmature from "@/pages/ArmiArmature";
import ArtiArtigianato from "@/pages/ArtiArtigianato";
import Cibo from "@/pages/Cibo";
import Header from "@/components/Header";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/cursor.css";

function Router() {
  const [location] = useLocation();
  
  // Gestione del routing per GitHub Pages
  const basePath = '/HRMarketingPro';
  const currentPath = location.startsWith(basePath) ? location : `${basePath}${location}`;

  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path={`${basePath}/`} component={Home} />
        <Route path={`${basePath}/introduzione`} component={Introduzione} />
        <Route path={`${basePath}/chi-siamo`} component={ChiSiamo} />
        <Route path={`${basePath}/avvenimenti`} component={Avvenimenti} />
        <Route path={`${basePath}/personaggi`} component={Personaggi} />
        <Route path={`${basePath}/luoghi`} component={Luoghi} />
        <Route path={`${basePath}/arte`} component={Arte} />
        <Route path={`${basePath}/vita-quotidiana`} component={VitaQuotidiana} />
        <Route path={`${basePath}/armi-armature`} component={ArmiArmature} />
        <Route path={`${basePath}/arti-artigianato`} component={ArtiArtigianato} />
        <Route path={`${basePath}/cibo`} component={Cibo} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
