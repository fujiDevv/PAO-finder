import * as fs from "fs";
import * as path from "path";

const CSV_PATH = path.resolve(__dirname, "../apps/website/src/assets/PAO Offices.csv");
const OUTPUT_API_PATH = path.resolve(__dirname, "../apps/api/src/pao-db.json");
const OUTPUT_UI_PATH = path.resolve(__dirname, "../apps/website/src/assets/pao-db.json");

// Mapping of regions to their geographical coverage (provinces, major cities, and common search names)
const coverageMap: Record<string, string[]> = {
  "NATIONAL CAPITAL REGION": [
    "caloocan",
    "las pinas",
    "makati",
    "malabon",
    "mandaluyong",
    "manila",
    "marikina",
    "muntinlupa",
    "navotas",
    "paranaque",
    "pasay",
    "pasig",
    "pateros",
    "quezon",
    "san juan",
    "taguig",
    "valenzuela",
    "metro manila",
    "ncr",
  ],
  "CORDILLERA ADMINISTRATIVE REGION": [
    "abra",
    "apayao",
    "benguet",
    "ifugao",
    "kalinga",
    "mountain province",
    "baguio",
  ],
  "REGION I": [
    "ilocos norte",
    "ilocos sur",
    "la union",
    "pangasinan",
    "dagupan",
    "san fernando la union",
    "laoag",
    "vigan",
  ],
  "REGION II": [
    "batanes",
    "cagayan",
    "isabela",
    "nueva vizcaya",
    "quirino",
    "tuguegarao",
    "santiago",
    "cauayan",
    "ilagan",
  ],
  "REGION III": [
    "aurora",
    "bataan",
    "bulacan",
    "nueva ecija",
    "pampanga",
    "tarlac",
    "zambales",
    "angeles",
    "olongapo",
    "cabanatuan",
    "san jose",
    "palayan",
    "gapan",
    "muñoz",
    "mabalacat",
    "san fernando pampanga",
    "malolos",
    "meycauayan",
    "sanjose del monte",
    "tarlac city",
    "balanga",
  ],
  "CALABARZON REGION (REGION IV-A)": [
    "batangas",
    "cavite",
    "laguna",
    "quezon",
    "rizal",
    "antipolo",
    "lucena",
    "lipa",
    "batangas city",
    "tanauan",
    "cavite city",
    "tagaytay",
    "trece martires",
    "imus",
    "bacoor",
    "dasmarinas",
    "general trias",
    "biñan",
    "cabuyao",
    "calamba",
    "san pablo",
    "santa rosa",
    "tayabas",
  ],
  "MIMAROPA REGION": [
    "marinduque",
    "occidental mindoro",
    "oriental mindoro",
    "palawan",
    "romblon",
    "calapan",
    "puerto princesa",
  ],
  "REGION V": [
    "albay",
    "camarines norte",
    "camarines sur",
    "catanduanes",
    "masbate",
    "sorsogon",
    "legazpi",
    "naga",
    "iriga",
    "ligao",
    "tabaco",
    "masbate city",
    "sorsogon city",
  ],
  "REGION VI": [
    "aklan",
    "antique",
    "capiz",
    "guimaras",
    "iloilo",
    "negros occidental",
    "bacolod",
    "iloilo city",
    "roxas",
    "san jose de buenavista",
    "kalibo",
    "passi",
    "bago",
    "cadiz",
    "escalante",
    "himamaylan",
    "kabankalan",
    "la carlota",
    "sagay",
    "san carlos",
    "silay",
    "sipalay",
    "victorias",
  ],
  "REGION VII": [
    "bohol",
    "cebu",
    "negros oriental",
    "siquijor",
    "cebu city",
    "lapu-lapu",
    "mandaue",
    "talisay",
    "dumaguete",
    "tagbilaran",
    "bais",
    "bayawan",
    "canlaon",
    "guihulngan",
    "tanjay",
    "carcar",
    "danao",
    "naga cebu",
    "toledo",
    "bogo",
  ],
  "REGION VIII": [
    "biliran",
    "eastern samar",
    "leyte",
    "northern samar",
    "samar",
    "southern leyte",
    "tacloban",
    "ormoc",
    "baybay",
    "catbalogan",
    "borongan",
    "maasin",
    "calbayog",
  ],
  "BANGSAMORO AUTONOMOUS REGION in MUSLIM MINDANAO (BARMM)": [
    "basilan",
    "lanao del sur",
    "maguindanao del norte",
    "maguindanao del sur",
    "sulu",
    "tawi-tawi",
    "cotabato city",
    "marawi",
    "lamitan",
    "barmm",
  ],
  "ZAMBOANGA PENINSULA REGION": [
    "zamboanga del norte",
    "zamboanga del sur",
    "zamboanga sibugay",
    "zamboanga city",
    "isabela city",
    "pagadian",
    "dipolog",
    "dapitan",
  ],
  "NORTHEN MINDANAO REGION (REGION X)": [
    "camiguin",
    "lanao del norte",
    "misamis occidental",
    "misamis oriental",
    "bukidnon",
    "cagayan de oro",
    "iligan",
    "ozamiz",
    "oroquieta",
    "tangub",
    "valencia",
    "malaybalay",
    "el salvador",
    "gingoog",
  ],
  "DAVAO REGION (REGION XI)": [
    "davao de oro",
    "davao del norte",
    "davao del sur",
    "davao occidental",
    "davao oriental",
    "davao city",
    "tagum",
    "panabo",
    "samal",
    "digos",
    "mati",
  ],
  "SOCCKSARGEN REGION (REGION XII)": [
    "cotabato",
    "sarangani",
    "south cotabato",
    "sultan kudarat",
    "general santos",
    "koronadal",
    "kidapawan",
    "tacurong",
  ],
  "CARAGA REGION (REGION XIII)": [
    "agusan del norte",
    "agusan del sur",
    "dinagat islands",
    "surigao del norte",
    "surigao del sur",
    "butuan",
    "surigao city",
    "bayugan",
    "cabadbaran",
    "bislig",
    "tandag",
  ],
};

// Simple ID slug generator
function getSlug(regionName: string): string {
  const norm = regionName.toLowerCase();
  if (norm.includes("caraga")) return "pao-r13";
  if (norm.includes("ncr") || norm.includes("national capital")) return "pao-ncr";
  if (norm.includes("car") || norm.includes("cordillera")) return "pao-car";
  if (norm.includes("barmm") || norm.includes("bangsamoro")) return "pao-barmm";
  if (norm.includes("calabarzon")) return "pao-r4a";
  if (norm.includes("mimaropa")) return "pao-r4b";

  const match = norm.match(/region\s+([ixvld0-9]+)/i);
  if (match) {
    return `pao-r${match[1].toLowerCase()}`;
  }

  return "pao-" + norm.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

interface SatelliteOffice {
  address: string;
  contact: string;
  email: string;
}

interface OfficeRecord {
  id: string;
  region: string;
  coverage: string[];
  attorney: string;
  address: string;
  contact: string;
  email: string;
  satellites: SatelliteOffice[];
}

function parseCSV(content: string): OfficeRecord[] {
  const lines = content.split(/\r?\n/).filter((line) => line.trim().length > 0);
  lines.shift(); // Remove header row

  const records: OfficeRecord[] = [];
  let currentParent: OfficeRecord | null = null;

  for (const line of lines) {
    // Since all fields are quoted like "field1","field2",...
    // We strip starting and ending quotes and split by ","
    const stripped = line.replace(/^"/, "").replace(/"$/, "");
    const columns = stripped.split(/","/);

    if (columns.length < 5) continue;

    const region = columns[0].trim();
    const attorney = columns[1].trim();
    const address = columns[2].trim();
    const contact = columns[3].trim();
    const email = columns[4].trim();

    // If region is empty, this is a satellite office under the current parent
    if (region === "" && attorney === "") {
      if (currentParent) {
        currentParent.satellites.push({
          address,
          contact,
          email,
        });
      }
    } else {
      const id = getSlug(region);
      const coverage = coverageMap[region] || [region.toLowerCase()];
      const record: OfficeRecord = {
        id,
        region,
        coverage,
        attorney,
        address,
        contact,
        email,
        satellites: [],
      };
      records.push(record);
      currentParent = record;
    }
  }

  return records;
}

function run() {
  console.log(`Reading CSV from: ${CSV_PATH}`);
  const content = fs.readFileSync(CSV_PATH, "utf-8");
  const db = parseCSV(content);

  console.log(`Successfully parsed ${db.length} regions.`);

  // Create API src directory if not exist
  const apiDir = path.dirname(OUTPUT_API_PATH);
  if (!fs.existsSync(apiDir)) {
    fs.mkdirSync(apiDir, { recursive: true });
  }

  // Create UI assets directory if not exist (should exist though)
  const uiDir = path.dirname(OUTPUT_UI_PATH);
  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_API_PATH, JSON.stringify(db, null, 2), "utf-8");
  console.log(`Saved API db to: ${OUTPUT_API_PATH}`);

  fs.writeFileSync(OUTPUT_UI_PATH, JSON.stringify(db, null, 2), "utf-8");
  console.log(`Saved UI db to: ${OUTPUT_UI_PATH}`);
}

run();
