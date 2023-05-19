const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

let quote;

const getQuote = () => {
  return $.ajax({
    url: `https://api.quotable.io/quotes/randoms`,
    method: "GET",
    success: function ([{ content, author }]) {
      quote = { content, author };
    },
    error: function ({ status, statusText }) {
      quote = { content: statusText, author: `HTTP ${status}` };
    }
  });
}

const awaitQuote = async () => {
  await getQuote()
    .then()
    .catch(() => console.log("An error message is just another quote 😎"));
}

awaitQuote().then(() => {
  console.log(quote);
});