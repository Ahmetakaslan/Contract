// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Note {
    uint256 public noteCount = 0;

    struct Not {
        uint256 id;
        string title;
        string description;
    }

    mapping(uint256 => Not) public notes;

    event NoteCreated(uint256 id, string title, string description);
    event NoteDeleted(uint256 id);
    

    function createNote(string memory _title, string memory _description)
        public
    {
        notes[noteCount] = Not(noteCount, _title, _description);
        emit NoteCreated(noteCount, _title, _description);
        noteCount++;
    }

    function deleteNote(uint256 _id) public {
        delete notes[_id];
        emit NoteDeleted(_id);
        noteCount--;
    }
    
}
