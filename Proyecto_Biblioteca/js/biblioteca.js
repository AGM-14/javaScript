import { Libro } from "./libro.js";


export class Biblioteca {
    /**
     * Crea una biblioteca vacía.
     */
    constructor() {
        this.libros = [];
    }

    /**
     * Añade un libro al catálogo.
     * @param {Libro} libro - Libro a añadir.
     * @returns {boolean} true si se ha añadido, false si no es una instancia de Libro.
     */
    agregar(libro) {
        if (!(libro instanceof Libro)) {
            return false;
        }
        this.libros.push(libro);
        return true;
    }

    /**
     * Busca libros cuyo título o autor contienen el texto, sin distinguir mayúsculas.
     * @param {string} texto - Texto a buscar.
     * @returns {Libro[]} Libros que coinciden.
     */

    buscar(texto) {
        const t = texto.toLowerCase();
        return this.libros.filter( (l) => l.titulo.toLowerCase().includes(t) || l.autor.toLowerCase().includes(t));
    }

    /**
     * Filtra los libros por género.
     * @param {string} genero - Género buscado.
     * @returns {Libro[]} Libros de ese género.
     */

    filtrarPorGenero(genero) {
        return this.libros.filter((l) => l.genero === genero);
    }

    /**
     * Filtra los libros por disponibilidad.
     * @param {boolean} disponible - true para disponibles, false para prestados.
     * @returns {Libro[]} Libros con ese estado.
     */

    filtrarPorDisponibilidad(disponible) {
        return this.libros.filter((l) => l.disponible === disponible);
    }

    /**
     * Ordena los libros por un campo sin modificar el array original.
     * @param {string} campo - "titulo", "autor", "anio" o "paginas".
     * @param {boolean} [ascendente=true] - true de menor a mayor, false al revés.
     * @returns {Libro[]} Copia ordenada de los libros.
     */
    ordenarPor(campo, ascendente = true) {
        const copia = [...this.libros];
        copia.sort((a, b) => {
            let resultado;
            if (typeof a[campo] === "string") {
                resultado = a[campo].localeCompare(b[campo]);
            } else {
                resultado = a[campo] - b[campo];
            }
            return ascendente ? resultado : -resultado;
        });
        return copia;
    }


     /**
     * Devuelve la lista de géneros sin repetir.
     * @returns {string[]} Géneros presentes en el catálogo.
     */
    generos() {
        return [...new Set(this.libros.map((l) => l.genero))];
    }

    /**
     * Carga libros desde un texto con una línea por libro y campos separados por ";".
     * Formato: titulo;autor;anio;paginas;genero;si/no
     * @param {string} texto - Texto con los libros.
     * @returns {number} Cantidad de libros añadidos.
     */
    cargarDesdeTexto(texto) {
        let cargados = 0;
        for (const linea of texto.split("\n")) {
            if (linea.trim() === "") {
                continue;
            }
            const campos = linea.split(";").map((c) => c.trim());
            if (campos.length !== 6) {
                continue;
            }
            const [titulo, autor, anio, paginas, genero, disp] = campos;
            const libro = new Libro(
                titulo,
                autor,
                Number(anio),
                Number(paginas),
                genero,
                disp.toLowerCase() === "si"
            );
            if (this.agregar(libro)) {
                cargados++;
            }
        }
        return cargados;
    }

    /**
     * Calcula las estadísticas del catálogo.
     * @returns {{total: number, disponibles: number, prestados: number, mediaPaginas: number, masAntiguo: (Libro|null), porGenero: Map<string, number>}} Objeto con los datos.
     */
    estadisticas() {
        const total = this.libros.length;
        const disponibles = this.libros.filter((l) => l.disponible).length;
        const totalPaginas = this.libros.reduce((acc, l) => acc + l.paginas, 0);
        const masAntiguo = total === 0
            ? null
            : this.libros.reduce((a, b) => (b.anio < a.anio ? b : a));
        const porGenero = new Map();
        for (const l of this.libros) {
            porGenero.set(l.genero, (porGenero.get(l.genero) ?? 0) + 1);
        }
        return {
            total,
            disponibles,
            prestados: total - disponibles,
            mediaPaginas: total === 0 ? 0 : Math.round(totalPaginas / total),
            masAntiguo,
            porGenero,
        };
    }

    
    
}
    
/**
 * Catálogo inicial de la biblioteca.
 * @type {Biblioteca}
 */
export const catalogo = new Biblioteca();

catalogo.agregar(new Libro("El Quijote", "Miguel de Cervantes", 1605, 863, "novela"));
catalogo.agregar(new Libro("La casa de Bernarda Alba", "Federico García Lorca", 1945, 120, "teatro", false));
catalogo.agregar(new Libro("Niebla", "Miguel de Unamuno", 1914, 280, "novela"));
catalogo.agregar(new Libro("Rimas y leyendas", "Gustavo Adolfo Bécquer", 1871, 220, "poesía"));
catalogo.agregar(new Libro("La Regenta", "Leopoldo Alas Clarín", 1885, 750, "novela", false));
catalogo.agregar(new Libro("Campos de Castilla", "Antonio Machado", 1912, 180, "poesía"));
catalogo.agregar(new Libro("Bodas de sangre", "Federico García Lorca", 1933, 110, "teatro"));
catalogo.agregar(new Libro("Meditaciones del Quijote", "José Ortega y Gasset", 1914, 190, "ensayo", false));

catalogo.cargarDesdeTexto(`Luces de bohemia;Ramón del Valle-Inclán;1924;160;teatro;si
Fortunata y Jacinta;Benito Pérez Galdós;1887;1000;novela;no
La colmena;Camilo José Cela;1951;320;novela;si
España invertebrada;José Ortega y Gasset;1921;150;ensayo;si`);



