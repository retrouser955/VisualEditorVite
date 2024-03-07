import { ClassicPreset } from "rete";
import { CodeGen } from "../types/CodeGenerationTypes";

export default class NumberNode extends ClassicPreset.Node {
    constructor() {
        super("Number")

        const socket = new ClassicPreset.Socket("number")

        this.addInput("logvalue", new ClassicPreset.Input(socket, "Log Value"))
    }

    code(node: CodeGen['node'], inputs: CodeGen['inputs'], add: CodeGen['add']) {
        console.log(node, inputs)

        add(`console.log(${node.data.logvalue})`)
    }
}