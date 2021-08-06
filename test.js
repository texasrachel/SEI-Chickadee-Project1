//temporary code

const button = document.getElementById("button");
const visible = document.getElementById('visible')
const hiddenButton = document.getElementById("hidden-button")
const fontArray = [
  'Alex Brush',
  'Amatic SC',
  'Lovers Quarrel',
  'Rochester',
  'Shadows Into Light'
]
const hiddenDiv = document.getElementById('quote-div')
const colorArray = [
  "#ee9b00",
  "#005f73",
  "#656d4a",
  '#c2c5aa',
  '#6c757d',
  '#577590',
  '#ecbcfd',
  '#c8e7ff',
  '#892b64',
  '#5c4d7d'
]
const apiURL = "https://zenquotes.io/api/quotes/"
const quoteURL = "https://zenquotes.io/api/random/84dcbeb778e17abd111cc16ad76e1e4caac13370?"

const wallpaper = document.getElementById("wallpaper");
const context = wallpaper.getContext('2d')
let wallWidth = wallpaper.width
console.log(wallWidth)
let wallHeight = wallpaper.height
console.log(wallHeight)
let x = wallWidth / 4
let y = wallHeight / 4
let maxWidth = wallWidth * 0.9
const lineHeight = 30
let xStart = (wallWidth - maxWidth) / 2
let yStart = 30

// const [a, b] = fontArray
// console.log(a);
// console.log(b);

//wallpaper generation 
// https://www.javascripttutorial.net/web-apis/javascript-canvas/
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
// https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/

//functions
//pulls quotes
  const getQuote = async () => {
    wall()
    try {
      const response = await axios.get(quoteURL)
      console.log(response.data[0].q)
      const quote = response.data[0].q
      hiddenDiv.append(quote)
      // const quoteLength = quote.split(' ').length
      // return quote
      // return quoteLength
    wrap(quote)
    } catch (error) {
        console.error(error)
    }
  }

  // http://www.java2s.com/Tutorials/HTML_CSS/HTML5_Canvas_Reference/strokeText.htm

  function reset() {
    // let context = wallpaper.getContext('2d')
    context.setTransform(1, 0, 0, 1, 0, 0)
    context.clearRect(0, 0, wallWidth + 10, wallHeight + 10)
    context.fillStyle = 'pink'
    context.fillRect(0, 0, wallWidth, wallHeight)
    context.save()

  }
  function wrap(quote) {
    //split quote for wrapping
    let words = quote.split(' ')
    // return words
    console.log(words.length)
    let line = ' '
    // context.font = "25px Cursive"
    context.fillStyle = 'grey'
    console.log(context.measureText(words))

    for (let i = 0; i < words.length; i++) {
      let testLine = line + words[i] + ' '
      let metrics = context.measureText(testLine)
      let testWidth = metrics.width

      if (testWidth > maxWidth && i > 0) {
        context.fillText(line, xStart, yStart)
        line = words[i] + ' '
        yStart += lineHeight
      } else {
        line = testLine
      }
    };
  
  }

//changes color
function wall() {
  let randomColor = colorArray[Math.floor(Math.random() * colorArray.length)]
  let randomFont = fontArray[Math.floor(Math.random() * fontArray.length)]
  console.log(randomFont)
  context.font = ('30px ' + randomFont + ", cursive")
  console.log(context.font)
  context.globalAlpha = 1
  context.globalCompositeOperation = "source-over"
  context.fillStyle = randomColor
  context.fillRect(0, 0, wallWidth, wallHeight)
}

  button.addEventListener("click", () => {
    wallpaper.style.visibility = "visible"
    hiddenButton.style.visibility = 'visible'
    getQuote()
    button.style.visibility = 'hidden'
    visible.style.visibility = 'hidden'
  });

  hiddenButton.addEventListener('click', () => {
    reset()
    button.style.visibility = 'visible'
    visible.style.visibility = 'visible'
    hiddenButton.style.visibility = 'hidden'
    wallpaper.style.visibility = 'hidden'

  })
