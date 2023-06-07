if (!customElements.get('featured-product')) {
    customElements.define('featured-product', class FeaturesProduct extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.form = this.querySelector('.featured-products__form');
            this.form.addEventListener('submit', this.onFormSubmit.bind(this));

            this.listId = this.parentElement.parentElement.dataset.sectionId;
            this.section = this.parentElement.parentElement;
        }

        onFormSubmit(event) {
            event.preventDefault();
            let formData = new FormData(this.form);

            fetch('/cart/add.js', {
                method: 'POST',
                body: formData,
            })
                .then((response) => {
                    this.updateSection();
                })
                .catch((error) => {
                    console.error(error);
                });
        }

        updateSection() {
            fetch(window.Shopify.routes.root + `?section_id=${this.listId}`)
                .then((response) => response.text())
                .then((data) => {
                    let htmlDiv = document.createElement('div');
                    htmlDiv.innerHTML = data;
                    let htmlDom = htmlDiv.querySelector('#featured-products__list').innerHTML;
                    this.section.innerHTML = htmlDom;
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
}