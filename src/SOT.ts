import { reactive } from "vue";
import { BufferGen } from "./lib/pkg/lib";

export const SOT = reactive({
    count: 0,
    gen: BufferGen.new(BigInt(2)), 
})