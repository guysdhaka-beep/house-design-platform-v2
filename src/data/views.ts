const STORAGE_KEY = "house_views";

type Views = {
  [id: number]: number;
};

// সব View পড়বে
function getViews(): Views {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) {
    return {};
  }

  return JSON.parse(data);
}

// একটি House-এর View বাড়াবে
export function incrementView(id: number) {
  const views = getViews();

  views[id] = (views[id] || 0) + 1;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(views));
}

// একটি House-এর View কত তা দিবে
export function getView(id: number): number {
  const views = getViews();

  return views[id] || 0;
}

// সব House-এর View দিবে
export function getAllViews(): Views {
  return getViews();
}

// দরকার হলে সব View Reset করবে
export function resetViews() {
  localStorage.removeItem(STORAGE_KEY);
}