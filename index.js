const express = require("express");
const { google } = require("googleapis");

const app = express();
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// Funkcja do pobrania wartości z komórki F2
async function getTotalCoupons() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1a3Opm5q6t-aJ4iZtVIY_VHx3uIBx_04MOGg3SW4ZcLI";
    const range = "Sheet1!F2"; // Zakładam, że liczba znajduje się w komórce F2 arkusza "Sheet1"
  
    // Pobierz zawartość komórki F2
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    // Pobierz wartość z odpowiedzi
    const value = response.data.values[0][0];
    return value;
  }
  
  // Funkcja do pobrania wartości z komórki E2 (Aktualna pula nagród)
  async function getCurrentPrizePool() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1a3Opm5q6t-aJ4iZtVIY_VHx3uIBx_04MOGg3SW4ZcLI";
    const range = "Sheet1!E2"; // Zakładam, że liczba znajduje się w komórce E2 arkusza "Sheet1"
  
    // Pobierz zawartość komórki E2
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    // Pobierz wartość z odpowiedzi
    const value = response.data.values[0][0];
    return value;
  }

// Funkcja do pobrania wartości z komórki I2 (Ostatnie losowanie)
// Funkcja do pobrania wartości z komórki I2 (Ostatnie losowanie)
async function getLastDraw() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1a3Opm5q6t-aJ4iZtVIY_VHx3uIBx_04MOGg3SW4ZcLI";
    const range = "Sheet1!I2"; // Zakładam, że wartość znajduje się w komórce I2 arkusza "Sheet1"
  
    // Pobierz zawartość komórki I2
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    // Pobierz wartość z odpowiedzi
    const value = response.data.values[0][0];
    return value;
  }
  
  // Funkcja do pobrania wartości z komórki J2 (Łączna liczba kuponów z ostatniego losowania)
  async function getTotalCouponsLastDraw() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1a3Opm5q6t-aJ4iZtVIY_VHx3uIBx_04MOGg3SW4ZcLI";
    const range = "Sheet1!J2"; // Zakładam, że wartość znajduje się w komórce J2 arkusza "Sheet1"
  
    // Pobierz zawartość komórki J2
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    // Pobierz wartość z odpowiedzi
    const value = response.data.values[0][0];
    return value;
  }
  
  // Funkcja do pobrania wartości z komórki K2 (Ostatni zwycięzca)
  async function getLastWinner() {
    const auth = new google.auth.GoogleAuth({
      keyFile: "credentials.json",
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });
  
    // Create client instance for auth
    const client = await auth.getClient();
  
    // Instance of Google Sheets API
    const googleSheets = google.sheets({ version: "v4", auth: client });
  
    const spreadsheetId = "1a3Opm5q6t-aJ4iZtVIY_VHx3uIBx_04MOGg3SW4ZcLI";
    const range = "Sheet1!K2"; // Zakładam, że wartość znajduje się w komórce K2 arkusza "Sheet1"
  
    // Pobierz zawartość komórki K2
    const response = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });
  
    // Pobierz wartość z odpowiedzi
    const value = response.data.values[0][0];
    return value;
  }

  app.get("/", async (req, res) => {
    // Pobierz liczbę kuponów z komórki F2
    const totalCoupons = await getTotalCoupons();
  
    // Pobierz aktualną pulę nagród z komórki E2
    const currentPrizePool = await getCurrentPrizePool();
  
    // Pobierz informacje z komórek I2, J2 i K2
    const lastDraw = await getLastDraw();
    const totalCouponsLastDraw = await getTotalCouponsLastDraw();
    const lastWinner = await getLastWinner();
  
    // Przekazujemy dane do szablonu public.ejs
    const dataToRender = {
      totalCoupons,
      currentPrizePool,
      lastDraw,
      totalCouponsLastDraw,
      lastWinner,
    };
    res.render("public", { data: dataToRender });
  });
  

app.get("/access", async (req, res) => {
  // Pobierz liczbę kuponów z komórki F2
  const totalCoupons = await getTotalCoupons();

  // Pobierz aktualną pulę nagród z komórki E2
  const currentPrizePool = await getCurrentPrizePool();

  // Pobierz informacje z komórek I2, J2 i K2
  const lastDraw = await getLastDraw();
  const totalCouponsLastDraw = await getTotalCouponsLastDraw();
  const lastWinner = await getLastWinner();

  // Przekazujemy dane do szablonu index.ejs
  const dataToRender = {
    totalCoupons,
    currentPrizePool,
    lastDraw,
    totalCouponsLastDraw,
    lastWinner,
  };
  res.render("index", { data: dataToRender });
});

app.post("/access", async (req, res) => {
  const { ssn, name, coupon } = req.body;

  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1a3Opm5q6t-aJ4iZtVIY_VHx3uIBx_04MOGg3SW4ZcLI";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Write row(s) to spreadsheet
  await googleSheets.spreadsheets.values.append({
    auth,
    spreadsheetId,
    range: "Sheet1!A:A",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[name, ssn, coupon]],
    },
  });

  // Przekazujemy dane do szablonu podsumowanie.ejs
  const dataToRender = {
    name,
    ssn,
    coupon,
  };
  res.render("podsumowanie", { data: dataToRender });
});

app.listen(5000, () => {
  console.log('Server runing on port 3000');
});
