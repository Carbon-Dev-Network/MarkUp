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
    if (editors.editors.find(e => e.file === file + ',' + filename)) {
        localStorage.setItem(file + ',' + filename, content)
        return 'Success'
    } else {
        editors.editors.push({ 'file': file, 'filename': filename })
        localStorage.setItem('editorsList', JSON.stringify(editors))
        localStorage.setItem(file + ',' + filename, content)
        return 'Success'
    }
}

function readFile(file, filename) {
    if (editors.editors.find(e => e.file === file )) {
        return localStorage.getItem(file + ',' + filename)
    } else {
        return `Couldn't Find`
    }
}

if (window.location.pathname == '/editor') {
    console.log('here')
    document = readFile(editors.editors.find(e => e.file === window.location.hash))
}