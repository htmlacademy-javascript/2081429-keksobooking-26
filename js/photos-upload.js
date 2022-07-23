const IMAGE_TYPES = ['jpg', 'jpeg', 'png'];

const avatarUploadElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview');
const rentalAdPhotoUploadElement = document.querySelector('.ad-form__upload input[type=file]');
const rentalAdPhotoPreviewElement = document.querySelector('.ad-form__photo img');

const onAvatarClick = () => {
  const avatar = avatarUploadElement.files[0];
  const avatarName = avatar.name.toLowerCase();

  const matches = IMAGE_TYPES.some((item) => avatarName.endsWith(item));
  if (matches) {
    avatarPreviewElement.children[0].src = URL.createObjectURL(avatar);
  }
};

const onRentalAdPhotoClick = () => {
  const photo = rentalAdPhotoUploadElement.files[0];
  const photoName = photo.name.toLowerCase();

  const matches = IMAGE_TYPES.some((item) => photoName.endsWith(item));
  if (matches) {
    rentalAdPhotoPreviewElement.src = URL.createObjectURL(photo);
  }
};

const loadPhotosIntoFrom = () => {
  avatarUploadElement.addEventListener('change', onAvatarClick);

  rentalAdPhotoUploadElement.addEventListener('change', onRentalAdPhotoClick);
};

const resetUploadPhotos = () => {
  avatarPreviewElement.children[0].src = 'img/muffin-grey.svg';
  rentalAdPhotoPreviewElement.src = 'img/muffin-grey.svg';
};
export {loadPhotosIntoFrom, resetUploadPhotos};
