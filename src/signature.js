import html2canvas from 'html2canvas';
import QRCode from 'qrcode';
import DOMPurify from 'dompurify';

let photoBase64 = '';

export function initSignaturePage() {
    const form = document.getElementById('signature-form');
    const preview = document.getElementById('signature-preview');
    const addKvBtn = document.getElementById('add-kv-btn');
    const photoInput = document.getElementById('photo-upload');

    form.addEventListener('input', updatePreview);

    photoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                photoBase64 = event.target.result;
                updatePreview();
            };
            reader.readAsDataURL(file);
        }
    });

    addKvBtn.addEventListener('click', () => {
        const container = document.getElementById('custom-fields-container');
        const id = Date.now();
        const row = document.createElement('div');
        row.className = 'kv-row animate-fade';
        row.innerHTML = `
            <input type="text" placeholder="Label (e.g. Skype)" class="kv-key" data-id="${id}">
            <input type="text" placeholder="Value" class="kv-value" data-id="${id}">
            <button type="button" class="btn btn-secondary btn-icon remove-kv" data-id="${id}">
                <i data-lucide="trash-2"></i>
            </button>
        `;
        container.appendChild(row);
        if (window.lucide) window.lucide.createIcons();
        row.querySelectorAll('input').forEach(input => input.addEventListener('input', updatePreview));
        row.querySelector('.remove-kv').addEventListener('click', () => {
            row.remove();
            updatePreview();
        });
    });

    document.getElementById('export-html').addEventListener('click', () => {
        const html = preview.innerHTML;
        navigator.clipboard.writeText(html).then(() => alert('HTML copied to clipboard!'));
    });

    document.getElementById('export-rendered').addEventListener('click', () => {
        const range = document.createRange();
        range.selectNode(preview);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        try {
            document.execCommand('copy');
            alert('Signature copied! Now paste (Ctrl+V) into Gmail settings.');
        } catch (err) {
            alert('Failed to copy. Please select the preview manually and copy.');
        }
        window.getSelection().removeAllRanges();
    });

    document.getElementById('export-png').addEventListener('click', () => {
        html2canvas(preview, { backgroundColor: null, scale: 2 }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'signature.png';
            link.href = canvas.toDataURL();
            link.click();
        });
    });

    document.getElementById('gen-qr').addEventListener('click', () => {
        const data = getSignatureText();
        const modal = document.getElementById('qr-modal');
        const container = document.getElementById('qr-container');
        QRCode.toCanvas(data, { width: 256 }, (error, canvas) => {
            if (error) console.error(error);
            container.innerHTML = '';
            container.appendChild(canvas);
            modal.style.display = 'block';
        });
    });

    updatePreview();
}

function updatePreview() {
    const preview = document.getElementById('signature-preview');
    const form = document.getElementById('signature-form');
    if (!form) return;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const kvs = [];
    document.querySelectorAll('.kv-row').forEach(row => {
        const key = row.querySelector('.kv-key').value;
        const val = row.querySelector('.kv-value').value;
        if (key && val) kvs.push({ key, val });
    });

    const showInSignQR = data.showInSignQR === 'on';
    const bgOptions = document.getElementById('bg-options');
    if (bgOptions) bgOptions.style.display = data.bgStyle === 'none' ? 'none' : 'block';

    const qrLink = data.qrLink || '';

    if (showInSignQR && qrLink) {
        QRCode.toDataURL(qrLink, { width: 128, margin: 1 }, (err, url) => {
            if (!err) preview.innerHTML = getLayoutHTML(data.layout || 'classic', { ...data, photo: photoBase64, kvs, qrCode: url });
        });
    } else {
        preview.innerHTML = getLayoutHTML(data.layout || 'classic', { ...data, photo: photoBase64, kvs, qrCode: '' });
    }
}

function getSignatureText() {
    const form = document.getElementById('signature-form');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    return `Name: ${data.name || 'User'}\nTitle: ${data.title || ''}\nMobile: ${data.mobile || ''}\nLinkedIn: ${data.linkedin || ''}`;
}

function getLayoutHTML(layout, data) {
    const { name, title, email, company, mobile, whatsapp, linkedin, github, portfolio, photo, kvs, themeColor, nameFont, infoFont, qrCode, bgStyle, bgColor1, bgColor2 } = data;

    let backgroundStyle = '';
    if (bgStyle === 'solid') backgroundStyle = `background-color: ${bgColor1};`;
    else if (bgStyle === 'gradient') backgroundStyle = `background: linear-gradient(135deg, ${bgColor1}, ${bgColor2});`;
    else if (bgStyle === 'theme-glass') backgroundStyle = `background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.1);`;
    else if (bgStyle === 'theme-dark') backgroundStyle = `background: #1e293b; color: #f8fafc;`;
    else if (bgStyle === 'theme-ocean') backgroundStyle = `background: linear-gradient(135deg, #0ea5e9, #2563eb); color: white;`;
    else if (bgStyle === 'theme-sunset') backgroundStyle = `background: linear-gradient(135deg, #f43f5e, #fb923c); color: white;`;

    const containerStyle = `${backgroundStyle} padding: 25px; border-radius: 12px;`;

    const photoHtml = photo ? `
        <div style="margin-right: 20px;">
            <img src="${photo}" style="width: 80px; height: 80px; border-radius: 50%; object-fit: cover; border: 3px solid ${themeColor};">
        </div>
    ` : '';

    const qrHtml = qrCode ? `
        <div style="margin-left: 20px; text-align: center;">
            <img src="${qrCode}" style="width: 60px; height: 60px; border-radius: 4px;">
            <div style="font-size: 8px; color: #999; margin-top: 2px;">Scan Me</div>
        </div>
    ` : '';

    const socialIcons = `
        <div style="margin-top: 15px; display: flex; gap: 10px; align-items: center;">
            ${linkedin ? `<a href="${linkedin}" style="color: ${themeColor};"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>` : ''}
            ${github ? `<a href="${github}" style="color: ${themeColor};"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>` : ''}
            ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" target="_blank" style="color: ${themeColor};"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-7.6 8.38 8.38 0 0 1 3.8.9L22 4.5l-2 2"></path></svg></a>` : ''}
        </div>
    `;

    const customFieldsHtml = kvs.map(kv => `
        <div style="font-size: 13px; font-family: ${infoFont};"><strong style="color: ${themeColor}">${kv.key}:</strong> ${kv.val}</div>
    `).join('');

    const contactInfoHtml = `
        <div style="font-family: ${infoFont}; font-size: 13px; margin-top: 5px;">
            ${email ? `<div style="margin-bottom: 2px;"><span style="color: ${themeColor}; font-weight: 600;">E:</span> ${email}</div>` : ''}
            ${mobile ? `<div style="margin-bottom: 2px;"><span style="color: ${themeColor}; font-weight: 600;">M:</span> ${mobile}</div>` : ''}
        </div>
    `;

    const baseStyle = `line-height: 1.4;`;
    const textPrimary = (bgStyle === 'theme-dark' || bgStyle === 'theme-ocean' || bgStyle === 'theme-sunset') ? '#ffffff' : '#1e293b';
    const textSecondary = (bgStyle === 'theme-dark' || bgStyle === 'theme-ocean' || bgStyle === 'theme-sunset') ? 'rgba(255,255,255,0.8)' : '#64748b';

    if (layout === 'modern') {
        return `
            <div style="${baseStyle} ${containerStyle} display: flex; align-items: center;">
                ${photoHtml}
                <div style="flex: 1; border-left: 3px solid ${themeColor}; padding-left: 15px;">
                    <div style="font-family: ${nameFont}; font-size: 18px; font-weight: 700; color: ${textPrimary};">${name || 'Your Name'}</div>
                    <div style="font-family: ${infoFont}; font-size: 14px; color: ${themeColor}; font-weight: 600;">${title || ''}</div>
                    ${company ? `<div style="font-family: ${infoFont}; font-size: 13px; color: ${textSecondary}; margin-bottom: 5px;">${company}</div>` : ''}
                    ${contactInfoHtml}
                    <div style="margin-top: 5px;">${customFieldsHtml}</div>
                    ${socialIcons}
                </div>
                ${qrHtml}
            </div>
        `;
    }

    if (layout === 'banner') {
        return `
            <div style="${baseStyle} ${containerStyle}">
                <div style="display: flex; align-items: center; margin-bottom: 10px;">
                    ${photoHtml}
                    <div style="flex: 1;">
                        <div style="font-family: ${nameFont}; font-size: 22px; font-weight: 800; color: ${textPrimary};">${name || 'Your Name'}</div>
                        <div style="font-family: ${infoFont}; color: ${themeColor}; font-weight: 600;">${title || ''}</div>
                        ${company ? `<div style="font-family: ${infoFont}; font-size: 14px; color: ${textSecondary};">${company}</div>` : ''}
                    </div>
                    ${qrHtml}
                </div>
                <div style="background: rgba(0,0,0,0.03); padding: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="font-size: 12px; font-family: ${infoFont}; color: ${textPrimary};">
                        ${mobile ? `<span style="margin-right: 10px;">M: ${mobile}</span>` : ''}
                        ${whatsapp ? `<span>W: ${whatsapp}</span>` : ''}
                    </div>
                    ${socialIcons}
                </div>
            </div>
        `;
    }

    return `
        <div style="${baseStyle} ${containerStyle}">
            <div style="display: flex; align-items: center;">
                ${photoHtml}
                <div style="flex: 1;">
                    <div style="font-family: ${nameFont}; font-size: 18px; font-weight: 700; color: ${textPrimary};">${name || 'Your Name'}</div>
                    <div style="font-family: ${infoFont}; font-size: 14px; color: ${textSecondary};">${title || ''}</div>
                    ${company ? `<div style="font-family: ${infoFont}; font-size: 13px; color: ${themeColor}; font-weight: 500;">${company}</div>` : ''}
                    ${contactInfoHtml}
                    <div style="margin-top: 5px; color: ${textPrimary};">${customFieldsHtml}</div>
                    ${socialIcons}
                </div>
                ${qrHtml}
            </div>
        </div>
    `;
}
