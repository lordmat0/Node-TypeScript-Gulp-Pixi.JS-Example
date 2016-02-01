import {RenderDetails} from '../../../shared/render-details';
import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';
import {ScoreDetail} from '../../../shared/score-detail';

export class ScoreBoardContainer extends PIXI.Container {

    private tabController: KeyboardHandler;

    constructor(private render: RenderDetails, private socket: SocketIOClient.Socket) {
        super();
        this.initControls();
        this.initSocket();
        this.alpha = 1;
    }

    move(x: number, y: number): void {
        this.x = x - (this.render.width / 2);
        this.y = y - (this.render.height / 2);
    }

    updateScores(scores: ScoreDetail[]): void {
        // First try just removing all the elements and updating the score
        if (scores.length) {
            this.removeChildren(0, this.children.length - 1);
        }

        let textHeader = new PIXI.Text('Scores', {
            fill: 'white',
            font: '48px sans-serif'
        });

        textHeader.position.set(20, 15);
        this.addChild(textHeader);

        console.log(scores.length);

        let offset = 1;
        for (let i in scores) {
            if (!scores.hasOwnProperty(i)) {
                continue;
            }

            let scoreMessage = `${scores[i].id} - Kills: ${scores[i].kills} - Deaths: ${scores[i].deaths}`;
            let text = new PIXI.Text(scoreMessage, {
                fill: 'white',
                font: '16px sans-serif'
            });
            text.position.set(20, 40 + (30 * offset++));
            this.addChild(text);
        }

    }

    private initControls() {
        this.tabController = new KeyboardHandler(KeyboardCode.TAB);
        this.tabController.press = () => {
            this.alpha = 0.8;
        };

        this.tabController.release = () => {
            this.alpha = 0;
        };
    }

    private initSocket() {
        this.socket.on('score-board', this.updateScores.bind(this));
    }
}
