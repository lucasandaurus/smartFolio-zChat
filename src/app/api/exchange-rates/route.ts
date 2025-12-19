import { NextResponse } from "next/server";
import { ExchangeRateService } from "@/lib/services/exchange-rate.service";

export async function GET() {
  try {
    const exchangeRateService = ExchangeRateService.getInstance();
    const rates = await exchangeRateService.getExchangeRates();
    
    return NextResponse.json(rates);
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return NextResponse.json(
      { error: "Error fetching exchange rates" },
      { status: 500 }
    );
  }
}