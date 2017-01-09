import model from './model';
class View {
    constructor() {

        this.comModel = model;
        this.initModel();
    }

    initModel() {

        this.model = {...this.comModel,
            ... {
                title: '<$- HOME $>'
            }
        };

        return this;
    }


}

new View();
