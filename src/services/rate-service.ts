import { Injectable } from '@angular/core';
import { AppRate } from 'ionic-native';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class RateService {

  appRate: any = AppRate;

  constructor(public platform: Platform) {
    this.platform.ready().then(
      () => {
        this.appRate.preferences.storeAppURL = {
          android: 'market://details?id=com.pisixlabs.occazstreet'
        };
        this.appRate.preferences.usesUntilPrompt = 1;
        this.appRate.preferences.customLocale = {
            title: "do you love %@ ?",
            message: "If you enjoy using %@, would you mind taking a moment to rate it? It won’t take more than a minute. Thanks for your support!",
            cancelButtonLabel: "No, Thanks",
            laterButtonLabel: "Remind Me Later",
            rateButtonLabel: "Rate It Now"
        };
      }
    )

  }

}
