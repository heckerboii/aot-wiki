const topics = ["episodes", "locations", "organizations", "titans"];

let type;
let count;
let index;

const articleImg = document.getElementById("article-img");
const title = document.getElementById("title");
const paragraph = document.getElementById("paragraph");

generate();

async function generate() {
  type = topics[Math.floor(Math.random() * topics.length)];
  await getIndex();
  index = Math.floor(Math.random() * count) + 1;
  fetchData();
}

async function getIndex() {
  try {
    const response = await fetch(`https://api.attackontitanapi.com/${type}/`);
    if (!response.ok) {
      throw new Error("Couldn't get index");
    }
    const data = await response.json();
    count = data.info.count;
  } catch (error) {
    console.error(error);
  }
}

async function fetchData() {
  try {
    const response = await fetch(
      `https://api.attackontitanapi.com/${type}/${index}`
    );
    if (!response.ok) {
      throw new Error("Couldn't fetch data");
    }
    const data = await response.json();

    document.title = `Titanpedia | ${data.name}`;
    title.innerHTML = data.name;

    articleImg.src = data.img;
    articleImg.alt = data.name;

    paragraph.innerHTML = "";

    switch (type) {
      case "episodes":
        const formattedCharacters = formatData(data.characters);

        displayField("Name", data.name);
        displayField("Episode", data.episode);
        displayField("Characters", formattedCharacters);
        break;
      case "locations":
        displayField("Name", data.name);
        displayField("Territory", data.territory);
        displayField("Region", data.region);
        break;
      case "organizations":
        const formattedOccupations = formatData(data.occupations);

        displayField("Name", data.name);
        displayField("Affiliations", data.affiliation);
        displayField("Occupations", formattedOccupations);
        displayField("Debut", data.debut);
        break;
      case "titans":
        const formattedAbilities = formatData(data.abilities);
        const formattedFormer = formatData(data.former_inheritors);

        displayField("Name", data.name);
        displayField("Abilities", formattedAbilities);
        displayField("Current Inheritor", data.current_inheritor);
        displayField("Former Inheritors", formattedFormer);
        displayField("Allegiance", data.allegiance);
        displayField("Height", data.height);
        break;
      default:
        createParagraph("Unknown type of data");
    }
  } catch (error) {
    console.error(error);
  }
}

function displayField(fieldName, fieldValue) {
  if (
    fieldValue &&
    fieldValue.trim() !== "" &&
    fieldValue.toLowerCase() !== "unknown"
  ) {
    createParagraph(`${fieldName}: ${fieldValue}`);
  } else {
    createParagraph(`${fieldName}: No ${fieldName.toLowerCase()} listed.`);
  }
}

function formatData(data) {
  if (Array.isArray(data)) {
    return data.join(", ");
  } else if (typeof data === "string") {
    return data;
  } else {
    return "Unknown";
  }
}

function createParagraph(content) {
  const p = document.createElement("p");
  p.innerHTML = content;
  p.classList.add("stat-item");
  paragraph.appendChild(p);
}
