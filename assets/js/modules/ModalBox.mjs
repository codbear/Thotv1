class ModalBox {
    constructor(target) {
        this.target = target;
        this.modalBox = null;
        this.openBox = this.openBox.bind(this);
        this.closeBox = this.closeBox.bind(this);
    }

    openBox(onClose = () => {
    }) {
        this.modalBox = this.target;
        this.contentWrapper = this.modalBox.querySelector('.mb-wrapper');
        this.closeBtn = this.modalBox.querySelector('.mb-close');
        this.modalBox.style.removeProperty('display');
        this.modalBox.addEventListener('click', () => this.closeBox(onClose), {once: true});
        this.closeBtn.addEventListener('click', () => this.closeBox(onClose), {once: true});
        this.contentWrapper.addEventListener('click', this.stopPropagation);
    }

    closeBox(onClose = () => {
    }) {
        if (this.modalBox === null) return;
        this.modalBox.style.display = 'none';
        this.modalBox = null;
        onClose();
    }

    stopPropagation(event) {
        event.stopPropagation()
    }
}

export {ModalBox};