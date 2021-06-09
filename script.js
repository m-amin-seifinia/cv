const sectionList = document.getElementsByTagName("section");
const sectionChangeCooldown = 1000; // milliseconds

// Random quote generator

quoteElement = document.getElementById("quote-text");

quoteList = [];
fetch("https://type.fit/api/quotes")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((quote) => {
      quoteList.push(quote);
    });

    const loadNewQuote = () => {
      nQuotes = quoteList.length;
      r = Math.floor(Math.random() * nQuotes);
      quoteElement.innerHTML =
        '"' +
        quoteList[r].text +
        '"' +
        (quoteList[r].author ? " - " + quoteList[r].author : "");
    };

    loadNewQuote();
    setInterval(() => {
      quoteElement.classList.remove("quote-unfade");
      quoteElement.classList.add("quote-fade");
      setTimeout(() => {
        loadNewQuote();
        quoteElement.classList.remove("quote-fade");
        quoteElement.classList.add("quote-unfade");
      }, 1000);
    }, 10000);
  });

// Navar dynamic styling

var sectionOffsets = [];
for (section of sectionList) {
  sectionOffsets.push(section.offsetTop);
}
var previousSectionLink = document.getElementById(`${sectionList[0].id}-link`);
previousSectionLink.classList.add("nav-link-highlight");
document.addEventListener("scroll", () => {
  // Interactive navbar links
  // Accounting for navbar height
  for (var i = 0; i < sectionOffsets.length - 1; i++) {
    if (
      window.scrollY + document.getElementById("nav-div").offsetHeight <
        sectionOffsets[i + 1] &&
      window.scrollY + document.getElementById("nav-div").offsetHeight >=
        sectionOffsets[i]
    ) {
      currentSectionLink = document.getElementById(`${sectionList[i].id}-link`);
      if (currentSectionLink !== previousSectionLink) {
        currentSectionLink.classList.add("nav-link-highlight");
        currentSectionLink.classList.remove("nav-link-unhighlight");

        previousSectionLink.classList.add("nav-link-unhighlight");
        previousSectionLink.classList.remove("nav-link-highlight");

        previousSectionLink = currentSectionLink;
      }

      break;
    }
  }
});
