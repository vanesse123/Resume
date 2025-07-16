
function loadPage(page) {
    const content = document.getElementById('main-content');
    content.classList.add('hidden');
    
    setTimeout(() => {
        fetch(`temphtml/${page}.html`)
            .then(response => {
            if(!response.ok) {
                throw new Error(`載入失敗:${response.status}`);
            }
            return response.text();
            })
            .then(html => {
                content.innerHTML = html;
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        content.classList.remove('hidden'); // 再淡入
                    });
                });
            })
            .catch(error =>{
                document.getElementById('main-content').innerHTML = `<p style="color:red;"></p>`
                content.classList.remove('hidden');
            });
    },600);
}

window.onload = () => loadPage('projects');