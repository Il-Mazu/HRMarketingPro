import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";

// Import GSAP for animations
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
