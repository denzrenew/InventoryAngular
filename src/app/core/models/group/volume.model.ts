/**
 * Return model from the getUnPositionedUsers endpoint
 */
export default interface VolumeModel {
  status: string;
  totalMember: number;
  volume: number;
  volumeLeft?: number;
  volumeRight?: number;
  earnedLeft?: number;
  earnedRight?: number;
}