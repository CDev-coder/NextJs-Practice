import { NextResponse } from "next/server";
import productData from "./productData";

export async function GET() {
  try {
    const products = productData;

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
