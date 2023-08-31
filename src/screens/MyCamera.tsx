// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Block, Image} from '../components/';
import {Camera, CameraType} from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useTheme} from '../hooks';
import {useNavigation} from '@react-navigation/core';
import {useHeaderHeight} from '@react-navigation/stack';
const {width: windowWidth} = Dimensions.get('window');

const PREVIEW_SIZE = 325;
const PREVIEW_RECT = {
  minX: (windowWidth - PREVIEW_SIZE) / 2,
  minY: 50,
  width: PREVIEW_SIZE,
  height: PREVIEW_SIZE,
};

const MyCamera = () => {
  const {assets, sizes} = useTheme();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Image
          radius={0}
          resizeMode="cover"
          width={sizes.width}
          height={headerHeight}
          source={assets.header}
        />
      ),
    });
  }, [assets.header, navigation, sizes.width, headerHeight]);

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [status, requestPermissionMedia] = MediaLibrary.usePermissions();
  const [flashMode, setFlashMode] = React.useState('off');
  const cameraRef = useRef(null);
  useEffect(() => {
    requestPermission();
    requestPermissionMedia();
  }, []);
  if (requestPermission === null) {
    // eslint-disable-next-line react/jsx-no-undef
    return <Block>No access to camera</Block>;
  }

  if (requestPermission === false) {
    return <Block>No access to camera</Block>;
  }

  if (status === null) {
    requestPermissionMedia().then((r) => {
      return <Block>No access to Media</Block>;
    });
  }
  if (status === false) {
    return <Block>No access to Media</Block>;
  }

  const _handleFlashMode = () => {
    if (flashMode === 'on') {
      setFlashMode('off');
    } else if (flashMode === 'off') {
      setFlashMode('on');
    } else {
      setFlashMode('auto');
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back,
    );
  }

  function takePicture() {
    onSaveImageAsync().then((r) => {});
  }

  const onSaveImageAsync = async () => {
    try {
      if (!cameraRef) {
        return;
      }
      const photo = await cameraRef.current.takePictureAsync();
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      if (photo) {
        //setAlert({show: true, text: 'Saved'});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Block>
      <Camera
        style={{flex: 1}}
        type={type}
        useCamera2Api={Platform.OS === 'ios'}
        ratio={'16:9'}
        ref={cameraRef}
        flashMode={flashMode}>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'column',
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              paddingVertical: 20,
              alignSelf: 'flex-start',
              //alignItems: 'center',
              //    backgroundColor: theme.colors.grey5,
            }}>
            <TouchableOpacity transparent onPress={toggleCameraType}>
              <MaterialCommunityIcons
                name="camera-flip"
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingVertical: 20,
              alignSelf: 'flex-start',
              //alignItems: 'center',
              //    backgroundColor: theme.colors.grey5,
            }}>
            <TouchableOpacity transparent onPress={_handleFlashMode}>
              <MaterialCommunityIcons
                name={flashMode === 'off' ? 'flash-outline' : 'flash'}
                size={40}
                color="white"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              //alignSelf: 'center',
              alignItems: 'center',
              width: 'auto', //backgroundColor: theme.colors.grey5,
            }}>
            <TouchableOpacity
              transparent
              onPress={takePicture}
              style={{
                width: 70,
                height: 70,
                bottom: 10,
                borderRadius: 50, //backgroundColor: theme.colors.grey5,
                //alignSelf: 'center', //alignItems: 'flex-end',
              }}>
              <MaterialCommunityIcons name="camera" size={70} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </Block>
  );
};

const styles = StyleSheet.create({
  master: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 32,
  },
  mask: {
    borderRadius: PREVIEW_SIZE / 2,
    height: PREVIEW_SIZE,
    width: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  circularProgress: {
    width: PREVIEW_SIZE,
    height: PREVIEW_SIZE,
    marginTop: PREVIEW_RECT.minY,
    marginLeft: PREVIEW_RECT.minX,
  },
  instructions: {
    fontSize: 20,
    textAlign: 'center',
    top: 25,
    position: 'absolute',
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PREVIEW_RECT.minY + PREVIEW_SIZE,
  },
  action: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  alert: {
    backgroundColor: '#EEEEEE',
  },
  icon: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C3272B',
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#4CB748',
    marginTop: 16,
    minWidth: '50%',
    paddingHorizontal: 16,
  },
  btnText: {
    color: '#FFFFFF',
  },
});

export default MyCamera;
