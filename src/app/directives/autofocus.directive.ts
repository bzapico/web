/*
 *  Copyright 2019 Nalej
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *      http://www.apache.org/licenses/LICENSE-2.0
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

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
