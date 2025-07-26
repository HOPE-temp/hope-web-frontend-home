import { findOneAnimal } from '@/services/backend/animals';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // req.nextUrl es una instancia URL
  // Extraemos el pathname y el último segmento que es el id
  const segments = req.nextUrl.pathname.split('/');
  const id = segments[segments.length - 1];

  const parsedId = parseInt(id, 10);
  const isValid = !isNaN(parsedId) && Number.isInteger(parsedId);

  if (!isValid) {
    return NextResponse.json(
      { error: 'ID inválido. Debe ser un número entero.' },
      { status: 400 }
    );
  }

  const data = await findOneAnimal(parsedId);

  return NextResponse.json(data);
}
