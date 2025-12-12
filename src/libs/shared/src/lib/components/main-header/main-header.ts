import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'shared-main-header',
  imports: [
    NzLayoutModule,
    CommonModule,
    FormsModule,
    NzMenuModule,
    NzSwitchModule,
    NzButtonModule,
    NzIconModule,
    RouterLink,
    NzSelectModule
  ],
  templateUrl: './main-header.html',
  styleUrl: './main-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainHeader {
  @Input() isArabic = false;

  isMobileMenuOpen = false;
  currentLang = 'en'


  onLanguageToggle(lang: string) {
    console.log('Language changed:', lang);
    // You can emit an Output EventEmitter here if needed
  }

  /** Close menu when clicking a menu item (mobile UX) */
  onMenuItemClick() {
    this.isMobileMenuOpen = false;
  }
}
