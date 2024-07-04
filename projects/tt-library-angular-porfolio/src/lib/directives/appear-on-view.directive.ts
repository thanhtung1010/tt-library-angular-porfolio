import { AnimationMetadata } from "@angular/animations";
import { Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Observable, Subject, distinctUntilChanged, fromEvent, map, share, takeUntil } from "rxjs";

@Directive({
  selector: '[tt-appear]',
  standalone: true
})

export class AppearOnViewDirective implements OnDestroy, OnInit {
  @Output('tt-appear') appearOnView: EventEmitter<boolean> = new EventEmitter();
  @Input() animateInAnimation: AnimationMetadata | AnimationMetadata[] = [];

  private scrollEvent!: Observable<boolean>;
  private unsubscribeNotifier: Subject<number> = new Subject();
  private defaults: any = {
    offset: 0,
  };
  windowHeight: number = window.innerHeight;

  constructor(private el: ElementRef,) {}

  ngOnInit() {
    this.scrollEvent = fromEvent(window, 'scroll').pipe(
      takeUntil(this.unsubscribeNotifier),
      map(resp => {
        try {
          const bounding = this.el.nativeElement.getBoundingClientRect();
          let top =
            bounding.top -
            (window.innerHeight || document.documentElement.clientHeight);
          let bottom = bounding.top + bounding.height + this.defaults.offset;

          return top < 0 && bottom > 0;
        } catch (error) {
          console.error('appear on view: ', error);
          return false;
        }
      }),
      distinctUntilChanged(),
      share(),
    );

    if (this.scrollEvent) {
      this.scrollEvent.subscribe(resp => {
        this.appearOnView.emit(resp);
      });
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next(Date.now());
    this.unsubscribeNotifier.complete();
  }
}
