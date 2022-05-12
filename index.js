import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";

const RnImageSelectCompress = async (
  width = 0,
  height = 0,
  compressFormat = "JPEG",
  quality = 100
) => {
  let options = {
    title: "Select Image",
    customButtons: [
      {
        name: "customOptionKey",
        title: "Choose Photo from Custom Option",
      },
    ],
    storageOptions: {
      skipBackup: true,
      path: "images",
    },
  };
  const responseImage = await launchImageLibrary(options);
  if (responseImage.didCancel) {
    return responseImage.didCancel;
  } else if (responseImage.error) {
    return responseImage.error;
  } else if (responseImage.customButton) {
    return responseImage.customButton;
  } else {
    let source = responseImage;
    const responseImageCompress = await ImageResizer.createResizedImage(
      source["assets"][0].uri,
      width == 0 ? source["assets"][0].width : width,
      height == 0 ? source["assets"][0].width : height,
      compressFormat,
      quality,
      0,
      null
    );

    responseImageCompress["oldSize"] = source["assets"][0].fileSize;
    return responseImageCompress;
  }
};

export default RnImageSelectCompress;
