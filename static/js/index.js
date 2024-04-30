/// tranding anime ///
let cards = document.querySelector(".trending .cards");
let popularCards = document.querySelector(".popular .cards");
topAnimes(popularCards, "bypopularity", 25)
topAnimes(cards, "favorite", 25)
// scroll button
let popularScrollCount = 0
  function nextPopular(){
      let x = 24 - Math.floor(document.body.offsetWidth / 195)
      if(popularScrollCount > x){
        popularScrollCount = x
    }
    popularScrollCount += 1;
    popularCards.style.scrollBehavior = "smooth";
    popularCards.scrollLeft = 196*popularScrollCount
  }
  function prevPopular(){
    if(popularScrollCount < 1){
      popularScrollCount = 1
    }
    popularScrollCount -= 1;
    popularCards.style.scrollBehavior = "smooth";
    popularCards.scrollLeft = 196*popularScrollCount
  }
  let trendingScrollCount = 0
  function nextTrending(){
    let x = 24 - Math.floor(document.body.offsetWidth / 195)
    if(trendingScrollCount > x){
      trendingScrollCount = x;
    }
    trendingScrollCount += 1;
    cards.style.scrollBehavior = "smooth";
    cards.scrollLeft = 196*trendingScrollCount;
  }
  function prevTrending(){
    if(trendingScrollCount < 1){
      trendingScrollCount = 1
    }
    trendingScrollCount -= 1;
    cards.style.scrollBehavior = "smooth";
    cards.scrollLeft = 196*trendingScrollCount;
  }


//   featured anime   //
let airing = document.querySelector(".airing .content");
let tv = document.querySelector(".tv .content");
let movie = document.querySelector(".movies .content");
let upcoming = document.querySelector(".upcoming .content");
getFeaturedAnimes(airing, "airing", 5)
getFeaturedAnimes(upcoming, "upcoming", 5)
getFeaturedAnimes(movie, "movie", 5)
getFeaturedAnimes(tv, "tv", 5)

//////   scroll X  ///////
let tranding = document.querySelector(".trending .cards");
scrollX(tranding)
let popular = document.querySelector(".popular .cards");
scrollX(popular)




