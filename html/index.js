document.addEventListener("DOMContentLoaded", function() {

    let notes = getNotes();

    const main = document.querySelector("main");
    const template = document.querySelector("#template");

    for(let note of notes) {
        createNote(note);
    }

    const creationButton = document.querySelector("#creation-button");
    creationButton.addEventListener("click", function() {
        let newNote = {id: incrementId(), title:"", note:""};
        notes.push(newNote);
        saveNotes(notes);
        createNote(newNote);
    });

    function incrementId(){
        let max = 0;
        for(let note of notes){
            if(note.id > max) max = note.id
        }
        return max+1;
    }

    function createNote(note) {
        const newNote = template.cloneNode(true);
        newNote.setAttribute("id", note.id);

        const titleInput = newNote.querySelector("input");
        titleInput.value = note.title;
        titleInput.addEventListener("keyup", function () {
            for(let element of notes){
                if(element.id === note.id){
                    element.title = titleInput.value;
                }
            }
            saveNotes(notes);
        });

        const noteTextarea = newNote.querySelector("textarea");
        noteTextarea.value = note.note;
        noteTextarea.addEventListener("keyup", function () {
            for(let element of notes){
                if(element.id === note.id){
                    element.note = noteTextarea.value;
                }
            }
            saveNotes(notes);
        });

        const deleteButton = newNote.querySelector(".delete");
        deleteButton.addEventListener("click", function(){
            notes = notes.filter(element => element.id !== note.id);
            saveNotes(notes);
            document.getElementById(note.id).remove();
        });
        main.appendChild(newNote);
    }

    function saveNotes(notes){
        localStorage.setItem('myNotes', JSON.stringify(notes));
    }

    function getNotes(){
        return localStorage.getItem('myNotes')? JSON.parse(localStorage.getItem('myNotes')) : [];
    }

});