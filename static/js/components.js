

function strip(string) {
  return string.replace(/^\s+|\s+$/g, '');
}


// Featured Animes //
function getFeaturedAnimes(container, Type, no){
  fetch(`https://aniapi-eight.vercel.app/api/topAnimes?type=${Type}&page=1`)
  .then(response => {
    return response.json();
  }).then(data => {
    let list = data['items'];
    for (let i = 0; i < (no); i++) {
    let imgUrl = list[i]['imgs']["jpg"]['small'];
    let title = list[i]["title"];
    let type = list[i]["otherInfo"].split("\n")[0].split("(")[0];
    let epNo = list[i]["otherInfo"].split("\n")[0].split("(")[1].replace("eps)","");
    let score = list[i]["score"];
    container.innerHTML += `
    <div class="featured-anime-card" onclick='animeInfo(${list[i]["mal_id"]})'>
    <img draggable="false" src="${imgUrl}" alt="${title}">
    <div class="details">
        <strong class="featured-anime-card_name">
            ${title}
        </strong>
        <div class="featured-anime-card_otherInfo">
            <span class="ep_no fx fx-center">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m160-800 65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h80l65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h80l65 130q7 14 20 22t28 8q30 0 46-25.5t2-52.5l-41-82h120q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800Z"/></svg> ${epNo}</span>
            <span class="dot"><svg style="fill: #fff;" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z"/></svg></span>
                <span class="rating fx fx-center"><svg style="fill: #FFD700 " xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M480-269 314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Z"/></svg> ${score}</span>
            <span class="dot">
                <svg style="fill: #fff;" xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 -960 960 960" width="10"><path d="M480-200q-117 0-198.5-81.5T200-480q0-117 81.5-198.5T480-760q117 0 198.5 81.5T760-480q0 117-81.5 198.5T480-200Z"/></svg></span>
            <span class="type">${type}</span>
        </div>
    </div>
</div>
    `;
    }
  }).catch(error => {
    console.error(error)
  });
}


//  Top Animes  //
function topAnimes(popularCards, Type, no){
  fetch(`https://aniapi-eight.vercel.app/api/topAnimes?type=${Type}&page=1`)
  .then(response => {
    return response.json();
  }).then(data => {
    console.log(data);
    let SlidesList = data['items'];
    for (let i = 0; i < no; i++) {
      popularCards.innerHTML += `
      <div onclick='animeInfo(${SlidesList[i]["mal_id"]})' class="card fx" style="transform: translateX(${i}px)">
  <div class="rank">#${i+1}</div>
    <div class="image">
      <div class="card_bg2"></div>
      <div class="card_bg" style="background-image: url('${SlidesList[i]['imgs']["webp"]['medium']}');"></div>
      <img draggable="false" src="${SlidesList[i]['imgs']["webp"]['medium']}" alt="${SlidesList[i]['title']}">
    </div>
  <div class="card-title">${SlidesList[i]['title']}</div>
</div>`;
    }
  }).catch(error => {
    console.error(error)
  });
}

/////////// navbar  //////////////////////// 
let closeBtn = document.querySelector(".close_menu button");
let openBtn = document.querySelector(".nav_title .sidebar");
let sidebar_menu = document.querySelector(".sidebar_menu");
let slideBarOpenBG = document.querySelector(".slideBarOpenBG");
let opened = false;
function openCloseNav() {
  if (opened) {
    opened = false;
    sidebar_menu.style.width = "0";
    slideBarOpenBG.style.display = "none";
  }
  else if (!opened) {
    opened = true;
    sidebar_menu.style.width = "300px";
    slideBarOpenBG.style.display = "block";
  }
}
openBtn.addEventListener("click", openCloseNav);
closeBtn.addEventListener("click", openCloseNav);

/////////////////  Scroll X click & drag  ////////////////////
function scrollX(slider){
  
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });
  slider.addEventListener('mousemove', (e) => {
    if(!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.style.scrollBehavior = "auto";
    slider.scrollLeft = scrollLeft - walk;
  });
}

/////  slider /////
let slider = document.querySelector('.slideShow .slider');
console.log(slider.offsetWidth)
slider.style.height = `${1.3*(slider.offsetWidth)}px`;
let counter = 0;
  // image Slide show //



fetch('https://aniapi-eight.vercel.app/api/topAnimes?page=1')
  .then(response => {
      return response.json();
  }).then(data => {
    let SlidesList = data['items'];
    for (let i = 0; i < SlidesList.length; i++) {
  slider.innerHTML += `<div class='a' style='left: ${i*100}%'>
  <div class="desktop_bg" style="background: url('${SlidesList[i]['imgs']['webp']['large']}')"> </div>
  <div class='btn'><span class='title'><p>${SlidesList[i]['title']}</p><br>
  <div class="topAnimeInfo">
      <div>
      <span style="background: none;color: #f3f3f3;">${SlidesList[i]['otherInfo'].split("\n")[0].split(" (")[0]}</span>
      <span style="height: 25px;"><span class="material-symbols-rounded" style="position: relative; top:2px">video_library
      </span>${SlidesList[i]['otherInfo'].split("\n")[0].split(" (")[1].replace(" eps)","")} &nbsp;</span>
      <span style="background: transparent; font-weight: bolder; color: #fff"><span class="material-symbols-rounded" style="color: #FFD700; background: transparent;scale: 1.4;position: relative; top: 3px">star</span> ${SlidesList[i]['score']}</span>
      <span style="background-color: transparent;"><span class="material-symbols-rounded">hd</span></span>
      </div>
      <div>
      <span>&nbsp;&nbsp; <span style="scale:1.3;position: relative; top: 3px" class="material-symbols-rounded">calendar_month</span>${SlidesList[i]['otherInfo'].split("\n")[1]}</span>
      
      </div>
  </div><br>
  <button onclick='animeInfo(${SlidesList[i]["mal_id"]})' class='watchBtn'><span class="material-symbols-rounded">play_arrow</span> START WATCHING</button></span><span class='bg'></span><img src='${SlidesList[i]['imgs']['webp']['large']}'>
  </div></div>`;
}
  }).catch(error => {
    console.error(error)
  });

function slide() {
  let slides = slider.querySelectorAll('.a');
  if (Math.abs(counter) > 9) {
    counter = 0;
  }
  for (let i = 0; i < 10; i++) {
    slides[i].style.transform = `translateX(-${(Math.abs(counter))*100}%)`;
  } }
  
let prev = () => {
  if (counter > 0) {
    counter -= 1;
    slide()
  }
  
  else if (counter == 0) {
    counter = 9;
    slide()
  }
} 

let next = () => {
  counter += 1;
  slide()
}
setInterval(next, 8000);


//////// search  /////////

let searchBtn = document.querySelector('.nav-bar .search');
let searchBox = document.querySelector(".search-box");
searchOpened = false
searchBtn.addEventListener("click",()=>{
  if(searchOpened == false){
    searchBox.style.height = "60px";
    searchBtn.querySelector("span").style.color = "#a903d7ac";
    searchOpened = true;
  }
  else if(searchOpened == true){
    searchBox.style.height = "0";
    searchBtn.style.color = "#fff";
    searchBtn.querySelector("span").style.color = "#fff";
    searchOpened = false;
  }
})

let watchAnimeBox = document.querySelector(".watchAnime");
let buttons = document.querySelectorAll(".navigation .otherButtons button");

// document.querySelector("#body > div.watchAnime > div.container > div:nth-child(1) > div.anisContent > div.title > div > button:nth-child(1)")

let animeContainer = document.querySelectorAll(".animeBox");

function closeWatchAnime(){
  watchAnimeBox.style.display = "none";
  sessionStorage.removeItem("epIds_saved");
  sessionStorage.removeItem("currentAnimeName");
  animeContainer[1].innerHTML = ""
}

function nextCotainer(x){
  animeContainer.forEach(e =>{
    e.style.display = "none";
  });
  animeContainer[x - 1].style.display = "block";
  
  buttons.forEach(e => {
    e.style.color = "#fff";
  });
  buttons[x - 1].style.color = "limegreen";
}

function animeInfo(malId){
  animeContainer[0].innerHTML = "";
  animeContainer[3].innerHTML = "";
  watchAnimeBox.style.display = "block";
  buttons[0].style.color = "limegreen";
  buttons.forEach(e => {
    e.style.color = "#fff";
  });
  buttons[0].style.color = "limegreen";
  animeContainer.forEach(e =>{
    e.style.display = "none";
  });
  animeContainer[0].style.display = "block";
  sessionStorage.removeItem("epIds_saved");
  sessionStorage.removeItem("currentAnimeName");
  getInfo(malId)
}

buttons[1].addEventListener("click", ()=>{
  if(sessionStorage.getItem("epIds_saved") == null){
    sessionStorage.setItem("epIds_saved", true);
    let name = sessionStorage.getItem("currentAnimeName");
    getAnimes(name);
  }
  else if(sessionStorage.getItem("epIds_saved") != null){
    getAnimesFromSessionStorage()
  }
});

function getInfo(malid){
  fetch(`https://aniapi-eight.vercel.app/api/anime?id=${malid}`)
  .then(response => {
    return response.json();
  }).then(data => {
    sessionStorage.setItem("currentAnimeName", data["info"]["english"]);
     let infoHtml = ``;
    let info = data["info"];
    for(let key in info){
      if(key == "score"){
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${(info[key]).split(" (scored by")[0]}</span> </div>`;
      }
      else if(key == "ranked"){
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${(info[key]).split("\n")[0]}</span> </div>`;
      }
      else if(key == "producers"){
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${(info[key]).trim()}</span> </div>`;
      }
      else{
        infoHtml += `<div class="elements"> <strong style="text-transform: capitalize;">${key}</strong> <br><span>${strip(info[key])}</span> </div>`;
      }
    }

    animeContainer[0].innerHTML = `
    <div class="anisContent">

      <div class="title">
        <img src="${data["imgs"]["webp"]["large"]}">
        <h1>${data["info"]["english"]}</h1>
        <div><button onclick='document.querySelectorAll(".navigation .otherButtons button")[1].click()'>Watch Now</button> <button><span class="material-symbols-rounded">add</span></button></div>
      </div>

      <div class="anisInfo">
        <h1>${data["info"]["english"]}</h1>
        <p>${data["description"]}</p>
      </div>
    </div>

    <div class="anisItems">
    <div class="otherAniInfo">${infoHtml}</div>
    <br>
    <div class="desc">${data["description"]}</div>
    <br>
    </div>
    `;
    scrollX(document.querySelector(".otherAniInfo"));

    let songs = data["theme_songs"]
    for(let song in songs){
      animeContainer[3].innerHTML += `
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${songs[song]}?utm_source=generator" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    `;
    }
  
  }).catch(error => {
    console.error(error)
  });
}

var epRangeOpened = false;
function getAnimes(name_eng){
  fetch(`https://aniapi-eight.vercel.app/api/search/gogo?q=${name_eng}`)
  .then(response => {
    return response.json();
  }).then(data => {
    fetch(`https://aniapi-eight.vercel.app/api/anime/epis?gogoid=${data[0]["id"]}`)
    .then(response => {
      return response.json();
    }).then(data => {


      console.log(data)
      let epis = data["episodes"]
      let episHtml = ""
      for (let i = 0; i < epis.length; i++) {
        if(i < 100){
          episHtml += `<button onclick='getEpisM3u8("${epis[i]}", ${i})' class="epBtn ep${i+1}"> ${i + 1} </button>`;
        } else {
          episHtml += `<button style="display: none" onclick='getEpisM3u8("${epis[i]}", ${i})' class="epBtn ep${i+1}"> ${i + 1} </button>`;
        }
        
      }
      animeContainer[1].innerHTML =`
      <div class="video">
        <div class="m3u8">

        </div>
        <div class="epis">
          <div class="controls">
          <div class="epRange">
          <div class="currentAnime">
            You Are Watching <b></b>
          </div>
            <div class="selectedValue"> <b>1 - 100</b><span class="material-symbols-rounded">expand_more</span></div>
            <span class="rangeList"></span>
          </div>
          
          </div>
          <div class="epis_btns">${episHtml}</div>
        </div>
      </div>
      `;
      getEpisM3u8(`${epis[0]}`, 0)
      addEventListener('resize', () => {
        let video = document.querySelector(".video .m3u8");
        let w = video.offsetWidth;
        video.style.height = `${w/1.8}px`;
      });
      let video = document.querySelector(".video .m3u8");
      let w = video.offsetWidth;
      video.style.height = `${w/1.8}px`;
      let epNo = epis.length;
      let epPageNo = (Math.floor(epNo/100) + 1);

      let pageOption = document.querySelector('.epis .controls .epRange .rangeList');
      
      let epRange = document.querySelector(".epRange .selectedValue");
      epRange.addEventListener("click", ()=>{
        if(!epRangeOpened){
          pageOption.style.height= "120px";
          epRangeOpened = true;
        } else {
          pageOption.style.height = "0";
          epRangeOpened = false;
        }
      });
      
      for (let i = 0; i < epPageNo; i++) {
        pageOption.innerHTML += '<span onclick="changeList('+i+')">'+`${100*i + 1} - ${100*(i+1)}`+'</span>'
      }
    
    
    
    
    
    }).catch(error => {
      console.error(error)
    });
  }).catch(error => {
    console.error(error)
  });
}

function changeList(i){
  document.querySelector(".selectedValue b").innerHTML = `${100*i + 1} - ${100*(i+1)}`;
  let pageOption = document.querySelector('.epis .controls .epRange .rangeList');
  let epis = document.querySelectorAll(".epis_btns button");
  pageOption.style.height = "0";
  
  console.log(epis);
  for (let x = 0; x < epis.length; x++) {
    if(x > (100*i - 1) && x < (100*(i+1)) ){
      epis[x].style.display = "block";
    } else {
      epis[x].style.display = "none";
    }
    console.log(x > (100*i) && x < (100*(i+1) + 1));
  }
  epRangeOpened = false;
}

function getAnimesFromSessionStorage(){
    console.log("working!!!!")
}

function getEpisM3u8(gogoEpId, i){
  fetch(`https://aniapi-eight.vercel.app/api/anime/ep?epid=${gogoEpId}`)
  .then(response => {
    return response.json();
  }).then(data => {
    let vidstreamingUrl = data[0]["video"];
    fetch(`https://aniapi-eight.vercel.app/api/extractors/vidstreaming?url=${vidstreamingUrl}`)
    .then(response => {
      return response.json();
    }).then(data => {
      console.log(data)
      let file1 = data["source"][0]["file"]
      let file2 = data["source_bk"][0]["file"]
      console.log(file1, file2)
      let video = document.querySelector(".m3u8");
      html = `
      <iframe class="m3u8" frameborder="0" src="/play?m3u8=${file1}&m3u8_2=${file2}" style="width: 100%;height: 100%">
        </iframe>`;
        video.innerHTML = html;
        document.querySelector(".currentAnime b").innerHTML = `Episode ${i + 1}`
    }).catch(error => {
      console.error(error)
    });
  }).catch(error => {
    console.error(error)
  });
}
