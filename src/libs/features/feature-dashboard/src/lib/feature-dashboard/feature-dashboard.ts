import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'dashboard-feature-dashboard',
  imports: [
    TranslocoModule
  ],
  templateUrl: './feature-dashboard.html',
  styleUrl: './feature-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureDashboard {}
