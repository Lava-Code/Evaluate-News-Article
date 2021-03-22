import 'babel-polyfill'
import { handleSubmit } from "../js/formHandler"

describe('Test the handleSubmit Function Existing', () => {
    test('Test the handleSubmit defined or not ', () => {
        expect(handleSubmit).toBeDefined();
});

})
