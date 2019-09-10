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
    'closeOnOutsideClick': false
  }

  ngOnInit() {
    this.toggleCssInjector();
  }

  openFromComponent() {
    this.componentModal.open();
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
