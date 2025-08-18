"use server"; ////Makes this file house functions as Server Actions
///Any functions that are defineded here but are not used will be removed in the production builds

import { z } from "zod"; // Zod is a typescript validation library that ensures we have consistant types
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" }); //Find the database address

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(["pending", "paid"]),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];

  /////Once we have the database, we send over our new data/insert our new data into the database
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath("/dashboard/invoices"); //Refreshes any client data for the invoices to the newest instance.
  redirect("/dashboard/invoices"); ////Then we refresh the current page after the new data has been created
}
