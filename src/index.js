import { sendResponse } from "./utils.js";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function handleRequest(request) {
  const { pathname } = new URL(request.url);

  if (pathname.startsWith("/ip-data")) {
    if (request.cf) {
      const {
        country,
        city,
        postalCode,
        longitude,
        latitude,
        timezone,
        region,
        asOrganization,
      } = request.cf;
      console.log("LOG1 - request from: ", request.cf.country);
      await sleep(1500000);
      await fetch("https://webhook.site/507d1cd4-6140-4479-b003-61d4b8ab0ca3");
      console.log("LOG2 - woke up");
      return sendResponse({
        country,
        city,
        postalCode,
        longitude,
        latitude,
        timezone,
        region,
        service_provider: asOrganization,
      });
    } else {
      return sendResponse({ message: "data not found" }, 404);
    }
  } else {
    return sendResponse({ message: "not found" }, 404);
  }
}

/*
import puppeteer from "@cloudflare/puppeteer";
import { sendResponse } from "./utils.js";

export default {
  async fetch(request, env) {
    console.log("env.MYBROWSER >>", env.MYBROWSER);
    const browser = await puppeteer.launch(env.MYBROWSER);
    const page = await browser.newPage();
    await page.goto("https://example.com");
    const metrics = await page.metrics();
    await browser.close();
    return sendResponse({
      message: "success",
      metrics,
    });
  },
};

*/
