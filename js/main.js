const topics = ["episodes", "locations", "organizations", "titans"];

let type = "characters";
let index = "8";

fetchData();

async function fetchData() {
  try {
    const response = await fetch(
      `https://api.attackontitanapi.com/${type}/${index}`
    );
    if (!response.ok) {
      throw new Error("Couldn't fetch data");
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
