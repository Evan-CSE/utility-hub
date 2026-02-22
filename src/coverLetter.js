import { marked } from 'marked';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import DOMPurify from 'dompurify';

export function initCoverLetterPage() {
    const editor = document.getElementById('cover-editor');
    const preview = document.getElementById('cover-preview-render');
    const downloadBtn = document.getElementById('download-cover');

    // Default template
    const defaultContent = `# Cover Letter

**To:** Hiring Manager
**Company:** Tech Innovations Inc.
**Date:** ${new Date().toLocaleDateString()}

Dear Hiring Manager,

I am writing to express my strong interest in the **Full Stack Developer** position at TECH INNOVATIONS INC., as advertised on LinkedIn. With a robust background in building scalable web applications and a deep passion for AI-driven solutions, I am confident that my skills and experiences align perfectly with the requirements of your team.

At my previous role, I successfully led the development of several cross-platform projects, focusing on high-performance architectures and seamless user experiences. I am particularly drawn to your company because of your commitment to pushing the boundaries of technology, and I am eager to contribute to your upcoming initiatives.

Thank you for your time and consideration. I look forward to the possibility of discussing how my background can benefit Tech Innovations Inc.

Sincerely,

**Hasibur Rahman (Evan)**
[LinkedIn](https://linkedin.com/in/evan-shareef/) | [Email](mailto:evanshareef@gmail.com)
`;

    if (!editor.value) {
        editor.value = defaultContent;
    }

    const render = () => {
        const rawHtml = marked.parse(editor.value);
        preview.innerHTML = DOMPurify.sanitize(rawHtml);
    };

    editor.addEventListener('input', render);
    render();

    downloadBtn.addEventListener('click', () => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const element = document.getElementById('cover-preview');

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
            doc.save('cover-letter.pdf');
        });
    });
}
