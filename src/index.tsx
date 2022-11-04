import { NativeModules, Platform } from 'react-native';
import type { Frame } from 'react-native-vision-camera'

const LINKING_ERROR =
  `The package 'vision-camera-dynamsoft-document-normalizer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo managed workflow\n';

const VisionCameraDynamsoftDocumentNormalizer = NativeModules.VisionCameraDynamsoftDocumentNormalizer  ? NativeModules.VisionCameraDynamsoftDocumentNormalizer  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function initLicense(license:string): Promise<boolean> {
  return VisionCameraDynamsoftDocumentNormalizer.initLicense(license);
}

export function initRuntimeSettingsFromString(template:string): Promise<boolean> {
  return VisionCameraDynamsoftDocumentNormalizer.initRuntimeSettingsFromString(template);
}

export function detect(frame: Frame): DetectedQuadResult[] {
  'worklet'
  // @ts-ignore
  // eslint-disable-next-line no-undef
  return __detect(frame, {})
}

export function detectAndNormalize(frame: Frame, config: NormalizationConfig): NormalizedImageResult {
  // 'worklet'
   // @ts-ignore
   // eslint-disable-next-line no-undef
   return __detectAndNormalize(frame, config)
 }

export function normalizeFile(url:string, quad:Quadrilateral, config: NormalizationConfig): Promise<NormalizedImageResult> {
  return VisionCameraDynamsoftDocumentNormalizer.normalizeFile(url, quad, config);
}

export interface NormalizationConfig{
  saveNormalizationResultAsFile?: boolean;
  includeNormalizationResultAsBase64?: boolean;
}

export interface NormalizedImageResult {
  imageURL?: string;
  imageBase64?: string;
}

export interface DetectedQuadResult {
  location: Quadrilateral;
  confidenceAsDocumentBoundary: number;
}

export interface Point {
  x:number;
  y:number;
}

export interface Quadrilateral {
  points: [Point, Point, Point, Point];
}

export interface Rect {
  left:number;
  right:number;
  top:number;
  bottom:number;
  width:number;
  height:number;
}
