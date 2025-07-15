
function loadPage(page) {
    fetch(`temphtml/${page}.html`)
        .then(response => {
        if(!response.ok) {
            throw new Error(`載入失敗:${response.status}`);
        }
        return response.text();
        })
        .then(html => {
            document.getElementById('main-content').innerHTML = html;
        })
        .catch(error =>{
            document.getElementById('main-content').innerHTML = `<p style="color:red;">`
        });
}

window.onload = () => loadPage('resume');