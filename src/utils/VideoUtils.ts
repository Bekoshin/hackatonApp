import ImagePicker, {ImagePickerOptions, ImagePickerResponse} from "react-native-image-picker";

export const createVideo = async (): Promise<ImagePickerResponse | undefined> => {
  const options: ImagePickerOptions = {
    title: '',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    mediaType: 'video',
    takePhotoButtonTitle: 'Снять видео',
    chooseFromLibraryButtonTitle: 'Выбрать из галереи',
    cancelButtonTitle: 'Отмена',
  };

  return new Promise(resolve => {
    ImagePicker.showImagePicker(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
        resolve();
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
        resolve();
      } else {
        resolve(response);
      }
    })
  });
};
