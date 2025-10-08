import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RootFooterComponent } from './footer/footer.component';
import { RootHeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrl: './root.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, RootHeaderComponent, RootFooterComponent],
})
export class RootComponent {}
