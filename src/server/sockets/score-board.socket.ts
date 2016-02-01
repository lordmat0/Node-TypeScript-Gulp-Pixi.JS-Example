import {ScoreDetail} from '../../shared/score-detail';

class ScoreBoardSocket {

    private static scores: { [id: string]: ScoreDetail } = {};

    constructor(private socket: SocketIO.Socket, private io: SocketIO.Server) {
        this.initSocket();
        this.initEvents();
    }

    private playerDeath(id: string) {
        console.log(this.socket.id, id);
        console.log(ScoreBoardSocket.scores);

        ScoreBoardSocket.scores[this.socket.id].deaths++;
        // Why is this missing /# ?
        ScoreBoardSocket.scores['/#' + id].kills++;

        this.io.emit('score-board', ScoreBoardSocket.scores);
        console.log('score-board emit');
    }

    private disconnect() {
        // no-op
        delete ScoreBoardSocket.scores[this.socket.id];
    }

    private initSocket(): void {
        ScoreBoardSocket.scores[this.socket.id] = {
            deaths: 0,
            id: this.socket.id,
            kills: 0
        };

        this.socket.emit('score-board', ScoreBoardSocket.scores);
    }

    private initEvents(): void {
        this.socket.on('player-dead', this.playerDeath.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
    }


}

export default ScoreBoardSocket;
