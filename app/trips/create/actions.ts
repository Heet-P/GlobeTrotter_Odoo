"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const tripSchema = z.object({
  trip_name: z.string().min(1, "Trip name is required"),
  description: z.string().optional(),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
});

export type FormState = {
  message: string;
  errors?: {
    trip_name?: string[];
    description?: string[];
    start_date?: string[];
    end_date?: string[];
  };
};

export async function createTripAction(
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
  });

  if (!validatedFields.success) {
    return {
      message: "Please correct the errors below.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase.from("trips").insert({
    ...validatedFields.data,
    user_id: user.id,
  });

  if (error) {
    return {
      message: `Failed to create trip: ${error.message}`,
    };
  }

  redirect("/dashboard");
}
