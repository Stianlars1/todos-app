import { StatusCodes } from "@/types/todo";

type categoryCode = StatusCodes;

export interface UserPreferenceUpdateDTO {
  categoryName: categoryCode;
  visible: boolean;
}
export interface UserPreferenceDTO {
  categoryCode: categoryCode;
  visible: boolean;
  displayOrder: number;
}
export type GetUserPreferencesDTO = UserPreferenceDTO[];

// response
// [
// 	{
// 		"categoryCode": "PENDING",
// 		"visible": false,
// 		"displayOrder": 6
// 	},
// 	{
// 		"categoryCode": "CANCELLED",
// 		"visible": false,
// 		"displayOrder": 7
// 	},
// 	{
// 		"categoryCode": "DELETED",
// 		"visible": false,
// 		"displayOrder": 5
// 	},
// 	{
// 		"categoryCode": "COMPLETED",
// 		"visible": true,
// 		"displayOrder": 3
// 	},
// 	{
// 		"categoryCode": "CREATED",
// 		"visible": true,
// 		"displayOrder": 1
// 	},
// 	{
// 		"categoryCode": "IN_PROGRESS",
// 		"visible": true,
// 		"displayOrder": 2
// 	},
// 	{
// 		"categoryCode": "ON_HOLD",
// 		"visible": false,
// 		"displayOrder": 4
// 	}
// ]
