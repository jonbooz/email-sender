import { BoundModule } from "../../models/BoundModule";
import { Process } from "./Process";

import { Client } from 'node-rest-client';
import { Logger } from "../../utils/logging/Logger";
import { FormatEntryHtml } from "./formatter/FormatEntryHtml";

const G20_URL = "https://gentwenty.com/wp-json/wp/v2/posts?per_page=10&page=1";

/**
 * This process provides support for creating an entry with the 10 most recent
 * posts from GenTwenty.
 */
export class GenTwentyRecentPosts extends Process<BoundModule, BoundModule> {

    private readonly client = new Client();
    private readonly formatEntryHtml = new FormatEntryHtml();
    private readonly numPosts: number;

    constructor(numPosts: number) {
        super();
        this.numPosts = numPosts;
    }

    protected receive(msg: BoundModule): Promise<BoundModule> {
        return this.getG20Posts()
                .then(g20Posts => this.formatPosts(g20Posts))
                .then(shuffledPosts => this.writeAsEmail(msg, shuffledPosts))
                .then(msgWithEmail => this.formatEntryHtml.send(msgWithEmail));
    }

    private async getG20Posts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.get(G20_URL, (data, response) => {
                resolve(data);
            });
        })
    }

    private formatPosts(posts: any): any {
        return posts.map((p) => {
            return {
                title: p.title.rendered,
                url: p.link,
                excerpt: p.excerpt.rendered,
                date: p.date
            };
        });
    }

    private writeAsEmail(boundModule: BoundModule, posts: any): BoundModule {
        var content = '<ul>';
        for (let i = 0; i < this.numPosts; ++i) {
            const post = posts[i];
            content += `<li><a href="${post.url}">${post.title}</a></li>`;
        }
        content += '</ul>';
        boundModule.email = content;
        return boundModule;
    }

}