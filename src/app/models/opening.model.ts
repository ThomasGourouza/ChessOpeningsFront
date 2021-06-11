import { Move } from "./move.model";

export class Opening {
    constructor(
        public name: string,
        public parentOpeningId: number | null,
        public moves: Array<Move>,
        public childOpeningIds?: Array<number>,
        public id?: number
    ) { }
}
