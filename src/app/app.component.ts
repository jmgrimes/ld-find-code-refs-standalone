import { Component } from '@angular/core';
import { LaunchDarklyFlags, LaunchDarklyService } from './launchdarkly.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [LaunchDarklyService]
})
export class AppComponent {
  title: string = 'launchdarkly-coderefs-test';
  flags: LaunchDarklyFlags
  flagsSubscription: any;

  constructor(private ldService: LaunchDarklyService) {
    this.flags = ldService.flags;
    this.flagsSubscription = ldService.flagChange.subscribe(flags => {
      this.flags = flags;
    })
  }
}
