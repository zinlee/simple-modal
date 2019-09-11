import { Component, ViewEncapsulation, ViewChild, OnInit } from '@angular/core';
import { ModalComponent } from '../../src';

const MODAL_CSS: string[] = [
  'assets/modal.css', // Default.
  'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild('componentModal', {static: false}) componentModal: ModalComponent;

  modalCss = 0; // @See toggleCssInjector()
  public config: any = {
    'closeOnOutsideClick': false,
    'position': ''
  }
  public configTopCenter: any = {
    'closeOnOutsideClick': false,
    'position': 'top-center'
  }
  public configTopLeft: any = {
    'closeOnOutsideClick': false,
    'position': 'top-left'
  }
  public configTopRight: any = {
    'closeOnOutsideClick': false,
    'position': 'top-right'
  }

  public configLeftTop: any = {
    'closeOnOutsideClick': false,
    'position': 'left-top'
  }
  public configLeftCenter: any = {
    'closeOnOutsideClick': false,
    'position': 'left-center'
  }
  public configLeftBottom: any = {
    'closeOnOutsideClick': false,
    'position': 'left-bottom'
  }

  public configBottomCenter: any = {
    'closeOnOutsideClick': false,
    'position': 'bottom-center'
  }
  public configBottomLeft: any = {
    'closeOnOutsideClick': false,
    'position': 'bottom-left'
  }
  public configBottomRight: any = {
    'closeOnOutsideClick': false,
    'position': 'bottom-right'
  }

  public configRightCenter: any = {
    'closeOnOutsideClick': false,
    'position': 'right-center'
  }
  public configRightTop: any = {
    'closeOnOutsideClick': false,
    'position': 'right-top'
  }
  public configRightBottom: any = {
    'closeOnOutsideClick': false,
    'position': 'right-bottom'
  }

  ngOnInit() {
    this.toggleCssInjector();
  }

  openFromComponent($event) {
    this.componentModal.open($event);
  }

  // ToggleCssInjector is just for the sake of the demo, switching between custom and Boostrap
  // styles. In your web app you should rather choose one or the other.
  // Web styles reside in ./modal.css
  // Alternatively you can pick Boostrap
  toggleCssInjector() {
    const prev = document.getElementById('injected');
    if (prev) {
      prev.parentNode.removeChild(prev);
    }

    const head = document.head;

    const link = document.createElement('link');
    link.id = 'injected';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = MODAL_CSS[this.modalCss];

    head.appendChild(link);

    this.modalCss = (this.modalCss + 1) % MODAL_CSS.length;
  }
}
