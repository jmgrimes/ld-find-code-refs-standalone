import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LDClient, LDFlagSet, LDFlagChangeset, initialize } from 'launchdarkly-js-client-sdk';
 
export interface LaunchDarklyFlags {
    my_test_boolean_flag: boolean
}

@Injectable()
export class LaunchDarklyService {
  ldClient: LDClient
  flags: LaunchDarklyFlags
  flagChange: Subject<LaunchDarklyFlags> = new Subject<LaunchDarklyFlags>();

  constructor() {
    this.flags = {
        my_test_boolean_flag: false,
    };
 
    this.ldClient = initialize("CLIENT-SIDE-ID",
      { key: "SAMPLE-USER-KEY", anonymous: true }
    );
 
    this.ldClient.on('change', (flagChanges: LDFlagChangeset) => {
      if (flagChanges["my-test-boolean-flag"] !== undefined) {
        this.flags.my_test_boolean_flag = flagChanges["my-test-boolean-flag"].current;
      }
      this.flagChange.next(this.flags);
      console.log("Flags updated.")
   });
 
   this.ldClient.on('ready', () => {
     this.setFlags();
   })
  }
 
  setFlags() {
    var allFlags: LDFlagSet = this.ldClient.allFlags();
    this.flags.my_test_boolean_flag = allFlags["my-test-boolean-flag"];
    console.log("Flags initialized.");
  }
 
  changeUser(user: string) {
    if(user !== "Anonymous") {
      this.ldClient.identify({key: user, name: user, anonymous: false});
    }
    else {
      this.ldClient.identify({key: 'anon', anonymous: true});
    }
  }
 }