import {PlayerMovement} from '../../shared/player-movement';

class PlayerSocket {

    private static squares: { [id: string]: PlayerMovement } = {};

    constructor(private socket: SocketIO.Socket) {
        this.initSocket();
        this.initEvents();
    }

    private playerMovement(movement: PlayerMovement) {
        PlayerSocket.squares[this.socket.id] = movement;
        movement.name = this.socket.id;
        // console.log(movement, 'square-moved');

        this.socket.broadcast.emit('square-moved', movement);
    }

    private disconnect(): void {
        console.log(this.socket.id, 'disconnect');
        this.socket.broadcast.emit('square-deleted', this.socket.id);

        delete PlayerSocket.squares[this.socket.id];
    }

    private initSocket(): void {
        console.log(this.socket.id, 'connection');

        this.socket.emit('square-list', PlayerSocket.squares);
        console.log('squares', PlayerSocket.squares);

        let square: PlayerMovement = {
            name: this.socket.id,
            x: -50,
            y: -50
        };

        PlayerSocket.squares[this.socket.id] = square;

        this.socket.broadcast.emit('new-square', square);
    }

    private initEvents(): void {
        this.socket.on('player-movement', this.playerMovement.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }
}

export default PlayerSocket;
