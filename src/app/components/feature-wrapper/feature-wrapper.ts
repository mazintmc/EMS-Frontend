import { Input, Component } from "@angular/core";

@Component({
  selector: 'app-feature-wrapper',
  template: `
    <div class="app-feature-wrapper">
      @if(heading) {
        <h1 class="heading-block">
          <span class="heading-inline">{{ heading }}</span>
        </h1>
      }
     <div class="feature-content">
      <ng-content></ng-content>
    </div>
    </div>
  `,
  styleUrls: ['./feature-wrapper.scss']
})
export class FeatureWrapper {
  @Input() heading?: string;
}
