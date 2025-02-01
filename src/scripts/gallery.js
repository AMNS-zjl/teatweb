document.addEventListener('DOMContentLoaded', () => {
    loadImages();
    showImage(currentImageIndex);
});

const images = JSON.parse(localStorage.getItem('images')) || [];
let currentImageIndex = 0;

function showImage(index) {
    const galleryImage = document.getElementById('galleryImage');
    if (images.length > 0) {
        galleryImage.src = images[index];
    } else {
        galleryImage.src = '';
    }
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    showImage(currentImageIndex);
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

function uploadImage(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            images.push(e.target.result);
            localStorage.setItem('images', JSON.stringify(images));
            currentImageIndex = images.length - 1;
            showImage(currentImageIndex);
        };
        reader.readAsDataURL(file);
    }
}

function loadImages() {
    const savedImages = JSON.parse(localStorage.getItem('images'));
    if (savedImages && savedImages.length > 0) {
        images.push(...savedImages);
    }
}