import { Injectable } from '@angular/core';
import { AnimationController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class Animation {

  constructor(private animationCtrl: AnimationController) { }

  animateItemsIn(selector: string) {
    const items = document.querySelectorAll(selector) as NodeListOf<HTMLElement>;

    items.forEach((item, index) => {
      const animation = this.animationCtrl
        .create()
        .addElement(item)
        .duration(500)
        .delay(index * 100)
        .easing('ease-out')
        .keyframes([
          { offset: 0, opacity: '0', transform: 'translateY(20px)' },
          { offset: 1, opacity: '1', transform: 'translateY(0px)' },
        ]);
      animation.play();
    });
  }

  animatePop(event: Event) {
    const target = (event.currentTarget as HTMLElement);

    const animation = this.animationCtrl
      .create()
      .addElement(target)
      .duration(300)
      .keyframes([
        { offset: 0, transform: 'scale(1)' },
        { offset: 0.5, transform: 'scale(1.2)' },
        { offset: 1, transform: 'scale(1)' },
      ]);
    animation.play();
  }
}