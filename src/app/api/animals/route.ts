import { findAllAnimals } from '@/services/backend/animals';

export async function GET() {
  const data = await findAllAnimals();

  return Response.json(data);
}
