const themes = [
  'cornflowerblue',
  'steelblue',
  'mediumturquoise',
  'lightseagreen',
  'mediumpurple',
  'black',
  'darkslateblue',
  'darksalmon',
  'cadetblue',
  'salmon'
]

const defaultContent = 'Sometime all we need is sit down and wait'
const defaultAuthor = 'Querying the API'

let quote
let prevIndex

// Fetch the data from the api
const getQuote = () => {
  return $.ajax({
    url: 'https://api.quotable.io/quotes/random',
    method: 'GET',
    // Destruct returned data
    success: function ([{ content, author }]) {
      quote = { content, author }
    },
    // Destruct returned error
    error: function ({ status, statusText }) {
      quote = { content: statusText, author: `HTTP ${status}` }
    }
  })
}

// Wait for getQuote() to finish
const awaitQuote = async () => {
  await getQuote()
    .then()
    .catch(() => console.log('An error message is just another quote 😎'))
}

// Get random number up to "max"
const getRandomNum = (max) => {
  return Math.floor(Math.random() * max)
}

// Randomly change themes
const changeDataTheme = () => {
  let index = getRandomNum(themes.length)

  // No duplicated index number
  if (index === prevIndex) {
    index = getRandomNum(themes.length)
  }

  // To check if the next random index is
  // duplicated to the current index
  prevIndex = index

  // Change attribute to selected theme
  $(document.documentElement).attr('data-theme', themes[index])
  console.log('data-theme: ', themes[index])
}

// Insert 
const insertQuote = ({ content, author }) => {
  $('#content').text(content)
  $('#author').text(author)
}

const newQuote = () => {
  // Change theme first
  changeDataTheme()
  // The insert the funny default quote
  insertQuote({ content: defaultContent, author: defaultAuthor })

  // Fetch the API then insert the data later
  awaitQuote().then(() => {
    console.log(quote)
    insertQuote(quote)
  })
}

// Take screenshot of the quote
const saveQuote = () => {
  html2canvas($('#quote-box')[0], {
    // Exclude #save-quote button
    ignoreElements: function (element) {
      return element.id === 'save-quote'
    }
  }).then(canvas => {
    // Create a link with the image as URL
    const link = $('<a></a>')

    link.attr('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
    link.attr('download', 'today_quote.png')
    // Click the link to download the image
    link[0].click()
  })
}

// Load new quote from the API when open the page
newQuote()
