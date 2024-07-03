import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, Renderer2 } from "@angular/core";
import { BehaviorSubject, Observable, Subject, distinctUntilChanged, filter, fromEvent, map, pairwise, share, takeUntil } from "rxjs";

@Directive({
  selector: '[tt-hidden-on-scroll]',
  standalone: true,
})

export class HiddenOnSrollDirective implements OnDestroy, AfterViewInit {
  @Input() event: string = 'scroll';
  @Input() hideOnScroll: 'Down' | 'Up' = 'Down';
  @Input() classNameWhenHidden: string = '';
  @Input() scrollElement: string = '';
  @Input() listenScrollEventElement: string = '';
  @Input() elementCheckingPosition: 'windown' | 'element' = 'windown';

  @Output() hiddenElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() shownElement: EventEmitter<number> = new EventEmitter<number>();
  @Output() initPosition: EventEmitter<number> = new EventEmitter<number>();

  private scrollingElement: HTMLElement | null = null;
  private listenScrollingElement: HTMLElement | (Window & typeof globalThis) | Document | null = null;
  private unsubscribeNotifier: Subject<number> = new Subject();
  private initScroll: BehaviorSubject<number | null> = new BehaviorSubject(null as any);
  private scrollEvent!: Observable<IListenScroll>;
  private scrollUp!: Observable<IListenScroll>;
  private scrollDown!: Observable<IListenScroll>;

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer2: Renderer2,
  ) {}

  ngAfterViewInit(): void {
    try {
      this.scrollingElement = this.scrollElement
        ? (document.querySelector(this.scrollElement) as HTMLElement)
        : this.getDefaultScrollingElement();
      this.listenScrollingElement = this.listenScrollEventElement
        ? (document.querySelector(this.listenScrollEventElement) as HTMLElement)
        : window || document;

      if (!this.scrollingElement || !this.listenScrollingElement) {
        console.error(`tt-hidden-on-scroll: selector: "${this.scrollElement}" or "${this.listenScrollEventElement}" not found.`);
      } else {
        this.scrollEvent = fromEvent(this.listenScrollingElement, this.event, { capture: true })
        .pipe(
          takeUntil(this.unsubscribeNotifier),
          map(() => {
            const resp = this.scrollingElement?.scrollTop || 0;
            if (typeof this.initScroll.value !== 'number') {
              this.initScroll.next(resp);
            }
            return resp;
          }),
          pairwise(),
          map(([y1, y2]) => {
            return {
              position: this.elementCheckingPosition === 'windown' ? window.scrollY : y2,
              direction: y2 < y1 ? ScrollDirection.Up : ScrollDirection.Down
            }
          }),
          distinctUntilChanged(),
          share(),
        );

        this.scrollUp = this.scrollEvent.pipe(
          filter(resp => resp.direction === ScrollDirection.Up)
        );

        this.scrollDown = this.scrollEvent.pipe(
          filter(resp => resp.direction === ScrollDirection.Down)
        );
      }

      if (this.scrollUp) {
        this.scrollUp.subscribe((resp) => {
          this.scrollUpAction(resp);
        });
      }
      if (this.scrollDown) {
        this.scrollDown.subscribe((resp) => {
          this.scrollDownAction(resp)
        });
      }

      this.initScroll.subscribe(resp => {
        if (typeof resp === 'number') {
          this.onInitPosition(this.elementCheckingPosition === 'windown' ? window.scrollY : this.scrollingElement?.scrollTop || 0);
        }
      });
    } catch (error) {
      console.error(`tt-hidden-on-scroll: ${error}`);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeNotifier.next(Date.now());
    this.unsubscribeNotifier.complete();
  }

  private scrollUpAction(resp: IListenScroll) {
    this.hideOnScroll === 'Up' ? this.hideElement(resp.position) : this.showElement(resp.position);
  }

  private scrollDownAction(resp: IListenScroll) {
    this.hideOnScroll === 'Up' ? this.showElement(resp.position) : this.hideElement(resp.position);
  }

  private hideElement(position: number): void {
    try {
      const nativeElement = this.elementRef.nativeElement;
      this.hiddenElement.emit(position);
      this.renderer2.addClass(nativeElement, this.classNameWhenHidden);
    } catch (error) {
      console.error(`tt-hidden-on-scroll: ${error}`);
    }
  }

  private showElement(position: number): void {
    try {
      const nativeElement = this.elementRef.nativeElement;
      this.shownElement.emit(position);
      this.renderer2.removeClass(nativeElement, this.classNameWhenHidden);
    } catch (error) {
      console.error(`tt-hidden-on-scroll: ${error}`);
    }
  }

  private getDefaultScrollingElement(): HTMLElement {
    return (document.scrollingElement || document.documentElement) as HTMLElement;
  }

  private onInitPosition(position: number) {
    this.initPosition.emit(position);
  }
};

enum ScrollDirection {
  Up = 'Up',
  Down = 'Down'
};

interface IListenScroll {direction: ScrollDirection; position: number};
