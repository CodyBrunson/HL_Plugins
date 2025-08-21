import {UIManager, UIManagerScope} from "@highlite/plugin-api";


export default class IdleOverlay {
    overlay: HTMLElement = new UIManager().createElement(
        UIManagerScope.ClientRelative
    );

    constructor() {
        this.touchIdleOverlay();
        this.bindEvents();
    }

    private touchIdleOverlay() {
        this.overlay.classList.add('highlite-idle-overlay');
        this.overlay.hidden = true;

        // This sets background-color to the --theme-danger variable. #ef4444 on the default color scheme
        this.updateBackgroundColor();
        this.overlay.style.position = 'absolute';
        this.overlay.style.pointerEvents = 'none';
        
        // We force the overlay to be on top of everything
        this.overlay.style.zIndex = '99999999';
        this.overlay.style.width = '-webkit-fill-available';
        this.overlay.style.height = '-webkit-fill-available';
    }

    /** Sets the background color to the HighLite CSS variable '--theme-danger' at 30% alpha */
    public updateBackgroundColor() {
        const rootStyles = getComputedStyle(document.documentElement);
        const dangerColor = rootStyles.getPropertyValue("--theme-danger").trim();
        this.overlay.style.backgroundColor = this.hexToRgba(dangerColor, 0.3);
    }

    /** Convert a hex color to an RGBA color */
    private hexToRgba(hex: string, alpha: number): string {
        const cleanHex = hex.replace("#", "");
        const r = parseInt(cleanHex.slice(0, 2), 16);
        const g = parseInt(cleanHex.slice(2, 4), 16);
        const b = parseInt(cleanHex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    private bindEvents() {
        window.addEventListener('focus', this.onClientInteraction.bind(this));
        [
            'click',
            'keydown',
            /** Likely unwanted, at least not part of runelite as far as I'm aware */
            // 'mousemove',
            'touchstart',
            'pointerdown',
            'pointerup',
        ].forEach(eventType => {
            /**
             * We use passive: true for faster scroll handling/performance boost
             * */
            window.addEventListener(
                eventType,
                this.onClientInteraction.bind(this),
                { capture: true, passive: true }
            );
        });
    }

    onClientInteraction() {
        this.hide();
    }

    show() {
        // Ensures it is always the correct color. Useful for when the --theme-danger variable changes
        this.updateBackgroundColor();
        this.overlay.hidden = false;
    }

    hide() {
        this.overlay.hidden = true;
    }
}
