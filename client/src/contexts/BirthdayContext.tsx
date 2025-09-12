
import { createContext, useContext, ReactNode } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BirthdayCustomization, InsertBirthdayCustomization } from "@shared/schema";

interface BirthdayContextType {
  customization: BirthdayCustomization | undefined;
  isLoading: boolean;
  error: Error | null;
  updateCustomization: (updates: Partial<InsertBirthdayCustomization>) => Promise<void>;
}

const BirthdayContext = createContext<BirthdayContextType | undefined>(undefined);

export function BirthdayProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  // Fetch birthday customization
  const { data: customization, isLoading, error } = useQuery({
    queryKey: ["birthday", "default"],
    queryFn: () => apiRequest("/birthday"),
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (updates: Partial<InsertBirthdayCustomization>) =>
      apiRequest("/birthday/default", {
        method: "PATCH",
        body: JSON.stringify(updates),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["birthday", "default"] });
    },
  });

  const updateCustomization = async (updates: Partial<InsertBirthdayCustomization>) => {
    await updateMutation.mutateAsync(updates);
  };

  return (
    <BirthdayContext.Provider
      value={{
        customization,
        isLoading,
        error: error as Error | null,
        updateCustomization,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthdayContext() {
  const context = useContext(BirthdayContext);
  if (context === undefined) {
    throw new Error("useBirthdayContext must be used within a BirthdayProvider");
  }
  return context;
}
