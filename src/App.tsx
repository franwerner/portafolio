
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { createRoot } from "react-dom/client";
import "./global.css";
import Index from ".";

const App = () => (
  <ThemeProvider>
    <LanguageProvider>
      <Index />
    </LanguageProvider>
  </ThemeProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
