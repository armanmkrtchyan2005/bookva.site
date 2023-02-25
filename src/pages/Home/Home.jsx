import { useEffect, useState } from 'react';
import './home.css';
import Advertisement from 'components/advertisement/Advertisement'
import AddBook from 'components/addBook/AddBook'
import CreateBook from 'components/createBook/CreateBook'
import Book from 'components/books/Book';
import Genre from 'components/genre/Genre';

const Home = () => {

    const [show, setShow] = useState(false)
    const [change, setChange] = useState(null)
    const [genreShow, setGenreShow] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState([])
    const [fileNames, setFileNames] = useState(["txt, fb2 / до 2 мб "]);
    const [files, setFiles] = useState([])

    useEffect(() => {
        document.body.addEventListener("click", () => {
            setShow(false)
        })
    }, [])

    const [state, setState] = useState({
        name: "",
        authorName: "",
        description: "",
        restriction: true,
        genres: selectedGenres.map((genre) => genre.id),
        chapterNames: fileNames,
        img: null,
        chapters: files
    })

    return (
        <>
            {show ? <CreateBook files={files} setFiles={setFiles} setSelectedGenres={setSelectedGenres} selectedGenres={selectedGenres} setShow={setShow} setGenreShow={setGenreShow} state={state} setState={setState} fileNames={fileNames} setFileNames={setFileNames} change={change} /> : null}
            {genreShow ? <Genre setState={setState} setShow={setShow} setGenreShow={setGenreShow} setSelectedGenres={setSelectedGenres} selectedGenres={selectedGenres} /> : null}
            <div className="div_all_right">
                <Advertisement />
                <AddBook setChange={setChange} setShow={setShow} />
                <Book setChange={setChange} show={show} setShow={setShow} />
            </div>
        </>
    )
}

export default Home;