import { BoundModule } from "../../models/BoundModule";
import { Process } from "./Process";

import { Client } from 'node-rest-client';
import { FormatEntryHtml } from "./formatter/FormatEntryHtml";

/**
 * This process provides support for creating an entry with the 10 most recent
 * posts from a wordpress site.
 */
export class WordpressRecentPosts extends Process<BoundModule, BoundModule> {

    private readonly client = new Client();
    private readonly formatEntryHtml = new FormatEntryHtml();
    private readonly numPosts: number;

    constructor(numPosts: number) {
        super();
        this.numPosts = numPosts;
    }

    protected receive(msg: BoundModule): Promise<BoundModule> {
        const wordpressUrl = msg.module.entries[0];
        return this.getPosts(wordpressUrl)
                .then(posts => this.formatPosts(posts))
                .then(shuffledPosts => this.writeAsEmail(msg, shuffledPosts))
                .then(msgWithEmail => this.formatEntryHtml.send(msgWithEmail));
    }

    private async getPosts(wordpressUrl: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.client.get(wordpressUrl, (data, response) => {
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