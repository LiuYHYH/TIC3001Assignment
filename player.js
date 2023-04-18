const player = class {
    constructor(id, name, team) {
        this.id = id;
        this.name = name;
        this.team = team;
    }

    to_json() {
        return {
            "id": this.id,
            "name": this.name,
            "team": this.team
        }
    }
}
