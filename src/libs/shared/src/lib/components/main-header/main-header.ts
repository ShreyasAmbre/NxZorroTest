import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { LanguageService } from '../../services';

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

  #languageService = inject(LanguageService);

  isMobileMenuOpen = false;
  lang = this.#languageService


  onLanguageToggle(lang: string) {
    console.log('Language changed:', lang);
    // You can emit an Output EventEmitter here if needed
  }

  /** Close menu when clicking a menu item (mobile UX) */
  onMenuItemClick() {
    this.isMobileMenuOpen = false;
  }
}
