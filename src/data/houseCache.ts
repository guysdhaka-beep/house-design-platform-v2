const API =
  "https://house-design-platform-server.vercel.app/api/houses";

const cache = new Map<number, any>();

const pending = new Map<number, Promise<any>>();

export async function getHouse(id: number) {
  // Memory Cache
  if (cache.has(id)) {
    return cache.get(id);
  }

  // Same request running
  if (pending.has(id)) {
    return pending.get(id);
  }

  const request = fetch(`${API}/${id}`, {
    cache: "force-cache",
  })
    .then((res) => res.json())
    .then((data) => {
      cache.set(id, data.house);
      pending.delete(id);
      return data.house;
    })
    .catch((err) => {
      pending.delete(id);
      throw err;
    });

  pending.set(id, request);

  return request;
}

export function saveHouse(house: any) {
  if (!house?.id) return;

  cache.set(house.id, house);
}

export function removeHouse(id: number) {
  cache.delete(id);
}

export function clearHouseCache() {
  cache.clear();
}