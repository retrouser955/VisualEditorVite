export interface CodeGen {
    node: {
        data: any;
    };
    inputs: any;
    add: (codeBlock: string, varValue?: any) => void;
}