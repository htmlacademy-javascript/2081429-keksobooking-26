const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarUploadElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPeviewElement = document.querySelector('.ad-form-header__preview');
const rentalAdPhotoUploadElement = document.querySelector('.ad-form__upload input[type=file');
const rentalAdPhotoPreviewElement = document.querySelector('.ad-form__photo');


avatarUploadElement.addEventListener('change', () => {
  const avatar = avatarUploadElement.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = IMAGE_TYPES.some((item) => avatarName.endsWith(item));
  if (matches) {
    avatarPeviewElement.children[0].src = URL.createObjectURL(avatar);
  }
});

rentalAdPhotoUploadElement.addEventListener('change', () => {
  const photo = rentalAdPhotoUploadElement.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = IMAGE_TYPES.some((item) => photoName.endsWith(item));
  if (matches) {
    const newPhotoElement = document.createElement('img');
    newPhotoElement.src = URL.createObjectURL(photo);
    rentalAdPhotoPreviewElement.appendChild(newPhotoElement);
  }
});
