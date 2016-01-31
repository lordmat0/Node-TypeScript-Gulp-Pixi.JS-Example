import BulletSocket from './bullet.socket';
import PlayerSocket from './player.socket';

class ManagerSocket {

    private playerSocket: PlayerSocket;
    private bulletSocket: BulletSocket;

    constructor(private io: SocketIO.Server) {
    }

    init() {
        this.initSocket();
    }

    private connection(socket: SocketIO.Socket): void {
        this.playerSocket = new PlayerSocket(socket);
        this.bulletSocket = new BulletSocket(socket);
    }

    private initSocket(): void {
        this.io.on('connection', this.connection.bind(this));
    }
}

export default ManagerSocket;
