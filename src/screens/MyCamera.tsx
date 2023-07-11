import React, {useContext, useEffect, useRef, useState} from 'react';
import {Block} from '../components/';
import {Camera, CameraType} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as MediaLibrary from 'expo-media-library';
import {Platform, View} from 'react-native';
const MyCamera = () => {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  useEffect(() => {
    requestPermission();
  }, []);
  if (requestPermission === null) {
    // eslint-disable-next-line react/jsx-no-undef
    return <Block>No access to camera</Block>;
  }

  if (requestPermission === false) {
    return <Block>No access to camera</Block>;
  }

  return (
    <Block>
      <Camera
        style={{flex: 1}}
        type={type}
        useCamera2Api={Platform.OS === 'ios'}
        ratio={'16:9'}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
          runClassifications: FaceDetector.FaceDetectorClassifications.none,
          minDetectionInterval: 100,
          tracking: true,
        }}
      />
    </Block>
  );
};

export default MyCamera;
