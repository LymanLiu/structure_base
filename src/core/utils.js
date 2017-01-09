export default {
    sayHello: () => {
        alert('hello');
    },
    getParent(element, parent) {
        if (/^\./.test(parent)) {
            name = 'className';
        } else if (/^\#/.test(parent)) {
            name = 'id';
        }

        while (element.parentElement) {
            element = element.parentElement;
            console.log(element, name)
            console.log(element[name].toLowerCase())
            if (element[name] && parent.indexOf(element[name].toLowerCase()) > -1) {
                return element;
                // break;
            }

        }
        if (!element.parentElement) console.warn('no element');
    }
}
