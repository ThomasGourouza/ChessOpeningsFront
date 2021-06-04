import { Move } from "./move.model";

export class Opening {
    constructor(
        public id: number,
        public name: string,
        public parentOpeningId: number,
        public childOpeningIds: Array<number>,
        public moves: Array<Move>
    ) { }
}
