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
  @ContentChild('modalHeader', { static: false }) header: TemplateRef<any>;
  @ContentChild('modalBody', { static: false }) body: TemplateRef<any>;
  @ContentChild('modalFooter', { static: false }) footer: TemplateRef<any>;
  @Input() config: any = {
    'closeOnOutsideClick': true,
    'offsetLeft': 0,
    'offsetTop': 0,
    'position': ''
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

  setPosition(position, modal, button) {
    switch (position) {
      // TOP
      case 'top-left': {
        modal[0].style.top = `${this.config.offsetTop - modal[0].offsetHeight}px`;
        modal[0].style.left = `${this.config.offsetLeft}px`;
        break
      }
      case 'top-center': {
        modal[0].style.top = `${this.config.offsetTop - modal[0].offsetHeight}px`;
        modal[0].style.left = `${this.config.offsetLeft - (modal[0].offsetWidth - button.target.clientWidth)/2}px`;
        break
      }
      case 'top-right': {
        modal[0].style.top = `${this.config.offsetTop - modal[0].offsetHeight}px`;
        modal[0].style.left = `${this.config.offsetLeft - (modal[0].offsetWidth - button.target.clientWidth)}px`;
        break
      }
      // LEFT
      case 'left-top': {
        modal[0].style.top = `${this.config.offsetTop}px`;
        modal[0].style.left = `${this.config.offsetLeft - modal[0].offsetWidth}px`; // DONE
        break
      }
      case 'left-center': {
        modal[0].style.top = `${(this.config.offsetTop - (modal[0].offsetHeight - button.target.clientHeight)/2)}px`; // DONE
        modal[0].style.left = `${this.config.offsetLeft - modal[0].offsetWidth}px`;
        break
      }
      case 'left-bottom': {
        modal[0].style.top = `${this.config.offsetTop - (modal[0].offsetHeight - button.target.clientHeight)}px`; // DONE
        modal[0].style.left = `${this.config.offsetLeft - modal[0].offsetWidth}px`;
        break
      }
      // BOTTOM
      case 'bottom-left': {
        modal[0].style.top = `${this.config.offsetTop + button.target.clientHeight}px`;
        modal[0].style.left = `${this.config.offsetLeft}px`;
        break
      }
      case 'bottom-center': {
        modal[0].style.top = `${this.config.offsetTop + button.target.clientHeight}px`;
        modal[0].style.left = `${this.config.offsetLeft - (modal[0].offsetWidth - button.target.clientWidth)/2}px`; // DONE
        break
      }
      case 'bottom-right': {
        modal[0].style.top = `${this.config.offsetTop + button.target.clientHeight}px`;
        modal[0].style.left = `${this.config.offsetLeft - (modal[0].offsetWidth - button.target.clientWidth)}px`;
        break
      }
      // RIGHT
      case 'right-top': {
        modal[0].style.top = `${this.config.offsetTop}px`;
        modal[0].style.left = `${this.config.offsetLeft + button.target.clientWidth}px`; // DONE
        break
      }
      case 'right-center': {
        modal[0].style.top = `${(this.config.offsetTop - (modal[0].offsetHeight - button.target.clientHeight)/2)}px`;
        modal[0].style.left = `${this.config.offsetLeft + button.target.clientWidth}px`;
        break
      }
      case 'right-bottom': {
        modal[0].style.top = `${this.config.offsetTop - modal[0].offsetHeight + button.target.clientHeight}px`; // DONE
        modal[0].style.left = `${this.config.offsetLeft + button.target.clientWidth}px`;
        break
      }
    }
  }

  open($event?: any): void {
    document.body.classList.add('modal-open');
    let dialog: any = document.body.getElementsByClassName('modal-dialog');
    console.log($event);
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
      this.config.offsetLeft = $event ? $event.srcElement['offsetLeft'] : 0
      this.config.offsetTop = $event ? $event.srcElement['offsetTop'] : 0
      this.setPosition(this.config.position, dialog, $event)
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
