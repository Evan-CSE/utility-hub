import './style.css';
import { createIcons, Mail, Phone, MapPin, Globe, Linkedin, Github, Type, Layout, Image as ImageIcon, Download, Plus, Trash2, RotateCcw, Maximize, Share2, QrCode, Coffee, FileText, Code } from 'lucide';
import { initSignaturePage } from './signature.js';
import { initImagePage } from './imageTools.js';
import { initResumePage } from './resume.js';
import { initCoverLetterPage } from './coverLetter.js';
import { initDocStudioPage } from './docStudio.js';

// Central State
const state = {
    currentPage: 'dashboard',
};

// Router
function renderPage(pageId) {
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '';

    if (pageId === 'dashboard') {
        mainContent.innerHTML = getDashboardHTML();
    } else if (pageId === 'signature') {
        mainContent.innerHTML = getSignaturePageHTML();
        initSignaturePage();
    } else if (pageId === 'image') {
        mainContent.innerHTML = getImagePageHTML();
        initImagePage();
    } else if (pageId === 'resume') {
        mainContent.innerHTML = getResumePageHTML();
        initResumePage();
    } else if (pageId === 'cover') {
        mainContent.innerHTML = getCoverLetterPageHTML();
        initCoverLetterPage();
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

function getDashboardHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row" style="text-align: center; display: block; margin-bottom: 4rem;">
            <h1 style="font-size: 3rem; margin-bottom: 1rem;">Free Online Email Signature Generator & AI Resume Builder</h1>
            <p style="font-size: 1.2rem; color: var(--text-muted); max-width: 800px; margin: 0 auto;">
                The ultimate all-in-one platform for professional branding, technical documentation, and web asset optimization. 
                Free, privacy-focused, and high-performance.
            </p>
        </div>

        <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 2rem;">
            <!-- Signature Tool Card -->
            <div class="glass-card hover-lift cursor-pointer" onclick="document.querySelector('[data-page=signature]').click()" style="padding: 2rem;">
                <div style="background: rgba(99, 102, 241, 0.1); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                    <i data-lucide="type" style="color: var(--primary); width: 32px; height: 32px;"></i>
                </div>
                <h3>Email Signature Generator</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    Create professional, mobile-responsive email signatures for Gmail, Outlook, and Apple Mail. Includes QR codes, social icons, and premium themes.
                </p>
                <span style="color: var(--primary); font-weight: 600;">Launch Tool &rarr;</span>
            </div>

            <!-- Resume Tool Card -->
            <div class="glass-card hover-lift cursor-pointer" onclick="document.querySelector('[data-page=resume]').click()" style="padding: 2rem;">
                <div style="background: rgba(16, 185, 129, 0.1); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                    <i data-lucide="file-text" style="color: #10b981; width: 32px; height: 32px;"></i>
                </div>
                <h3>ATS Resume Builder</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    Build technical, search-optimized resumes using Markdown and LaTeX. 100% ATS-friendly layouts designed to help you land your dream job.
                </p>
                <span style="color: #10b981; font-weight: 600;">Launch Tool &rarr;</span>
            </div>

            <!-- Cover Letter Tool Card -->
            <div class="glass-card hover-lift cursor-pointer" onclick="document.querySelector('[data-page=cover]').click()" style="padding: 2rem;">
                <div style="background: rgba(245, 158, 11, 0.1); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                    <i data-lucide="mail" style="color: #f59e0b; width: 32px; height: 32px;"></i>
                </div>
                <h3>Cover Letter Generator</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    Draft compelling, personalized cover letters in minutes. Match your resume's professional style and stand out to hiring managers.
                </p>
                <span style="color: #f59e0b; font-weight: 600;">Launch Tool &rarr;</span>
            </div>

            <!-- Image Tool Card -->
            <div class="glass-card hover-lift cursor-pointer" onclick="document.querySelector('[data-page=image]').click()" style="padding: 2rem;">
                <div style="background: rgba(236, 72, 153, 0.1); width: 60px; height: 60px; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 1.5rem;">
                    <i data-lucide="image" style="color: #ec4899; width: 32px; height: 32px;"></i>
                </div>
                <h3>Image Resizer & Rotator</h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem;">
                    High-resolution image scaling, rotation, and compression. Processor images locally in your browser for maximum privacy and speed.
                </p>
                <span style="color: #ec4899; font-weight: 600;">Launch Tool &rarr;</span>
            </div>
        </div>

        <section class="glass-card mt-12 animate-fade" style="padding: 3rem; margin-top: 4rem;">
            <div style="text-align: center; margin-bottom: 3rem;">
                <h2>Why Professionals Choose UtilityHub?</h2>
                <p style="color: var(--text-muted);">The best free online tools for developers, designers, and career-driven professionals.</p>
            </div>

            <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 3rem;">
                <div>
                    <h4>Privacy First & Global Reach</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">All computations happen locally in your browser. We never see, store, or transmit your personal data or uploaded files. Trusted by thousands for professional branding.</p>
                </div>
                <div>
                    <h4>Advanced Document Automation</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">Built for professionals who value precision. Support for Markdown, LaTeX, and high-res asset exporting ensures your resumes and cover letters are always elite.</p>
                </div>
                <div>
                    <h4>Free & Open Access</h4>
                    <p style="font-size: 0.9rem; color: var(--text-muted);">No subscriptions, no watermarks, and no hidden fees. High-quality professional tools like our <strong>ATS Resume Maker</strong> and <strong>Email Signature Tool</strong> are available to everyone.</p>
                </div>
            </div>
        </section>

        <section class="mt-12" style="margin-top: 4rem;">
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2>Frequently Asked Questions</h2>
            </div>
            <div class="glass-card" style="padding: 2rem;">
                <div style="margin-bottom: 1.5rem;">
                    <h5 style="color: var(--primary);">Is UtilityHub really free for everyone?</h5>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Yes, every tool on UtilityHub is completely free to use. We don't require registration or payment for any feature, including PDF exports and high-res image processing.</p>
                </div>
                <div style="margin-bottom: 1.5rem;">
                    <h5 style="color: var(--primary);">How do I use the ATS Resume Builder?</h5>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Simply navigate to the Resume Builder, type your content using Markdown (with LaTeX for math), and click 'Download PDF'. The generated structure is optimized for Applicant Tracking Systems.</p>
                </div>
                <div>
                    <h5 style="color: var(--primary);">Can I use the Email Signature in Outlook?</h5>
                    <p style="color: var(--text-muted); font-size: 0.95rem;">Absolutely. Once you generate your signature, you can copy the HTML or use the 'Copy for Gmail' option which works with most modern email clients including Outlook and Apple Mail.</p>
                </div>
            </div>
        </section>
    </div>
    `;
}

function getSignaturePageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>Free Online Email Signature Generator</h1>
                <p style="color: var(--text-muted)">Create high-impact, professional email signatures that boost your professional presence.</p>
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

        <section class="glass-card mt-8 animate-fade" style="margin-top: 3rem; padding: 2rem;">
            <h2>Free Professional Digital Signature Generator</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">
                In today's digital world, your email signature is your digital business card. UtilityHub’s <strong>free online email signature generator</strong> allows you to create high-impact, professional signatures that leave a lasting impression. Whether you are a freelancer, a small business owner, or a corporate executive, our tool provides the flexibility and design excellence needed to boost your professional presence.
            </p>

            <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3>Why use a Digital Signature?</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        A professional signature increases brand awareness, provides essential contact information, and establishes trust with your recipients. Our generator includes options for <strong>QR codes</strong>, social media icons, and custom branding to ensure you stand out in every inbox.
                    </p>
                </div>
                <div>
                    <h3>Mobile Responsive Designs</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        All our signature templates are built to be <strong>mobile-responsive</strong>. This means your signature will look perfect whether your recipient is viewing it on a desktop, tablet, or smartphone.
                    </p>
                </div>
            </div>

            <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.1);">

            <div class="faq-section">
                <h2>Frequently Asked Questions (FAQ)</h2>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Is this email signature generator really free?</h3>
                    <p style="color: var(--text-muted);">Yes, UtilityHub's signature generator is 100% free to use with no hidden costs or subscriptions.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">How do I add a QR code to my signature?</h3>
                    <p style="color: var(--text-muted);">Simply go to the 'Social' tab, enter your website or portfolio link in the 'External QR Link' field, and then enable it in the 'Style' tab.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Does it work with Outlook and Apple Mail?</h3>
                    <p style="color: var(--text-muted);">Yes! By using the 'Copy for Gmail' or 'Copy HTML' options, you can paste your signature into almost any email client, including Outlook, Apple Mail, and Yahoo.</p>
                </div>
            </div>
        </section>

        <section class="glass-card animate-fade" style="margin-top: 2rem;">
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
                <h1>Free Online Image Resizer & Photo Rotator</h1>
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

        <section class="glass-card mt-8 animate-fade" style="padding: 2rem; margin-top: 3rem;">
            <h2>Free Online Image Resizer & Optimizer</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">
                Looking for a <strong>free online image resizer</strong> that doesn't sacrifice quality? UtilityHub's high-resolution image utility is designed for developers, designers, and social media managers who need fast, robust image manipulation. Resize, rotate, and optimize your images for web performance in seconds.
            </p>

            <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3>Why Optimize Your Images?</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Optimizing images is crucial for website speed and <strong>SEO rankings</strong>. Larger files slow down your site, negatively impacting user experience and search engine placement. Our tool allows you to scale images to exact dimensions, reducing file size while maintaining visual clarity.
                    </p>
                </div>
                <div>
                    <h3>Bulk Image Editing Workflows</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Whether you need to rotate a batch of photos or resize assets for a new UI project, UtilityHub provides a clean, <strong>privacy-focused</strong> workspace. All processing happens locally in your browser—your data never leaves your device.
                    </p>
                </div>
            </div>

            <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.1);">

            <div class="faq-section">
                <h2>Image Utility FAQ</h2>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Does resizing reduce image quality?</h3>
                    <p style="color: var(--text-muted);">Our tool uses high-quality canvas rendering to ensure that your images remain as sharp as possible when scaling down.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">What file formats do you support?</h3>
                    <p style="color: var(--text-muted);">We currently support <strong>PNG and JPEG</strong> formats for both upload and export, which are the industry standards for web usage.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Is there a file size limit?</h3>
                    <p style="color: var(--text-muted);">Since all processing is done in your browser, the limit depends on your device's memory. Most standard high-res photos resize perfectly.</p>
                </div>
            </div>
        </section>
    </div>
    `;
}

function getResumePageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>Free Online ATS Resume & CV Builder</h1>
                <p style="color: var(--text-muted)">Craft professional, ATS-friendly resumes with Markdown and LaTeX support. Perfect for job seekers.</p>
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

        <section class="glass-card mt-8 animate-fade" style="padding: 2rem; margin-top: 3rem;">
            <h2>Best Free AI Resume Builder & ATS Resume Maker</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">
                Craft a standout CV with UtilityHub's <strong>free online resume builder</strong>. Our platform is designed to help job seekers create <strong>ATS-friendly resumes</strong> that pass through applicant tracking systems with ease. Using Markdown and LaTeX, you can build a professional document that is both visually stunning and technically sound.
            </p>

            <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3>Markdown & LaTeX Support</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Standard word processors often break formatting. By using <strong>Markdown</strong>, you ensure consistent structure. Our integrated <strong>LaTeX</strong> support allows you to add complex mathematical formulas and technical notation, making it the perfect choice for developers and scientists.
                    </p>
                </div>
                <div>
                    <h3>High-Resolution PDF Export</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Export your resume as a clean, high-resolution PDF. Unlike other builders, we don't add watermarks. You get a professional A4 document ready for your next big application.
                    </p>
                </div>
            </div>

            <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.1);">

            <div class="faq-section">
                <h2>Resume Builder FAQ</h2>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">What is an ATS-friendly resume?</h3>
                    <p style="color: var(--text-muted);">An ATS-friendly resume is formatted in a way that Applicant Tracking Systems (ATS) can easily parse. Our tool uses clean structures that help your resume get noticed by recruiters.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Can I use custom fonts or styles?</h3>
                    <p style="color: var(--text-muted);">You can use standard Markdown syntax for bold, italics, and headers. Our templates are pre-styled for a premium, professional look.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Is my data safe?</h3>
                    <p style="color: var(--text-muted);">Absolutely. UtilityHub is a client-side application. Your resume data stays in your browser and is never stored on our servers.</p>
                </div>
            </div>
        </section>
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

function getCoverLetterPageHTML() {
    return `
    <div class="container animate-fade">
        <div class="header-row">
            <div>
                <h1>Free Online Professional Cover Letter Generator</h1>
                <p style="color: var(--text-muted)">Create compelling, personalized cover letters that match your professional brand.</p>
            </div>
            <div style="display: flex; gap: 10px;">
                <button class="btn btn-primary" id="download-cover"><i data-lucide="download"></i> Download PDF</button>
            </div>
        </div>

        <div class="resume-grid">
            <div class="markdown-editor">
                 <div style="display: flex; justify-content: space-between; align-items: center;">
                    <label>Cover Letter Editor</label>
                    <div style="font-size: 11px; color: var(--text-muted)">Supports GitHub Flavored Markdown</div>
                 </div>
                 <textarea id="cover-editor" placeholder="Start typing your cover letter..."></textarea>
            </div>
            
            <div class="preview-area">
                <label>Live Preview</label>
                <div class="resume-preview-container" id="cover-preview">
                    <div id="cover-preview-render"></div>
                </div>
            </div>
        </div>

        <section class="glass-card mt-8 animate-fade" style="padding: 2rem; margin-top: 3rem;">
            <h2>Why Use Our Free Cover Letter Generator?</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">
                A well-written cover letter is your chance to tell your story and explain why you're the perfect fit for a job. Our <strong>Free Online Cover Letter Generator</strong> helps you draft professional letters that are formatted for success.
            </p>

            <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3>Professional Branding</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Keep your branding consistent across your resume and cover letter. Use our Markdown editor to ensure clean, structured text that looks great on any screen.
                    </p>
                </div>
                <div>
                    <h3>Instant PDF Export</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Just like our <strong>ATS Resume Builder</strong>, our cover letter tool allows for high-resolution PDF export, ensuring your documents are ready to send to recruiters immediately.
                    </p>
                </div>
            </div>
        </section>
    </div>
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

        <section class="glass-card mt-8 animate-fade" style="padding: 2rem; margin-top: 3rem;">
            <h2>The Ultimate Online Document Studio</h2>
            <p style="color: var(--text-muted); margin-bottom: 2rem;">
                UtilityHub's <strong>Document Studio</strong> is a versatile workspace for developers, writers, and students. Whether you're drafting a project proposal in <strong>Pure HTML</strong>, a research paper in <strong>LaTeX</strong>, or a simple guide in <strong>Markdown</strong>, our tool provides a seamless live-preview experience.
            </p>

            <div class="seo-content-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div>
                    <h3>Professional Markdown & LaTeX Workflows</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        Combine the simplicity of Markdown with the power of LaTeX. Our studio is optimized for generating high-quality documentation that meets professional standards.
                    </p>
                </div>
                <div>
                    <h3>Live Real-Time Preview</h3>
                    <p style="color: var(--text-muted); font-size: 0.9rem;">
                        See your changes instantly as you type. The Document Studio eliminates the "compile-wait-check" cycle, significantly boosting your productivity.
                    </p>
                </div>
            </div>

            <hr style="margin: 3rem 0; border-color: rgba(255,255,255,0.1);">

            <div class="faq-section">
                <h2>Document Studio FAQ</h2>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Can I export my documents?</h3>
                    <p style="color: var(--text-muted);">Yes, you can export your creations directly to high-quality PDF format for sharing or printing.</p>
                </div>
                <div class="faq-item" style="margin-bottom: 1.5rem;">
                    <h3 style="font-size: 1.1rem; color: var(--primary);">Which LaTeX environments are supported?</h3>
                    <p style="color: var(--text-muted);">We use KaTeX, which supports a wide range of math environments and symbols for mathematical typesetting.</p>
                </div>
            </div>
        </section>
    </div>
    `;
}

// Navigation Events
document.addEventListener('click', (e) => {
    if (e.target.closest('.logo')) {
        renderPage('dashboard');
        return;
    }

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
renderPage('dashboard');
