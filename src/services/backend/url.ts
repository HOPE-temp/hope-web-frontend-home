import { env } from '@/config/env';
import { generateUrlWithParms } from '@/lib/generateUrlParma';

export const hopeBackendUrl = {
  animals: {
    create: `${env.API_URL}/animals`,
    find: (params?: FilterAnimalDto) =>
      generateUrlWithParms<FilterAnimalDto>(`${env.API_URL}/animals`, params),
    findOne: (id: number) => `${env.API_URL}/animals/${id}`,
    findManyIds: `${env.API_URL}/animals/getManyIds`,
  },
};
