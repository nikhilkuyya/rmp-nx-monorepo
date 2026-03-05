import { Directive, ElementRef, inject, input, OnChanges, OnInit, Renderer2, SimpleChanges } from "@angular/core";
import { cva, VariantProps } from 'class-variance-authority';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
const variantToClassMap: Record<ButtonVariant, string | string[]> = {
    primary: ['bg-primary', 'text-secondary', 'dark:bg-secondary', 'dark:text-primary'],
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


const buttonVariants = cva(
    'btn',
    {
        variants: {
            variant: variantToClassMap,
            size: sizeToClassMap,
        },
        defaultVariants: {
            variant: 'primary',
            size: 'medium',
        },
    },    
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
@Directive({
    selector: 'button[rmpButton]'
})
export class RmpButtonDirective implements OnInit, OnChanges {
    renderer = inject(Renderer2);
    elementRef = inject(ElementRef);

    variant = input<ButtonVariant>('primary');
    size = input<ButtonSize>('medium');

    ngOnInit() {
        const classes = buttonVariants({
            variant: this.variant(),
            size: this.size(),
        }).split(' ');

        classes.forEach(className => {
            this.renderer.addClass(this.elementRef.nativeElement, className);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['variant']) {
            const previousValue = changes['variant'].previousValue as ButtonVariant;
            const currentValue = changes['variant'].currentValue as ButtonVariant;
            if (previousValue) {
                const variantClasses = buttonVariants({
                    variant: previousValue,
                }).split(' ');
                variantClasses.forEach(className => {
                    this.renderer.removeClass(this.elementRef.nativeElement, className);
                });
            }
            if (currentValue) {
                const currentVariantClasses = buttonVariants({
                    variant: currentValue,
                }).split(' ');
                currentVariantClasses.forEach(className => {
                    this.renderer.addClass(this.elementRef.nativeElement, className);
                });
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

