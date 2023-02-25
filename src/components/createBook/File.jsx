import React, { useEffect, useRef, useState } from 'react'

import uuid from 'react-uuid'

export const File = ({ files, fileNames, setFiles, index, val, setFileNames, setState }) => {
    const fileRef = useRef(null);
    const [file, setFile] = useState();

    const handleClick = () => {
        fileRef.current.click()
    }

    const handleFileChange = event => {
        const fileObj = event.target.files && event.target.files[0];
        if (!fileObj) {
            setFile(null)
            return;
        }

        setFile(fileObj)
    };

    useEffect(() => {
        if (file) {
            setFileNames((prev) => prev.map((val, ind) => {
                if (index === ind) {
                    return file.name
                }
                return val;
            }))
            setFiles((prev) => prev.map((val, ind) => {
                if (index === ind) {
                    return file
                }
                return val;
            }))

            setState((prev) => {
                return { ...prev, chapterNames: fileNames, chapters: files }
            })
        }
    }, [file, index, setFileNames, setFiles, files, fileNames, setState])

    return (
        <tr key={uuid()}>
            <td className="div_id">{index + 1}</td>
            <td><input type="text" placeholder={`Глава ${index + 1}`} /></td>
            <td onClick={handleClick}>
                {val}
                <input type="file" id="file" ref={fileRef} className="inp" accept='text/fb2+xml, text/plain' onChange={handleFileChange} />
            </td>
        </tr>
    )
}