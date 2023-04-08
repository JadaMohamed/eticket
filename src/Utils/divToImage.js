import html2canvas from 'html2canvas';
import ReactDOMServer from 'react-dom/server';

function printComponent(component) {
    if (!component) {
        console.error("you need to pass a valid React component", component);
        return;
    }

    const htmlString = ReactDOMServer.renderToString(component);

    const div = document.createElement('div');
    div.innerHTML = htmlString;

    html2canvas(div, { useCORS: true })
        .then((canvas) => {
            const dataUrl = canvas.toDataURL();
            downloadURI(dataUrl, "ticket.png");
        })
        .catch((error) => {
            console.error("Failed to create canvas image", error);
        })
}

function printDiv(div) {
    if (!div) {
        console.error("you need to pass a valid div element", div);
        return;
    }

    html2canvas(div, { useCORS: true })
        .then((canvas) => {
            const dataUrl = canvas.toDataURL();
            downloadURI(dataUrl, "ticket.png");
        })
        .catch((error) => {
            console.error("Failed to create canvas image", error);
        })
}

function downloadURI(uri, name) {
    const link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export { printDiv, printComponent };