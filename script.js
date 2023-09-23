let quotesData = [];
const colors = [
  'primary',
  'secondary',
  'success',
  'danger',
  'warning',
  'info',
  'light',
  'dark',
];
let prevColor;

function getQuotes() {
  return $.ajax({
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function (result) {
      let parsedResult = JSON.parse(result);
      quotesData = parsedResult.quotes;
      if (quotesData.length) {
        console.log('has data');
        getRandomQuote();
      }
    },
  });
}

function getRandomQuote() {
  let randomIndex = Math.floor(Math.random() * quotesData.length);
  let newQuoteObj = quotesData[randomIndex];
  let newQuote = quotesData[randomIndex].quote;
  let newAuthor = quotesData[randomIndex].author;
  console.log({ quotesData, randomIndex, newQuoteObj });
  if (quotesData.length) {
    $('#text').html(newQuote);
    $('#author').html(newAuthor);
    $('#tweet-quote').attr(
      'href',
      'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + newQuote + '" ' + newAuthor)
    );

    let newColor = getRandomColor();

    setTimeout(() => {
      $('#main-container')
        .addClass(`bg-${newColor}`)
        .removeClass(`bg-${prevColor}`);
      $('.card')
        .addClass(`bg-${newColor}-subtle`)
        .removeClass(`bg-${prevColor}-subtle`);
      $('#new-quote')
        .addClass(`btn-${newColor}`)
        .removeClass(`btn-${prevColor}`);

      prevColor = newColor;
    }, 150);
  }
}

function getRandomColor() {
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

$(document).ready(function () {
  getQuotes();
  $('#new-quote').on('click', getRandomQuote);
});
