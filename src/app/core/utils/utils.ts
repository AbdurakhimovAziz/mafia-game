import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  template: ''
})
export abstract class SubscriptionDestroyer implements OnDestroy {
  private subscriptions: Subscription[] = [];

  public addSubscription(sub: Subscription): void {
    this.subscriptions.push(sub);
  }

  public unsubscribeAll(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  ngOnDestroy(): void {
    this.unsubscribeAll();
  }
}
