import { iDocumentMetadataReader } from "./models/document-metadata-reader";
import { iDocumentMetadataTag } from "./models/document-metadata-tag";

export class HtmlDocumentMetadataReader implements iDocumentMetadataReader {

    readTagsFromDocument(htmlDocument: string): iDocumentMetadataTag[] {
        if (typeof htmlDocument !== 'string') {
            throw new Error('HtmlDocument is not a string!');
        }

        const head = this.extractHead(htmlDocument);
        const metaTags = this.extractRawMetaTags(head);
        const tags = metaTags.map(tag => this.processRawMetaTag(tag));
        const title = this.extractTitle(head);
        if (title) {
            return [{
                key: {
                    labelName: '',
                    value: 'title'
                },
                value: {
                    labelName: '',
                    value: title
                }
            }, ...tags];
        } else {
            return tags;
        }
    }

    /**
     * Get the contents of the head only
     * Precaution in case the body of the document 'talks about' meta tags
     * @param htmlDocument 
     */
    private extractHead(inputDocument: string): string {
        let headStartPos = -1;
        let headEndPos = -1;

        let iterator = 0;
        let htmlDocument = inputDocument;
        while (htmlDocument.length > 0 && (headStartPos === -1 || headEndPos === -1)) {
            const match = htmlDocument.match(/head\s*>/i);

            if (match?.index === 0) {
                if (headStartPos === -1) {
                    iterator += match![0].length;
                    headStartPos = iterator;
                    htmlDocument = htmlDocument.substring(match![0].length);
                } else {
                    headEndPos = iterator;
                }
            } else {
                htmlDocument = htmlDocument.substring(1);
                    iterator += 1;
            }
        }

        //if some invalid document, return entire document to work with
        if (headStartPos === -1 || headEndPos === -1) {
            return inputDocument;
        }

        return inputDocument.substring(headStartPos, headEndPos);

    }

    /**
     * Get an array of strings which are the raw, unparsed meta tags
     * @param htmlHead 
     */
    private extractRawMetaTags(htmlHead: string): string[] {
        return htmlHead.match(/<\s*meta\s*.*?>/ig) || [];
    }

    private processRawMetaTag(metaTagRaw: string): iDocumentMetadataTag {
        //remove <meta and last >
        metaTagRaw = metaTagRaw.replace(/<\s*meta\s/i, "");
        metaTagRaw = metaTagRaw.substring(0, metaTagRaw.length - 1).trim();

        //split into the key + value pairs
        const splitPairs = 
            metaTagRaw.match(/.*?=\s*(?<!\\)(?:\\{2})*("|').*?(?<!\\)(?:\\{2})*("|')/g) || [];
         //split into key="" value="" strings

        //if it is a key value only, handle special case
        if (splitPairs.length === 1) {

            const assignment = this.extractAssignment(splitPairs[0]);

            return {
                key: {
                    labelName: '',
                    value: assignment[0]
                },
                value: {
                    labelName: '',
                    value: assignment[1]
                }
            };

        } else {

            const keyAssignment = this.extractAssignment(splitPairs[0]);
            const valueAssignment = this.extractAssignment(splitPairs[1]);

            return {
                key: {
                    labelName: keyAssignment[0],
                    value: keyAssignment[1]
                },
                value: {
                    labelName: valueAssignment[0],
                    value: valueAssignment[1]
                }
            };
        }
    }

    /**
     * Given a string like something="something-else", return ['something', 'something-else']
     * @param item 
     */
    private extractAssignment(item: string): [string, string] {
        const eqPos = item.indexOf("=");

        if (eqPos === -1) {
            return [item, ''];
        }

        const leftHand = item.substring(0, eqPos).trim();
        const rightHand = item.substring(eqPos + 1).trim();

        return [
            leftHand,
            rightHand.substring(1, rightHand.length - 1)
        ];
    }

    /**
     * Extract the title separately (since it is not a meta tag)
     * @param head 
     */
    private extractTitle(head: string): string {
        const titleMatch = head.match(/<\s*title\s*>.*?<\s*\/title\s*>/);
        if (!titleMatch) {
            return '';
        }

        return titleMatch![0].replace(/(<\s*title\s*>|<\s*\/title\s*>)/g, "");
    }

}