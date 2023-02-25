import { TokenContext } from "App";
import axios from "axios";
import { baseUrl } from "config";
import React, { useContext, useEffect, useState } from "react";
import uuid from 'react-uuid';
import './createBook.css'
import { File } from "./File";

const CreateBook = ({ files, setFiles, setShow, setGenreShow, state, setState, fileNames, setFileNames, change, selectedGenres, setSelectedGenres }) => {
    const [img, setImg] = useState(null)
    const { token } = useContext(TokenContext)

    const addChapterHandle = () => {
        setFileNames((prev) => [...prev, "txt, fb2 / до 2 мб"])
    }

    const submitHandle = async (e) => {
        e.preventDefault()
        console.log(state);
        // try {
        //     const formData = new FormData()

        //     formData.append("img", state.img)
        //     formData.append("chapters", state.chapters)
        //     formData.append("name", state.name)
        //     formData.append("authorName", state.authorName)
        //     formData.append("description", state.description)
        //     formData.append("restriction", state.restriction)
        //     formData.append("genres", JSON.stringify(state.genres))
        //     formData.append("chapterNames", JSON.stringify(state.chapterNames))
        //     const { data } = await axios.post(`${baseUrl}/api/v2/book`, formData, {
        //         headers: {
        //             "Authorization": `bearer ${token}`
        //         }
        //     })
        //     console.log(data);
        //     setShow(false)
        // } catch (e) {
        //     console.log(e.message);
        // }
    }

    const showGenreHandle = () => {
        setShow(false)
        setGenreShow(true)
    }


    useEffect(() => {
        if (change) {
            (async () => {
                const { data } = await axios(`${baseUrl}/api/v2/book/${change}`)
                setState(data);
            })()
            return
        }

    }, [change, setState, setShow])

    return (
        <div className="createBook_main" onClick={(e) => e.stopPropagation()}>
            <h1>Создание книги</h1>
            <form onSubmit={submitHandle} className="createBook-form">
                <div className="createBook_form" >
                    <label htmlFor="img_file">
                        <div className="divInp_file">
                            <img src={img} alt="" />
                            <input type="file" id="img_file" className="inp" accept="image/*" onChange={(e) => {
                                if (!e.target.files[0]) {
                                    return
                                }
                                setState(prev => {
                                    return { ...prev, img: e.target.files[0] }
                                })
                                let reader = new FileReader();
                                reader.onload = (ev) => {
                                    setImg(ev.target.result)
                                };
                                reader.readAsDataURL(e.target.files[0]);
                            }} />
                        </div>
                    </label>
                    <div className="divInp_form">
                        <input type="text" className="divForm_inp" value={state.name} onChange={(e) => setState((prev) => {
                            return { ...prev, name: e.target.value }
                        })} placeholder="Название книги*" />
                        <input type="text" className="divForm_inp" value={state.authorName} onChange={(e) => setState((prev) => {
                            return { ...prev, authorName: e.target.value }
                        })} placeholder="Автор*" />
                        <textarea cols="30" rows="10" className="divForm_inp inp_all" value={state.description} onChange={(e) => setState((prev) => {
                            return { ...prev, description: e.target.value }
                        })} ></textarea>
                        <div className="div_limitation">
                            <input type="checkbox" checked={state.restriction} onChange={() => setState((prev) => {
                                return { ...prev, restriction: !prev.restriction }
                            })} />
                            <span>Органичение 18+</span>
                        </div>
                    </div>
                </div>
                <div className="div_genres">
                    {selectedGenres.length === 0 ? <button type="button" onClick={showGenreHandle}>+ Добавить жанры (не более 3)</button> : <>
                        {selectedGenres.map((e) => {
                            return <button onClick={() => setSelectedGenres((prev) => prev.filter((genre) => e.id !== genre.id))} className="active">{e.value}</button>
                        })}
                        {selectedGenres.length < 3 ? <button onClick={showGenreHandle}>+ Добавить жанр</button> : null}
                    </>}
                </div>
                <div className="div_formatBook">
                    <table>
                        <tbody>
                            {fileNames.map((val, index) => {
                                return (
                                    <File files={files} setState={setState} fileNames={fileNames} setFiles={setFiles} index={index} setFileNames={setFileNames} val={val} key={uuid()} />
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <button className="addChapter" onClick={addChapterHandle} type="button">+ Добавить главу</button>

                <div className="div_save">
                    <div className="bookRules">
                        <input type="checkbox" />
                        <p>Согласен с <span>правилами загрузки книг</span></p>
                    </div>

                    <button type="submit">Сохранить и отправить на модерацию</button>
                </div>


            </form>
        </div>
    )
}
export default CreateBook;