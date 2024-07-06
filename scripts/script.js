// script.js

// Esquema de encriptación
const encriptacion = {
    'a': 'z1@',
    'b': 'y2#',
    'c': 'x3$',
    'd': 'w4%',
    'e': 'v5^',
    'f': 'u6&',
    'g': 't7*',
    'h': 's8(',
    'i': 'r9)',
    'j': 'q0_',
    'k': 'p1+',
    'l': 'o2=',
    'm': 'n3-',
    'n': 'm4~',
    'o': 'l5`',
    'p': 'k6!',
    'q': 'j7{',
    'r': 'i8}',
    's': 'h9[',
    't': 'g0]',
    'u': 'f1:',
    'v': 'e2;',
    'w': 'd3,',
    'x': 'c4.',
    'y': 'b5<',
    'z': 'a6>',
    ' ': '_|'
};

// Generar esquema de desencriptación
const desencriptacion = Object.fromEntries(
    Object.entries(encriptacion).map(([key, value]) => [value, key])
);

// Función para encriptar el texto
function encriptarTexto(texto) {
    return texto.split('').map(letra => encriptacion[letra] || letra).join('');
}

// Función para desencriptar el texto
function desencriptarTexto(texto) {
    let resultado = '';
    for (let i = 0; i < texto.length; ) {
        let fragmento = texto.slice(i, i + 3);
        if (desencriptacion[fragmento]) {
            resultado += desencriptacion[fragmento];
            i += 3;
        } else {
            resultado += texto[i];
            i++;
        }
    }
    return resultado;
}

// Función para copiar el texto al portapapeles
function copiarTexto() {
    const textoEncriptado = document.querySelector('.text').textContent;
    navigator.clipboard.writeText(textoEncriptado).then(() => {
        alert('Texto copiado al portapapeles');
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}

// Función para mostrar u ocultar el botón de copiar y el estado vacío
function actualizarEstadoBoton() {
    const textContainer = document.querySelector('.text');
    const copiarBtn = document.querySelector('.message-container .btn-secondary');
    const emptyState = document.querySelector('.empty-state');
    
    if (textContainer && copiarBtn && emptyState) {
        if (textContainer.textContent.trim() !== '') {
            copiarBtn.style.display = 'block';
            emptyState.style.display = 'none';
        } else {
            copiarBtn.style.display = 'none';
            emptyState.style.display = 'block';
        }
    } else {
        console.error("Uno o más elementos no existen en el DOM.");
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Evento de encriptar
    document.querySelector('.btn-primary').addEventListener('click', () => {
        const textoOriginal = document.querySelector('.text-input').value;
        const textoEncriptado = encriptarTexto(textoOriginal.toLowerCase());
        document.querySelector('.text').textContent = textoEncriptado;
        actualizarEstadoBoton();

        // Ocultar la imagen y el texto
        console.log("encriptacion");
        const muñecoElement = document.getElementById('muñeco');
        const infoTextElement = document.getElementById('info-text');
        const copyButton = document.getElementById('copy-button');

        if (muñecoElement) {
            muñecoElement.classList.add('hidden');
            copyButton.classList.remove('hidden');
        } else {
            console.error("Elemento con ID 'muñeco' no encontrado.");
        }

        if (infoTextElement) {
            infoTextElement.classList.add('hidden');
        } else {
            console.error("Elemento con ID 'info-text' no encontrado.");
        }
    });

    // Evento de desencriptar
    document.querySelector('.btn-secondary').addEventListener('click', () => {
        const textoOriginal = document.querySelector('.text-input').value;
        const textoDesencriptado = desencriptarTexto(textoOriginal);
        document.querySelector('.text').textContent = textoDesencriptado;
        actualizarEstadoBoton();
    });

    // Evento de copiar
    document.querySelector('.message-container .btn-secondary').addEventListener('click', copiarTexto);

    // Inicializar estado del botón
    actualizarEstadoBoton();
});
