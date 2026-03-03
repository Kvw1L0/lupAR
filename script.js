document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector('a-scene');
    const loader = document.getElementById('loading-overlay');
    const infoCard = document.getElementById('info-card');
    const scanInstruction = document.querySelector('.scan-instruction');
    const reticle = document.querySelector('.reticle');

    // Datos de los objetos (puedes personalizar los textos para cada marcador)
    const objectsData = [
        { title: "El Cubo de la Verdad", desc: "Has descubierto el primer artefacto." },
        { title: "Esfera de Energía", desc: "Poder ilimitado en la palma de tu mano." }
    ];

    if(sceneEl) {
        // Quitar cargador cuando la cámara esté lista
        sceneEl.addEventListener('arReady', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        });

        // Lógica al encontrar un marcador
        document.querySelectorAll('a-entity[mindar-image-target]').forEach((el, index) => {
            
            el.addEventListener("targetFound", () => {
                // 1. Cambiar la UI de la lupa (ponerla verde)
                reticle.classList.add('found');
                scanInstruction.style.opacity = '0';
                
                // 2. Mostrar la tarjeta de información
                if(objectsData[index]) {
                    document.getElementById('obj-title').innerText = objectsData[index].title;
                    document.getElementById('obj-desc').innerText = objectsData[index].desc;
                    infoCard.classList.remove('hidden');
                }

                // 3. Disparar la animación mágica del modelo 3D (para que brote)
                const model = el.querySelector('a-gltf-model');
                if(model) {
                    model.emit('model-appear');
                }
            });

            el.addEventListener("targetLost", () => {
                // Restaurar la UI cuando se pierde el marcador
                reticle.classList.remove('found');
                scanInstruction.style.opacity = '1';
                infoCard.classList.add('hidden');
                
                // Reiniciar el tamaño del modelo a 0 para que vuelva a brotar la próxima vez
                const model = el.querySelector('a-gltf-model');
                if(model) {
                    model.setAttribute('scale', '0 0 0');
                }
            });
        });
    }
});
