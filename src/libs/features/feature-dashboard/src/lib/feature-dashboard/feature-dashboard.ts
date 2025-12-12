import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dashboard-feature-dashboard',
  imports: [],
  templateUrl: './feature-dashboard.html',
  styleUrl: './feature-dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureDashboard {}
