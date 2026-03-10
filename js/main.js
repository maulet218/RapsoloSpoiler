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
      "> Conectando a servidor interno... \n" +
      "> Dominio detectado: RIFTBOUND-GAMES.INTERNAL.\n",
      "> Acceso restringido. \n" +
      "> Introduzca su usuario: \n"
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
        case "> admin":
          mensaje = ["> Usuario encontrado.\n> Introduzca contraseña:\n"];
          break;
        case "> 1234":
          mensaje = [
            "> Verificando credenciales...\n" +
            "> ...\n" +
            "> Acceso ilimitado concedido.\n" +
            "> === RIFTBOUND BACKOFFICE v2.3 ===.\n" +
            "> Seleccione una acción:\n" +
            "> 1 - Banear carta.\n" +
            "> 2 - Ver próximos spoilers.\n" +
            "> 3 - Diseñar nueva carta. \n"
          ];
          break;

        case "> 1":
          mensaje = [
            "> Deja de llorar por favor y centrate:\n" +
            "> Selecciona una acción anda:\n" +
            "> 1 - Banear carta.\n" +
            "> 2 - Ver próximos spoilers.\n" +
            "> 3 - Diseñar nueva carta. \n"
          ];
          break;
        case "> 2":
          mensaje = [
            "> Accediendo a base de datos de spoilers...\n" +
            "> Seleccione set:\n" +
            "> 1 - Origins\n" +
            "> 2 - Spiritforged\n" +
            "> 3 - Unleash (cooming soon)\n"
          ];
          break;
        case "> 3":
          mensaje = [
            "> Advertencia:\n" +
            "> Los spoilers futuros están protegidos por protocolo interno.\n" +
            "> Para forzar acceso escriba:\n" +
            "> OVERRIDE\n"
          ];
          break;
        case "> override":
          mensaje = [
            "> Forzando acceso...\n" +
            "> ...\n> Archivo encontrado.\n" +
            "> SPIRITFORGED_CARD_██.DAT\n" +
            "> Para descargar escriba:\n" +
            "> DOWNLOAD\n"
          ];
          break;
        case "> download":
          mensaje = [
            "> Descargando archivo...\n" +
            "> █░░░░░░░░░ 10 %\n" +
            "> ███░░░░░░░ 35 %\n" +
            "> ██████░░░░ 60 %\n" +
            "> ████████░░ 85 %\n" +
            "> ██████████ 100 %\n\n> Archivo abierto.\n\n> Mostrando carta..."
          ];
          break;
        default:
          mensaje = ["> Comando incorrecto, iniciando protocolo de reinicio...\n"];
          break;
      }

      if (mensaje != "") {
        type([mensaje], screen, function () {
          inputField.focus();
          if (mensaje[0].includes("> Descargando archivo...\n")) {
            showCard(0);
          } else if (mensaje[0].includes("> Descargando archivo desencriptado...\n")) {
            showCard(1);
          }
        });
      } else {
        type(["> Comando incorrecto, iniciando protocolo de reinico...\n"], screen, function () { inputField.focus(); });
      }
    }
  });
};

// Efectos de glitch para cartas (ejemplo)
function showCard(cardnumber) {
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  const img = document.createElement('img');
  img.src = 'images/spoiler00.png';
  img.alt = 'Spoiler Card';
  overlay.appendChild(img);
  document.body.appendChild(overlay);
  setTimeout(() => glitchDecrypt(img, "images/spoiler01.png"), 3000);
  setTimeout(() => glitchDecrypt(img, "images/spoiler03.png"), 4000);

  setTimeout(() => glitchDecrypt(img, "images/spoiler02.png"), 5000);
  setTimeout(() => {
    if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }, 45000);
}

function glitchDecrypt(img, route) {
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
  }, 80);
}