import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Curiosities from "@/pages/Curiosities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function Router() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/curiosities" component={Curiosities} />
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
