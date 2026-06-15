document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();

    document.getElementById('categorias').addEventListener('change', (e)=> {
        const categoriaSeleccionada = e.target.value;
        cargarProductos(categoriaSeleccionada);
    })
});

function cargarCategorias() {
    const listaCategorias = document.getElementById('categorias');
    fetch('https://dummyjson.com/recipes/tags')
        .then(respuesta => respuesta.json())
        .then(categorias => {
            categorias.forEach(categoria => {
                listaCategorias.appendChild(new Option(categoria, categoria));
            });
            cargarProductos(categorias[0]);
        })
}

function cargarProductos(categoria) {
    const listaRecetas = document.getElementById('listaRecetas');
    fetch(`https://dummyjson.com/recipes/tag/${categoria}`)
        .then(respuesta => respuesta.json())
        .then(recetas => {
            listaRecetas.innerHTML = '';
            recetas.recipes.forEach(receta => {
                const tarjetaReceta = document.createElement('div');
                tarjetaReceta.classList.add('card');
                tarjetaReceta.innerHTML = `
                    <h4 class="card-price">Difficulty: ${receta.difficulty}</h4>
                    <div class="card-img">
                        <img src="${receta.image}" alt="${receta.name}" />
                    </div>
                    <div class="card-content">
                        <h3 class="card-text-title">${receta.name}</h3>
                        <hr>
                        <p><strong>Ingredients:</strong></p>
                        <ul>${receta.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ul>
                        <hr>
                        <p><strong>Instructions:</strong></p>
                        <ol>${receta.instructions.map(instruction => `<li>${instruction}</li>`).join('')}</ol>
                    </div>
                `;
                listaRecetas.appendChild(tarjetaReceta);
            });
        })
}