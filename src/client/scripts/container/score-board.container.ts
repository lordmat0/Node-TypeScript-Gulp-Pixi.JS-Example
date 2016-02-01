import {FadePhysics} from '../physics/fade.physics';
import {RenderDetails} from '../../../shared/render-details';
import {KeyboardHandler} from '../util/keyboard-handler';
import {KeyboardCode} from '../util/keyboard-code';
import {ScoreDetail} from '../../../shared/score-detail';

export class ScoreBoardContainer extends PIXI.Container {

    private tabController: KeyboardHandler;

    private fadePhysics: FadePhysics;

    constructor(private render: RenderDetails, private socket: SocketIOClient.Socket) {
        super();
        this.initControls();
        this.initSocket();
        this.fadePhysics = new FadePhysics(1, 0, 0.2, 0.1);

        this.alpha = 0;
    }

    tick(): void {
        if (this.tabController.isUp) {
            this.alpha = this.fadePhysics.fadeOut(this.alpha);
        } else if (this.tabController.isDown) {
            this.alpha = this.fadePhysics.fadeIn(this.alpha);
        }
    }

    move(x: number, y: number): void {
        this.x = x - (this.render.width / 2);
        this.y = y - (this.render.height / 2);
    }

    updateScores(scores: { [id: string]: ScoreDetail }): void {
        if (this.children.length) {
            this.removeChildren(0, this.children.length);
        }

        let textHeader = new PIXI.Text('Scores', {
            fill: 'white',
            font: '48px sans-serif'
        });

        textHeader.position.set(20, 15);
        this.addChild(textHeader);

        let scoreArray: ScoreDetail[] = Object.keys(scores)
            .map((x) => {
                return scores[x];
            })
            .sort((e1, e2) => {
                if (e1.kills === e2.kills) {
                    return e1.deaths - e2.deaths;
                }
                return e2.kills - e1.kills;
            });


        for (let i = 0; i < scoreArray.length; i++) {

            let scoreMessage = `${scoreArray[i].id} - Kills: ${scoreArray[i].kills} - Deaths: ${scoreArray[i].deaths}`;
            let text = new PIXI.Text(scoreMessage, {
                fill: 'white',
                font: '16px sans-serif'
            });
            text.position.set(20, 70 + (30 * i));
            this.addChild(text);
        }

    }

    private initControls() {
        this.tabController = new KeyboardHandler(KeyboardCode.TAB);
    }

    private initSocket() {
        this.socket.on('score-board', this.updateScores.bind(this));
    }
}
