// CONTROLADOR DEL SISTEMA DE VENTANAS (ANIMADO)
function cambiarVentana(idVentana) {
    document.querySelectorAll('.app-window').forEach(win => {
        win.classList.remove('active');
    });
    document.getElementById(idVentana).classList.add('active');
}

// ALFABETO DE DISEÑO COMPLETO (MÓDULO 27)
const alfabeto = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ"; 

// FUNCIÓN DE VALIDACIÓN EN VIVO (DETECCION DE ERRORES DE MATRIZ)
function validarMatrizEnVivo() {
    let a = parseInt(document.getElementById('m11').value) || 0;
    let b = parseInt(document.getElementById('m12').value) || 0;
    let c = parseInt(document.getElementById('m21').value) || 0;
    let d = parseInt(document.getElementById('m22').value) || 0;

    // Calcular determinante de la matriz K (ad - bc)
    let determinante = (a * d) - (b * c);
    let detMod27 = ((determinante % 27) + 27) % 27;

    let badge = document.getElementById('matrizStatus');
    let btnEjecutar = document.getElementById('btnEjecutar');

    // El Cifrado de Hill requiere que el determinante sea diferente de 0 
    // y coprimo con el tamaño del alfabeto (27). Los factores de 27 son 3 y 9.
    if (determinante === 0 || detMod27 % 3 === 0) {
        badge.innerText = "❌ Inestable: Det sin inversa en Mod 27";
        badge.className = "matrix-badge status-invalid";
        btnEjecutar.disabled = true;
    } else {
        badge.innerText = `✅ Estable: Matriz Invertible (Det: ${determinante})`;
        badge.className = "matrix-badge status-valid";
        btnEjecutar.disabled = false;
    }
}

// PROCESADOR MATEMÁTICO PRINCIPAL (BACKEND)
function procesarCifrado() {
    let a = parseInt(document.getElementById('m11').value) || 0;
    let b = parseInt(document.getElementById('m12').value) || 0;
    let c = parseInt(document.getElementById('m21').value) || 0;
    let d = parseInt(document.getElementById('m22').value) || 0;

    let determinante = (a * d) - (b * c);
    let detMod27 = ((determinante % 27) + 27) % 27;

    // Renderizar Det en pantalla de pasos
    document.getElementById('detCalculo').innerHTML = `Det(K) = (${a}×${d}) - (${b}×${c}) = ${determinante} ➔ <strong>${detMod27} (mod 27)</strong>`;

    // Normalizar Mensaje de entrada
    let texto = document.getElementById('mensajeInput').value.toUpperCase();
    // Reemplazar espacios y caracteres inválidos
    texto = texto.replace(/[^ABCDEFGHIJKLMNÑOPQRSTUVWXYZ]/g, "");

    if(texto.length === 0) {
        document.getElementById('resultadoTexto').innerText = "MENSAJE VACÍO";
        return;
    }

    // Rellenar con 'X' si el vector resultante no es par
    if (texto.length % 2 !== 0) texto += "X";

    let resultadoCifrado = "";
    let pasosHtml = `<p style="color: #38bdf8; margin-bottom: 10px;">// Ejecutando mapeo en espacio vectorial:</p>`;

    // Procesar vectores de 2x1
    for (let i = 0; i < texto.length; i += 2) {
        let p1 = alfabeto.indexOf(texto[i]);
        let p2 = alfabeto.indexOf(texto[i+1]);

        // Multiplicación Matricial Estándar: [Fila] x [Vector Columna]
        let c1 = (a * p1 + b * p2) % 27;
        let c2 = (c * p1 + d * p2) % 27;

        // Asegurar que no existan residuos negativos en programación JavaScript
        if (c1 < 0) c1 += 27;
        if (c2 < 0) c2 += 27;

        resultadoCifrado += alfabeto[c1] + alfabeto[c2];

        // Generador de Logs para impresionar al público/profesor
        pasosHtml += `
            <div style="margin-bottom: 14px; border-bottom: 1px solid #1e293b; padding-bottom: 8px;">
                <span style="color: #e2e8f0;">■ Bloque Vectorial [${texto[i]}, ${texto[i+1]}] ➔ Vector: [${p1}, ${p2}]</span><br>
                <span style="color: #a7f3d0;">  C1 = (${a}×${p1} + ${b}×${p2}) mod 27 = <strong>${c1}</strong> (${alfabeto[c1]})</span><br>
                <span style="color: #a7f3d0;">  C2 = (${c}×${p1} + ${d}×${p2}) mod 27 = <strong>${c2}</strong> (${alfabeto[c2]})</span>
            </div>
        `;
    }

    // Insertar resultados en la UI de la app
    document.getElementById('resultadoTexto').innerText = resultadoCifrado;
    document.getElementById('pasosMultiplicacion').innerHTML = pasosHtml;

    // Activar botón de backend
    document.getElementById('btnVerPasos').disabled = false;
}

// Inicializar la validación al cargar la app
window.onload = function() {
    validarMatrizEnVivo();
};
