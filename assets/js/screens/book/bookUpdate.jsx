import React from "react";
import ReactDOM from "react-dom";

import {BookFormContainer} from "../../modules/book-form-container";

const bookUpdateFormContainer = document.getElementById('bookUpdateForm')
const bookId = bookUpdateFormContainer.dataset.bookId;

ReactDOM.render(<BookFormContainer bookId={bookId}/>, bookUpdateFormContainer);