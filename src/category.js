class Category {
    constructor(category) {
        this.name = category.attributes.name;
        this.description = category.attributes.description;
        Category.all.push(this);
    }

    render() {
        const categoryDiv = document.getElementById('categories');
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `<h1>${this.name}</h1> <div>${this.description}</div>`;
        const ul = document.createElement('ul');
        ul.dataset.categoryId = this.id;
        // div.id = name;
        div.appendChild(ul);
        // div.appendChild(displayExercises(category, obj));
        categoryDiv.appendChild(div);
    }
}

Category.all = [];