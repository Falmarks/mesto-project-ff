(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(t,n,r,o,c){var a=e.querySelector(".card").cloneNode(!0),i=a.querySelector(".card__delete-button"),u=a.querySelector(".card__like-button"),l=a.querySelector(".card__image"),s=a.querySelector(".card__like-counter");return l.src=t.link,l.alt=t.name,a.querySelector(".card__title").textContent=t.name,t.likes.some((function(e){return e._id===n}))&&u.classList.add("card__like-button_is-active"),t.likes.length>0?(s.textContent=t.likes.length,s.classList.remove("card__like-count_hidden")):s.classList.add("card__like-count_hidden"),u.addEventListener("click",(function(){return o(t._id,u)})),n!==t.owner._id?i.style.display="none":i.addEventListener("click",(function(e){!function(e){var t=e.target.closest(".card");t?t.remove():console.error("Card element not found")}(e),c(t._id)})),l.addEventListener("click",(function(){r(t.link,t.name)})),a}var n=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)},r=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",o)},o=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");r(t)}};function c(e,t){var n=e.querySelectorAll(t.inputSelector),r=e.querySelector(t.submitButtonSelector);Array.prototype.every.call(n,(function(e){return e.checkValidity()}))?(r.disabled=!1,r.classList.remove(t.inactiveButtonClass)):(r.disabled=!0,r.classList.add(t.inactiveButtonClass))}function a(e,t,n){var r=e.querySelector("#".concat(t.name,"-input-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function i(e,t){e.querySelectorAll(t.inputSelector).forEach((function(n){a(e,n,t)}))}var u={baseUrl:"https://nomoreparties.co/v1/wff-cohort-32",headers:{authorization:"e3aec4e9-3494-45f2-a699-d5ae070bb7af","Content-Type":"application/json"}};function l(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function s(e){return fetch("".concat(u.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:u.headers}).then(l)}function d(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var p,f=document.querySelector(".places__list"),m=document.querySelector(".profile__image"),_=document.querySelector(".popup_type_avatar"),v=document.querySelector(".popup__input_type_avatar"),h=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__title"),S=document.querySelector(".profile__description"),b=document.querySelector(".profile__add-button"),k=document.querySelector(".popup_type_edit"),E=document.querySelector(".popup_type_new-card"),L=document.querySelector(".popup__caption"),g=document.querySelector(".popup__image"),q=document.querySelector(".popup_type_image"),C=document.forms["edit-profile"],x=document.forms["new-place"],A=document.forms["edit-avatar"],T={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.querySelectorAll(e.inputSelector).forEach((function(n){n.addEventListener("input",(function(){n.checkValidity()?a(t,n,e):function(e,t,n){var r=e.querySelector("#".concat(t.name,"-input-error"));t.classList.add(n.inputErrorClass),t.validity.patternMismatch?r.textContent=t.dataset.errorMessage:r.textContent=t.validationMessage,r.classList.add(n.errorClass)}(t,n,e),c(t,e)}))}))}))}(T),h.addEventListener("click",(function(){i(C,T),C.name.value=y.textContent,C.description.value=S.textContent,n(k),c(C,T)})),m.addEventListener("click",(function(){i(_,T),n(_),c(_,T)})),A.addEventListener("submit",(function(e){!function(e,t,n,o){var c;e.preventDefault(),(c=t.value,fetch("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify({avatar:c})}).then(l)).then((function(e){o.style.backgroundImage="url(".concat(e.avatar,")"),r(n)})).catch((function(e){console.error("Ошибка: ".concat(e))}))}(e,v,_,m)})),C.addEventListener("submit",(function(e){var t,n;e.preventDefault(),y.textContent=C.elements.name.value,S.textContent=C.elements.description.value,t=y.textContent,n=S.textContent,fetch("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify({name:t,about:n})}).then(l),r(k)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target===t.currentTarget)&&r(e)}))})),b.addEventListener("click",(function(){n(E),i(C,T),c(x,T)})),x.addEventListener("submit",(function(e){e.preventDefault(),function(e,t){return fetch("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify({name:e,link:t})}).then(l)}(x.elements["place-name"].value,x.elements.link.value).then((function(e){var n=t(e,p,U,w,s);f.prepend(n),x.reset(),c(x,T),r(E)})).catch((function(e){console.error("Ошибка: ".concat(e))}))}));var U=function(e,t){g.src=e,g.alt=t,L.textContent=t,n(q)};function w(e,t){(function(e,t){return fetch("".concat(u.baseUrl,"/cards/likes/").concat(e),{method:t?"PUT":"DELETE",headers:u.headers}).then(l)})(e,!t.classList.contains("card__like-button_is-active")).then((function(e){t.classList.toggle("card__like-button_is-active");var n=t.closest(".card").querySelector(".card__like-counter");e.likes.length>0?(n.textContent=e.likes.length,n.classList.remove("card__like-count_hidden")):n.classList.add("card__like-count_hidden")})).catch((function(e){return console.error("Ошибка: ".concat(e))}))}Promise.all([fetch("".concat(u.baseUrl,"/users/me"),{method:"GET",headers:u.headers}).then(l),fetch("".concat(u.baseUrl,"/cards"),{method:"GET",headers:u.headers}).then(l)]).then((function(e){var n,r,o=(r=2,function(e){if(Array.isArray(e))return e}(n=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==t);u=!0);}catch(e){l=!0,o=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(n,r)||function(e,t){if(e){if("string"==typeof e)return d(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(e,t):void 0}}(n,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),c=o[0],a=o[1];!function(e){y.textContent=e.name,S.textContent=e.about,m.setAttribute("style","background-image: url('".concat(e.avatar,"'")),p=e._id}(c),function(e,n){e.forEach((function(e){var r=t(e,n,U,w,s);f.append(r)}))}(a,c._id)})).catch((function(e){console.log("Ошибка",e)}))})();
//# sourceMappingURL=main.js.map