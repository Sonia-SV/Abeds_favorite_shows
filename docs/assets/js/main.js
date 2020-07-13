"use strict";const formSubmit=document.querySelector(".js-form"),searchInput=document.querySelector(".js-search"),favList=document.querySelector(".js-fav-list"),searchList=document.querySelector(".js-search-list"),tvFav=document.querySelector(".js-tv-fav"),searchButton=document.querySelector(".js-search-button"),tvButton=document.querySelector(".js-tv-fav-btn"),errorSearch=document.querySelector(".js-error-message"),favsWarning=document.querySelector(".js-fav-message");let searchShows=[],favShows=[];const handleSearchButton=e=>{e.preventDefault(),resetSearch(),getShowsFromApi()},resetSearch=()=>{searchShows=[],searchList.innerHTML=""},getShowsFromApi=()=>{let e=searchInput.value;fetch("http://api.tvmaze.com/search/shows?q="+e).then(e=>e.json()).then(e=>{0===e.length?errorSearch.innerHTML="We can't find nothing, try again!":errorSearch.innerHTML="";for(const t of e)null!==t.show.image?searchShows.push({id:t.show.id,name:t.show.name,img:t.show.image.medium,fav:!1}):searchShows.push({id:t.show.id,name:t.show.name,img:"./assets/images/Cornelius.png",fav:!1});updateFavSearch(),paintShows()})},paintShows=()=>{searchList.innerHTML="";for(const e of searchShows){const t=document.createElement("li");searchList.appendChild(t),t.setAttribute("id",e.id),t.setAttribute("class","js-item"),!0===e.fav?t.classList.add("js-fav-item"):!1===e.fav&&t.classList.remove("js-fav-item");const a=document.createElement("h3");a.setAttribute("class","h3");const s=document.createTextNode(e.name);t.appendChild(a),a.appendChild(s);const n=document.createElement("div"),o=document.createElement("img");o.setAttribute("src",e.img),n.appendChild(o),t.appendChild(n),listenFavClicks()}};formSubmit.addEventListener("submit",handleSearchButton),searchButton.addEventListener("click",handleSearchButton);const handleShowFav=e=>{const t=parseInt(e.currentTarget.id),a=searchShows.find(e=>e.id===t),s=favShows.find(e=>e.id===t);if(void 0===s)a.fav=!0,favShows.push(a);else{const e=favShows.indexOf(s);favShows.splice(e,1),a.fav=!1}updateFavSearch(),paintShows(),updateLocalStorage(),paintFavList()},listenFavClicks=()=>{const e=document.querySelectorAll(".js-item");for(let t=0;t<e.length;t++){e[t].addEventListener("click",handleShowFav)}},updateLocalStorage=()=>{localStorage.setItem("fav",JSON.stringify(favShows))},getFromLocalStorage=()=>{const e=JSON.parse(localStorage.getItem("fav"));null!==e&&(favShows=e),recountFav(),nameFavButton(),paintFavList()},paintFavList=()=>{favList.innerHTML="";for(const e of favShows){const t=document.createElement("li");favList.appendChild(t),t.setAttribute("id",e.id),t.setAttribute("class","js-fav");const a=document.createElement("h4"),s=document.createTextNode(e.name);t.appendChild(a),a.appendChild(s);const n=document.createElement("div"),o=document.createElement("img");o.setAttribute("src",e.img),n.appendChild(o),t.appendChild(n);const r=document.createElement("span");r.setAttribute("class","js-fav-delete"),r.setAttribute("id",e.id);const c=document.createElement("i");c.setAttribute("class","far fa-times-circle"),r.appendChild(c),t.appendChild(r)}listenDeleteFav(),recountFav(),updateFavSearch(),paintShows()},recountFav=()=>{favShows.length<1?tvFav.innerHTML="Abed's favorite list is empty":1===favShows.length?tvFav.innerHTML=`"${favShows[0].name}" is now Abed's favorite`:favShows.length>1&&(tvFav.innerHTML=`"${favShows[0].name}" and ${favShows.length-1} more are now Abed's favorites`)};function updateFavSearch(){for(const e of favShows){const t=searchShows.find(t=>t.id===e.id);void 0!==t&&(t.fav=!0)}}const handleDeleteFav=e=>{const t=parseInt(e.currentTarget.id),a=favShows.find(e=>e.id===t),s=favShows.indexOf(a);favShows.splice(s,1),paintFavList(),favListMessage(),updateLocalStorage(),deleteFavSearch(),paintShows()},listenDeleteFav=()=>{const e=document.querySelectorAll(".js-fav-delete");for(let t=0;t<e.length;t++){e[t].addEventListener("click",handleDeleteFav)}};function deleteFavSearch(){for(const e of searchShows)if(!0===e.fav){void 0===favShows.find(t=>t.id===e.id)&&(e.fav=!1)}paintShows()}const btnReset=document.querySelector(".js-button-reset"),resetFavs=()=>{favShows=[],updateLocalStorage(),paintFavList(),deleteFavSearch(),recountFav(),nameFavButton(),closeFavs()};btnReset.addEventListener("click",resetFavs);const btnFavs=document.querySelector(".js-favs-toggle"),favToggle=document.querySelector(".js-fav-results"),searchToggle=document.querySelector(".js-search-results"),openFavs=()=>{favToggle.classList.toggle("js-fav-open"),searchToggle.classList.toggle("js-close"),favListMessage(),nameFavButton()},favListMessage=()=>{favToggle.classList.contains("js-fav-open")&&(0===favShows.length?favsWarning.innerHTML="oh no! Abed's show list seems to be empty!":favsWarning.innerHTML="")};btnFavs.addEventListener("click",openFavs);const closeFavs=()=>{favToggle.classList.remove("js-fav-open"),searchToggle.classList.remove("js-close"),nameFavButton()},nameFavButton=()=>{favToggle.classList.contains("js-fav-open")?tvButton.innerHTML="Close favorites":tvButton.innerHTML="Open favorites"};recountFav(),paintFavList(),paintShows(),getFromLocalStorage();