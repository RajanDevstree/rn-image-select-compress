# rn-image-select-compress

# Install

### Before installing rn-image-select-compress you need to install [react-native-image-picker](https://github.com/react-native-image-picker/react-native-image-picker) and [react-native-image-resizer](https://github.com/bamlab/react-native-image-resizer)

```
npm i rn-image-select-compress
```

## Option

| key          | default   | value                                        |
| ------------ | --------- | -------------------------------------------- |
| width        | 'default' | 'default' or ImageWidth (400,500,600,etc..)  |
| height       | 'default  | 'default' or ImageHeight (400,500,600,etc..) |
| imageType    | 'JPEG'    | 'JPEG' or 'PNG'                              |
| imageQuality | 100       | 0 to 100                                     |

## Usage example

```
import RnImageSelectCompress from 'rn-image-select-compress';


RnImageSelectCompress('default', 600, 'JPEG', 60).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
});

```

```
Response :
{
    "height": 600,
    "name": "f7387ff8-00a7-4139-8352-1401d16b3c79.JPEG",
    "oldSize": 1622510,
    "path": "/data/user/0/com.rnvideostream/cache/f7387ff8-00a7-4139-8352-1401d16b3c79.JPEG",
    "size": 49150,
    "uri": "file:///data/user/0/com.rnvideostream/cache/f7387ff8-00a7-4139-8352-1401d16b3c79.JPEG",
    "width": 300
}
```
