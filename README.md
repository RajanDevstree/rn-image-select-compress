# rn-image-select-compress

# Install

### Before installing rn-image-select-compress you need to install [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker) and [react-native-image-resizer](https://github.com/bamlab/react-native-image-resizer) and [react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)

```
npm i react-native-image-picker react-native-image-resizer react-native-image-crop-picker rn-image-select-compress
```

In android no need any permission in AndroidManifest.xml but ios If you are allowing user to select image/video from photos, add `NSPhotoLibraryUsageDescription`. If you are allowing user to capture image add `NSCameraUsageDescription` key also. If you are allowing user to capture video add `NSCameraUsageDescription` add `NSMicrophoneUsageDescription` key also.

## Props

### imageCompressValue Object Props

| key            | default   | value                                        |
| -------------- | --------- | -------------------------------------------- |
| width          | 'default' | 'default' or ImageWidth (400,500,600,etc..)  |
| height         | 'default  | 'default' or ImageHeight (400,500,600,etc..) |
| compressFormat | 'JPEG'    | 'JPEG' or 'PNG'                              |
| quality        | 100       | 0 to 100                                     |
| multipal       | false     | true or false                                |
| manualCrop     | false     | true or false                                |
| video          | true      | true or false                                |
| typeSelection  | true      | true or false                                |

| key                 | type      | default      | value                     |
| ------------------- | --------- | ------------ | ------------------------- |
| ContainerStyle      | style Obj | {}           | View Style (Button)       |
| ContainerTextStyl e | style Obj | {}           | Text Style (Button Text)  |
| typeSelection       | string    | both         | both or gallery or camera |
| SelectionButtonText | string    | select Image |                           |
| modalTitle          | string    | Image picker |                           |

## Usage example

```
import { CustomImagePickerModal } from 'rn-image-select-compress';


 <CustomImagePickerModal
          imageSelectionOrCameraResponse={data => {
            if (Array.isArray(data)) {
              console.log(data, 'List of data response success');
            } else if (data.uri) {
              console.log(data, 'single item success response data');
            } else if (data.didCancel) {
              console.log(data, 'cancel the user');
            } else if (data.errorCode) {
              console.log(data, 'image picker error');
            } else if (data.errorMessage) {
              console.log(data, 'image picker error');
            } else if (data.message) {
              console.log(data, 'Error Message');
            }
          }}
          ContainerStyle={{
            paddingVertical: 10,
            backgroundColor: 'red',
            paddingHorizontal: 10,
            width: 200,
            borderRadius: 10,
            elevation: 3,
          }}
          ContainerTextStyle={{
            fontSize: 20,
            textAlign: 'center',
          }}
          modalTitle={'Image Selection App'}
          SelectionButtonText={'select Image'}
          imageCompressValue={{
            width: 'default',
            height: 'default',
            compressFormat: 'JPEG',
            quality: 10,
            multipal: true,
            manualCrop: true,
            video: false,
          }}
          typeSelection={'both'}
        />
```
