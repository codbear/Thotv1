import Ajax from "./Ajax";
import {Autocomplete} from "./autocomplete";
import React from "react";
import ReactDom from "react-dom";

export default class Dashboard {

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
        $editBtnList.forEach($editBtn => {
            $editBtn.addEventListener('click', e => {
                e.stopPropagation();
                const resourceClass = $editBtn.dataset.class;
                const resourceId = $editBtn.dataset.id;
                this.editRessource(resourceClass, resourceId)
            })
        })
        const $deleteBtnList = $sectionContent.querySelectorAll('.delete-btn');
        $deleteBtnList.forEach($deleteBtn => {
            $deleteBtn.addEventListener('click', e => {
                e.stopPropagation();
                const resourceClass = $deleteBtn.dataset.class;
                const resourceId = $deleteBtn.dataset.id;
                this.deleteRessource(resourceClass, resourceId);
            })
        });
        this.dashboard.appendChild($sectionContent);
        if (this.sectionToLoad === "collections") {
            this.setupAutocompleteField();
        }
    }

    async fetchSection() {
        const url = 'dashboard/' + this.sectionToLoad;
        const html = await fetch(url).then(response => response.text());
        return document.createRange().createContextualFragment(html).querySelector('.container');
    }

    addRessource(e) {
        e.preventDefault();
        let url = this.getUrl(e.target.dataset.class, e.target.dataset.id, 'POST');
        const $newRessourceInput = document.getElementById('newRessource');
        if ($newRessourceInput.value === '') return this.exception('emptyInput');
        let postDatas = {name: $newRessourceInput.value};
        if (this.sectionToLoad === "collections") {
            const $newRessourceParentInput = document.querySelector('#newRessourceParent input');
            if ($newRessourceParentInput.value === '') return this.exception('emptyInput');
            let parentId = $newRessourceParentInput.dataset.ressourceId;
            url = this.getUrl(e, 'POST', parentId);
        } else {
            url = this.getUrl(e, 'POST');
        }
        let request = new Ajax(url);
        request.setMethod('POST');
        request.setPostDatas(postDatas, true);
        request.execute(() => this.displaySection(this.sectionToLoad));
    }

    editRessource(ressourceClass, ressourceId) {
        let submitUrl;
        const url = this.getUrl(ressourceClass, ressourceId, 'PUT');
        let request = new Ajax(url);
        request.execute((ressource) => {
            let $button = document.querySelector('[data-id="' + ressourceId + '"]');
            const $tableRow = this.getTableRowFromButton($button);
            $tableRow.innerHTML = '';

            let $inputTd = document.createElement('td');
            $inputTd.classList.add('col-8', 'col-xl-10');
            $tableRow.appendChild($inputTd);
            let $nameInput = document.createElement('input');
            $nameInput.type = 'text';
            $nameInput.classList.add('form-control', 'col-xl-6');
            $nameInput.value = ressource.name;
            if (this.sectionToLoad === 'collections') {
                let $row = document.createElement('div');
                $row.classList.add('row');
                $inputTd.appendChild($row);
                $nameInput.classList.add('col-xl-6');
                $row.appendChild($nameInput);

                let $publisherInput = document.createElement('input');
                $publisherInput.type = 'text';
                $publisherInput.classList.add('form-control', 'col-xl-4', 'offset-xl-1');
                $publisherInput.value = ressource.publisher.name;
                $row.appendChild($publisherInput);

                submitUrl = this.getUrl(e, 'PUT', ressource.publisher.id);
            } else {
                $inputTd.appendChild($nameInput);
                submitUrl = url;
            }

            let $actionsBtn = document.createElement('td');
            $actionsBtn.classList.add('col-4', 'col-xl-2', 'actions-btn');
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
                    let request = new Ajax(submitUrl);
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

    deleteRessource(ressourceClass, ressourceId) {
        const url = this.getUrl(ressourceClass, ressourceId, 'DELETE');
        let request = new Ajax(url);
        request.setMethod('DELETE');
        request.execute(() => {
            let $button = document.querySelector('[data-id="' + ressourceId + '"]');
            const $tableRow = this.getTableRowFromButton($button);
            $tableRow.parentNode.removeChild($tableRow);
        })
    }

    setupAutocompleteField() {
        const $container = document.getElementById('newRessourceParent');
        let request = new Ajax('/api/publishers');
        request.execute((datas) => {
            const onAutocompleteMatch = (selectedOption) => {
                if (selectedOption) {
                    const $newRessourceParentInput = document.querySelector('#newRessourceParent input');
                    $newRessourceParentInput.dataset.ressourceId = selectedOption.id;
                }
            };
            const autocompleteCreateNew = (newRessourceName) => {
            };
            ReactDom.render(
                <Autocomplete
                    options={datas}
                    onMatch={onAutocompleteMatch}
                    createNew={autocompleteCreateNew}/>,
                $container);
        })
    }

    getUrl(ressourceClass, ressourceId, verb = 'GET', parentId = null) {
        switch (ressourceClass) {
            case 'collections':
                switch (verb) {
                    case 'PUT':
                        return '/api/publishers/' + parentId + '/collections/' + ressourceId;
                    case 'POST':
                        return '/api/publishers/' + parentId + '/collections';
                    default:
                        return '/api/collections/' + ressourceId;
                }
            default:
                switch (verb) {
                    case 'POST':
                        return '/api/' + ressourceClass;
                    default:
                        return '/api/' + ressourceClass + '/' + ressourceId;
                }
        }
    }

    getTableRowFromButton(buttonElement) {
        return buttonElement.parentNode.parentNode;
    }
}