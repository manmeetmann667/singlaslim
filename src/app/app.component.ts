import { Component } from '@angular/core';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Trebha - Wellness and Aesthetic Center';
  loader: boolean = false;

  isLoading: boolean = true;

  constructor(public loaderService: LoaderService,) {
  }

  ngOnInit() {
    this.isLoading = true;
    this.startTimer();
 
    this.loader = false;
    this.loaderService.loader$.subscribe((result) => {
      this.loader = result;
    });
    
  }

  ngOnDestroy(): void {
    this.isLoading = true;
  }

  startTimer() {
    setTimeout(() => {
      console.log("i am");

      this.isLoading = false;
    }, 1000);
  }

  openLink(link: string) {
    console.log("asdsa");
    
    console.log(link);
    
    window.open(link, '_blank')
  }
}
