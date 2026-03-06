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
      "> Bienvenido al generador de cartas de Riftbound \n" +
      "> Por favor introduzca usuario y pulse enter.\n",
      "> Wellcome to Riftbound card generator \n" +
      "> Por enter your user and press enter.\n"
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
      switch (textoEntrada) {
        case "> rapsolo":
          mensaje = [
            "> Bienvenido Rapsolo, vamos a proceder a crear una nueva carta para la coleccion de Unleashed.\n" +
            "> Lo primero de todo, determine el color de la carta.\n" +
            "> Wellcome Rapsolo, we are going to create a new card for the Unleashed collection.\n" +
            "> First, determine the color of the card.\n"
          ];
          break;
        case "> blue":
          mensaje = [
            "> Color azul establecido, para poder continuar introduce el coste de la carta.\n" +
            "> Blue color selected, to continue introduce the card cost.\n"
          ];
          break;

        case "> 4":
          mensaje = [
            "> Coste 4 seleccionado, ni mucho ni poco.\n" +
            "> Siguiente paso, seleccione el tipo.\n" +
            "> Cost 4 selected, not too much, not too little.\n" +
            "> Next step, select the type.\n"
          ];
          break;
        case "> gear":
          mensaje = [
            "> Tipo gear seleccionado, con esto ya tenemos suficiente para crear tu carta personalizada.\n" +
            "> Gear type selected, we have enough information to create your customized card.\n" +
            "> Exterminating yordles...\n" +
            "> Giving Draven a new Axe...\n" +
            "> Carta generada con exito!\n" +
            "> Mostrando en 3...\n" +
            "> 2...\n" +
            "> 1...\n"
          ];
          break;
        default:
          break;
      }
      if (mensaje != "") {
        type([mensaje], screen, function () {
          inputField.focus();
          if (mensaje[0].includes("> Tipo gear seleccionado, con esto ya tenemos suficiente para crear tu carta personalizada.\n")) {
            showCard();
          }
        });
      } else {
        type(
          ["> Usuario no encontrado, prueba otra vez.\n"],
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
