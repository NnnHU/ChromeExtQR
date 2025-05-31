// 创建QR码容器
function createQRCodeContainer() {
    const container = document.createElement('div');
    container.className = 'qr-code-container';
    
    const qrDiv = document.createElement('div');
    qrDiv.id = 'qr-code';
    container.appendChild(qrDiv);

    const websiteInfo = document.createElement('div');
    websiteInfo.className = 'website-info';

    const domain = document.createElement('div');
    domain.className = 'website-domain';
    domain.textContent = window.location.hostname;

    const title = document.createElement('div');
    title.className = 'website-title';
    title.textContent = document.title.substring(0, 15);

    websiteInfo.appendChild(domain);
    websiteInfo.appendChild(title);
    container.appendChild(websiteInfo);

    document.body.appendChild(container);
    return qrDiv;
}

// 生成带Logo的QR码
async function generateQRCode(url) {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();

    const qrSize = 256;
    const canvas = document.createElement('canvas');
    canvas.width = qrSize;
    canvas.height = qrSize;
    const ctx = canvas.getContext('2d');

    // 绘制QR码
    const qrImage = new Image();
    qrImage.src = qr.createDataURL(10);
    await new Promise((resolve) => {
        qrImage.onload = resolve;
    });
    ctx.drawImage(qrImage, 0, 0, qrSize, qrSize);

    // 获取网站favicon
    const favicon = await getFavicon();
    if (favicon) {
        // 在QR码中心绘制Logo
        const logoSize = qrSize * 0.2; // Logo大小为QR码的20%
        const logoX = (qrSize - logoSize) / 2;
        const logoY = (qrSize - logoSize) / 2;

        // 绘制白色背景
        ctx.fillStyle = 'white';
        ctx.fillRect(logoX - 2, logoY - 2, logoSize + 4, logoSize + 4);

        // 绘制Logo
        ctx.drawImage(favicon, logoX, logoY, logoSize, logoSize);
    }

    return canvas;
}

// 获取网站favicon
async function getFavicon() {
    const favicon = new Image();
    favicon.crossOrigin = 'Anonymous';
    
    // 尝试获取高清favicon
    const links = document.querySelectorAll('link[rel*="icon"]');
    let faviconUrl = '';
    
    for (const link of links) {
        if (link.href && (link.href.endsWith('.png') || link.href.endsWith('.jpg'))) {
            faviconUrl = link.href;
            break;
        }
    }

    // 如果没找到，使用默认favicon路径
    if (!faviconUrl) {
        faviconUrl = window.location.origin + '/favicon.ico';
    }

    try {
        favicon.src = faviconUrl;
        await new Promise((resolve, reject) => {
            favicon.onload = resolve;
            favicon.onerror = reject;
        });
        return favicon;
    } catch (error) {
        console.error('Error loading favicon:', error);
        return null;
    }
}

// 主函数
async function init() {
    const qrContainer = createQRCodeContainer();
    const qrCanvas = await generateQRCode(window.location.href);
    qrContainer.appendChild(qrCanvas);
}

// 当页面加载完成后初始化
if (document.readyState === 'complete') {
    init();
} else {
    window.addEventListener('load', init);
} 