import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    // Datos de ejemplo para top activos
    const topAssets = [
      { ticker: 'AAPL', name: 'Apple Inc.', change: 5.2, value: 2500000, type: 'CEDEAR' },
      { ticker: 'GGAL', name: 'Grupo Galicia', change: 3.1, value: 1800000, type: 'ACCION' },
      { ticker: 'BTC', name: 'Bitcoin', change: -2.3, value: 1500000, type: 'CRYPTO' },
      { ticker: 'YPFD', name: 'YPF', change: 4.7, value: 1200000, type: 'ACCION' },
      { ticker: 'TS', name: 'Ternium', change: 1.8, value: 900000, type: 'CEDEAR' },
      { ticker: 'PAMP', name: 'Pampa Energía', change: -1.5, value: 750000, type: 'ACCION' },
      { ticker: 'ETH', name: 'Ethereum', change: -3.2, value: 600000, type: 'CRYPTO' },
      { ticker: 'AL30', name: 'Bonar 2030', change: 0.8, value: 500000, type: 'BONO' }
    ];

    return NextResponse.json(topAssets);
  } catch (error) {
    console.error("Error fetching top assets:", error);
    return NextResponse.json(
      { error: "Error fetching top assets" },
      { status: 500 }
    );
  }
}