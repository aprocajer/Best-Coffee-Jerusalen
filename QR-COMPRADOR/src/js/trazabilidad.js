document.getElementById('form-trazabilidad').addEventListener('submit', async function(e) {
    e.preventDefault();

    const codigoIngresado = document.getElementById('codigo-lote').value.trim();
    const resultadoContainer = document.getElementById('resultado-lote');
    const errorContainer = document.getElementById('mensaje-error');

    resultadoContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');

    try {
        let lotes = [];

        // 1. Intentar cargar el JSON base
        try {
            const response = await fetch('src/data/lotes.json');
            if (response.ok) {
                lotes = await response.json();
            }
        } catch (err) {
            console.log('Cargando lotes locales...');
        }

        // 2. Unir con los lotes creados dinámicamente desde portal.html
        const lotesLocales = JSON.parse(localStorage.getItem('lotes_aprocajer')) || [];
        lotes = [...lotes, ...lotesLocales];

        // 3. Buscar coincidencia
        const loteEncontrado = lotes.find(lote => lote.codigo.toUpperCase() === codigoIngresado.toUpperCase());

        if (!loteEncontrado) {
            throw new Error('Código no encontrado');
        }

        // 4. Mostrar en pantalla
        document.getElementById('info-codigo').innerText = loteEncontrado.codigo;
        document.getElementById('info-origen').innerText = loteEncontrado.origen;
        document.getElementById('info-fecha').innerText = loteEncontrado.fechaProduccion;
        document.getElementById('info-productor').innerText = loteEncontrado.productor;
        document.getElementById('info-descripcion').innerText = loteEncontrado.descripcion;

        resultadoContainer.classList.remove('hidden');

    } catch (error) {
        errorContainer.classList.remove('hidden');
    }
});

document.getElementById('form-trazabilidad').addEventListener('submit', async function(e) {
    e.preventDefault();

    const codigoIngresado = document.getElementById('codigo-lote').value.trim().toUpperCase();
    const resultadoContainer = document.getElementById('resultado-lote');
    const errorContainer = document.getElementById('mensaje-error');

    resultadoContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');

    try {
        // Consultar el archivo/API con los lotes registrados
        const response = await fetch('src/data/lotes.json');
        if (!response.ok) throw new Error('No se pudo conectar con la base de datos.');

        const lotes = await response.json();

        // Buscar coincidencia exacta con el código introducido por el comprador
        const loteEncontrado = lotes.find(lote => lote.codigo.toUpperCase() === codigoIngresado);

        if (!loteEncontrado) {
            throw new Error('El código ingresado no existe o no ha sido activado.');
        }

        // Desplegar información del lote al comprador
        document.getElementById('info-codigo').innerText = loteEncontrado.codigo;
        document.getElementById('info-origen').innerText = loteEncontrado.origen;
        document.getElementById('info-fecha').innerText = loteEncontrado.fechaProduccion;
        document.getElementById('info-productor').innerText = loteEncontrado.productor;
        document.getElementById('info-descripcion').innerText = loteEncontrado.descripcion;

        resultadoContainer.classList.remove('hidden');

    } catch (error) {
        errorContainer.textContent = error.message;
        errorContainer.classList.remove('hidden');
    }
});

const SCRIPT_URL = "https://script.google.com/macros/s/https://script.google.com/macros/s/https://script.google.com/macros/s/AKfycby43oxva5-9rLdGHd25oLeSFqe1xryG0oEDAGccaKAeh_GXBxgCNdaH_3P_Dta_tn0JcA/exec";

document.getElementById('form-trazabilidad').addEventListener('submit', async function(e) {
    e.preventDefault();

    const codigoIngresado = document.getElementById('codigo-lote').value.trim();
    const resultadoContainer = document.getElementById('resultado-lote');
    const errorContainer = document.getElementById('mensaje-error');

    resultadoContainer.classList.add('hidden');
    errorContainer.classList.add('hidden');

    try {
        const response = await fetch(`${SCRIPT_URL}?action=getLote&codigo=${encodeURIComponent(codigoIngresado)}`);
        const result = await response.json();

        if (result.status === "success") {
            const lote = result.data;
            document.getElementById('info-codigo').innerText = lote.codigo;
            document.getElementById('info-origen').innerText = lote.origen;
            document.getElementById('info-fecha').innerText = lote.fechaProduccion;
            document.getElementById('info-productor').innerText = lote.productor;
            document.getElementById('info-descripcion').innerText = lote.descripcion;

            resultadoContainer.classList.remove('hidden');
        } else {
            throw new Error("El código ingresado no existe en Google Sheets.");
        }
    } catch (error) {
        errorContainer.textContent = error.message;
        errorContainer.classList.remove('hidden');
    }
});