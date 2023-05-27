const withCSSVar = (selector = 'html') => {
    const root = document.querySelector(selector);
    const descriptor = {
        get(target, prop) {                    
            return getComputedStyle(target).getPropertyValue(`--${prop.replace(/[A-Z]/g, (a => '-' + a.toLowerCase()))}`)
        },
        set(target, prop, value) {
            target.style.setProperty(
                `--${prop.replace(/[A-Z]/g, (a => '-' + a.toLowerCase()))}`, 
                value
            )
            return this;
        }
    };

    return new Proxy(root, descriptor);
}

export default withCSSVar;