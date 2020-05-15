import Ajax from "./Ajax";

class Dashboard {

    constructor($container, sectionToLoad) {
        this.dashboard = $container;
        this.sectionToLoad = sectionToLoad;
        this.addRessource = this.addRessource.bind(this);
        this.editRessource = this.editRessource.bind(this);
        this.deleteRessource = this.deleteRessource.bind(this);
        this.displaySection();
    }

    async displaySection() {
        this.dashboard.innerHTML = '';
        const $sectionContent = await this.fetchSection();
        const $addBtn = $sectionContent.querySelector('#add-btn');
        $addBtn.addEventListener('click', e => this.addRessource(e));
        const $editBtnList = $sectionContent.querySelectorAll('.edit-btn');
        $editBtnList.forEach($editBtn => $editBtn.addEventListener('click', e => this.editRessource(e)))
        const $deleteBtnList = $sectionContent.querySelectorAll('.delete-btn');
        $deleteBtnList.forEach($deleteBtn => $deleteBtn.addEventListener('click', e => this.deleteRessource(e)));
        this.dashboard.appendChild($sectionContent);
    }

    async fetchSection() {
        const url = 'dashboard/' + this.sectionToLoad;
        const html = await fetch(url).then(response => response.text());
        return document.createRange().createContextualFragment(html).querySelector('.container');
    }

    addRessource(e) {
        e.preventDefault();
        const url = '/api/' + this.sectionToLoad;
        const $newAuthorInput = document.getElementById('newAuthor');
        if ($newAuthorInput.value !== '') {
            let request = new Ajax(url);
            request.setMethod('POST');
            request.setPostDatas({name: $newAuthorInput.value}, true);
            request.execute(() => this.displaySection(this.sectionToLoad));
        } else {
            return this.exception('emptyInput');
        }
    }

    editRessource(e) {
        e.preventDefault();
        let $tableRow = this.getTableRow(e);
        const url = this.getUrl(e);
        let request = new Ajax(url);
        request.execute((ressource) => {
            $tableRow.innerHTML = '';

            let $inputTd = document.createElement('td');
            $inputTd.classList.add('col-8');
            $tableRow.appendChild($inputTd);
            let $nameInput = document.createElement('input');
            $nameInput.type = 'text';
            $nameInput.classList.add('form-control');
            $nameInput.value = ressource.name;
            $inputTd.appendChild($nameInput);

            let $actionsBtn = document.createElement('td');
            $actionsBtn.classList.add('col-4', 'actions-btn');
            $tableRow.appendChild($actionsBtn);
            let $submitBtn = document.createElement('button');
            $submitBtn.title = 'Enregistrer';
            $submitBtn.classList.add('btn', 'btn-outline-success');
            $actionsBtn.appendChild($submitBtn);
            $actionsBtn.appendChild(document.createTextNode(' '));
            let $submitBtnIcon = document.createElement('i');
            $submitBtnIcon.classList.add('fas', 'fa-save');
            $submitBtn.appendChild($submitBtnIcon);

            let $cancelBtn = document.createElement('button');
            $cancelBtn.title = 'Annuler';
            $cancelBtn.classList.add('btn', 'btn-outline-light');
            $actionsBtn.appendChild($cancelBtn);
            let $cancelBtnIcon = document.createElement('i');
            $cancelBtnIcon.classList.add('fas', 'fa-times');
            $cancelBtn.appendChild($cancelBtnIcon);

            let self = this;
            $submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if ($nameInput.value !== '') {
                    let request = new Ajax(url);
                    request.setMethod('PUT');
                    request.setPostDatas({name: $nameInput.value}, true);
                    request.execute(() => self.displaySection(self.sectionToLoad));
                } else {
                    return this.exception('emptyInput');
                }
            }, {once: true});
            $cancelBtn.addEventListener('click', (e) => {
                e.preventDefault();
                request.execute(() => self.displaySection(self.sectionToLoad));
            }, {once: true});
        })
    }

    deleteRessource(e) {
        e.preventDefault();
        let request = new Ajax(this.getUrl(e));
        request.setMethod('DELETE');
        request.execute(() => {
            let $table = document.querySelector('tbody');
            const $tableRow = this.getTableRow(e);
            $table.removeChild($tableRow);
        })
    }

    getUrl(e) {
        return '/api/' + e.target.dataset.class + '/' + e.target.dataset.id;
    }

    getTableRow(e) {
        return e.target.parentNode.parentNode;
    }
}

export default Dashboard;