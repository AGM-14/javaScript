import { catalogo } from "./biblioteca.js";

const TEXTO_BUSQUEDA = "de";
const contenedor = document.querySelector("#contenido");

/**
 * Convierte un título en un id válido para enlaces.
 * @param {string} texto - Título de la sección.
 * @returns {string} Id sin tildes ni espacios.
 */
function crearId(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-");
}

/**
 * Pinta una sección con una tarjeta por libro en el contenedor principal.
 * @param {string} titulo - Encabezado de la sección.
 * @param {Libro[]} lista - Libros a mostrar.
 * @returns {void}
 */
function pintarSeccion(titulo, lista) {
    const seccion = document.createElement("section");
    seccion.id = crearId(titulo);

    const encabezado = document.createElement("h2");
    encabezado.textContent = titulo;

    const rejilla = document.createElement("div");
    rejilla.classList.add("rejilla");

    if (lista.length === 0) {
        const vacio = document.createElement("p");
        vacio.classList.add("vacio");
        vacio.textContent = "No hay libros en esta sección";
        rejilla.append(vacio);
    }

    for (const libro of lista) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("tarjeta", libro.disponible ? "disponible" : "prestado");

        const nombre = document.createElement("h3");
        nombre.textContent = libro.titulo;

        const autor = document.createElement("p");
        autor.classList.add("autor");
        autor.textContent = libro.autor;

        const datos = document.createElement("p");
        datos.classList.add("datos");
        datos.textContent = `${libro.anio} · ${libro.paginas} págs. · ${libro.genero}`;

        const estado = document.createElement("p");
        estado.classList.add("estado");
        estado.textContent = libro.disponible ? "Disponible" : "Prestado";

        tarjeta.append(nombre, autor, datos, estado);

        if (!libro.disponible) {
            const etiqueta = document.createElement("span");
            etiqueta.classList.add("etiqueta");
            etiqueta.textContent = "Prestado";
            tarjeta.append(etiqueta);
        }

        rejilla.append(tarjeta);
    }

    seccion.append(encabezado, rejilla);
    contenedor.append(seccion);
}

/**
 * Intenta prestar un libro por título y muestra el resultado en consola.
 * @param {string} titulo - Título (o parte) del libro.
 * @returns {void}
 */
function simularPrestamo(titulo) {
    const libro = catalogo.buscar(titulo)[0];
    if (!libro) {
        console.log(`No existe ningún libro con "${titulo}".`);
        return;
    }
    console.log(
        libro.prestar()
            ? `Prestado: ${libro.resumen()}`
            : `No se puede prestar (ya estaba prestado): ${libro.resumen()}`
    );
}

/**
 * Intenta devolver un libro por título y muestra el resultado en consola.
 * @param {string} titulo - Título (o parte) del libro.
 * @returns {void}
 */
function simularDevolucion(titulo) {
    const libro = catalogo.buscar(titulo)[0];
    if (!libro) {
        console.log(`No existe ningún libro con "${titulo}".`);
        return;
    }
    console.log(
        libro.devolver()
            ? `Devuelto: ${libro.resumen()}`
            : `No se puede devolver (ya estaba disponible): ${libro.resumen()}`
    );
}

// ---------- RF6: simulación de préstamos ----------
console.table(catalogo.libros);
simularPrestamo("Niebla");
simularPrestamo("Bodas de sangre");
simularPrestamo("La colmena");
simularDevolucion("La Regenta");
simularPrestamo("Fortunata");   // ya estaba prestado: debe fallar

// ---------- RF5: vistas ----------
pintarSeccion("Catálogo completo", catalogo.ordenarPor("titulo"));
pintarSeccion("Libros disponibles", catalogo.filtrarPorDisponibilidad(true));
pintarSeccion("Libros prestados", catalogo.filtrarPorDisponibilidad(false));

for (const genero of catalogo.generos()) {
    pintarSeccion(`Género: ${genero}`, catalogo.filtrarPorGenero(genero));
}

pintarSeccion("Los 5 libros más antiguos", catalogo.ordenarPor("anio").slice(0, 5));

pintarSeccion(
    "Novelas disponibles ordenadas por páginas",
    catalogo.ordenarPor("paginas").filter((l) => l.genero === "novela" && l.disponible)
);

pintarSeccion(
    `Resultados de la búsqueda: "${TEXTO_BUSQUEDA}"`,
    catalogo.buscar(TEXTO_BUSQUEDA)
);