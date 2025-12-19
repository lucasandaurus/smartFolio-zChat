import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const operationData = await request.json();
    
    // Validar datos requeridos
    const requiredFields = ['date', 'platform', 'assetType', 'operationType', 'currency', 'ticker', 'assetName', 'price', 'quantity', 'total'];
    for (const field of requiredFields) {
      if (!operationData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // En una implementación real, guardaríamos en la base de datos
    // Por ahora, simulamos el guardado
    console.log('Saving operation:', operationData);

    // Simular ID de operación
    const operationId = `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const savedOperation = {
      id: operationId,
      ...operationData,
      createdAt: new Date().toISOString()
    };

    return NextResponse.json(savedOperation, { status: 201 });
  } catch (error) {
    console.error("Error saving operation:", error);
    return NextResponse.json(
      { error: "Error saving operation" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // En una implementación real, obtendríamos de la base de datos
    const operations = [
      {
        id: 'op_1',
        date: '2024-01-15T10:30:00Z',
        platform: 'balanz',
        assetType: 'CEDEARS',
        operationType: 'COMPRA',
        currency: 'USD',
        ticker: 'AAPL',
        assetName: 'Apple Inc.',
        price: 185.50,
        quantity: 10,
        commissions: 5.00,
        total: 1860.00,
        description: 'Compra de CEDEARs de Apple'
      },
      {
        id: 'op_2',
        date: '2024-01-14T14:20:00Z',
        platform: 'belo',
        assetType: 'CRYPTO',
        operationType: 'COMPRA',
        currency: 'USD',
        ticker: 'BTC',
        assetName: 'Bitcoin',
        price: 42500.00,
        quantity: 0.05,
        commissions: 2.50,
        total: 2127.50,
        description: 'Compra de Bitcoin'
      }
    ];

    return NextResponse.json(operations);
  } catch (error) {
    console.error("Error fetching operations:", error);
    return NextResponse.json(
      { error: "Error fetching operations" },
      { status: 500 }
    );
  }
}