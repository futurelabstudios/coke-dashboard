import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import Overview from "./pages/Overview";
import Stores from "./pages/Stores";
import Regions from "./pages/Regions";
import Coolers from "./pages/Coolers";
import MissingCoolers from "./pages/MissingCoolers";
import Metrics from "./pages/Metrics";
import Availability from "./pages/Availability";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Overview />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/regions" element={<Regions />} />
            <Route path="/coolers" element={<Coolers />} />
            <Route path="/missing-coolers" element={<MissingCoolers />} />
            <Route path="/metrics" element={<Metrics />} />
            <Route path="/availability" element={<Availability />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
