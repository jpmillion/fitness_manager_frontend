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
        div.appendChild(ul);
        categoryDiv.appendChild(div);
        this.createCategoryElementsForWorkoutForm();
    }

    createCategoryElementsForWorkoutForm() {
        const catDiv = document.querySelector('form div');
        const div = document.createElement('div');
        div.classList.add('col-4');
        const ul = document.createElement('ul');
        ul.id = `${this.id}Selection`;
        const h5 = document.createElement('h5');
        h5.innerText = `${this.name}`;
        div.appendChild(h5);
        div.appendChild(ul);
        catDiv.appendChild(div);
    }
}

Category.all = [];