import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';

export function initDocStudioPage() {
    const editor = document.getElementById('doc-editor');
    const preview = document.getElementById('doc-preview-render');
    const modeSelect = document.getElementById('doc-mode');
    const downloadBtn = document.getElementById('download-doc');

    const defaultContent = {
        markdown: `# Professional Report\n\n## Overview\nThis is a sample document using **Markdown**.\n\n### Math\n$E = mc^2$\n\n## Table\n| Item | Value |\n|---|---|\n| Coffee | 10 |\n| Tea | 5 |`,
        html: `<div style="text-align: center;">\n  <h1 style="color: #6366f1;">HTML Document</h1>\n  <p>Standard <strong>HTML</strong> structure is supported.</p>\n  <ul style="list-style: none; padding: 0;">\n    <li>Modern</li>\n    <li>Responsive</li>\n    <li>Clean</li>\n  </ul>\n</div>`,
        latex: `\\section{Quantum Mechanics}\n\nThe wavefunction $\\psi(x,t)$ evolves according to the Schrödinger equation:\n\n$$ i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r}, t) = \\left[ -\\frac{\\hbar^2}{2m} \\nabla^2 + V(\\mathbf{r}, t) \\right] \\Psi(\\mathbf{r}, t) $$`
    };

    editor.value = defaultContent[modeSelect.value];

    const render = () => {
        const mode = modeSelect.value;
        const rawContent = editor.value;
        let renderedHtml = '';

        if (mode === 'markdown') {
            // Render LaTeX + Markdown
            let content = rawContent;
            content = content.replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
                try { return katex.renderToString(formula, { displayMode: true, throwOnError: false }); } catch (e) { return match; }
            });
            content = content.replace(/\$(.*?)\$/g, (match, formula) => {
                try { return katex.renderToString(formula, { displayMode: false, throwOnError: false }); } catch (e) { return match; }
            });
            renderedHtml = marked.parse(content);
        } else if (mode === 'html') {
            renderedHtml = rawContent;
        } else if (mode === 'latex') {
            // Pure LaTeX mode (assume everything is LaTeX or just render formulas)
            try {
                renderedHtml = katex.renderToString(rawContent, { displayMode: true, throwOnError: false });
            } catch (e) {
                renderedHtml = `<div style="color: red;">Error: ${e.message}</div>`;
            }
        }

        preview.innerHTML = DOMPurify.sanitize(renderedHtml);
    };

    modeSelect.addEventListener('change', () => {
        editor.value = defaultContent[modeSelect.value];
        render();
    });

    editor.addEventListener('input', render);
    render();

    downloadBtn.addEventListener('click', () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const element = document.getElementById('doc-preview');

        html2canvas(element, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('document.pdf');
        });
    });
}
