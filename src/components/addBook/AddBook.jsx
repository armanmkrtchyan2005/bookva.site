import './AddBook.css';
import { ADD_BOOK_TITLE, ADD_BOOK_SPAN_DESCRIPTION, ADD_BOOK_MAIN_TITLE } from "utils/constants";

const AddBook = ({ setShow, setChange }) => {
    const toggleBlock = (e) => {
        e.stopPropagation()
        setShow((prev) => !prev)
        setChange(null)
    }

    return (
        <div className="div-add-book">
            <button className="but-left" onClick={(e) => toggleBlock(e)}>{ADD_BOOK_MAIN_TITLE}</button>

            <button className="but-right">
                {ADD_BOOK_TITLE}
                <span>{ADD_BOOK_SPAN_DESCRIPTION}
                </span> </button>
        </div>
    )
}
export default AddBook;