document.addEventListener('DOMContentLoaded', () => {
    
    // FUNCIÓN PARA MOSTRAR EL MENSAJE FLOTANTE CUANDO SE AÑADE O QUITA UN FAVORITO
    const mostrarMensaje = (texto) => {
        const aviso = document.createElement('div');
        aviso.textContent = texto;
        aviso.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: #1509f8;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-family: Arial, sans-serif;
            box-shadow: 0 4px 10px rgba(8, 0, 255, 0.3);
            transition: opacity 0.5s ease;
        `;
        // añadimos el mensaje al body diciendo si se ha añadido o quitado un favorito
        document.body.appendChild(aviso);
        // después de 2 segundos, el mensaje se desvanece y se elimina del DOM
        setTimeout(() => {
            aviso.style.opacity = '0';
            setTimeout(() => aviso.remove(), 500);
        }, 2000);
    };
    
    // 1. MARCAR CORAZONES ROJOS AL CARGAR LA PÁGINA SI YA ESTÁN EN FAVORITOS
    const marcarFavoritosAlCargar = () => {
        const favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
        favoritos.forEach(fav => {
            const boton = document.querySelector(`.like-btn[data-id="${fav.id}"]`);
            if (boton) {
                boton.style.color = "red";
                boton.classList.add('active-like');
            }
        });
    };
    marcarFavoritosAlCargar();

    // 2. LÓGICA DEL CORAZÓN (AÑADIR / QUITAR) 
    const botonesLike = document.querySelectorAll('.like-btn');
    // recorremos cada botón de like y le añadimos un evento de click
    botonesLike.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.stopPropagation(); 

            const casa = {
                id: this.dataset.id,
                titulo: this.dataset.titulo,
                precio: this.dataset.precio,
                img: this.dataset.img,
                ubicacion: this.dataset.ubicacion,
                hab: this.dataset.hab,
                banos: this.dataset.banos,
                metros: this.dataset.metros,
                link: boton.getAttribute('data-link')
            };
            // obtenemos la lista de favoritos del localStorage o iniciamos un array vacío si no existe
            let favoritos = JSON.parse(localStorage.getItem('misFavoritos')) || [];
            const index = favoritos.findIndex(item => item.id === casa.id);

            if (index > -1) {
                // --- ACCIÓN: QUITAR ---
                favoritos.splice(index, 1);
                this.style.color = ""; 
                this.classList.remove('active-like');
                
                // --- LLAMADA AL MENSAJE ---
                mostrarMensaje("Eliminado de favoritos");

                fetch('../PHP/eliminar_favorito.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: casa.id })
                })
                .then(res => res.json())
                .then(data => console.log("Eliminado de BD:", data.message));

            } else {
    // --- ACCIÓN: AÑADIR ---
    favoritos.push(casa);
    this.style.color = "red";
    this.classList.add('active-like');

    // --- LLAMADA AL MENSAJE ---
    mostrarMensaje("¡Casa guardada!");

    // ENVIAR A MYSQL
    fetch('../PHP/guardar_favoritos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(casa) // Enviamos todos los datos de la casa
    })
    .then(res => res.json())
    .then(data => {
        console.log("Respuesta del servidor:", data);
    })
    .catch(err => console.error("Error al guardar en BD:", err));
}
            // Actualizamos el localStorage con la nueva lista de favoritos
            localStorage.setItem('misFavoritos', JSON.stringify(favoritos));
        });
    });

// 3. LÓGICA DE GIRO (HOVER) - Añadimos eventos de mouseenter y mouseleave a cada tarjeta para añadir o quitar la clase 'is-flipped' que activa el giro
    const tarjetas = document.querySelectorAll('.img-container-flip');
// recorremos cada tarjeta y le añadimos los eventos de hover para activar el giro
    tarjetas.forEach(tarjeta => {
        const inner = tarjeta.querySelector('.img-flip-inner');
        
        tarjeta.addEventListener('mouseenter', () => {
            if (inner) inner.classList.add('is-flipped');
        });

        tarjeta.addEventListener('mouseleave', () => {
            if (inner) inner.classList.remove('is-flipped');
        });
    });
});
