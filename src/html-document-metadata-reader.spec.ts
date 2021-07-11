import { HtmlDocumentMetadataReader } from "./html-document-metadata-reader";
import { iDocumentMetadataTag } from "./models/document-metadata-tag";

describe("HtmlDocumentMetadataReader", () => {

    let service: HtmlDocumentMetadataReader;

    beforeEach(() => {
        service = new HtmlDocumentMetadataReader();
    });

    it("should read a single tag string", () => {
        const tests: {input: string; expected: iDocumentMetadataTag;}[] = [
            {
                input: '<meta name="test" value="something">',
                expected: {
                    key: {
                        labelName: 'name',
                        value: 'test'
                    },
                    value: {
                        labelName: 'value',
                        value: 'something'
                    }
                }
            },
            {
                input: '< meta property= "test" content = "something">',
                expected: {
                    key: {
                        labelName: 'property',
                        value: 'test'
                    },
                    value: {
                        labelName: 'content',
                        value: 'something'
                    }
                }
            },
            {
                input: `<meta name = 'item' content = "content-value">`,
                expected: {
                    key: {
                        labelName: 'name',
                        value: 'item'
                    },
                    value: {
                        labelName: 'content',
                        value: 'content-value'
                    }
                }
            }
        ];

        tests.forEach(test => {
            expect(service.readTagsFromDocument(test.input)).toEqual([test.expected]);
        });
    });

    it('should extract tags from test document', () => {

        const testDoc = `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Test Page</title>
            <meta name="description" value="something">
            <meta name="author" content="Byte This!">
            <meta property="og:description" content="something">
          </head>
          <body>
            <p>This is a page</p>
          </body>
        </html>`;

        const expected: iDocumentMetadataTag[] = [{
            key: {
                labelName: '',
                value: 'title'
            },
            value: {
                labelName: '',
                value: 'Test Page'
            }
        },
        {
            key: {
                labelName: '',
                value: 'charset'
            },
            value: {
                labelName: '',
                value: 'utf-8'
            }
        }, {
            key: {
                labelName: 'name',
                value: 'description'
            },
            value: {
                labelName: 'value',
                value: 'something'
            }
        }, {
            key: {
                labelName: 'name',
                value: 'author'
            },
            value: {
                labelName: 'content',
                value: 'Byte This!'
            }
        }, {
            key: {
                labelName: 'property',
                value: 'og:description'
            },
            value: {
                labelName: 'content',
                value: 'something'
            }
        }];

        const actual = service.readTagsFromDocument(testDoc);

        expect(actual).toEqual(expected);

    });

})