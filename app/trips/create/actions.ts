"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const tripSchema = z.object({
  trip_name: z.string().min(1, "Itinerary name is required"),
  description: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  destinations: z.string().optional(),
}).refine((data) => {
  const startDate = new Date(data.start_date);
  const endDate = new Date(data.end_date);
  return endDate >= startDate;
}, {
  message: "End date must be on or after start date",
  path: ["end_date"],
});

export type FormState = {
  message: string;
  errors?: {
    trip_name?: string[];
    description?: string[];
    start_date?: string[];
    end_date?: string[];
    destinations?: string[];
  };
};

export async function createItineraryAction(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const validatedFields = tripSchema.safeParse({
    trip_name: formData.get("trip_name"),
    description: formData.get("description"),
    start_date: formData.get("start_date"),
    end_date: formData.get("end_date"),
    destinations: formData.get("destinations"),
  });

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Parse destinations as JSON array
  let destinationsArray = [];
  if (validatedFields.data.destinations) {
    try {
      destinationsArray = JSON.parse(validatedFields.data.destinations);
    } catch {
      // If not valid JSON, treat as comma-separated string
      destinationsArray = validatedFields.data.destinations
        .split(',')
        .map(dest => dest.trim())
        .filter(dest => dest.length > 0);
    }
  }

  const { error } = await supabase.from("itineraries").insert({
    trip_name: validatedFields.data.trip_name,
    description: validatedFields.data.description,
    start_date: validatedFields.data.start_date,
    end_date: validatedFields.data.end_date,
    destinations: destinationsArray,
    user_id: user.id,
  });

  if (error) {
    return {
      message: `Failed to create itinerary: ${error.message}`,
    };
  }

  redirect("/dashboard");
}
