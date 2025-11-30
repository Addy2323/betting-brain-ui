import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RoleProvider } from "@/components/RoleProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Layout } from "@/components/Layout";
import { LoadingProvider } from "@/context/LoadingContext";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import Splash from "./pages/Splash";
import Index from "./pages/Index";
import Wallet from "./pages/Wallet";
import Referrals from "./pages/Referrals";
import Trending from "./pages/Trending";
import PurchasedSlips from "./pages/PurchasedSlips";
import CreateSlip from "./pages/CreateSlip";
import VerifyTipsters from "./pages/VerifyTipsters";
import Finance from "./pages/Finance";
import Withdrawals from "./pages/Withdrawals";
import Disputes from "./pages/Disputes";
import Reports from "./pages/Reports";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LoadingProvider>
          <RoleProvider>
            <Toaster />
            <Sonner />
            <LoadingOverlay />
            <BrowserRouter future={{ v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Splash />} />
                <Route path="/auth" element={<Auth />} />
                <Route element={<Layout />}>
                  <Route path="/home" element={<Index />} />
                  <Route path="/trending" element={<Trending />} />
                  <Route path="/purchased" element={<PurchasedSlips />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/referrals" element={<Referrals />} />
                  <Route path="/create-slip" element={<CreateSlip />} />
                  <Route path="/verify-tipsters" element={<VerifyTipsters />} />
                  <Route path="/finance" element={<Finance />} />
                  <Route path="/withdrawals" element={<Withdrawals />} />
                  <Route path="/disputes" element={<Disputes />} />
                  <Route path="/reports" element={<Reports />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </RoleProvider>
        </LoadingProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
