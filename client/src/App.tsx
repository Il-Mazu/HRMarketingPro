import { Route, Switch } from "wouter";
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
  return (
    <>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/introduzione" component={Introduzione} />
        <Route path="/curiosita" component={Curiosities} />
        <Route path="/chi-siamo" component={ChiSiamo} />
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
