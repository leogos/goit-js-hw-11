import{S as h,i}from"./assets/vendor-B2mb6eXk.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();const y="55994880-e568b2e6587c62e6ee420d338",g="https://pixabay.com/api/",u=document.querySelector(".search-form"),f=document.querySelector(".gallery"),p=document.querySelector(".loader-wrapper"),L=new h(".gallery a",{captionsData:"alt",captionDelay:250});u.addEventListener("submit",b);function b(r){r.preventDefault();const s=r.currentTarget.elements.searchQuery.value.trim();if(s===""){P("Please enter a search query!");return}$(),v(),w(s).then(o=>{if(o.hits.length===0){c("Sorry, there are no images matching your search query. Please try again!");return}f.insertAdjacentHTML("beforeend",S(o.hits)),L.refresh()}).catch(()=>{c("Something went wrong. Please try again later!")}).finally(()=>{q(),u.reset()})}function w(r){const s=new URLSearchParams({key:y,q:r,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${g}?${s}`).then(o=>{if(!o.ok)throw new Error(o.status);return o.json()})}function S(r){return r.map(({webformatURL:s,largeImageURL:o,tags:a,likes:e,views:t,comments:n,downloads:m})=>{const l=a.split(",").map(d=>d.trim()).slice(0,3).join(", ");return`
          <li class="gallery-item">
            <a class="gallery-link" href="${o}" title="${l}">
              <img class="gallery-image" src="${s}" alt="${l}" />
              <ul class="info-list">
                <li class="info-item">
                  <span class="info-label">Likes</span>
                  <span class="info-value">${e}</span>
                </li>
                <li class="info-item">
                  <span class="info-label">Views</span>
                  <span class="info-value">${t}</span>
                </li>
                <li class="info-item">
                  <span class="info-label">Comments</span>
                  <span class="info-value">${n}</span>
                </li>
                <li class="info-item">
                  <span class="info-label">Downloads</span>
                  <span class="info-value">${m}</span>
                </li>
              </ul>
            </a>
          </li>
        `}).join("")}function c(r){i.destroy(),i.error({message:r,position:"topRight",timeout:3e3,close:!0,progressBar:!0})}function P(r){i.destroy(),i.warning({message:r,position:"topRight",timeout:3e3,close:!0,progressBar:!0})}function $(){f.innerHTML=""}function v(){p.classList.remove("is-hidden")}function q(){p.classList.add("is-hidden")}
//# sourceMappingURL=index.js.map
