import * as ValidationError from "./ValidationError"

// @ponicode
describe("format", () => {
    let inst: any

    beforeEach(() => {
        inst = new ValidationError.ValidationError("Invalid data: No data found in any of the field(s)!!!", {})
    })

    test("0", () => {
        let callFunction: any = () => {
            inst.format("AOP", { key0: "Hello, world!", key1: "Hello, world!", key2: "Hello, world!", key3: "foo bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            inst.format("label_1", { key0: "Foo bar", key1: "foo bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            inst.format("label_1", { key0: "foo bar", key1: "Hello, world!", key2: "Foo bar", key3: "Hello, world!" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            inst.format("label_3", { key0: "Hello, world!", key1: "This is a Text", key2: "foo bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            inst.format("label_2", { key0: "This is a Text", key1: "Foo bar", key2: "Hello, world!", key3: "foo bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            inst.format("", { key0: "" })
        }
    
        expect(callFunction).not.toThrow()
    })
})
