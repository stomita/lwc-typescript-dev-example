import { LightningElement, api, wire } from "lwc";
import { getRecord, GetRecordResult } from "lightning/uiRecordApi";
import currentUserId from "@salesforce/user/Id";
import USER_NAME_FIELD from "@salesforce/schema/User.Name";
import USER_EMAIL_FIELD from "@salesforce/schema/User.Email";
import { flattenGetRecordResultData } from "./util";

/**
 *
 */
type User = { Name: string; Email: string };

/**
 *
 */
export default class MyComp1 extends LightningElement {
  currentUser: User | undefined;

  @wire(getRecord, {
    recordId: currentUserId,
    fields: [USER_NAME_FIELD, USER_EMAIL_FIELD]
  })
  handleRecord(ret: GetRecordResult<User>) {
    if (ret.data) {
      this.currentUser = flattenGetRecordResultData(ret.data);
    }
  }
}
