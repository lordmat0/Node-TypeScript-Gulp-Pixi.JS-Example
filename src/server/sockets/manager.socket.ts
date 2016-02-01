import ScoreBoardSocket from './score-board.socket';
import BulletSocket from './bullet.socket';
import PlayerSocket from './player.socket';

class ManagerSocket {

    private playerSocket: PlayerSocket;
    private bulletSocket: BulletSocket;
    private scoreBoardSocket: ScoreBoardSocket;

    constructor(private io: SocketIO.Server) {
    }

    init() {
        this.initSocket();
    }

    private connection(socket: SocketIO.Socket): void {
        this.playerSocket = new PlayerSocket(socket);
        this.bulletSocket = new BulletSocket(socket);
        this.scoreBoardSocket = new ScoreBoardSocket(socket, this.io);
    }

    private initSocket(): void {
        this.io.on('connection', this.connection.bind(this));
    }
}

export default ManagerSocket;
