class Category {
    constructor(category) {
        this.name = category.attributes.name;
        this.description = category.attributes.description;
        Category.all.push(this);
    }
}

Category.all = [];