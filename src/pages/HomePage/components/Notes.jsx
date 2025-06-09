import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import React, { useState } from 'react'

function Notes() {

    const [notes, setNotes] = useState([]);
    const [inputText, setInputText] = useState("");

    function handleChange(e) {
        const newValue = e.target.value;
        setInputText(newValue);
    }

    function addNote() {
        if (inputText.trim() === "" ){
            return;
        }
        setNotes((prevItems => [...prevItems, {text: inputText, isChecked: false}]));
        setInputText("");
    }

    function deleteNote(index) {
        setNotes((prevItems) => prevItems.filter((_, idx) => idx !== index));
    }

    function markedDone(index) {
        setNotes((prevItems) => prevItems.map((item, idx) => idx === index ? {...item, isChecked: !item.isChecked} : item));
    }

  return (
    <Card className="w-full max-w-3xl mx-auto max-h-[720px] bg-gray-50 flex flex-col">
        <CardHeader>
            <CardTitle className="text-3xl font-bold">Notes</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="input">
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Add Note" onChange={handleChange} value={inputText}/>
            <Button
            onClick={addNote}
            className="text-sm mt-2 bg-teal-500 text-white hover:bg-teal-600 cursor-pointer"
            >
            Add Note
            </Button>
        </div>
        <div>
            <ul>
                {notes.map((noteItem, index) => {
                    return (
                        <li key={index}>
                            <input className="checkbox mr-1" type="checkbox" checked={noteItem.isChecked} onChange={() => markedDone(index)} />
                            <label style={{textDecoration: noteItem.isChecked ? 'line-through': 'none'}}>{noteItem.text}</label>
                            <Button
                            onClick={() => deleteNote(index)}
                            className="text-xs px-3 ml-2 m-2 bg-teal-500 text-white hover:bg-red-500 cursor pointer"
                            >
                            Delete
                            </Button>
                        </li>
                    )
                })}
            </ul>
        </div>

        </CardContent>
        
    </Card>
  )
}

export default Notes