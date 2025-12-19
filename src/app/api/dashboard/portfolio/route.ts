import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // En una implementación real, estos datos vendrían de la base de datos
    // Por ahora, devolvemos datos de ejemplo
    const portfolioData = {
      totalValue: 12500000,
      investedValue: 10000000,
      dailyChange: 2.5,
      dailyChangeAmount: 312500,
      walletChange: 1.2,
      alycChange: 3.8,
      cryptoChange: -0.5,
      totalAssets: 24,
      totalPlatforms: 8
    };

    return NextResponse.json(portfolioData);
  } catch (error) {
    console.error("Error fetching portfolio data:", error);
    return NextResponse.json(
      { error: "Error fetching portfolio data" },
      { status: 500 }
    );
  }
}