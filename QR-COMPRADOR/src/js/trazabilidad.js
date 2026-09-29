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