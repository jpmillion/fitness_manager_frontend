class Category {
    constructor(category) {
        this.id = category.id;
        this.name = category.attributes.name;
        this.description = category.attributes.description;
        Category.all.push(this);
    }

    renderCategory() {
        const categoryDiv = document.getElementById('categories');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h3>${this.name}</h3> <div>${this.description}</div>`;
        const ul = document.createElement('ul');
        ul.dataset.categoryId = this.id;
        // div.id = name;
        div.appendChild(ul);
        // div.appendChild(displayExercises(category, obj));
        categoryDiv.appendChild(div);
    }
}

Category.all = [];