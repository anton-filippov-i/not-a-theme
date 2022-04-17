function main() {
  document.querySelector("body").classList.add("nat");

  var memeButtons = "",
    memeText = [
      "Вот это поворот!",
      "Да ладно!",
      "Чево?!",
      "А че так можно было?",
      "Просто здравствуй",
      "Иди отсюда",
      "Сказочный",
      "Нет слов",
      "От скримеров",
      "Подозрительный",
      "Чиллим",
      "Релаксим",
      "Убить видосы",
    ];

  for ($i = 0; $i < memeText.length; $i++) {
    memeButtons += `<button data-meme>${memeText[$i]}</button>`;
  }
  document.querySelector("form.new_message").insertAdjacentHTML(
    "beforebegin",
    `
    <button type="button" class="nat__memes">🔥</button>
    <div class="nat__memeblock nat__glass">${memeButtons}</div>
    `
  );

  document.querySelector(".nat__memes").onclick = () => {
    document.querySelector(".nat__memeblock").classList.toggle("show");
  };
  document.querySelectorAll("[data-meme]").forEach((meme) => {
    meme.addEventListener("click", () => {
      let chatString = `!Y{${meme.innerText}}`;
      navigator.clipboard.writeText(chatString);
      document.querySelector(".nat__memeblock").classList.toggle("show");
      document.querySelector(".new_message textarea").focus();
    });
  });

  // change main player
  const playerGrid = document.querySelector(".playerGrid");
  const chatGrid = document.querySelector(".chat_grid");

  playerGrid.classList.remove("grid66");
  playerGrid.classList.add("nat__player");

  chatGrid.classList.remove("grid33");
  chatGrid.classList.add("nat__chat");

  document.querySelector(".playerSettings").remove();
  document.querySelector(".topBar").remove();

  // chat functions
  var natChat = document.querySelector(".nat__chat");

  natChat.addEventListener("mouseover", () => {
    natChat.classList.add("active");
  });
  natChat.addEventListener("mouseleave", () => {
    setTimeout(() => {
      natChat.matches(":hover") ? "" : natChat.classList.remove("active");
    }, 5000);
  });

  const chatObserver = new MutationObserver(function () {
    natChat.classList.add("active");

    setTimeout(() => {
      natChat.matches(":hover") ? "" : natChat.classList.remove("active");
    }, 10000);

    const lastMessage = document.querySelector(
      ".chatMsg:last-child .messages p:last-child"
    ).innerText;
    const youtubeLink = /https:\/\/www\.youtube\.com\/\watch\?v=/;
    const triggerPattern = /\!\Y\{.*\}/;

    if (youtubeLink.test(lastMessage)) {
      let secondHalf = lastMessage.split(youtubeLink);
      console.log(secondHalf[1]);
      if (/\&t\=/.test(secondHalf[1])) {
        let link = secondHalf[1].replace("&t=", "?start=") + "&";
        playVideo(link);
      } else {
        playVideo(secondHalf[1] + "?");
      }
    }

    if (triggerPattern.test(lastMessage)) {
      const link = lastMessage.replace(/\!\Y\{/, "").replace(/\}/, "");

      switch (link) {
        case "Убить видосы":
          killVideos();
          break;
        case "Чиллим":
          playVideo("5qap5aO4i9A?");
          break;
        case "Релаксим":
          playVideo("Ek1-adoyE_0?");
          break;
        case "Вот это поворот!":
          playVideo("zVUDe_LoQas?", "nat__video_sm", 2500);
          break;
        case "Да ладно!":
          playVideo("f3h5MCTQbqM?", "nat__video_sm", 1500);
          break;
        case "Чево?!":
          playVideo("kxHkvnPc47I?", "nat__video_sm", 2300);
          break;
        case "А че так можно было?":
          playVideo("Iy7-GGuxaiI?", "nat__video_sm", 5000);
          break;
        case "Просто здравствуй":
          playVideo("EGLi8_pmYBI?", "nat__video_sm", 4500);
          break;
        case "Иди отсюда":
          playVideo("zXz0InOf-z0?", "nat__video_sm", 3500);
          break;
        case "Сказочный":
          playVideo("rD50VFsXPAg?", "nat__video_sm", 3800);
          break;
        case "Нет слов":
          playVideo("_e09Hb_s8zM?", "nat__video_sm", 4000);
          break;
        case "От скримеров":
          playVideo("deWEGDRHy7c?", "nat__video_sm", 3500);
          break;
        case "Подозрительный":
          playVideo("0VCUX_SAvwk?", "nat__video_sm", 3200);
          break;
        default:
          playVideo(link);
      }
    }

    function playVideo(link, type = null, timeout = null) {
      const currentVideos = document.querySelectorAll(".nat__video");
      let frameHtml = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${link}autoplay=1&controls=0&modestbranding=0&showinfo=0&iv_load_policy=3" title="YouTube video player" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`;

      if (currentVideos) {
        killVideos();
      }

      let playVideo = document.createElement("div");

      playVideo.classList.add("nat__video");
      type ? playVideo.classList.add(type) : null;
      playVideo.innerHTML = frameHtml;
      document.querySelector("#new_player").appendChild(playVideo);

      if (type) {
        setTimeout(killVideos, timeout);
      }
    }

    function killVideos() {
      document.querySelectorAll(".nat__video").forEach((v) => {
        v.remove();
      });
    }

    function killOldMessages() {
      let messages = document.querySelectorAll(".nat .nat__chat li.chatMsg");
      if (messages.length > 8) {
        messages[0].remove();
      }
      messages.forEach((m) => {
        let innerP = m.querySelectorAll(".messages p");
        if (innerP.length > 3) {
          innerP[0].remove();
        }
      });
    }
    killOldMessages();
  });

  chatObserver.observe(natChat, { subtree: true, childList: true });

  window.addEventListener("mousemove", (e) => {
    if (e.clientY < 48) {
      document.querySelector("header").style.top = 0;
    } else {
      document.querySelector("header").style = "";
    }
  });
}

document.onload = main();
