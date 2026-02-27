import { Directive, ElementRef, inject, Input, input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";


export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
const variantToClassMap: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
    ghost: 'btn-ghost',
    link: 'btn-link',
};

export type ButtonSize = 'small' | 'medium' | 'large';
const sizeToClassMap: Record<ButtonSize, string> = {
    small: 'btn-small',
    medium: 'btn-medium',
    large: 'btn-large',
};

@Directive({
    selector: 'button[rmpButton]'
})
export class RmpButtonDirective implements OnInit, OnChanges {
    renderer = inject(Renderer2);
    elementRef = inject(ElementRef);

    variant = input<ButtonVariant>('primary');
    size = input<ButtonSize>('medium');

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'btn');
        this.renderer.addClass(this.elementRef.nativeElement, variantToClassMap[this.variant()]);
        this.renderer.addClass(this.elementRef.nativeElement, sizeToClassMap[this.size()]);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['variant']) {
            const previousValue = changes['variant'].previousValue as ButtonVariant;
            const currentValue = changes['variant'].currentValue as ButtonVariant;
            if (previousValue) {
                this.renderer.removeClass(this.elementRef.nativeElement, variantToClassMap[previousValue]);
            }
            if (currentValue) {
                this.renderer.addClass(this.elementRef.nativeElement, variantToClassMap[currentValue]);
            }
        }

        if (changes['size']) {
            const previousValue = changes['size'].previousValue as ButtonSize;
            const currentValue = changes['size'].currentValue as ButtonSize;
            if (previousValue) {
                this.renderer.removeClass(this.elementRef.nativeElement, sizeToClassMap[previousValue]);
            }
            if (currentValue) {
                this.renderer.addClass(this.elementRef.nativeElement, sizeToClassMap[currentValue]);
            }
        }
    }
}

