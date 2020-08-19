import api from './api';

class App {
    constructor() {
        this.repositories = [];
        this.formElement = document.getElementById('repo-form');
        this.inputElement = document.querySelector('input[name=repository]');
        this.listElement = document.getElementById('repo-list');
        this.registerHandlers();
    }

    registerHandlers() {
        this.formElement.onsubmit = (event) => this.addRepository(event); 
    }

    setLoading(loading = true) {
        if (loading === true) {
            let loadingElement = document.createElement('span');
            loadingElement.appendChild(document.createTextNode('Carregando'));
            loadingElement.setAttribute('id', 'loading');

            this.formElement.appendChild(loadingElement);
            return;
        }

        document.getElementById('loading').remove();
    }

    async addRepository(event) {
        event.preventDefault();
    
        const repositoryInput = this.inputElement.value;
        if (repositoryInput.length === 0) {
            return;
        }
        this.setLoading();

        try {
            const response = await api.get(`/repos/${repositoryInput}`);
            const {
                name,
                description,
                html_url,
                owner: { avatar_url },
            } = response.data;
    
            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url,
            });
    
            this.inputElement.value = '';
            this.render();
        } catch (error) {
            alert('Este repositório não existe.');
        }
        this.setLoading(false);
    }

    render() {
        this.listElement.innerHTML = '';
        this.repositories.forEach((repository) => {
            let imgElement = document.createElement('img');
            imgElement.setAttribute('src', repository.avatar_url);

            let titleElement = document.createElement('strong');
            titleElement.appendChild(document.createTextNode('Repositório: ' + repository.name));

            let descriptionElement = document.createElement('p');
            descriptionElement.appendChild(document.createTextNode(repository.description || 'Não há descrição para este repositório')); // agrega a descrição como conteúdo

            let linkElement = document.createElement('a');
            linkElement.setAttribute('target', '_blank');
            linkElement.setAttribute('href', repository.html_url);
            linkElement.appendChild(document.createTextNode('Acessar'))

            let listItemElement = document.createElement('li');
            listItemElement.appendChild(imgElement);
            listItemElement.appendChild(titleElement);
            listItemElement.appendChild(descriptionElement);
            listItemElement.appendChild(linkElement);

            this.listElement.appendChild(listItemElement);
        });
    }
}

const app = new App(); 