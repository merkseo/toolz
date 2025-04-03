document.addEventListener('DOMContentLoaded', () => {
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const resultImage = document.getElementById('resultImage');
    const convertBtn = document.getElementById('convertBtn');
    const clearBtn = document.getElementById('clearBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const uploadArea = document.querySelector('.upload-area');
    const previewArea = document.querySelector('.preview-area');
    const resultArea = document.querySelector('.result-area');

    let currentImage = null;

    // Handle drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-primary');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('border-primary');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-primary');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImage(file);
        }
    });

    // Handle file input
    imageInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleImage(file);
        }
    });

    // Handle image preview
    function handleImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            currentImage = e.target.result;
            imagePreview.src = currentImage;
            previewArea.classList.remove('d-none');
            resultArea.classList.add('d-none');
        };
        reader.readAsDataURL(file);
    }

    // Convert to PNG
    convertBtn.addEventListener('click', () => {
        if (!currentImage) return;

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convert to PNG
            const pngData = canvas.toDataURL('image/png');
            resultImage.src = pngData;
            
            // Set download link
            downloadBtn.href = pngData;
            downloadBtn.download = 'converted-image.png';

            // Show result area
            resultArea.classList.remove('d-none');
        };
        img.src = currentImage;
    });

    // Clear everything
    clearBtn.addEventListener('click', () => {
        currentImage = null;
        imagePreview.src = '';
        resultImage.src = '';
        imageInput.value = '';
        previewArea.classList.add('d-none');
        resultArea.classList.add('d-none');
    });
}); 