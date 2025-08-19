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

////////CREATING INVOICE
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
  ////This try & catch will attempt to find the sql
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }
  revalidatePath("/dashboard/invoices"); //Refreshes any client data for the invoices to the newest instance.
  redirect("/dashboard/invoices"); ////Then we refresh the current page after the new data has been created.
  ///"redirect" throws a unique error code that will still be detected by a regular try & catch.
}

//////// UPDATING INVOICE
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }

  revalidatePath("/dashboard/invoices"); ///Same as the create form
  redirect("/dashboard/invoices");
}

///DELETING INVOICE
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    // We'll log the error to the console for now
    console.error(error);
  }
  revalidatePath("/dashboard/invoices"); //Just refresh since where the delete is located is the invoice page
}
