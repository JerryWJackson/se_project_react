// export const defaultClothingItems = [
//   {
//     _id: 0,
//     name: "Cap",
//     weather: "hot",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
//   },
//   {
//     _id: 1,
//     name: "Hoodie",
//     weather: "warm",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
//   },
//   {
//     _id: 2,
//     name: "Jacket",
//     weather: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
//   },
//   {
//     _id: 3,
//     name: "Sneakers",
//     weather: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
//   },
//   {
//     _id: 4,
//     name: "T-Shirt",
//     weather: "hot",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
//   },
//   {
//     _id: 5,
//     name: "Winter coat",
//     weather: "cold",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
//   },
// ];

export const weatherOptions = [
  {
    url: require("../images/day/clear.svg").default,
    day: true,
    weather: "clear",
  },
  {
    url: require("../images/day/clouds.svg").default,
    day: true,
    weather: "clouds",
  },
  {
    url: require("../images/day/fog.svg").default,
    day: true,
    weather: "fog",
  },
  {
    url: require("../images/day/rain.svg").default,
    day: true,
    weather: "rain",
  },
  {
    url: require("../images/day/snow.svg").default,
    day: true,
    weather: "snow",
  },
  {
    url: require("../images/day/storm.svg").default,
    day: true,
    weather: "storm",
  },
  {
    url: require("../images/night/clear.svg").default,
    day: false,
    weather: "clear",
  },
  {
    url: require("../images/night/clouds.svg").default,
    day: false,
    weather: "clouds",
  },
  {
    url: require("../images/night/fog.svg").default,
    day: false,
    weather: "fog",
  },
  {
    url: require("../images/night/rain.svg").default,
    day: false,
    weather: "rain",
  },
  {
    url: require("../images/night/snow.svg").default,
    day: false,
    weather: "snow",
  },
  {
    url: require("../images/night/storm.svg").default,
    day: false,
    weather: "storm",
  },
];

// export const weatherTemp = "68° F";

const apiKey = "d4f7aaf277abe33386f84dc212a69e83";
const latitude = 30.37522;
const longitude = -97.71174;
const units = "Imperial";

export const endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

// https://api.openweathermap.org/data/2.5/weather?lat=30.375220&lon=-97.711740&units=Imperial&appid=d4f7aaf277abe33386f84dc212a69e83