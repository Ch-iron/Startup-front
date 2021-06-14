import React, { useState } from 'react';
import { Image, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import styles from './styles';

const DefaultImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEUAAAAAAAClZ7nPAAAAAnRSTlMB80s8X98AAAMqSURBVGje7Zg9bhsxEIXJsNh0rFIzTW5hZF3mAsohAgRImSrkTdLrAE7LexhIaOQCBFxkAROceAlrh9TwB5DhpNkHG5K4n94Mh5KWQ7Zr165du3b9N707HD7e/jTFGD/c/AKAyK4YPCkWgH4aZd84nJRbCDgBGgGfAXJ7FyCwZMC8AZlDJCmkHBhsyuaAb7pa4YfDozTYLMd4PB4/sEIC3PZ8QjiT9jiJyCqaMyDUAInzVL4GTAHNXA0QGFjbGsAzwLCaIHt2EYDGPF4IzBsQGoA9TbgBqA1YngtMFwPuBPg6IC0CFzq4F3LA0qhOkjIOHBQMcpjB9B002L4DgM0dlgrgRg6umwOHsYN/rgPN4fmzGFeSAnK0WKq/3P21kHHweRD+RT/Vz//ifBk5hAHA4yAEB3S4DBBgMEQdsCOHNN5ezQkcDVECHh3qwDIA/iz9EPI+9B3k7zgA7qAfQjnoOygLZgBo2w0x29l2HWYzuwGgfBfQRvrzHJYCYHJpOrxOwBSawPu0FRBtQD/+RyZisw5gV4BDy4GDS9+bJiDAp70CmAYwwZIAbRo5SAhpCrNtOCiAdEOcXQOY78GsgGoB+g7sWnfpGzmABbe+kEvdgYPRfn0xNQABTIXVXoQ6MEUmo3TbRlERILAJ1lEeaw4pNwHf11GoA8ozDmBXwNRCpALqBGhTddA23WrSsyqQbmQJmG0tBE+bCsBLkgDbXll5AmzXvqZLnoQo953TUnVYEAjVHNIDmtFCuWJb399gVIG3GQG1EEsOmNKBbL81Bcrt92xpiKkAXO4gEiDzHFQJOAr4E5VkSKskPToUYXG1KKBtDgQMUdQGV4s48ALgkQACSpyEmGIZkDjIQDJCh1T4hfRYZSVnT1ooVayFpmUrlxss2SIpBLAMuBhnDgJow6sKIJbAtJw7BNqiKIt0GigAfwZwXwLcnTeD7gXayXHHOu55h201Q+BFWvvx6YEICNjhCcbwDOSiUxTt+ucwAmzvJOfNQYPBGUM8on7AkzIeiOh5FFXxo1YDXF4ToCp/ceop9JJ4OFwXwKvbzzdPf5+O12zXrl27du365/oL2FMTy4zsHKUAAAAASUVORK5CYII=';

const AsyncImage = ({ source }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleError = () => {
    setError(true);
    setLoaded(false);
  };
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerView}>
        <FastImage
          onError={handleError}
          onLoad={handleLoad}
          source={{ uri: source, cache: 'web' }}
          style={styles.img}
        />
        {!loaded && (
          <Image
            source={{ uri: DefaultImage }}
            style={[styles.placeHolderImg, { opacity: error ? 0.7 : 0.2 }]}
          />
        )}
      </View>
    </View>
  );
};

export default AsyncImage;
