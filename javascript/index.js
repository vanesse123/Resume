
let currentPage = null;

function loadPage(page, clickedLink = null) {
    //防止重複點擊同一個active的頁籤
    if (page === currentPage) {
        return;
    }

    currentPage = page;

    const content = document.getElementById('main-content');
    content.classList.add('hidden');

    //移除所有連結的active樣式
    document.querySelectorAll('header a').forEach(link =>{
        link.classList.remove('active');
        link.style.pointerEvents = 'auto';
    });

    if (clickedLink && clickedLink.dataset.page !== "front_page") {
        clickedLink.classList.add('active');
        clickedLink.style.pointerEvents = 'none';
    }
    
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