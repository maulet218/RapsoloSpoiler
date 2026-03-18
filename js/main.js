let audioEnabled = false;
let keySound;

// Inicializamos matrix
const canvas = document.getElementById("canv");
const ctx = canvas.getContext("2d");
let cols = Math.floor(window.innerWidth / 20) + 1;
let ypos = Array(cols).fill(0);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function matrix() {
  const w = window.innerWidth;
  const h = window.innerHeight;

  if (canvas.width !== w) {
    canvas.width = w;
    cols = Math.floor(window.innerWidth / 20) + 1;
    ypos = Array(cols).fill(0);
  }
  if (canvas.height !== h) {
    canvas.height = h;
  }

  ctx.fillStyle = "#0001";
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "#0f0";
  ctx.font = "15pt monospace";

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 20;
  });
}
setInterval(matrix, 50);

// Esperamos interacción del usuario
function enableAudioAndStart() {
  if (!audioEnabled) {
    audioEnabled = true;
    keySound = new Audio('sounds/key1.mp3');
    keySound.volume = 0.3;
    startTypingSequence();
  }
}

document.addEventListener("click", enableAudioAndStart, { once: true });
document.addEventListener("keydown", enableAudioAndStart, { once: true });

// Función type
function type(text, screen, callback, latencia = 50) {
  if (!text || !text.length || !(screen instanceof Element)) return;
  if (typeof text !== "string") text = text.join("\n");
  text = text.replace(/\r\n?/g, "\n").split("");
  const prompt = document.createTextNode("");
  screen.appendChild(prompt);
  prompt.className = "typing";

  function typer() {
    const character = text.shift();

    if (character === "\n") screen.insertBefore(document.createElement("br"), prompt);
    else if (character === " ") screen.insertBefore(document.createTextNode("\u00A0"), prompt);
    else if (character !== "") {
      screen.insertBefore(document.createTextNode(character), prompt);
      if (audioEnabled && keySound && character !== "#" && character !== "_") {
        keySound.currentTime = 0;
        keySound.play().catch(() => { });
      }
    }

    if (character === "\n") window.scroll(window.scrollX, (window.scrollY += 20));

    if (text.length) setTimeout(typer, latencia);
    else {
      prompt.className = "idle";
      if (callback) callback();
    }
  }
  setTimeout(typer, latencia);
}

// Secuencia principal de tipado
function startTypingSequence() {
  const screen = document.getElementById("screen");
  const inputField = document.getElementById("inputField");

  const logo = [
    "                      ################\n" +
    "                  #######################\n" +
    "                 ##################\n" +
    "           #    ########  #####       ########\n" +
    "         ###   ######   ###########################\n" +
    "        ###   #####   ##############################\n" +
    "      #####  ####   ####### ##########################\n" +
    "     ######  ###   ####    ############################\n" +
    "    ######  ###   ###     ##                 ###########\n" +
    "   #######  ###   #                             #########\n" +
    "  ########  ##                            ####    ########\n" +
    " #########  ##                              #####   #######\n" +
    " ########## ##                                #####  ######\n" +
    "########### ##                                 #####  ######\n" +
    "##############                              ##  ############\n" +
    "##############                               ##  ###########\n" +
    "###############                              ###############\n" +
    "###########  ##                               ##############\n" +
    "############  ##                              ##############\n" +
    "######  #####                                 ##############\n" +
    " ######  #####                                ### #########\n" +
    " ########  #####                              ### #########\n" +
    "  ########    ####                            ##  ########\n" +
    "   #########                             #   ###  #######\n" +
    "    ############                ##     ###   ###  ######\n" +
    "     ############################   #####   ###   #####\n" +
    "      ########################## #######  #####  #####\n" +
    "        ##############################   #####   ###\n" +
    "         ###########################   ######   ###\n" +
    "            ################################\n" +
    "                         ##################\n" +
    "                   #######################\n" +
    "                      ###############\n" +
    "___________________________________________________________________\n"
  ];
  document.getElementById("inputField").value = "> ";
  type(logo, screen, function () {
    inputField.classList.remove("hidden");
    inputField.focus();

    const text = [
      "> Connecting to the VPN... \n" +
      "> Connecting to internal server... \n" +
      "> Domain Detected: RIFTBOUND-GAMES.INTERNAL.\n",
      "> Access restricted. \n" +
      "> Enter your username: \n"
    ];

    type(text, screen, function () {
      inputField.classList.remove("hidden");
      inputField.focus();
    });
  }, 1);

  // Eventos del input
  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let textoEntrada = inputField.value.toLowerCase();
      inputField.value = "> ";
      let mensaje = "";
      switch (textoEntrada.toLowerCase()) {
        case "> rapsolo":
          mensaje = [
            "> User found.\n" +
            "> Enter password:\n"];
          break;
        case "> 1234":
          mensaje = [
            "> Verifying credentials...\n" +
            "> ...\n" +
            "> Unlimited access granted.\n" +
            "> === RIFTBOUND BACKOFFICE v2.3 ===.\n" +
            "> Select an action:\n" +
            "> 1 - Ban card.\n" +
            "> 2 - View upcoming spoilers.\n" +
            "> 3 - Design new card. \n"
          ];
          break;

        case "> 1":
          mensaje = [
            "> Stop crying please and focus:\n" +
            "> Select an action:\n" +
            "> 1 - Ban card.\n" +
            "> 2 - View upcoming spoilers.\n" +
            "> 3 - Design new card. \n"
          ];
          break;
        case "> 2":
          mensaje = [
            "> Accessing spoilers database...\n" +
            "> Select set:\n" +
            "> 1 - Origins\n" +
            "> 2 - Spiritforged\n" +
            "> 3 - Unleash (cooming soon)\n"
          ];
          break;
        case "> 3":
          mensaje = [
            "> Warning:\n" +
            "> The future spoilers are protected by internal protocol.\n" +
            "> To force access type:\n" +
            "> OVERRIDE\n"
          ];
          break;
        case "> override":
          mensaje = [
            "> Forcing access...\n" +
            "> ...\n>" +
            "> File found.\n" +
            "> SPIRITFORGED_CARD_██.DAT\n" +
            "> To download type:\n" +
            "> DOWNLOAD\n"
          ];
          break;
        case "> download":
          mensaje = [
            "> Downloading file...\n" +
            "> █░░░░░░░░░ 10 %\n" +
            "> ███░░░░░░░ 35 %\n" +
            "> ██████░░░░ 60 %\n" +
            "> ████████░░ 85 %\n" +
            "> ██████████ 100 %\n\n> File opened.\n\n> Displaying card..."
          ];
          break;
        default:
          mensaje = ["> Incorrect command, initializing restart protocol...\n"];
          break;
      }

      if (mensaje != "") {
        type([mensaje], screen, function () {
          inputField.focus();
          if (mensaje[0].includes("> Downloading file...\n")) {
            showCard(0);
          } else if (mensaje[0].includes("> Downloading decrypted file...\n")) {
            showCard(1);
          }
        });
      } else {
        type(["> Incorrect command, initializing restart protocol...\n"], screen, function () { inputField.focus(); });
      }
    }
  });
};

// Efectos de glitch para cartas (ejemplo)
function showCard(cardnumber) {
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const img1 = document.createElement('img');
  const img2 = document.createElement('img');

  img1.src = 'images/spoiler00.jpg';
  img2.style.opacity = 0;

  overlay.appendChild(img1);
  overlay.appendChild(img2);

  document.body.appendChild(overlay);

  setTimeout(() => glitchDecrypt(img1, "images/spoiler01.jpg", 20), 2000);
  setTimeout(() => glitchDecrypt(img1, "images/spoiler02.jpg", 20), 5000);

  // Aquí hacemos la transición real
  setTimeout(() => morphImages(img1, img2, "images/spoiler03.jpg"), 7000);

  // setTimeout(() => {
  //   if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  // }, 45000);
}

function glitchDecrypt(img, route, time) {
  let glitches = 0;
  const glitchInterval = setInterval(() => {
    const randX = Math.floor(Math.random() * 20) - 10;
    const randY = Math.floor(Math.random() * 20) - 10;
    img.style.transform = `translate(${randX}px,${randY}px)`;
    img.style.filter = `contrast(150%) hue-rotate(${Math.random() * 360}deg)`;
    if (Math.random() > 0.6) img.src = route;
    else img.src = route;
    glitches++;
    if (glitches > 25) {
      clearInterval(glitchInterval);
      img.src = route;
      img.style.transform = "none";
      img.style.filter = "none";
    }
  }, time);
}
function glitchEffect(img, duration) {
  let time = 0;
  const interval = setInterval(() => {
    img.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
    img.style.filter = `hue-rotate(${Math.random() * 360}deg) contrast(200%)`;

    time += 50;
    if (time > duration) {
      clearInterval(interval);
      img.style.transform = "none";
      img.style.filter = "none";
    }
  }, 50);
}
function morphImages(imgA, imgB, newSrc) {
  imgB.src = newSrc;

  imgA.style.position = "absolute";
  imgB.style.position = "absolute";

  imgA.style.transition = "opacity 1.5s ease";
  imgB.style.transition = "opacity 1.5s ease";

  imgA.style.opacity = 1;
  imgB.style.opacity = 0;

  glitchEffect(imgA, 300);

  setTimeout(() => {
    imgA.style.opacity = 0;
    imgB.style.opacity = 1;
  }, 200);
  setTimeout(() => {
    imgA.src = newSrc;
    imgA.style.opacity = 1;
    imgB.style.opacity = 0;
  }, 2000);
}