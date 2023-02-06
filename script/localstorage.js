let editorsList = JSON.parse(localStorage.getItem('editorsList'))

let mddocument = ''

let editors = {}
if (editorsList != undefined) {
    editors = {
        "editors": editorsList.editors
    }
} else {
    editors = {
        "editors": []
    }
}

function saveFile(file, filename, content) {
    if (editors.editors.find(e => e.file === file + ',' + file)) {
        localStorage.setItem(file + ',' + filename, content)
        return 'Success'
    } else {
        editors.editors.push({ 'file': file, 'filename': filename })
        localStorage.setItem('editorsList', JSON.stringify(editors))
        localStorage.setItem(file + ',' + filename, content)
        return 'Success'
    }
}

function readFile(file) {
    if (editors.editors.find(e => e.file === file)) {
        return localStorage.getItem(file + ',' + editors.editors.find(e => e.file === file).filename)
    } else {
        return `Couldn't Find`
    }
}

if (window.location.pathname == '/editor') {
    mddocument = readFile(editors.editors.find(e => e.file === window.location.hash.replace('#', '')).file)
} else if (window.location.pathname == '/') {
    editors.editors.forEach(function (item) {
        document.getElementById('cardsDiv').innerHTML = document.getElementById('cardsDiv').innerHTML + `<a class="ui centered raised link card" href="/editor#` + item.file + `"> <div class="content"> <div class="header">`+item.file+`</div> <div class="meta">README.md</div> <div class="description"> An Markdown file </div> </div> <div class="ui buttons bottom attached button"> <button class="ui button">Edit</button> <button class="ui button" style="max-width:40%">Remove</button> </div> </a>`
    })
}