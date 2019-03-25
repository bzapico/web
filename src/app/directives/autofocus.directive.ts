import { Directive, Input } from '@angular/core';
import { AfterContentInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { OnDestroy } from '@angular/core';


@Directive({
    selector: '[appAutofocus]',
})

export class AutofocusDirective implements AfterContentInit, OnDestroy {
    @Input('appAutofocus') autofocus: string;

    private elementRef: ElementRef;
    private timer: number;

    constructor( elementRef: ElementRef ) {
        this.elementRef = elementRef;
        this.timer = null;
    }

    public ngAfterContentInit(): void {

        if ( this.autofocus === 'true' ) {
            this.timer = setTimeout(
                (): void => {
                    this.timer = null;
                    this.elementRef.nativeElement.focus();
                }
            );
        }
    }

    public ngOnDestroy(): void {
        clearTimeout( this.timer );
        this.timer = null;
    }
}
