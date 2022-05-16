import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Button,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";

import { launchImageLibrary, launchCamera } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import ImagePicker from "react-native-image-crop-picker";

export const ImageCompressDevstree = async (
  width = "default",
  height = "default",
  compressFormat = "JPEG",
  quality = 50,
  multipal = false,
  cropImage = false,
  video = false
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
    selectionLimit: multipal ? 3 : 1,
    mediaType: video ? "video" : "photo",
  };
  const responseImage = await launchImageLibrary(options);
  if (responseImage.didCancel) {
    return responseImage;
  } else if (responseImage.errorMessage) {
    return responseImage;
  } else if (responseImage.customButton) {
    return responseImage;
  } else if (responseImage.errorCode) {
    return responseImage;
  } else {
    var source = responseImage;

    if (cropImage && !video) {
      if (source["assets"].length > 1 && multipal) {
        var CropImageMultiTempList = [];

        for (const file of responseImage["assets"]) {
          try {
            const imageCropActionData = await ImagePicker.openCropper({
              path: file.uri,
              multiple: true,
              width: width == "default" ? source["assets"][0].width : width,
              height: height == "default" ? source["assets"][0].width : height,
            });

            const responseImageCompress = await ImageResizer.createResizedImage(
              imageCropActionData.path,
              width == "default" ? source["assets"][0].width : width,
              height == "default" ? source["assets"][0].width : height,
              compressFormat,
              quality,
              0,
              null
            );
            CropImageMultiTempList.push(responseImageCompress);
          } catch (e) {
            return e;
          }
        }
        return CropImageMultiTempList;
      } else {
        try {
          const imageCropActionData = await ImagePicker.openCropper({
            path: responseImage["assets"][0].uri,
            multiple: true,
            width: width == "default" ? source["assets"][0].width : width,
            height: height == "default" ? source["assets"][0].width : height,
          });

          const responseImageCompress = await ImageResizer.createResizedImage(
            imageCropActionData.path,
            width == "default" ? source["assets"][0].width : width,
            height == "default" ? source["assets"][0].width : height,
            compressFormat,
            quality,
            0,
            null
          );

          responseImageCompress["oldSize"] = source["assets"][0].fileSize;
          return responseImageCompress;
        } catch (e) {
          return e;
        }
      }
    } else {
      if (video) {
        if (multipal && source["assets"].length > 1) {
          let returnListVideo = [];

          for (const file of responseImage["assets"]) {
            returnListVideo.push({
              height: file.height ? file.height : "",
              name: file.fileName ? file.fileName : "",
              oldSize: file.fileSize ? file.fileSize : "",
              uri: file.uri ? file.uri : "",
              width: file.width ? file.width : "",
            });
          }

          return returnListVideo;
        }
        return {
          height: source["assets"][0].height,
          name: source["assets"][0].fileName,
          oldSize: source["assets"][0].fileSize,
          uri: source["assets"][0].uri,
          width: source["assets"][0].width,
        };
      } else if (source["assets"].length > 1 && multipal) {
        var CropImageMultiTempList = [];

        for (const file of responseImage["assets"]) {
          try {
            const responseImageCompress = await ImageResizer.createResizedImage(
              file.uri,
              width == "default" ? source["assets"][0].width : width,
              height == "default" ? source["assets"][0].width : height,
              compressFormat,
              quality,
              0,
              null
            );
            CropImageMultiTempList.push(responseImageCompress);
          } catch (e) {
            return e;
          }
        }
        return CropImageMultiTempList;
      } else {
        try {
          const responseImageCompress = await ImageResizer.createResizedImage(
            responseImage["assets"][0].uri,
            width == "default" ? source["assets"][0].width : width,
            height == "default" ? source["assets"][0].width : height,
            compressFormat,
            quality,
            0,
            null
          );

          responseImageCompress["oldSize"] = source["assets"][0].fileSize;
          return responseImageCompress;
        } catch (e) {
          return e;
        }
      }
    }
  }
};

export const PhotoCameraCompress = async (
  width = "default",
  height = "default",
  compressFormat = "JPEG",
  quality = 50,
  cropImage = false,
  video = false
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

  try {
    const responseImage = await launchCamera({
      mediaType: video ? "video" : "photo",
    });
    if (responseImage.didCancel) {
      return responseImage;
    } else if (responseImage.errorMessage) {
      return responseImage;
    } else if (responseImage.customButton) {
      return responseImage;
    } else if (responseImage.errorCode) {
      return responseImage;
    } else {
      console.log(responseImage, "weee");
      let source = responseImage;
      if (cropImage && !video) {
        try {
          const imageCropActionData = await ImagePicker.openCropper({
            path: responseImage["assets"][0].uri,
            width: width == "default" ? source["assets"][0].width : width,
            height: height == "default" ? source["assets"][0].width : height,
          });

          const responseImageCompress = await ImageResizer.createResizedImage(
            imageCropActionData.path,
            width == "default" ? source["assets"][0].width : width,
            height == "default" ? source["assets"][0].width : height,
            compressFormat,
            quality,
            0,
            null
          );

          responseImageCompress["oldSize"] = source["assets"][0].fileSize;
          return responseImageCompress;
        } catch (e) {
          return e;
        }
      } else if (video) {
        return {
          height: source["assets"][0].height,
          name: source["assets"][0].fileName,
          oldSize: source["assets"][0].fileSize,
          uri: source["assets"][0].uri,
          width: source["assets"][0].width,
        };
      } else {
        try {
          const responseImageCompress = await ImageResizer.createResizedImage(
            responseImage["assets"][0].uri,
            width == "default" ? source["assets"][0].width : width,
            height == "default" ? source["assets"][0].width : height,
            compressFormat,
            quality,
            0,
            null
          );

          responseImageCompress["oldSize"] = source["assets"][0].fileSize;
          return responseImageCompress;
        } catch (e) {
          return e;
        }
      }
    }
  } catch (e) {
    return e;
  }
};

export const CustomImagePickerModal = ({
  imageSelectionOrCameraResponse,
  ContainerStyle = {},
  ContainerTextStyle = {},
  modalTitle = "Image picker",
  SelectionButtonText = "select Image",
  imageCompressValue = {},
  typeSelection = "both",
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const chooseImageFromGallery = () => {
    setModalVisible(false);
    ImageCompressDevstree(
      imageCompressValue.width ? imageCompressValue.width : "default",
      imageCompressValue.height ? imageCompressValue.height : "default",
      imageCompressValue.compressFormat
        ? imageCompressValue.compressFormat
        : "JPEG",
      imageCompressValue.quality ? imageCompressValue.quality : 100,
      imageCompressValue.multipal ? imageCompressValue.multipal : false,
      imageCompressValue.manualCrop ? imageCompressValue.manualCrop : false,
      imageCompressValue.video ? imageCompressValue.video : false
    ).then((data) => {
      imageSelectionOrCameraResponse(data);
    });
  };

  const openCameraForImage = () => {
    setModalVisible(false);
    PhotoCameraCompress(
      imageCompressValue.width ? imageCompressValue.width : "default",
      imageCompressValue.height ? imageCompressValue.height : "default",
      imageCompressValue.compressFormat
        ? imageCompressValue.compressFormat
        : "JPEG",
      imageCompressValue.quality ? imageCompressValue.quality : 100,
      imageCompressValue.manualCrop ? imageCompressValue.manualCrop : false,
      imageCompressValue.video ? imageCompressValue.video : false
    ).then((data) => {
      imageSelectionOrCameraResponse(data);
    });
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[
          {
            backgroundColor: "blue",
          },
          ContainerStyle,
        ]}
      >
        <Text style={[{ color: "#ffffff" }, ContainerTextStyle]}>
          {SelectionButtonText ? SelectionButtonText : ""}
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onPressOverlay={() => setModalVisible(!modalVisible)}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalComponentWrapper}>
            <View>
              <View style={[styles.ImageSelectionModalTitleText]}>
                <Text style={styles.ModalTitleText}>{modalTitle}</Text>
              </View>
              {typeSelection == "both" || typeSelection == "gallery" ? (
                <Pressable
                  style={[
                    styles.galleryImageButton,
                    typeSelection == "gallery"
                      ? {
                          borderBottomLeftRadius: 7,
                          borderBottomRightRadius: 7,
                        }
                      : {},
                  ]}
                  onPress={chooseImageFromGallery}
                >
                  <Text style={styles.galleryImageText}>Gallery</Text>
                </Pressable>
              ) : null}
              {typeSelection == "both" || typeSelection == "camera" ? (
                <Pressable
                  style={styles.cameraImageContainer}
                  onPress={openCameraForImage}
                >
                  <Text style={styles.galleryImageText}>
                    {imageCompressValue.video ? "Video" : "Camera"}
                  </Text>
                </Pressable>
              ) : null}
            </View>
            <Pressable
              style={styles.cancelButtonContainer}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.galleryImageText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  modalComponentWrapper: {
    width: Dimensions.get("window").width,
    margin: 10,
    alignItems: "center",
  },
  ImageSelectionModalTitleText: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    elevation: 2,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width - 20,
    paddingTop: 12,
    paddingBottom: 20,
    borderBottomWidth: 0.45,
    borderColor: "#cccaca",
  },
  ModalTitleText: {
    textAlign: "center",
    fontSize: 15,
    color: "#808080",
  },
  galleryImageButton: {
    elevation: 2,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width - 20,
    paddingVertical: 10,
    borderBottomWidth: 0.6,
    borderColor: "#cccaca",
  },
  galleryImageText: {
    color: "#1262db",
    textAlign: "center",
    fontSize: 20,
  },
  cameraImageContainer: {
    elevation: 2,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width - 20,
    paddingVertical: 10,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
  },
  cancelButtonContainer: {
    borderRadius: 7,
    elevation: 2,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("window").width - 20,
    paddingVertical: 10,
  },
});
