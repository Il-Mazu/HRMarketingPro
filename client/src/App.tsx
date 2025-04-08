import { Route, Switch, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Curiosities from "@/pages/Curiosities";
import ChiSiamo from "@/pages/ChiSiamo";
import Introduzione from "@/pages/Introduzione";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./styles/cursor.css";

function Router() {
  const [location] = useLocation();
  
  // Aggiungiamo un prefisso per GitHub Pages
  const basePath = '/HRMarketingPro';
  const currentPath = location.startsWith(basePath) ? location : `${basePath}${location}`;

  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path={`${basePath}/`} component={Home} />
        <Route path={`${basePath}/introduzione`} component={Introduzione} />
        <Route path={`${basePath}/curiosita`} component={Curiosities} />
        <Route path={`${basePath}/chi-siamo`} component={ChiSiamo} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
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
