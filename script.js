document.addEventListener("DOMContentLoaded", () => {
    const sceneEl = document.querySelector('a-scene');
    const loader = document.getElementById('loading-overlay');
    const infoCard = document.getElementById('info-card');
    const scanInstruction = document.querySelector('.scan-instruction');
    const reticle = document.querySelector('.reticle');
    
    // Capturamos el elemento de video
    const videoMagico = document.getElementById('video-magico');

    // Textos personalizados (puedes cambiarlos)
    const objectsData = [
        { title: "Recuerdo Desbloqueado", desc: "La historia detrás de la imagen." }
    ];

    if(sceneEl) {
        // Ocultar cargador cuando la cámara inicia
        sceneEl.addEventListener('arReady', () => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        });

        // Lógica al encontrar y perder el marcador
        document.querySelectorAll('a-entity[mindar-image-target]').forEach((el, index) => {
            
            el.addEventListener("targetFound", () => {
                // 1. Cambiar la UI
                reticle.classList.add('found');
                scanInstruction.style.opacity = '0';
                
                // 2. Mostrar tarjeta de info
                if(objectsData[index]) {
                    document.getElementById('obj-title').innerText = objectsData[index].title;
                    document.getElementById('obj-desc').innerText = objectsData[index].desc;
                    infoCard.classList.remove('hidden');
                }

                // 3. ¡DAR PLAY AL VIDEO!
                if(videoMagico) {
                    videoMagico.play().catch(e => console.log("Auto-play bloqueado por el navegador", e));
                }
            });

            el.addEventListener("targetLost", () => {
                // 1. Restaurar UI
                reticle.classList.remove('found');
                scanInstruction.style.opacity = '1';
                infoCard.classList.add('hidden');
                
                // 2. PAUSAR EL VIDEO
                if(videoMagico) {
                    videoMagico.pause();
                }
            });
        });
    }
});
