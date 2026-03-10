let latencia = 1;
function type(text, screen, callback) {
  if (!text || !text.length || !(screen instanceof Element)) {
    return;
  }
  if (typeof text !== "string") {
    text = text.join("\n");
  }
  text = text.replace(/\r\n?/g, "\n").split("");
  var prompt = screen.lastChild;
  prompt.className = "typing";

  var typer = function () {
    var character = text.shift();
    if (character === "\n") {
      screen.insertBefore(document.createElement("br"), prompt);
    }
    if (character === " ") {
      screen.insertBefore(document.createTextNode("\u00A0"), prompt);
    }
    if (character !== "" && character !== " ") {
      screen.insertBefore(document.createTextNode(character), prompt);
    }

    if (character === "\n") {
      window.scroll(window.scrollX, (window.scrollY += 500));
    }

    if (text.length) {
      setTimeout(typer, latencia);
    } else {
      prompt.className = "idle";
      if (callback) {
        callback();
      }
    }
  };
  setTimeout(typer, latencia);
}

window.onload = function () {
  var screen = document.getElementById("screen");
  var inputField = document.getElementById("inputField");
  var logo = [
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
    var text = [
      "> Conectando a servidor interno... \n" +
      "> Dominio detectado: RIFTBOUND-GAMES.INTERNAL.\n",
      "> Acceso restringido. \n" +
      "Introduzca su usuario: \n"

    ];
    latencia = 20;
    type(text, screen, function () {
      inputField.classList.remove("hidden");
      inputField.focus();
    });
  });

  let teclado = document.getElementById("inputField");
  teclado.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      teclado.blur();
    }
  });

  inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      let textoEntrada = inputField.value.toLowerCase();
      inputField.value = "> ";
      let mensaje = "";
      switch (textoEntrada.toLowerCase()) {
        case "> admin":
          mensaje = [
            "> Usuario encontrado.\n" +
            "> Introduzca contraseña:\n"
          ];
          break;
        case "> 1234":
          mensaje = [
            "> Verificando credenciales...\n" +
            "> ...\n" +
            "> Acceso limitado concedido.\n" +
            "> === RIFTBOUND BACKOFFICE v2.3 ===.\n" +
            ">Seleccione una acción:.\n" +
            ">1 - Diseñar nueva carta.\n" +
            ">2 - Banear carta.\n" +
            ">3 - Ver próximos spoilers.\n"
          ];
          break;

        case "> 3":
          mensaje = [
            "> Accediendo a base de datos de spoilers...\n" +
            "> Seleccione set:\n" +
            "> 1 - Origins\n" +
            "> 2 - Spiritforged\n"
          ];
          break;
        case "> 2":
          mensaje = [
            "> Advertencia:\n" +
            "> Los spoilers están protegidos por protocolo interno.\n" +
            "> Para forzar acceso escriba:\n" +
            "> OVERRIDE"
          ];
          break;

        case "> override":
          mensaje = [
            "> Forzando acceso...\n" +
            "> ...\n" +
            "> Archivo encontrado.\n" +
            ">SPIRITFORGED_CARD_██.DAT" +
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
            "> ██████████ 100 %\n" +
            "\n" +
            "> Archivo abierto.\n" +
            "\n" +
            "> Mostrando carta..."
          ];
          break;
        default:
          break;
      }
      if (mensaje != "") {
        type([mensaje], screen, function () {
          inputField.focus();
          if (mensaje[0].includes("> Descargando archivo...\n")) {
            showCard();
          }
        });
      } else {
        type(
          ["> Comando incorrecto, iniciando protocolo de reinico...\n"],
          screen,
          function () {
            inputField.focus();
          }
        );
      }
    }
  });
};
const canvas = document.getElementById("canv");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d");
let cols = Math.floor(window.innerWidth / 20) + 1;
let ypos = Array(cols).fill(0);

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
function showCard() {
  // create a full-screen overlay that will contain the image
  const overlay = document.createElement('div');
  overlay.className = 'card-overlay';

  const img = document.createElement('img');
  img.src = 'images/spoiler.jpeg';
  img.alt = 'Spoiler Card';

  // once the image has loaded we can optionally perform additional setup
  img.addEventListener('load', () => {
    // the CSS animations defined in main.css handle zooming and panning
  });

  overlay.appendChild(img);
  document.body.appendChild(overlay);

  // remove the overlay after a while (e.g. 15 seconds) to return to the matrix effect
  setTimeout(() => {
    if (overlay.parentNode) {
      overlay.parentNode.removeChild(overlay);
    }
  }, 15000);
}
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
