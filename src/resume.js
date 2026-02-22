import { marked } from 'marked';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';

export function initResumePage() {
    const editor = document.getElementById('resume-editor');
    const preview = document.getElementById('resume-preview-render');
    const downloadBtn = document.getElementById('download-resume');

    // Default template
    const defaultContent = `# Hasibur Rahman (Evan)
**Full Stack Developer**

[LinkedIn](https://linkedin.com/in/evan-shareef/) | [Email](mailto:evanshareef@gmail.com)

## Summary
Experienced developer specializing in modern web technologies and AI integration.

## Skills
- **Frontend**: React, Next.js, TailWind CSS
- **Backend**: Node.js, Python, Go
- **Tools**: Docker, Git, LaTeX

## Education
### Bachelor of Science in Computer Science
*University Name*, 2020 - 2024

## Math Examples (LaTeX)
Equation: $E = mc^2$

Quadratic Formula:
$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$
`;

    if (!editor.value) {
        editor.value = defaultContent;
    }

    const render = () => {
        let content = editor.value;

        // Render LaTeX before Markdown
        // Block math $$ ... $$
        content = content.replace(/\$\$(.*?)\$\$/gs, (match, formula) => {
            try {
                return katex.renderToString(formula, { displayMode: true, throwOnError: false });
            } catch (e) { return match; }
        });

        // Inline math $ ... $
        content = content.replace(/\$(.*?)\$/g, (match, formula) => {
            try {
                return katex.renderToString(formula, { displayMode: false, throwOnError: false });
            } catch (e) { return match; }
        });

        const rawHtml = marked.parse(content);
        preview.innerHTML = DOMPurify.sanitize(rawHtml);
    };

    editor.addEventListener('input', render);
    render();

    downloadBtn.addEventListener('click', () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const element = document.getElementById('resume-preview');

        html2canvas(element, {
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#ffffff'
        }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            doc.save('resume.pdf');
        });
    });
}
