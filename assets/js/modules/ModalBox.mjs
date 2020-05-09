class ModalBox {
    constructor(modalBox) {
        this.modalBox = modalBox;
        this.isHidden = true;
        this.contentWrapper = this.modalBox.querySelector('.mb-wrapper');
        this.closeBtn = this.modalBox.querySelector('.mb-close');
        this.openBox = this.openBox.bind(this);
        this.closeBox = this.closeBox.bind(this);
        this.listenKeyboard = this.listenKeyboard.bind(this);
        this.onClose = () => {
        };
        this.focusableElements = [];
    }

    openBox() {
        this.toggleBox();
        this.focusableElements = Array.from(this.modalBox.querySelectorAll('button, a, input, textarea'));
        this.modalBox.addEventListener('click', this.closeBox, {once: true});
        this.closeBtn.addEventListener('click', this.closeBox, {once: true});
        window.addEventListener('keydown', this.listenKeyboard);
        this.contentWrapper.addEventListener('click', this.stopPropagation);
    }

    closeBox(event) {
        if (this.isHidden) return;
        event.preventDefault();
        this.toggleBox();
        window.removeEventListener('keydown', this.listenKeyboard);
        this.contentWrapper.removeEventListener('click', this.stopPropagation);
        this.onClose()
    }

    listenKeyboard(event) {
        if (event.key === 'Escape' || event.key === 'Esc') {
            this.closeBox(event);
        } else if (event.key === 'Tab') {
            this.lockUpFocus(event);
        }
    }

    stopPropagation(event) {
        event.stopPropagation();
    }

    toggleBox() {
        if (this.modalBox.style.display === 'none') {
            this.modalBox.removeAttribute('aria-hidden');
            this.modalBox.setAttribute('aria-modal', 'true');
            this.modalBox.style.removeProperty('display');
            this.isHidden = false;
        } else {
            this.modalBox.setAttribute('aria-hidden', 'true');
            this.modalBox.removeAttribute('aria-modal');
            this.modalBox.addEventListener('animationend', () => {
                this.modalBox.style.display = 'none';
                this.isHidden = true;
            }, {once: true});
        }
    }

    lockUpFocus(event) {
        event.preventDefault();
        let index = this.focusableElements.findIndex(f => f === this.modalBox.querySelector(':focus'));
        if (event.shiftKey) {
            index--;
        } else {
            index++;
        }
        if (index >= this.focusableElements.length) {
            index = 0;
        } else if (index < 0) {
            index = this.focusableElements.length - 1;
        }
        this.focusableElements[index].focus({preventScroll: false});
    }
}

export {ModalBox};