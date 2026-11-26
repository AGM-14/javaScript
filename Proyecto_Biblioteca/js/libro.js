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

constructor(titulo, autor, anio, paginas, genero, disponible) {
        this.titulo = titulo;
        this.autor = autor;
        this.anio = anio;
        this.paginas = paginas;
        this.genero = genero;
        this.disponible = disponible;
    }

prestarLibro() {
    if (!this.disponible) {
        return 'El libro no está disponible para préstamo.';
    }
        this.disponible = false;
        return 'El libro esta disponible para préstamo, disfrutalo.';   
    
}

devolverLibro() {
    if (this.disponible) {
        return 'El libro ya ha sido devuelto.';
    }      
      this.disponible = true;
    return 'El libro ha sido devuelto y ahora está disponible.';
    
}


verAntiguedad() {
    
    const fechaActual = new Date();
    const anioActual = fechaActual.getFullYear();
    const antiguedad = anioActual - this.anio;
    return `El libro tiene ${antiguedad} años de antigüedad.`;

}

resumenLibro() {
    return `Título: ${this.titulo}, Autor: ${this.autor}, Año: ${this.anio}, Páginas: ${this.paginas}, Género: ${this.genero}` + ' ' + this.verAntiguedad();
    
}

}