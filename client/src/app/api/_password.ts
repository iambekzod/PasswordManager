export class Password {
    id: string;
    website: string;
    username: string;
    password: string;
    notes: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
