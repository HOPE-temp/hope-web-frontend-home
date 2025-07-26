import { hopeBackendUrl } from './url';
export async function findOneAnimal(id: number) {
  const res = await fetch(hopeBackendUrl.animals.findOne(id));
  if (!res.ok) throw new Error('No encontrado');
  return res.json();
}

export async function findAllAnimals(params?: FilterAnimalDto) {
  const res = await fetch(hopeBackendUrl.animals.find(params));
  const datos = await res.json();
  const transformedAnimals = datos.items.map((animal: any) => {
    if (animal.images.length == 0) {
      animal.images.push('/images/avatar-dog.png');
    }
    return animal;
  });
  datos.items = transformedAnimals;
  return datos;
}

export async function findManyIdsAnimals(data: GetByIdsAnimalDto) {
  const res = await fetch(hopeBackendUrl.animals.findManyIds, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Importante si envías JSON
    },
    body: JSON.stringify(data),
  });

  const datos = await res.json();
  const transformedAnimals = datos.items.map((animal: any) => {
    if (animal.images.length == 0) {
      animal.images.push('/images/avatar-dog.png');
    }
    return animal;
  });
  datos.items = transformedAnimals;
  return datos;
}
