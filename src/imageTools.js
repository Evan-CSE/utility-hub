export function initImagePage() {
    const dropZone = document.getElementById('image-upload-area');
    const fileInput = document.getElementById('tool-image-input');
    const editorArea = document.getElementById('editor-area');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const widthInput = document.getElementById('img-width');
    const heightInput = document.getElementById('img-height');
    const aspectRatioLock = document.getElementById('aspect-ratio');

    let originalImage = null;
    let currentRotation = 0;
    let currentWidth = 0;
    let currentHeight = 0;

    // Upload Handling
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary)';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--border)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleImage(file);
    });

    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) handleImage(file);
    });

    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            originalImage = new Image();
            originalImage.onload = () => {
                currentWidth = originalImage.width;
                currentHeight = originalImage.height;
                widthInput.value = currentWidth;
                heightInput.value = currentHeight;
                currentRotation = 0;

                dropZone.style.display = 'none';
                editorArea.style.display = 'block';
                drawCanvas();
            };
            originalImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    function drawCanvas() {
        if (!originalImage) return;

        // Calculate size based on rotation
        let w = currentWidth;
        let h = currentHeight;

        if (currentRotation % 180 !== 0) {
            w = currentHeight;
            h = currentWidth;
        }

        canvas.width = w;
        canvas.height = h;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();

        // Move origin to center
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate((currentRotation * Math.PI) / 180);

        // Draw image (scaled to currentWidth/Height)
        ctx.drawImage(originalImage, -currentWidth / 2, -currentHeight / 2, currentWidth, currentHeight);

        ctx.restore();
    }

    // Resize Logic
    widthInput.addEventListener('input', () => {
        if (aspectRatioLock.checked && originalImage) {
            const ratio = originalImage.height / originalImage.width;
            currentHeight = Math.round(widthInput.value * ratio);
            heightInput.value = currentHeight;
        }
        currentWidth = parseInt(widthInput.value);
        drawCanvas();
    });

    heightInput.addEventListener('input', () => {
        if (aspectRatioLock.checked && originalImage) {
            const ratio = originalImage.width / originalImage.height;
            currentWidth = Math.round(heightInput.value * ratio);
            widthInput.value = currentWidth;
        }
        currentHeight = parseInt(heightInput.value);
        drawCanvas();
    });

    // Rotation
    document.getElementById('rotate-left').addEventListener('click', () => {
        currentRotation = (currentRotation - 90) % 360;
        drawCanvas();
    });

    document.getElementById('rotate-right').addEventListener('click', () => {
        currentRotation = (currentRotation + 90) % 360;
        drawCanvas();
    });

    // Reset
    document.getElementById('reset-img').addEventListener('click', () => {
        currentWidth = originalImage.width;
        currentHeight = originalImage.height;
        widthInput.value = currentWidth;
        heightInput.value = currentHeight;
        currentRotation = 0;
        drawCanvas();
    });

    // Download
    document.getElementById('download-result').addEventListener('click', () => {
        const format = document.getElementById('export-format').value;
        const link = document.createElement('a');
        link.download = `edited-image.${format === 'image/png' ? 'png' : 'jpg'}`;
        link.href = canvas.toDataURL(format, 0.9);
        link.click();
    });
}
