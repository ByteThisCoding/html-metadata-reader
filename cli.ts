import { HtmlDocumentMetadataReader } from "./src/html-document-metadata-reader";

const http = require("http");

const url = process.argv[2];


http.get(url, async function (res: any) {
    let data = '';
    res.on('data', (chunk: any) => {
        data += chunk.toString();
    })
    res.on('end', () => {
        const meta = new HtmlDocumentMetadataReader().readTagsFromDocument(data);
        console.log(JSON.stringify(meta, null, 4));
        process.exit(0);
    });
}).on('error', function (err: any) {
    console.error("Could not fetch page", err);
    process.exit(1);
});