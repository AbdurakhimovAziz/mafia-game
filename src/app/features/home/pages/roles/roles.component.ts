import { Component } from '@angular/core';
import { roles } from '../../utils/roles';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent {
  public roles = roles;
}
