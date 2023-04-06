const APIurl = "http://localhost:3000/stations/";

export async function getAllStations() {
  const response = await fetch(`${APIurl}`);
  return response.json();
}
