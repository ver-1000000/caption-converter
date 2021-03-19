declare module 'webvtt-parser' {
  export interface Tree {
    type?: string;
    name?: string;
    classes?: string;
    children?: Tree[];
    parent?: Tree;
    value?: string;
    length?: number;
  }
  export interface Cue {
    alignment: string;
    direction: string;
    endTime: number;
    id: string;
    lineAlign: string;
    linePosition: number;
    pauseOnExit: boolean;
    positionAlign: string;
    size: number;
    snapToLines: boolean;
    startTime: number;
    text: string;
    textPosition: string;
    tree: null | Tree;
  }
  interface ParserError {
    col?: number;
    line: number;
    message: string;
  }
  class WebVTTParser {
    constructor(entities?: { [x: string]: string });
    parse(input: string, mode?: string): { cues: Cue[], errors: ParserError[], time: number };
  }
  class WebVTTSerializer {
    serialize(cues: Cue[]): string;
  }
  class WebVTTCueTimingsAndSettingsParser {
    constructor(line: string, errorHandler?: (message: string, pos: number) => void);
    parse(cue: Cue, previousCueStart: number): true | void;
  }
  class WebVTTCueTextParser {
    constructor(line: string, errorHandler?: (message: string, pos: number) => void, mode?: string, entities?: { [x: string]: string });
    parse(cueStart?: number, cueEnd?: number): Tree;
  }
  export { WebVTTParser, WebVTTSerializer, WebVTTCueTimingsAndSettingsParser, WebVTTCueTextParser, Tree, Cue };
}
