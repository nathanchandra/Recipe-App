import { DataStorageService } from './../shared/data-storage.service';
import { Component} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dataStoreService: DataStorageService){}

  //@Output() featureSelected = new EventEmitter<string>();

  // onSelect(feature: string) {
  //   this.featureSelected.emit(feature);
  // }

  onSave(){

    this.dataStoreService.storeRecipe();

  }

  onFetch(){
    this.dataStoreService.fetchRecipe().subscribe();
  }


}
