import { findOneAnimal } from '@/services/backend/animals';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const aniamlId = params.id;

  const parsedId = parseInt(aniamlId, 10);
  const isValid = !isNaN(parsedId) && Number.isInteger(parsedId);

  if (!isValid) {
    return NextResponse.json(
      { error: 'ID inválido. Debe ser un número entero.' },
      { status: 400 }
    );
  }

  const data = await findOneAnimal(parsedId);

  return Response.json(data);
}
