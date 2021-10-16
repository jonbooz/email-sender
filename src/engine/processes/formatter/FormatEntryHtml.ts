import {Process} from "../Process";
import {BoundModule} from "../../../models/BoundModule";

export class FormatEntryHtml extends Process<BoundModule, BoundModule> {

    protected async receive(msg: BoundModule): Promise<BoundModule> {
        msg.email = FormatEntryHtml.heading(2, msg.module.heading)
            + FormatEntryHtml.paragraph(msg.email);
        return msg;
    }

    private static heading(level: number, text: string): string {
        if (level < 1) {
            level = 1;
        } else if (level > 5) {
            level = 5;
        }
        return '<h' + level + '>' + text + '</h' + level +'>';
    }

    private static paragraph(text: string): string {
        return '<p>' + text + '</p>';
    }
}