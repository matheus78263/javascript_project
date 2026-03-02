const container = document.getElementById("remote-data-container");

async function fetchCountriesData() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/region/europe");
    const data = await response.json();
    displayCountries(data);
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

function displayCountries(countriesArray) {
  let htmlOutput = "";

  countriesArray.forEach((country) => {
    const capital = Array.isArray(country.capital) ? country.capital[0] : "N/A";

    htmlOutput += `
      <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">
        <img src="${country.flags?.png}" alt="Flag of ${country.name?.common}" width="50">
        <p>
          <b>${country.name?.common}</b><br>
          Capital: ${capital}<br>
          Population: ${Number(country.population || 0).toLocaleString()}<br>
          Region: ${country.region || "N/A"}
        </p>
      </div>
    `;
  });

  container.innerHTML = htmlOutput;
}

async function fetchUsersData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await response.json();
    displayUsersData(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}  

function displayUsersData(usersArray) {
    const container = document.getElementById("remote-data-container");
    let htmlOutput = "";
    usersArray.forEach(user => {
        htmlOutput += `
            <p>
            <b>${user.name} ${user.username}</b><br>
            Email: <a href="mailto:${user.email}">${user.email}</a><br>
            Website: <a href="http://${user.website}" target="_blank">${user.website}</a><br>
            Location: ${user.address.street}, ${user.address.city}
            </p>
        `;
    });
    container.innerHTML = htmlOutput;
} 

async function fetchRMData() {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    displayRMData(data.results);
  } catch (error) {
    console.error("Error fetching Rick & Morty:", error);
  }
}

function displayRMData(charactersArray) {
  let htmlOutput = "";

  charactersArray.forEach((character) => {
    htmlOutput += `
      <div style="border: 1px solid #ccc; padding: 12px; border-radius: 6px;">
        <img src="${character.image}" alt="${character.name}" width="120">
        <p>
          <b>${character.name}</b><br>
          Status: ${character.status}<br>
          Species: ${character.species}<br>
          Location: ${character.location?.name || "N/A"}
        </p>
      </div>
    `;
  });

  container.innerHTML = htmlOutput;
}

// Button clicks (event delegation)
document.getElementById("button-container").addEventListener("click", (e) => {
  if (e.target.id === "btn-countries") {
    fetchCountriesData();
  } else if (e.target.id === "btn-users") {
    fetchUsersData();
  } else if (e.target.id === "btn-RM") {
    fetchRMData();
  }
});

// Optional: load one dataset by default
// fetchCountriesData();