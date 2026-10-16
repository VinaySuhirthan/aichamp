import fs from "fs";

const logoBuf = fs.readFileSync("public/logo.png");
const base64 = logoBuf.toString("base64");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <clipPath id="rounded">
    <rect width="100" height="100" rx="16" />
  </clipPath>
  <image href="data:image/png;base64,${base64}" width="100" height="100" clip-path="url(#rounded)" preserveAspectRatio="xMidYMid slice" />
</svg>`;

fs.writeFileSync("public/favicon.svg", svg);
console.log("Successfully generated public/favicon.svg with embedded exact logo.");
