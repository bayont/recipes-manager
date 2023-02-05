import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { AuthorButtonComponent } from './author-button/author-button.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatToolbarModule, RouterOutlet, RecipesListComponent, AuthorButtonComponent]
})
export class AppComponent {
  title = 'ngRecipes';
}
