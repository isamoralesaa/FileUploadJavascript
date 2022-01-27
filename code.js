/**
 * Ejemplo para leer archivos tipo texto, imagen y video.
 */

const attach     = document.getElementById('fileimport');
const results    = document.querySelector('.content-file');
const attachName = document.querySelector('.attachmentName');

const FileContentType = ['text/plain', 'video/mp4', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

attach.addEventListener('change', (e) => {
    let file = e.target.files[0];

    if (!FileContentType.includes(file.type)){//verificar el tipo de archivo
        alert('archivo con formato no valido');
    } else {
        fileLoad(file);
    }
});

const fileLoad = file => {
    let reader = new FileReader();
    let type   = file.type.split('/')[0];

    attachName.innerHTML = file.name;

    if (type == 'text') {
        reader.readAsText(file); //leer el texto del archive txt
    } else if (type == 'image') {
        reader.readAsDataURL(file); //leer URL si es imagen o video;
    } else {
        reader.readAsArrayBuffer(file)
    }

    reader.addEventListener("load", (e) => {
        if (type == 'text') {
            results.innerHTML = e.currentTarget.result
        } else if (type == 'image') {
            results.innerHTML = `<img src='${e.currentTarget.result}'>`;
        } else {
            let video = new Blob([new Uint8Array(e.currentTarget.result)], {type: file.type});
            let url = URL.createObjectURL(video);
            results.innerHTML = `<video src='${url}' class='play'>`;
            document.querySelector('.play').play();
        }

        results.classList.add("clr-result");
    });
}
