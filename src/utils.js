export const sendResponse = (data, statusCode = 200) => {
  return new Response(JSON.stringify(data), {
    status: statusCode,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
