const APIurl = "http://localhost:3000";

export async function getAllStations() {
  const response = await fetch(`${APIurl}/stations/`);
  return response.json();
}

export async function getStation(id) {
  const response = await fetch(`${APIurl}/station/${id}`);
  return response.json();
}
