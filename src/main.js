import './style.css';
import { createIcons, Mail, Phone, MapPin, Globe, Linkedin, Github, Type, Layout, Image as ImageIcon, Download, Plus, Trash2, RotateCcw, Maximize, Share2, QrCode, Coffee, FileText, Code } from 'lucide';
import { initSignaturePage } from './signature.js';
import { initImagePage } from './imageTools.js';
import { initResumePage } from './resume.js';
import { initDocStudioPage } from './docStudio.js';

// Central State
const state = {
    currentPage: 'signature',
};

// Router
function renderPage(pageId) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    if (pageId === 'signature') {
        mainContent.innerHTML = getSignaturePageHTML();
        initSignaturePage();
    } else if (pageId === 'image') {
        mainContent.innerHTML = getImagePageHTML();
        initImagePage();
    } else if (pageId === 'resume') {
        mainContent.innerHTML = getResumePageHTML();
        initResumePage();
    } else if (pageId === 'studio') {
        mainContent.innerHTML = getDocStudioPageHTML();
        initDocStudioPage();
    }

    // Add common footer
    mainContent.insertAdjacentHTML('beforeend', getFooterHTML());

    // Update active nav (this part is now handled by the initial insertion, but keeping for robustness if nav is elsewhere)
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.toggle('active', nav.dataset.page === pageId);
    });

    // Re-initialize icons
    createIcons({
        icons: {
            Mail, Phone, MapPin, Globe, Linkedin, Github, Type, Layout, ImageIcon, Download, Plus, Trash2, RotateCcw, Maximize, Share2, QrCode, Coffee, FileText, Code
        }
    });
}

function getSignaturePageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>Professional Email Signature Generator</h1>
                <p style="color: var(--text-muted)">Create high-impact email signatures that boost your professional presence.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-secondary" id="import-url-btn"><i data-lucide="share2"></i> Import from URL</button>
            </div>
        </div>

        <div class="form-grid">
            <div class="glass-card">
                <div class="tabs">
                    <div class="tab active" data-tab="content">Content</div>
                    <div class="tab" data-tab="style">Style</div>
                    <div class="tab" data-tab="social">Social</div>
                    <div class="tab" data-tab="custom">Custom</div>
                </div>

                <form id="signature-form">
                    <!-- Dynamic form sections -->
                    <div id="tab-content" class="tab-pane">
                        <div class="form-group mb-4">
                            <label>Full Name</label>
                            <input type="text" name="name" placeholder="Hasibur Rahman">
                        </div>
                        <div class="form-group mb-4">
                            <label>Email Address</label>
                            <input type="email" name="email" placeholder="evan@example.com">
                        </div>
                        <div class="form-group mb-4">
                            <label>Job Title</label>
                            <input type="text" name="title" placeholder="Software Engineer">
                        </div>
                        <div class="form-group mb-4">
                            <label>Company Name</label>
                            <input type="text" name="company" placeholder="UtilityHub Inc.">
                        </div>
                        <div class="form-group mb-4">
                            <label>Upload Photo / Logo</label>
                            <input type="file" id="photo-upload" accept="image/*">
                        </div>
                        <div class="form-grid">
                            <div class="form-group">
                                <label>Mobile Number</label>
                                <input type="text" name="mobile" placeholder="+1 234 567 890">
                            </div>
                            <div class="form-group">
                                <label>WhatsApp</label>
                                <input type="text" name="whatsapp" placeholder="WhatsApp Number">
                            </div>
                        </div>
                    </div>

                    <div id="tab-style" class="tab-pane" style="display: none;">
                        <div class="form-group mb-4">
                            <label>Select Layout</label>
                            <select name="layout">
                                <option value="classic">Classic Clean</option>
                                <option value="modern">Modern Professional</option>
                                <option value="minimal">Minimalist</option>
                                <option value="side">Side Banner</option>
                                <option value="banner">Glass Banner</option>
                                <option value="compact">Ultra Compact</option>
                            </select>
                        </div>
                        <div class="form-grid mb-4">
                            <div class="form-group">
                                <label>Name Font</label>
                                <select name="nameFont">
                                    <option value="'Outfit', sans-serif">Outfit</option>
                                    <option value="'Playfair Display', serif">Playfair Display</option>
                                    <option value="'Inter', sans-serif">Inter</option>
                                    <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Info Font</label>
                                <select name="infoFont">
                                    <option value="'Inter', sans-serif">Inter</option>
                                    <option value="'Outfit', sans-serif">Outfit</option>
                                    <option value="'JetBrains Mono', monospace">JetBrains Mono</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <label>Theme Color</label>
                            <input type="color" name="themeColor" value="#6366f1">
                        </div>
                        <div class="form-group mb-4">
                            <label>Background Style</label>
                            <select name="bgStyle">
                                <option value="none">Transparent</option>
                                <option value="solid">Solid Color</option>
                                <option value="gradient">Gradient</option>
                                <option value="theme-glass">Glassmorphism Theme</option>
                                <option value="theme-dark">Deep Slate (Dark)</option>
                                <option value="theme-ocean">Ocean Blue (Gradient)</option>
                                <option value="theme-sunset">Vivid Sunset (Gradient)</option>
                            </select>
                        </div>
                        <div id="bg-options" style="display: none;">
                            <div class="form-grid mb-4">
                                <div class="form-group">
                                    <label>BG Color 1</label>
                                    <input type="color" name="bgColor1" value="#ffffff">
                                </div>
                                <div class="form-group">
                                    <label>BG Color 2</label>
                                    <input type="color" name="bgColor2" value="#f8fafc">
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <label>Show External QR in Signature</label>
                            <input type="checkbox" name="showInSignQR" style="width: auto;">
                        </div>
                    </div>

                    <div id="tab-social" class="tab-pane" style="display: none;">
                         <div class="form-group mb-4">
                            <label>LinkedIn URL</label>
                            <input type="text" name="linkedin" placeholder="https://linkedin.com/in/username">
                        </div>
                        <div class="form-group mb-4">
                            <label>External QR Link (Website/Portfolio)</label>
                            <input type="text" name="qrLink" placeholder="https://yourwebsite.com">
                        </div>
                        <div class="form-group mb-4">
                            <label>GitHub URL</label>
                            <input type="text" name="github" placeholder="https://github.com/username">
                        </div>
                        <div class="form-group">
                            <label>Portfolio / Website</label>
                            <input type="text" name="portfolio" placeholder="https://yourwebsite.com">
                        </div>
                    </div>

                    <div id="tab-custom" class="tab-pane" style="display: none;">
                        <label>Custom Fields (Key/Value)</label>
                        <div id="custom-fields-container">
                            <!-- JS will inject rows here -->
                        </div>
                        <button type="button" class="btn btn-secondary mt-2" id="add-kv-btn">
                            <i data-lucide="plus"></i> Add Field
                        </button>
                    </div>
                </form>
            </div>

            <div class="preview-pane">
                <div class="signature-wrapper" id="signature-preview">
                    <!-- Live Preview Injected Here -->
                </div>
                
                <div class="glass-card" style="margin-top: 1.5rem;">
                    <h3>Export Options</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="btn btn-primary" id="export-html"><i data-lucide="code"></i> Copy HTML</button>
                        <button class="btn btn-primary" id="export-rendered"><i data-lucide="share-2"></i> Copy for Gmail</button>
                        <button class="btn btn-primary" id="export-png"><i data-lucide="download"></i> Download PNG</button>
                    </div>
                    <div style="margin-top: 1rem;">
                        <button class="btn btn-secondary w-full" id="gen-qr"><i data-lucide="qr-code"></i> Generate QR Code</button>
                    </div>
                </div>
            </div>
        </div>

        <section class="glass-card animate-fade" style="margin-top: 3rem;">
            <h2>How to Add Your Signature to Gmail</h2>
            <div class="guide-content" style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.8;">
                <ol style="padding-left: 1.5rem;">
                    <li><strong>Open Gmail:</strong> Click the <strong>gear icon</strong> (top right) and select <strong>See all settings</strong>.</li>
                    <li><strong>Find Signatures:</strong> Scroll down to the <strong>Signature</strong> section and click <strong>Create new</strong> (or edit existing).</li>
                    <li><strong>Design & Copy:</strong> Generate your signature above, preview it, and then click <strong>Copy Rendered Signature</strong> (copy the visual version, not raw code).</li>
                    <li><strong>Paste:</strong> In the Gmail editor box, paste directly (<strong>Ctrl+V</strong>). This preserves formatting, links, and images.
                        <p style="font-size: 0.85rem; font-style: italic; margin-top: 0.5rem;">Tip: If you have issues pasting, open the HTML in a new browser tab, select all (Ctrl+A), copy, and then paste into Gmail.</p>
                    </li>
                    <li><strong>Format Extras:</strong> Use the Gmail toolbar if you need to add extra spacing or bold specific text.</li>
                    <li><strong>Set Defaults:</strong> Select your new signature under <strong>Signature defaults</strong> for new emails and replies.</li>
                    <li><strong>Save:</strong> Scroll to the bottom and click <strong>Save Changes</strong>.</li>
                </ol>

                <div style="margin-top: 2rem;">
                    <h3>Mobile Gmail App (Limited HTML support)</h3>
                    <p>The best way to use your signature on mobile is to set it up on the desktop first; it will automatically sync to your mobile app. Alternatively, you can paste the text and links in the Mobile App settings (Menu → Settings → Account → Signature), but images may not render perfectly on all devices.</p>
                </div>
                
                <div style="margin-top: 2rem; padding: 1.5rem; background: rgba(99, 102, 241, 0.1); border-radius: 12px; border: 1px solid var(--primary);">
                    <p style="margin: 0; color: var(--text-main);"><strong>Note:</strong> Sometimes Gmail's editor may not perfectly render complex HTML layouts. If your signature looks broken after pasting, we recommend <strong>downloading the PNG version</strong> and uploading it as an image in the Gmail signature section.</p>
                </div>
            </div>
        </section>

        <!-- Modal for QR -->
        <div id="qr-modal" class="modal" style="display:none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8);">
            <div class="glass-card modal-content" style="max-width: 400px; margin: 100px auto;">
                <h3>Signature QR Code</h3>
                <div id="qr-container" style="text-align: center; padding: 1rem; background: white; border-radius: 12px;"></div>
                <button class="btn btn-secondary mt-4 w-full" onclick="document.getElementById('qr-modal').style.display='none'">Close</button>
            </div>
        </div>
    </div>
    `;
}

function getImagePageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>High-Resolution Image Utility</h1>
                <p style="color: var(--text-muted)">Professional-grade image resizing, rotation, and compression for optimized web performance.</p>
            </div>
        </div>

        <div class="glass-card">
            <div id="image-upload-area" class="drop-zone">
                <i data-lucide="image" style="width: 48px; height: 48px; color: var(--primary); margin-bottom: 1rem;"></i>
                <h3>Drop your image here</h3>
                <p>or click to browse files</p>
                <input type="file" id="tool-image-input" hidden accept="image/png, image/jpeg">
            </div>

            <div id="editor-area" style="display: none; margin-top: 2rem;">
                <div class="form-grid">
                    <div class="canvas-container">
                        <canvas id="canvas"></canvas>
                        <div style="display: flex; gap: 1rem;">
                           <button class="btn btn-secondary" id="rotate-left"><i data-lucide="rotate-ccw"></i> Left</button>
                           <button class="btn btn-secondary" id="rotate-right"><i data-lucide="rotate-ccw" style="transform: scaleX(-1)"></i> Right</button>
                        </div>
                    </div>
                    
                    <div>
                        <h3>Adjustments</h3>
                        <div class="form-group mb-4">
                            <label>Width (px)</label>
                            <input type="number" id="img-width">
                        </div>
                        <div class="form-group mb-4">
                            <label>Height (px)</label>
                            <input type="number" id="img-height">
                        </div>
                        <div class="form-group mb-4">
                            <label>Lock Aspect Ratio</label>
                            <input type="checkbox" id="aspect-ratio" checked style="width: auto;">
                        </div>
                        <div class="form-group mb-4">
                            <label>Export Format</label>
                            <select id="export-format">
                                <option value="image/png">PNG</option>
                                <option value="image/jpeg">JPG</option>
                            </select>
                        </div>
                        <button class="btn btn-primary w-full" id="download-result"><i data-lucide="download"></i> Download Image</button>
                        <button class="btn btn-secondary w-full mt-2" id="reset-img"><i data-lucide="maximize"></i> Original Size</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getResumePageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>Advanced Resume & CV Builder</h1>
                <p style="color: var(--text-muted)">Craft professional resumes with Markdown and LaTeX support. Ideal for developers and technical recruiters.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="download-resume"><i data-lucide="download"></i> Download PDF</button>
            </div>
        </div>

        <div class="resume-grid">
            <div class="markdown-editor">
                 <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label>Markdown Editor</label>
                    <div style="font-size: 11px; color: var(--text-muted)">Supports GitHub Flavored Markdown & KaTeX</div>
                 </div>
                 <textarea id="resume-editor" placeholder="# Your Name\n\n## Experience..."></textarea>
            </div>
            
            <div class="preview-area">
                <label>Live Preview</label>
                <div class="resume-preview-container" id="resume-preview">
                    <div id="resume-preview-render"></div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function getFooterHTML() {
    return `
    <footer class="footer">
        <div class="footer-owner">
            <p><strong>Developed by:</strong> Hasibur Rahman (Evan)</p>
            <p>&copy; 2026 UtilityHub. All rights reserved.</p>
        </div>
        <div class="footer-links">
            <a href="https://linkedin.com/in/evan-shareef/" target="_blank" class="footer-link">
                <i data-lucide="linkedin"></i> LinkedIn
            </a>
            <a href="mailto:evanshareef@gmail.com" class="footer-link">
                <i data-lucide="mail"></i> Contact
            </a>
            <a href="mailto:evanshareef@gmail.com" target="_blank" class="footer-link" style="color: #ffdd00;">
                <i data-lucide="coffee"></i> Buy me a coffee
            </a>
        </div>
    </footer>
    `;
}

function getDocStudioPageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>Advanced Document Studio</h1>
                <p style="color: var(--text-muted)">The ultimate workspace for creating professional documents using HTML, LaTeX, or Markdown.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="download-doc"><i data-lucide="download"></i> Download PDF</button>
            </div>
        </div>

        <div class="glass-card mb-6">
            <div style="display: flex; gap: 2rem; align-items: center;">
                <div class="form-group" style="flex: 1;">
                    <label>Editor Mode</label>
                    <select id="doc-mode">
                        <option value="markdown">Markdown (GitHub + LaTeX)</option>
                        <option value="html">Pure HTML</option>
                        <option value="latex">Pure LaTeX (KaTeX Rendering)</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="resume-grid">
            <div class="markdown-editor">
                 <textarea id="doc-editor" placeholder="Start typing your document..."></textarea>
            </div>
            
            <div class="preview-area">
                <div class="resume-preview-container" id="doc-preview">
                    <div id="doc-preview-render"></div>
                </div>
            </div>
        </div>
    </div>
    `;
}

// Navigation Events
document.addEventListener('click', (e) => {
    if (e.target.closest('.nav-item')) {
        const item = e.target.closest('.nav-item');
        e.preventDefault();
        const pageId = item.dataset.page;
        renderPage(pageId);
    }

    // Tabs
    if (e.target.classList.contains('tab')) {
        const tabId = e.target.dataset.tab;
        const parent = e.target.parentElement;
        parent.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');

        const form = parent.nextElementSibling;
        form.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none');
        document.getElementById(`tab-${tabId}`).style.display = 'block';
    }
});

// Init
renderPage('signature');
