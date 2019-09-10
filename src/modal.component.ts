/* tslint:disable:component-selector */

import {
  Component,
  OnDestroy,
  ContentChild,
  ElementRef,
  TemplateRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
})
export class ModalComponent implements OnDestroy {
  @ContentChild('modalHeader', {static: false}) header: TemplateRef<any>;
  @ContentChild('modalBody', {static: false}) body: TemplateRef<any>;
  @ContentChild('modalFooter', {static: false}) footer: TemplateRef<any>;
  @Input() config: any = {
    'closeOnOutsideClick': true,
    'offsetLeft': 0,
    'offsetTop': 0
  };

  visible = false;
  visibleAnimate = false;

  constructor(
    private elementRef: ElementRef,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnDestroy() {
    // Prevent modal from not executing its closing actions if the user navigated away (for example,
    // through a link).
    this.close();
  }

  getPosition(event){
    return { offsetTop:event.srcElement['offsetTop'] , offsetLeft:event.srcElement['offsetLeft'] }
}

  open($event?: any): void {
    document.body.classList.add('modal-open');

    this.config.offsetLeft = $event ? $event.srcElement['offsetLeft'] : 0
    this.config.offsetTop = $event ? $event.srcElement['offsetTop'] : 0
    console.log(this.config)
    // .top-center {
    //   'top': this.config.offsetTop - (heightModal + 20px);
    //   'left': this.config.offsetLeft - (withModal - withButton)/2;
    // }
    // .top-left {
    //   'top': this.config.offsetTop - (heightModal + 20px);
    //   'left': this.config.offsetLeft;
    // }
    // .top-right {
    //   'top': this.config.offsetTop - (heightModal + 10px);
    //   'left': this.config.offsetLeft - (withModal - withButton);
    // }

    
    // .left-top {
    //   'top': this.config.offsetTop - (heightModal - heightButton)/2;
    //   'left': this.config.offsetLeft - withModal - 20px;
    // }
    // .left-center {
    //   'top': this.config.offsetTop - (heightModal - heightButton)/2;
    //   'left': this.config.offsetLeft - withModal - 20px;
    // }

    // .bottom-center {
    //   'top': this.config.offsetTop + heightModal + 20px;
    //   'left': this.config.offsetLeft - (withModal - withButton)/2;
    // }
    // .bottom-left {
    //   'top': this.config.offsetTop + heightModal + 20px;
    //   'left': this.config.offsetLeft;
    // }
    // .bottom-right {
    //   'top': this.config.offsetTop + heightModal + 20px;
    //   'left': this.config.offsetLeft - (withModal - withButton);
    // }
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
    });
  }

  close(): void {
    document.body.classList.remove('modal-open');

    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
      this.changeDetectorRef.markForCheck();
    }, 200);
  }

  @HostListener('click', ['$event'])
  onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal') && this.isTopMost() && this.config.closeOnOutsideClick) {
      this.close();
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDownHandler(event: KeyboardEvent) {
    // If ESC key and TOP MOST modal, close it.
    if (event.key === 'Escape' && this.isTopMost()) {
      this.close();
    }
  }

  /**
   * Returns true if this modal is the top most modal.
   */
  isTopMost(): boolean {
    return !this.elementRef.nativeElement.querySelector(':scope modal > .modal');
  }
}
