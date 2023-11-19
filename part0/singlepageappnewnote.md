# Single page app new note diagram

```mermaid
sequenceDiagram

participant browser
participant server

browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
note left of browser: JS prevents default form handling,<br> creates a new note, adds it to notes list <br> and sends it to the server
note right of browser: new note as JSON data
server-->>browser: 201 created
note left of server: No redirect, no further requests. The browser stays on same page

```
