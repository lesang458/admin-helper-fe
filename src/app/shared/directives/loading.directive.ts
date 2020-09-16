import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  ComponentFactory,
  ComponentRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';

@Directive({
  selector: '[ahLoading]',
})
export class LoadingDirective {
  loadingFactory: ComponentFactory<LoadingSpinnerComponent>;
  loadingComponent: ComponentRef<LoadingSpinnerComponent>;

  @Input()
  set ahLoading(loading: boolean) {
    this.vcRef.clear();

    if (loading) {
      // create and embed an instance of the loading component
      this.loadingComponent = this.vcRef.createComponent(this.loadingFactory);
    } else {
      // embed the contents of the host template
      this.vcRef.createEmbeddedView(this.templateRef);
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    // Create resolver for loading component
    this.loadingFactory = this.componentFactoryResolver.resolveComponentFactory(
      LoadingSpinnerComponent
    );
  }
}
