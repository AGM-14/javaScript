/**
 * Representa un libro del catálogo.
 */
export class Libro {
    /**
     * Crea un libro.
     * @param {string} titulo - Título del libro.
     * @param {string} autor - Autor del libro.
     * @param {number} anio - Año de publicación.
     * @param {number} paginas - Número de páginas.
     * @param {string} genero - Género (novela, teatro, poesía...).
     * @param {boolean} [disponible=true] - Si está disponible para préstamo.
     */
    constructor(titulo, autor, anio, paginas, genero, disponible = true) {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.paginas = paginas;
        this.genero = genero;
        this.disponible = disponible;
    }

    /**
     * Marca el libro como prestado.
     * @returns {boolean} true si se ha prestado, false si ya estaba prestado.
     */
    prestar() {
        if (!this.disponible) {
            return false;
        }
        this.disponible = false;
        return true;
    }

    /**
     * Marca el libro como disponible.
     * @returns {boolean} true si se ha devuelto, false si ya estaba disponible.
     */
    devolver() {
        if (this.disponible) {
            return false;
        }
        this.disponible = true;
        return true;
    }

    /**
     * Calcula los años transcurridos desde la publicación.
     * @returns {number} Años de antigüedad.
     */
    antiguedad() {
        return new Date().getFullYear() - this.anio;
    }

    /**
     * Devuelve un resumen del libro en una línea.
     * @returns {string} Texto del tipo «Niebla — Miguel de Unamuno (1914)».
     */
    resumen() {
        return `${this.titulo} — ${this.autor} (${this.anio})`;
    }
}