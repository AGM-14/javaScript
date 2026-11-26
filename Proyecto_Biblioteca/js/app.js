import { Libro } from "./libro.js";
import { Biblioteca } from "./biblioteca.js";

const b = new Biblioteca();
b.agregar(new Libro("El Quijote", "Miguel de Cervantes", 1605, 863, "novela"));
b.agregar(new Libro("La Odisea", "Homero", -800, 541, "poesía"));
b.agregar(new Libro("Hamlet", "William Shakespeare", 1603, 200, "teatro"));

console.log(b.buscar("DE"));
console.log(b.filtrarPorGenero("poesía"));
console.log(b.filtrarporDisponibilidad(false).length);

console.log(b.ordenarPor("anio").map((l) => l.titulo));
console.log(b.ordenarPor("anio", false).map((l) => l.titulo));
console.log(b.libros.map((l) => l.titulo));