import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Birthday from "./components/Birthday";
import { BirthdayProvider } from "./contexts/BirthdayContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Birthday} />
      <Route path="/birthday" component={Birthday} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BirthdayProvider>
          <Toaster />
          <Router />
        </BirthdayProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
