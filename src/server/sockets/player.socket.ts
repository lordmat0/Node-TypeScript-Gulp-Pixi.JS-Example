import {Random} from '../../shared/util/random';
import {PlayerMovement} from '../../shared/player-movement';
import {RenderDetails} from '../../shared/render-details';

class PlayerSocket {

    private static squares: { [id: string]: PlayerMovement } = {};
    private renderDetails: RenderDetails;

    constructor(private socket: SocketIO.Socket) {
        this.renderDetails = new RenderDetails();
        this.initSocket();
        this.initEvents();
    }

    private playerMovement(movement: PlayerMovement) {
        PlayerSocket.squares[this.socket.id] = movement;
        movement.name = this.socket.id;
        // console.log(movement, 'square-moved');

        this.socket.broadcast.emit('square-moved', movement);
    }

    private playerDeath(id: string) {
        // TODO keep track

        let square = this.generatePosition();
        this.socket.emit('player-start-position', square);

    }


    private disconnect(): void {
        console.log(this.socket.id, 'disconnect');
        this.socket.broadcast.emit('square-deleted', this.socket.id);

        delete PlayerSocket.squares[this.socket.id];
    }

    private generatePosition(): PlayerMovement {
        return {
            name: this.socket.id,
            rotation: Random.getFloat(0, Math.PI * 2),
            x: Random.getInt(0, this.renderDetails.stageWidth),
            y: Random.getInt(0, this.renderDetails.stageHeight),
        };
    }

    private initSocket(): void {
        console.log(this.socket.id, 'connection');

        this.socket.emit('square-list', PlayerSocket.squares);
        console.log('squares', PlayerSocket.squares);

        let square = this.generatePosition();
        this.socket.emit('player-start-position', square);

        PlayerSocket.squares[this.socket.id] = square;
        this.socket.broadcast.emit('new-square', square);
    }

    private initEvents(): void {
        this.socket.on('player-dead', this.playerDeath.bind(this));
        this.socket.on('player-movement', this.playerMovement.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }
}

export default PlayerSocket;
