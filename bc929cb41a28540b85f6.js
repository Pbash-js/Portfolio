import"../Sass/main.scss";const lavaElement=document.querySelector(".lava");let btnPopup=document.querySelector(".btn-popup");btnPopup.addEventListener("click",(e=>{e.target.classList.contains("fa-times")||(btnPopup.classList.add("btn-popup-expanded"),inContactSection||document.querySelector(".moon-move").classList.add("chat-button"))}));let closebtnPopup=document.querySelector(".fa-times");closebtnPopup.addEventListener("click",(e=>{btnPopup.classList.remove("btn-popup-expanded"),inContactSection||document.querySelector(".moon-move").classList.remove("chat-button")}));let inContactSection=!1;new fullpage("#fullpage",{licenseKey:"D8228F9E-36E54825-8D971E23-DA26E927",anchors:["landing-section","about-section","skills-section","projects-section","contact-section"],fitToSection:!0,normalScrollElements:".popup-expanded-about",lazyLoading:!0,onLeave:function(e,t,o){if(lavaElement.style.opacity||(lavaElement.style.opacity=1),lavamove(document.getElementById(t.anchor.replace("-section",""))),"landing-section"===e.anchor){document.querySelector("nav").style.opacity=1,document.querySelector(".moon-move").classList.add("moon-button");var n=document.querySelector(".parallax");n&&(n.style.transform=null,n.classList.remove("parallax"))}else"landing-section"===t.anchor&&(document.querySelector("nav").style.opacity=0,document.querySelector(".moon-move").classList.remove("moon-button"),document.querySelector(".moon-move").classList.add("parallax"));if("contact-section"===t.anchor)document.querySelector(".moon-move").classList.add("chat-button"),inContactSection=!0;else if("contact-section"===e.anchor){let e=document.querySelector(".btn-popup");e.classList.contains("btn-popup-expanded")&&e.classList.remove("btn-popup-expanded"),document.querySelector(".moon-move").classList.remove("chat-button"),inContactSection=!1}}}),fullpage_api.setAllowScrolling(!0);const loadingIntervalSpan=document.getElementById("loading-periods"),loadingSymbols=["/","-","\\","|","/","-","\\","|"];let loadingSymbolIndex=0,interval=setInterval((()=>{7===loadingSymbolIndex?loadingSymbolIndex=0:loadingSymbolIndex++,loadingIntervalSpan.innerText=loadingSymbols[loadingSymbolIndex]}),200);function parallax(e){this.querySelectorAll(".parallax").forEach((t=>{const o=t.getAttribute("data-speed");var n=(window.innerWidth-e.clientX*o)/100,l=(window.innerHeight-e.clientY*o)/100;t.style.transform=`translate(calc(-50% - ${n}px) , calc(-50% - ${l}px))`}))}document.onreadystatechange=()=>{if("complete"==document.readyState){clearInterval(interval);var e=document.querySelector(".loading-screen");e.style.opacity="0",setTimeout((()=>{e.remove()}),500)}},document.documentElement.addEventListener("mousemove",parallax),document.querySelectorAll(".navlink").forEach((e=>e.addEventListener("click",(e=>{e.preventDefault(),lavamove(document.getElementById(e.target.id)),navigateTo(e.target.getAttribute("linkTo"))}))));const navigateTo=e=>{window.location=e},lavamove=e=>{e&&(lavacolor(e),lavaElement.style.width=`${e.offsetWidth}px`,lavaElement.style.left=`${e.getClientRects()[0].left}px`)},lavacolor=e=>{var t=lavaElement;"about"==e.id?t.style.backgroundColor="#836fab":"skills"==e.id?t.style.backgroundColor="#3b4b89":"projects"==e.id?t.style.backgroundColor="#62cddc":"contact"==e.id&&(t.style.backgroundColor="#ff6252",document.documentElement.getBoundingClientRect().height-window.innerHeight+document.documentElement.getBoundingClientRect().top<100&&document.querySelector(".moon-container").focus())},popupHandlerAbout=e=>{var t=e.target.getAttribute("innerHTML"),o=document.querySelector(".popup-expanded-about");if("fas"==e.target.classList[0])return o.style.height="0px",o.style.width="0px",o.innerHTML=null,o.style.padding="0px",0;"56%"!=o.style.top&&"41%"!=o.style.top||(o.style.height=null,o.style.width=null),o.style.top=`${e.clientY}px`,o.style.right=window.innerWidth-e.clientX+"px",o.innerHTML=null,window.innerWidth<1e3?setTimeout((()=>{o.style.padding="20px",o.style.top="41%",o.style.right="50%",o.style.height="40%",o.style.width="80%"}),500):setTimeout((()=>{o.style.padding="20px",o.style.top="56%",o.style.right="5%",o.style.height="75%",o.style.width="50%"}),500),setTimeout((()=>{o.innerHTML=t}),600)};document.querySelectorAll(".popup-about").forEach((e=>e.addEventListener("click",popupHandlerAbout))),document.querySelectorAll(".lebel").forEach((e=>{var t=e.getAttribute("proficiency");window.innerWidth<1e3&&(t=parseFloat(t/2)+""),t?e.style.width=40*t+"px":t||(e.style.width="40px")}));const openLink=e=>{window.open(e.target.getAttribute("link"),"_blank")},popupHandler=e=>{e.target.style.backgroundColor="#3489be";var t=document.querySelector(".popup-expanded"),o=document.querySelector(".popup-info");"55%"==t.style.top&&(t.style.height="0px",t.style.width="0px"),0==e.clientY&&0==e.clientX?(t.style.top="55%",t.style.left="50%"):(t.style.top=`${e.clientY}px`,t.style.left=`${e.clientX}px`),t.style.opacity="0",window.innerWidth<1e3?setTimeout((()=>{t.style.top="55%",t.style.left="50%",t.style.height="40%",t.style.width="80%"}),500):setTimeout((()=>{t.style.top="55%",t.style.left="50%",t.style.height="300px",t.style.width="500px"}),500),t.children[0].setAttribute("link",e.target.getAttribute("link")),setTimeout((()=>{t.style.backgroundImage=`url(${e.target.getAttribute("url")})`,o.innerHTML=e.target.getAttribute("details"),e.target.style.backgroundColor=null,t.style.opacity="1"}),500)};document.querySelectorAll(".popup").forEach((e=>e.addEventListener("click",popupHandler))),document.querySelectorAll(".popup")[0].click();