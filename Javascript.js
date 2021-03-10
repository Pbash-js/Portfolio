document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    document.body.style.overflow = "auto";
    var loading = document.querySelector(".loading-screen");
    loading.style.opacity = "0";
    setTimeout(() => {
      loading.remove();
    }, 500);
  }
};

document.documentElement.addEventListener("mousemove", parallax);
function parallax(e) {
  this.querySelectorAll(".parallax").forEach((para) => {
    const speed = para.getAttribute("data-speed");
    var x = (window.innerWidth - e.clientX * speed) / 100;
    var y = (window.innerHeight - e.clientY * speed) / 100;

    para.style.transform = `translateX(${-x}px) translateY(${-y}px)`;
  });
}

var executed = true;

window.addEventListener("scroll", (e) => {
  //project interval
  if (document.activeElement.classList[0] == "moon-container") {
    document.activeElement.blur();
  }
  if (timeoutId) clearInterval(timeoutId);

  if (window.pageYOffset > 150) {
    document.querySelector(".moon-move").classList.add("moon-button");
    var parallax = document.querySelector(".parallax");
    if (parallax) {
      parallax.classList.remove("parallax");
    }
    var distfrombottom =
      document.documentElement.getBoundingClientRect().height -
      window.innerHeight +
      document.documentElement.getBoundingClientRect().top;

    if (distfrombottom < 100 && document.querySelector(".moon-button")) {
      document.querySelector(".moon-move").classList.add("chat-button");
    } else if (distfrombottom > 100) {
      document.querySelector(".moon-move").classList.remove("chat-button");
    }

    if (executed) {
      lavamove(document.getElementById("about"));
      executed = false;
    }

    document.querySelector("nav").style.opacity = 1;

    document.querySelectorAll("section").forEach((el) => {
      var top = el.getClientRects()[0].top;
      var bottom = el.getClientRects()[0].top + el.getClientRects()[0].height;
      var vh = window.innerHeight;

      if (top < vh / 9 && bottom > (8 * vh) / 9) {
        var elem = document.getElementById(el.id.split("-")[0]);
        lavamove(elem);
      }
    });
  } else if (window.pageYOffset < 150) {
    document.querySelector(
      ".moon-container"
    ).style.transform = `translateX(-50%) translateY(-50%)`;
    executed = true;
    document.querySelector(".moon-move").classList.remove("moon-button");
    document.querySelector(".moon-move").classList.add("parallax");

    document.querySelector("nav").style.opacity = 0;
    document.querySelector(".section-container").style.top = "100vh";
  }
});

//lava
document.querySelectorAll(".navlink").forEach((item) =>
  item.addEventListener("click", (e) => {
    e.preventDefault();
    navigateTo(e);
  })
);

//lavamove
const lavamove = (element) => {
  if (element) {
    lavacolor(element);

    document.querySelector(".lava").style.width = `${element.offsetWidth}px`;

    document.querySelector(".lava").style.left = `${
      element.getClientRects()[0].left
    }px`;
  }
};

const lavacolor = (element) => {
  var lava = document.querySelector(".lava");
  if (element.id == "about") {
    lava.style.backgroundColor = "#836fab";
  } else if (element.id == "skills") {
    lava.style.backgroundColor = "#3b4b89";
  } else if (element.id == "projects") {
    lava.style.backgroundColor = "#62cddc";
  } else if (element.id == "contact") {
    lava.style.backgroundColor = "#ff6252";
    if (
      document.documentElement.getBoundingClientRect().height -
        window.innerHeight +
        document.documentElement.getBoundingClientRect().top <
      1
    )
      document.querySelector(".moon-container").focus();
  }
};

const navigateTo = (e) => {
  if (!e.target.id) {
    document.getElementById(`contact-section`).scrollIntoView({ block: "end" });
  } else {
    lavamove(document.getElementById(e.target.id));

    var element = document.getElementById(
      `${e.target.innerHTML.toLowerCase().trim()}-section`
    );
    element.scrollIntoView({ block: "end" });
  }
};

const starmove = (skill, pro) => {
  skill.style.width = `${0}px`;
  setTimeout(() => {
    if (pro) {
      skill.style.width = `${pro * 40}px`;
    } else if (!pro) {
      skill.style.width = `${40}px`;
    }
  }, 500);
};

//about
const popupHandlerAbout = (e) => {
  var popuptext = e.target.getAttribute("innerHTML");
  var el = document.querySelector(".popup-expanded-about");
  if (e.target.classList[0] == "fas") {
    el.style.height = "0px";
    el.style.width = "0px";
    el.innerHTML = null;
    el.style.padding = "0px";
    return 0;
  }

  if (el.style.top == `56%` || el.style.top == `41%`) {
    el.style.height = null;
    el.style.width = null;
  }
  el.style.top = `${e.clientY}px`;
  el.style.right = `${window.innerWidth - e.clientX}px`;
  el.innerHTML = null;

  if (window.innerWidth < 1000) {
    setTimeout(() => {
      el.style.padding = "20px";
      el.style.top = `41%`;
      el.style.right = `50%`;
      el.style.height = `40%`;
      el.style.width = `80%`;
    }, 500);
  } else {
    setTimeout(() => {
      el.style.padding = "20px";

      el.style.top = `56%`;
      el.style.right = `5%`;
      el.style.height = `83%`;
      el.style.width = `50%`;
    }, 500);
  }
  setTimeout(() => {
    el.innerHTML = popuptext;
  }, 600);
};

document
  .querySelectorAll(".popup-about")
  .forEach((popup) => popup.addEventListener("click", popupHandlerAbout));

//proficiency
document.querySelectorAll(".lebel").forEach((skill) => {
  var pro = skill.getAttribute("proficiency");
  if (window.innerWidth < 1000) pro = parseFloat(pro / 2) + "";

  if (pro) {
    skill.style.width = `${pro * 40}px`;
  } else if (!pro) {
    skill.style.width = `${40}px`;
  }
  skill.parentElement.addEventListener("mouseenter", () =>
    starmove(skill, pro)
  );
});

const animateStars = () => {
  document.querySelectorAll(".lebel").forEach((elem) => {
    var pro = elem.getAttribute("proficiency");
    starmove(elem, pro);
  });
};

const expandContact = (bool) => {
  var el = document.querySelector(".btn-popup");
  var moon = document.querySelector(".moon-container");
  var chatbutton = document.querySelector(".chat-button");
  if (bool) {
    el.classList.add("btn-popup-expanded");
    moon.style.height = "90vh";
    moon.style.background = "rgba(0,0,0,0)";
    el.style.backgroundColor = "black";
    el.style.color = "white";
    if (!chatbutton) {
      document.querySelector(".moon-move").classList.add("chat-button");
      setTimeout(() => {
        document.querySelector(".moon-move").classList.remove("parallax");
      }, 500);
      check = true;
    }
  } else {
    el.classList.remove("btn-popup-expanded");
    moon.style.background = null;

    moon.style.height = null;
    el.style.backgroundColor = null;
    el.style.color = null;

    setTimeout(() => {
      if (
        document.documentElement.getBoundingClientRect().height -
          window.innerHeight +
          document.documentElement.getBoundingClientRect().top >
        100
      )
        document.querySelector(".moon-move").classList.remove("chat-button");
    }, 500);
  }
};

//project section

const openLink = (e) => {
  window.open(e.target.getAttribute("link"), "_blank");
};

const popupHandler = (e) => {
  e.target.style.backgroundColor = "#3489be";
  var el = document.querySelector(".popup-expanded");
  var elInfo = document.querySelector(".popup-info");

  if (el.style.top == `55%`) {
    el.style.height = `0px`;
    el.style.width = `0px`;
  }
  if (e.clientY == 0 && e.clientX == 0) {
    el.style.top = `55%`;
    el.style.left = `50%`;
  } else {
    el.style.top = `${e.clientY}px`;
    el.style.left = `${e.clientX}px`;
  }
  el.style.opacity = `0`;

  if (window.innerWidth < 1000) {
    setTimeout(() => {
      el.style.top = `55%`;
      el.style.left = `50%`;
      el.style.height = `40%`;
      el.style.width = `80%`;
    }, 500);
  } else {
    setTimeout(() => {
      el.style.top = `55%`;
      el.style.left = `50%`;
      el.style.height = `300px`;
      el.style.width = `500px`;
    }, 500);
  }
  el.children[0].setAttribute("link", e.target.getAttribute("link"));
  setTimeout(() => {
    el.style.backgroundImage = `url(${e.target.getAttribute("url")})`;
    elInfo.innerHTML = e.target.getAttribute("details");
    e.target.style.backgroundColor = null;
    el.style.opacity = `1`;
  }, 500);
};

document
  .querySelectorAll(".popup")
  .forEach((popup) => popup.addEventListener("click", popupHandler));

var timeoutId;

document.querySelectorAll(".popup")[0].click();
