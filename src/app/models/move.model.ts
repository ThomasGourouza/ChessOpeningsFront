export class Move {
    constructor(
        public moveNumber: number,
        public color: string,
        public piece: string,
        public columnFrom: string,
        public lineFrom: string,
        public columnTo: string,
        public lineTo: string
    ) { }
}
