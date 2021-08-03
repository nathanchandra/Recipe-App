import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //ViewContainerRef allows us to get information about
  //where we use/implement the directive
  constructor(public viewContainerRef: ViewContainerRef){}

}
