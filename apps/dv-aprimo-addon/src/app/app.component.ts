import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { DropdownCheckboxComponent } from "./ui/components/dropdown-checkbox/dropdown-checkbox.component";
import { TitleComponent } from './ui/components/title/title.component';
import { EquationIconComponent } from "./ui/components/icons/equation-icon/equation-icon.component";
import { CompositeIconComponent } from "./ui/components/icons/composite-icon/composite-icon.component";
import { FigureIconComponent } from "./ui/components/icons/figure-icon/figure-icon.component";
import { H1IconComponent } from "./ui/components/icons/h1-icon/h1-icon.component";
import { H2IconComponent } from "./ui/components/icons/h2-icon/h2-icon.component";
import { InfoIconComponent } from "./ui/components/icons/info-icon/info-icon.component";
import { SettingsIconComponent } from "./ui/components/icons/settings-icon/settings-icon.component";
import { LofIconComponent } from "./ui/components/icons/lof-icon/lof-icon.component";
import { LotIconComponent } from "./ui/components/icons/lot-icon/lot-icon.component";
import { LorIconComponent } from "./ui/components/icons/lor-icon/lor-icon.component";
import { TableIconComponent } from "./ui/components/icons/table-icon-component/table-icon-component.component";
import { TocIconComponent } from "./ui/components/icons/toc-icon/toc-icon.component";
import { TopicIconComponent } from "./ui/components/icons/topic-icon-component/topic-icon-component.component";
import { UnknownIconComponent } from "./ui/components/icons/unknown-icon/unknown-icon.component";
import { H4IconComponent } from "./ui/components/icons/h4-icon/h4-icon.component";
import { H5IconComponent } from "./ui/components/icons/h5-icon/h5-icon.component";
import { H3IconComponent } from "./ui/components/icons/h3-icon/h3-icon.component";
import { InfoMessageComponent } from "./ui/components/info-message/info-message.component";
import { InputComponent } from "./ui/components/input/input.component";
import { initFlowbite } from 'flowbite';
import { TextAreaComponent } from "./ui/components/text-area/text-area.component";
import { SelectComponent } from "./ui/components/select/select.component";
import { SelectedComponentComponent } from "./ui/components/selected-component/selected-component.component";
import { SkeletonComponent } from "./ui/components/skeleton-component/skeleton-component.component";
import { ButtonComponent } from "./ui/components/button/button.component";
import { ButtonGroupComponent } from "./ui/components/button-group/button-group.component";
import { RadioComponent } from "./ui/components/radio/radio.component";

@Component({
  standalone: true,
  imports: [RouterModule, DropdownCheckboxComponent, TitleComponent, EquationIconComponent, CompositeIconComponent, FigureIconComponent, H1IconComponent, H2IconComponent, InfoIconComponent, SettingsIconComponent, LofIconComponent, LotIconComponent, LorIconComponent, TableIconComponent, TocIconComponent, TopicIconComponent, UnknownIconComponent, H4IconComponent, H5IconComponent, H3IconComponent, InfoMessageComponent, InputComponent, TextAreaComponent, SelectComponent, SelectedComponentComponent, SkeletonComponent, ButtonComponent, ButtonGroupComponent, RadioComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'dv-example-addon';

  constructor(public oidcSecurityService: OidcSecurityService) { }

  ngOnInit(): void {
    initFlowbite();
    this.oidcSecurityService
      .checkAuth()
      .subscribe(({ isAuthenticated, userData, accessToken, idToken, configId }) => {
        console.log('callback authenticated', isAuthenticated);
      });
  }
}
