# rn-image-select-compress

###

**_react-native-image-picker_** and **_react-native-image-resizer_**
library first install

```
npm i rn-image-select-compress

import RnImageSelectCompress from 'rn-image-select-compress';

RnImageSelectCompress().then(data => {
    console.log(data);
});

or

// 500: width        => default: image width / 0
// 200: height       => default: image height / 0
// 'JPEG' image type => default: image 'JPEG'| 'PNG'
// 100 quality       => default: 100 ==> range (0-100)

RnImageSelectCompress(500, 200, 'JPEG', 100).then(data => {
      console.log(data);
});



```
