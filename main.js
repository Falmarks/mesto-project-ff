(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e){e.target.classList.toggle("card__like-button_is-active")}function n(e){e.target.closest(".card").remove()}function r(t,n,r,o){var c=e.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__delete-button"),d=c.querySelector(".card__like-button"),i=c.querySelector(".card__image");return i.src=t.link,i.alt=t.name,c.querySelector(".card__title").textContent=t.name,d.addEventListener("click",r),a.addEventListener("click",o),i.addEventListener("click",(function(){n(t.link,t.name)})),c}var o=function(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)},c=function(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",a)},a=function(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");c(t)}},d=document.querySelector(".places__list"),i=document.querySelector(".profile__edit-button"),s=document.querySelector(".popup_type_edit"),p=document.querySelector(".profile__title"),u=document.querySelector(".profile__description"),l=document.querySelector(".profile__add-button"),m=document.querySelector(".popup_type_new-card"),v=document.querySelector(".popup__caption"),_=document.querySelector(".popup__image"),f=document.querySelector(".popup_type_image"),y=document.forms["edit-profile"],k=document.forms["new-place"];i.addEventListener("click",(function(){y.name.value=p.textContent,y.description.value=u.textContent,o(s)})),y.addEventListener("submit",(function(e){e.preventDefault(),p.textContent=y.elements.name.value,u.textContent=y.elements.description.value,c(s)})),document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target===t.currentTarget)&&c(e)}))})),l.addEventListener("click",(function(){o(m)})),k.addEventListener("submit",(function(e){e.preventDefault();var r=k.elements["place-name"].value,o=k.elements.link.value;S({name:r,link:o},d,t,n),c(m),k.reset()}));var q=function(e,t){_.src=e,_.alt=t,v.textContent=t,o(f)},S=function(e,t,n,o){var c=r(e,q,n,o);t.prepend(c)};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=r(e,q,t,n);d.append(o)}))})();