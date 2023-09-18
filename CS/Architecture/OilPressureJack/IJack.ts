export interface Jack {
  maxHeight: number;
  height: number;
  pump(): void;
  release(): void;
  heightCheck(): number
}