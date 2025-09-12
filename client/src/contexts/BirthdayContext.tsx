import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BirthdayCustomization } from "@shared/schema";

interface BirthdayContextType {
  customization: BirthdayCustomization | undefined;
  isLoading: boolean;
  updateField: (field: keyof BirthdayCustomization, value: any) => void;
  updateTimelineEntry: (index: number, value: string) => void;
  updateGalleryItem: (index: number, imageUrl?: string, caption?: string) => void;
}

const BirthdayContext = createContext<BirthdayContextType | null>(null);

export function BirthdayProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  
  // Fetch birthday customization data
  const { data: customization, isLoading } = useQuery<BirthdayCustomization>({
    queryKey: ["/api/birthday"],
  });

  // Mutation for updating birthday customization
  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<BirthdayCustomization>) => {
      if (!customization) return;
      const response = await apiRequest("PATCH", `/api/birthday/${customization.id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/birthday"] });
    },
  });

  const updateField = (field: keyof BirthdayCustomization, value: any) => {
    updateMutation.mutate({ [field]: value });
  };

  const updateTimelineEntry = (index: number, value: string) => {
    if (!customization?.timelineEntries) return;
    const newEntries = [...customization.timelineEntries];
    newEntries[index] = value;
    updateField("timelineEntries", newEntries);
  };

  const updateGalleryItem = (index: number, imageUrl?: string, caption?: string) => {
    if (!customization?.galleryItems) return;
    const newItems = [...customization.galleryItems];
    
    // Ensure the array is long enough
    while (newItems.length <= index) {
      newItems.push({ imageUrl: "", caption: `Memory #${newItems.length + 1}` });
    }
    
    if (imageUrl !== undefined) {
      newItems[index].imageUrl = imageUrl;
    }
    if (caption !== undefined) {
      newItems[index].caption = caption;
    }
    
    updateField("galleryItems", newItems);
  };

  return (
    <BirthdayContext.Provider
      value={{
        customization,
        isLoading,
        updateField,
        updateTimelineEntry,
        updateGalleryItem,
      }}
    >
      {children}
    </BirthdayContext.Provider>
  );
}

export function useBirthdayContext() {
  const context = useContext(BirthdayContext);
  if (!context) {
    throw new Error("useBirthdayContext must be used within a BirthdayProvider");
  }
  return context;
}