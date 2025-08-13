async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${bc29083ff91f6497ad4eb7297cdf1d78`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  const data = await res.json();
  console.log(data);
  // Update your HTML with the data
}

document.getElementById("searchBtn").addEventListener("click", () => {
  const city = document.getElementById("cityInput").value;
  getWeather(city);
});
