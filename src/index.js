import { sendResponse } from "./utils.js";

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

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
